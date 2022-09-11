from cmath import inf
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
from persiantools.jdatetime import JalaliDate
from datetime import datetime

class SCourse:
    database: str = "database"
    course_collection: str = 'course'
    user_collection: str = 's_user'

    def __init__(self, database, course_collection, user_collection, mark_collection, registration_collection):
        self.database = database
        self.course_collection = course_collection
        self.user_collection = user_collection
        self.mark_collection = mark_collection
        self.registration_collection = registration_collection

    def validate_course(self, course, col):
        required = {"name", "_id", "prev_course", "status", "price"}
        if len(required.difference(set(course.keys()))) != 0:
            return 422, "missing_field", "some fields are missing", None
        if not (course["name"] and course["status"] and course["price"]):
            return 422, "empty_field", "can not accept empty fiels", None
        if "_id" in course and course["_id"] == "" and len(list(col.find({"name": course["name"]}))) != 0:
            return 422, "not_unique", "user already exists", None

        return 200, "ok", "is valid", None

    def insert_course(self, info):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        valid = self.validate_course(info, col)
        if valid[0] != 200:
            return valid
        if "_id" in info and info["_id"] != "":
            res = self.edit_course(info, col)
            return res
        idd = str(ObjectId())

        col.insert_one({**info, "_id": idd})
        if info['prev_course']['id'] != '' and info['prev_course']['name'] != '':
            # if 'id' in info['prev_course']:
            col.update_one({"_id": info["prev_course"]["id"]},
                           {"$set": {"next_course.id": idd,
                                     'next_course.name': info['name']}})

        return 200, "ok", "course is inserted", None

    def edit_course(self, info, col: Collection):
        idd = info["_id"]
        del info["_id"]
        col.update_one({"_id": idd}, {"$set": info})
        if info['prev_course']['id'] != '' and info['prev_course']['name'] != '':
            # if 'id' in info['prev_course']:
            col.update_one({"_id": info["prev_course"]["id"]},
                           {"$set": {"next_course.id": idd,
                                     'next_course.name': info['name']}})
        else:
            col.update_one({"next_course.id": idd},
                           {"$set": {"next_course.id": "",
                                     'next_course.name': ""}})

        return 200, "ok", "ok", []

    def get_course(self, course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        course = list(col.find({"_id": course_id}))
        if len(course) == 0:
            return 404, "not_found", "could not find the course", []
        else:
            return 200, "ok", "ok", course

    def get_course_list(self, full_name, status):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        # filters = {}
        # if full_name != "" :
        #     filters["full_name"] =  {'$regex': full_name} #this will be text search
        # if status != "":
        #     filters["status"] = status
        cl = list(col.aggregate([
            {
                '$lookup': {
                    'from': 's_user',
                    'localField': '_id',
                    'foreignField': 'course.id',
                    'as': 'teacher',
                    'pipeline': [
                        {
                            '$match': {
                                'roles': {
                                    '$elemMatch': {
                                        '_id': 'teacher'
                                    }
                                }
                            }
                        }, {
                            '$project': {
                                'full_name': 1,
                                'username': 1
                            }
                        }
                    ]
                }
            }
        ]))
        return 200, "ok", "ok", cl

    def get_course_by_teacher(self, teacher_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.user_collection]
        cl = list(col.aggregate([
            {
                '$match': {
                    # 'username': teacher_id,
                    'roles.id': 'teacher'
                }
            }, {
                "$unwind": '$courses'
            }, {
                '$group': {
                    '_id': '$courses.id',
                    'name': {
                        '$first': '$courses.name'
                    }
                }
            }
        ]))

        return 200, "ok", "ok", cl

    def get_course_by_student(self, student_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        cl = list(col.aggregate([
            {
                '$match': {
                    # 'username': teacher_id,
                    'student.id': student_id
                }
            }, {
                '$group': {
                    '_id': '$course.id',
                    'name': {
                        '$first': '$course.name'
                    }
                }
            }
        ]))

        return 200, "ok", "ok", cl

    def get_course_history(self, course_id):
   
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]

        raw = list(col.aggregate([
            {
                '$facet': {
                    'item': [
                        {
                            '$match': {
                                '_id': course_id
                            }
                        },
                        {
                            "$project": {
                                'id': "$_id",
                                "name": "$name",
                                '_id': 0
                            }
                        }
                    ],
                    'nxt': [
                        {
                            '$match': {
                                '_id': course_id
                            }
                        }, {
                            '$graphLookup': {
                                'from': 'course',
                                'startWith': '$next_course.id',
                                'connectFromField': 'next_course.id',
                                'connectToField': '_id',
                                'as': 'nxt',
                                'maxDepth': 2,
                                'depthField': 'order'
                            }
                        }, {
                            '$unwind': '$nxt'
                        }, {
                            '$project': {
                                'id': '$nxt._id',
                                'name': '$nxt.name',
                                'order': '$nxt.order',
                                '_id': 0
                            }
                        }
                    ],
                    'prv': [
                        {
                            '$match': {
                                '_id': course_id
                            }
                        }, {
                            '$graphLookup': {
                                'from': 'course',
                                'startWith': '$prev_course.id',
                                'connectFromField': 'prev_course.id',
                                'connectToField': '_id',
                                'as': 'prv',
                                'maxDepth': 2,
                                'depthField': 'order'
                            }
                        }, {
                            '$unwind': '$prv'
                        }, {
                            '$project': {
                                'id': '$prv._id',
                                'name': '$prv.name',
                                'order': '$prv.order',
                                '_id': 0
                            }
                        }
                    ]
                }
            }
        ]))

        nxt = sorted(raw[0]['nxt'], key=lambda x: x['order'])
        for itm in nxt:
            itm['state'] = 'upcoming'
        prv = sorted(raw[0]['prv'], key=lambda x: x['order'], reverse=True)
        for itm in prv:
            itm['state'] = 'attended'

        raw[0]['item'][0]['state'] = 'current'
        final = prv + raw[0]['item'] + nxt

        return 200, "ok", "ok", final

    def course_registration(self, student_id, course_id):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.mark_collection]
        col2: Collection = db[self.course_collection]
        col3: Collection = db[self.registration_collection]

        mark = list(
            col.find({'student.id': student_id, 'course.id': course_id}))
        if len(mark) != 1:
            return 422, 'invalid_result',  'no or more than one mark found', []

    def get_course_registration_detail(self, st, username, course_id, state):
  
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.user_collection]
        col2: Collection = db[self.course_collection]
        col3: Collection = db[self.registration_collection]
        if state == 'current':
            res = list(col.aggregate([
                {
                    '$facet': {
                        't_obj': [
                            {
                                '$match': {
                                    'roles.id': 'teacher',
                                    'courses.id': course_id
                                }
                            }, {
                                '$project': {
                                    'full_name': 1
                                }
                            }
                        ],
                        's_obj': [
                            {
                                '$match': {
                                    'username': username
                                }
                            }, {
                                '$lookup': {
                                    'from': 'course',
                                    'localField': 'courses.0.id',
                                    'foreignField': '_id',
                                    'pipeline': [
                                        {
                                            '$project': {
                                                '_id': 0,
                                                'price': 1,
                                                'name': 1,
                                                'description' : 1
                                            }
                                        }
                                    ],
                                    'as': 'c_obj'
                                }
                            }, {
                                '$project': {
                                    'c_obj': 1,
                                    'full_name': 1,
                                    'courses': 1,
                                    'status': 1
                                }
                            }
                        ],
                        'm_obj': [
                            {
                                '$match': {
                                    'username': username
                                }
                            }, {
                                '$lookup': {
                                    'from': 'mark',
                                    'localField': '_id',
                                    'foreignField': 'student.id',
                                    'pipeline': [
                                        {
                                            '$match': {
                                                'course.id': course_id
                                            }
                                        }, {
                                            '$project': {
                                                '_id': 1,
                                                'sum': 1
                                            }
                                        }
                                    ],
                                    'as': 'm_obj'
                                }
                            }, {
                                '$project': {
                                    'sum': {
                                        '$first': '$m_obj.sum'
                                    },
                                    '_id': 0
                                }
                            }
                        ]
                    }
                }
            ])
            )
            if len(res[0]['m_obj']) == 0:
                return 404, 'no_mark', 'mark has not found', res
            else:
                sum = res[0]['m_obj'][0]['sum']
                if sum < st.info['PassMarkLimit']:
                    return 403, 'failed', 'student has failed and cant register', res

            if len(res[0]['s_obj'][0]['c_obj']) == 0:
                return 404, 'no_course', 'course has not found', []
            return 200, 'ok', 'ok', res
        elif state == 'attended':
            pass
        else:
            return 422, 'invalid_state', "state only accept cuurent or upcoming", []
    def course_registration_success(self , st , username,course_id):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.user_collection]
        col2: Collection = db[self.registration_collection]
        col3: Collection = db[self.course_collection]
        cc = JalaliDate.today()

        itm_ready = {
            'date' : f"{cc.year}/{cc.month}/{cc.day}",
            'g_date' : datetime.today(),
            'username' : username,
            'course_id' : course_id
 
        }
        col2.insert_one(itm_ready)
        
        course = list(col3.find({"_id" : course_id}))
        if len(course) != 1:
            return 404 , "not_found" , 'no course or more than one found' , None
        
        col.update_one({'username' : username} , {"$set" : {"courses" : [{
            'id' : course[0]['_id'],
            'name' : course[0]['name']
        }]}})
        
        
