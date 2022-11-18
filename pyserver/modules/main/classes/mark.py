import imp
from xmlrpc.client import Boolean
import pymongo
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
from persiantools.jdatetime import JalaliDate
from datetime import datetime
from persiantools.jdatetime import JalaliDate
from dateutil.relativedelta import relativedelta


class SMark:
    database: str = "database"
    product_collection: str = ""

    def __init__(self, database, mark_collection, user_collection):
        self.database = database
        self.mark_collection = mark_collection
        self.user_collection = user_collection

    def validate_mark(self, user, mark, col):
        required = {"classActivity", "_id", "quiz",
                    "extra", "midterm", 'final', 'sum', 'message'}
        required_q = ['homework', 'writing', 'reading',
                      'listening', 'speaking', 'activity']
        for itm in required_q:
            if itm not in mark or mark[itm]['id'] not in ['outstanding', 'good', 'satisfactory', 'weak']:
                return 422, "missing_field_q", "some fields are missing", None
        if len(required.difference(set(mark.keys()))) != 0:
            return 422, "missing_field", "some fields are missing", None
        if mark["message"] == "":
            return 422, "missing_message", "message is empty", None
        if mark["sum"] > 100:
            return 422, "too_much", "sum cant be more than 100", None

        itm = list(col.find(
            {"student.id": mark["student"]['id'], 'course.id': mark['course']['id']}))

        if "_id" in mark and mark["_id"] == "":
            if len(itm) != 0:
                return 422, "not_unique", "mark is not unique", None
        else:
            if len(itm) == 1 and user['username'] != itm[0]['teacher']['username']:
                return 422, "wrong_teacher", "teacher is not responsible for mark", None
            pass

        return 200, "ok", "is valid", None

    def insert_mark(self, user,  info, st):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        col2: Collection = db[self.user_collection]
        valid = self.validate_mark(user, info, col)
        if valid[0] != 200:
            return valid

        student_obj = list(col2.find({"_id": info['student']['id']}))[0]
        info['username'] = student_obj['username']

        cc = JalaliDate.today()
        info['date'] = f"{cc.year}/{cc.month}/{cc.day}"
        info['status'] = 'passed' if info['sum'] >= st.info['PassMarkLimit'] else 'failed'
        if "_id" in info and info["_id"] != "":
            res = self.edit_mark(info, col)
            return res
        info['g_date'] = datetime.today()
        idd = str(ObjectId())
        itm_ready = {**info, "_id": idd, 'y': int(cc.year),
                     'm': int(cc.month),
                     'd': int(cc.day),
                     'teacher': {'username': user['username'], 'full_name': user['full_name']}}
        col.insert_one(itm_ready)
        col2.update_one({'_id': info['student']['id']}, {
                        "$set": {'status': {'id': "mark", "name": "مشاهده نمره"}}})
        return 200, "ok", "mark is inserted", itm_ready

    
    
    def delete_mark(self,_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        col.delete_one({"_id":_id })
        return 200, "ok", "mark is deleted", _id
    def get_mark(self, mark_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(col.find({"_id": mark_id}))
        if len(res) != 1:
            return 403, "not_found", "mark not found ", []

        return 200, "ok", "mark is inserted", res

    def get_mark_by_teacher(self, user, st):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        current_date = datetime.today()
        n = st.info['ReportDefaultUpToDate']
        past_date = current_date - relativedelta(months=n)
        res = list(col.find({"teacher.username": user['username'],
                             'g_date': {'$gte': past_date}}))
        return 200, "ok", "", res

    def edit_mark(self, info, col: Collection):
        idd = info["_id"]
        del info["_id"]
        col.update_one({"_id": idd}, {"$set": info})
        return 200, "ok", "ok", info

    def get_mark_by_search(self, user, filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        
        and_li = []
        is_filter = False

        if user['role']['id'] == 'student': 
            and_li.append({'username': user['username']})
            and_li.append({'course.id': {"$ne": user['courses'][0]['id']}})
             
        if user['role']['id'] == 'teacher':
            and_li.append({'teacher.username': user['username']})
            
        if 'name' in filter and filter['name'] != "":
            and_li.append({'student.name': {'$regex': filter['name']}})
            is_filter=True 
        if 'courses' in filter and filter['courses']['id'] != "":
            and_li.append({'course.id': filter['courses']['id']})
            is_filter=True 
        if 'course' in filter and filter['course'] != "":
            and_li.append({'course.name': {'$regex': filter['course']}})
            is_filter=True 
        if 'isFailed' in filter and filter['isFailed']:
            and_li.append({'status': 'failed'})
            is_filter=True 

        if 'startMark' in filter and filter['startMark'] != '':
            and_li.append({'sum': {"$gte": int(filter['startMark'])}})
            is_filter=True 
        if 'endMark' in filter and filter['endMark'] != '':
            and_li.append({'sum': {"$lte": int(filter['endMark'])}})
            is_filter=True 

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})
            is_filter=True 

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})
            is_filter=True

        if is_filter:
            d = col.find({"$and" : and_li}).sort([('g_date', pymongo.DESCENDING)])
        else:
            d = col.find({"$and" : and_li}).sort([('g_date', pymongo.DESCENDING)]).limit(20)
 

        
        return 200, "ok", "ok", list(d)

    def get_selected_mark(self, username, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(
            col.find({"username": username, 'course.id': course_id}))
        if len(res) == 0:
            return 404, 'not_found', "mark could not been found", []
        elif len(res) > 1:
            return 422, 'duplicated mark', "more than one mark has found", []
        else:
            return 200, "ok", "", res

    def get_final_status(self, student_id, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(
            col.find({"student.id": student_id, 'course.id': course_id}))
        if len(res) > 0:

            final_status = self.get_value_of_properties(res[0])
            return 200, "ok", "", [final_status]

    def get_value_of_properties(self, mark):
        values = {
            'outstanding': 100,
            'good': 75,
            'satisfactory': 50,
            'weak': 25
        }
        mean = (
            values[mark['homework']['id']] +
            values[mark['writing']['id']] +
            values[mark['reading']['id']] +
            values[mark['listening']['id']] +
            values[mark['speaking']['id']] +
            values[mark['activity']['id']]) / 6

        final_mean = (mean + int(mark['sum'])) / 2
        return final_mean

    def get_compare_chart_data(self, username, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        query_res = list(col.aggregate([
            {
                '$facet': {
                    'avg': [
                        {
                            '$match': {
                                'username': username,
                                'course.id': {
                                    '$ne': course_id
                                }
                            }
                        }, {
                            '$group': {
                                '_id': '$student.id',
                                'avg_classActivity': {
                                    '$avg': '$classActivity'
                                },
                                'avg_quiz': {
                                    '$avg': '$quiz'
                                },
                                'avg_extra': {
                                    '$avg': '$extra'
                                },
                                'avg_midterm': {
                                    '$avg': '$midterm'
                                },
                                'avg_final': {
                                    '$avg': '$final'
                                },
                                'avg_sum': {
                                    '$avg': '$sum'
                                }
                            }
                        }, {

                            '$set': {
                                'avg_classActivity': {
                                    '$round': ['$avg_classActivity', 2]
                                },
                                'avg_quiz': {
                                    '$round': ['$avg_quiz', 2]
                                },
                                'avg_extra': {
                                    '$round': ['$avg_extra', 2]
                                },
                                'avg_midterm': {
                                    '$round': ['$avg_midterm', 2]
                                },
                                'avg_final': {
                                    '$round': ['$avg_final', 2]
                                },
                                'avg_sum': {
                                    '$round': ['$avg_sum', 2]
                                }
                            }



                        }, {
                            '$project': {
                                '_id': 0
                            }
                        }
                    ],
                    'actual': [
                        {
                            '$match': {
                                'username': username,
                                'course.id': course_id
                            }
                        }, {
                            '$project': {
                                '_id': 0,
                                'classActivity': '$classActivity',
                                'quiz': '$quiz',
                                'extra': '$extra',
                                'midterm': '$midterm',
                                'final': '$final',
                                'sum': '$sum'
                            }
                        }
                    ]
                }
            }
        ])

        )
        avg_data = [] if len(list(query_res[0]['avg'])) == 0 else list(
            query_res[0]['avg'][0].values())
        act_data = [] if len(list(query_res[0]['actual'])) == 0 else list(
            query_res[0]['actual'][0].values())
        item_ready = [{'name': "میانگین ترم های قبل", "data": avg_data},
                      {'name': "نمرات این ترم", "data": act_data}]
        return 200, "ok", "", item_ready

    def get_mark_history(self, username, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(
            col.find({'username': username, 'course.id': {"$ne": course_id}}).sort([('g_date', pymongo.DESCENDING)]))
        return 200, 'ok', 'ok', res

    def get_student_mark_by_course(self, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.user_collection]
        res = list(col.aggregate([
            {
                '$match': {
                    'courses.id': course_id,
                    'role.id': 'student'
                }
            }, {
                '$lookup': {
                    'from': 'mark',
                    'localField': 'username',
                    'foreignField': 'username',
                    'pipeline': [
                        {
                            '$match': {
                                'course.id': course_id
                            }
                        }
                    ],
                    'as': 'mark'
                }
            }, {
                '$match': {
                    'mark': []
                }
            }
        ]))
        return 200, "ok", "", res
