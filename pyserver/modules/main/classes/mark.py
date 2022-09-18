import imp
from xmlrpc.client import Boolean
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
from persiantools.jdatetime import JalaliDate
from datetime import datetime


class SMark:
    database: str = "database"
    product_collection: str = ""

    def __init__(self, database, mark_collection , user_collection):
        self.database = database
        self.mark_collection = mark_collection
        self.user_collection = user_collection

    def validate_mark(self, product, col):
        # required = {"name", "_id", "price", "is_main" , "is_active"}
        # if len(required.difference(set(product.keys()))) != 0:
        #     return 422, "missing_field", "some fields are missing", None
        # if not (product["name"] and product["price"] and type(product["is_main"] == Boolean) and type(product["is_active"] == Boolean) ):
        #     return 422, "empty_field", "can not accept empty fiels", None
        # if "_id" in product and product["_id"] == "" and len(list(col.find({"name": product["name"]}))) != 0:
        #     return 422, "not_unique", "user already exists", None

        return 200, "ok", "is valid", None

    def insert_mark(self, info, st):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        col2: Collection = db[self.user_collection]
        valid = self.validate_mark(info, col)
        if valid[0] != 200:
            return valid
        
        student_obj = list(col2.find({"_id" : info['student']['id']}))[0]
        info['username'] = student_obj['username']

        cc = JalaliDate.today()
        info['date'] = f"{cc.year}/{cc.month}/{cc.day}"
        info['status'] = 'passed' if info['sum'] >= st.info['PassMarkLimit'] else 'failed'
        if "_id" in info and info["_id"] != "":
            res = self.edit_mark(info, col)
            return res
        info['g_date'] = datetime.today()
        idd = str(ObjectId())
        col.insert_one({**info, "_id": idd})
        col2.update_one({'_id' : info['student']['id']} , {"$set" : {'status' : {'id' : "mark" , "name" : "مشاهده نمره"}}})
        return 200, "ok", "mark is inserted", None

    def get_mark(self, mark_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(col.find({"_id": mark_id}))
        if len(res) != 1:
            return 403, "not_found", "mark not found ", []

        return 200, "ok", "mark is inserted", res

    def get_mark_by_teacher(self, teacher_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        # res = list(col.find({"teacher.id" : teacher_id}))
        res = list(col.find({}))
        return 200, "ok", "", res

    def edit_mark(self, info, col: Collection):
        idd = info["_id"]
        del info["_id"]
        col.update_one({"_id": idd}, {"$set": info})
        return 200, "ok", "ok", []

    def get_mark_by_search(self, user ,filter):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        roles = [c['id'] for c in user['roles']]
        and_li = []

        if 'student' in roles:
            and_li.append({'username' : user['username']})
            and_li.append({'course.id' : {"$ne" : user['courses'][0]['id']}})
            
        if 'name' in filter and filter['name'] != "":
            and_li.append({'student.name':{'$regex': filter['course']}})
        if 'courses' in filter and filter['courses']['id'] != "":
            and_li.append({'course.id': filter['courses']['id']})
        if 'course' in filter and filter['course'] != "":
            and_li.append({'course.name':{'$regex': filter['course']} })
        if 'isFailed' in filter and filter['isFailed']:
            and_li.append({'status': 'failed'})
        if 'isPassed' in filter and filter['isPassed']:
            and_li.append({'status': 'passed'})
        if 'startMark' in filter and filter['startMark'] != '':
            and_li.append({'sum': {"$gte": int(filter['startMark'])}})
        if 'endMark' in filter and filter['endMark'] != '':
            and_li.append({'sum': {"$lte": int(filter['endMark'])}})

        if 'startDate' in filter and filter['startDate'] != '':
            cc = filter['startDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$gte": sg}})

        if 'endDate' in filter and filter['endDate'] != '':
            cc = filter['endDate'].split('/')
            sd = JalaliDate(int(cc[0]), int(cc[1]), int(cc[2])).to_gregorian()
            sg = datetime(sd.year, sd.month, sd.day)
            and_li.append({'g_date': {"$lte": sg}})

        data = list(col.find({"$and": and_li}))
        return 200, "ok", "ok", data

    def get_selected_mark(self, username, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(
            col.find({"username": username, 'course.id': course_id}))
        if len(res) == 0:
            return 404 , 'not_found' , "mark could not been found" , []
        elif len(res) > 1:
            return 422 , 'duplicated mark' , "more than one mark has found" , []
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
                                'classActivity': 1,
                                'quiz': 1,
                                'extra': 1,
                                'midterm': 1,
                                'final': 1,
                                'sum': 1
                            }
                        }
                    ]
                }
            }
        ])

        )
        avg_data = [] if len(list(query_res[0]['avg'])) == 0 else list(query_res[0]['avg'][0].values())
        act_data = [] if len(list(query_res[0]['actual'])) == 0 else list(query_res[0]['actual'][0].values())
        item_ready = [{'name': "میانگین ترم های قبل", "data": avg_data},
                      {'name' : "نمرات این ترم" , "data" : act_data }]
        return 200, "ok", "", item_ready
    
    
    def get_mark_history(self , username , course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        res = list(col.find({'username' : username , 'course.id' : {"$ne" : course_id}}))
        return 200 , 'ok' , 'ok' , res