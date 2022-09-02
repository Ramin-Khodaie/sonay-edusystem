from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId


class SCourse:
    database: str = "database"
    course_collection: str = 'course'
    user_collection: str = 's_user'

    def __init__(self, database, course_collection, user_collection):
        self.database = database
        self.course_collection = course_collection
        self.user_collection = user_collection

    def validate_course(self, course, col):
        required = {"name", "_id", "next_course", "status", "price"}
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
        col.insert_one({**info, "_id": str(ObjectId())})
        return 200, "ok", "course is inserted", None

    def edit_course(self, info, col: Collection):
        idd = info["_id"]
        del info["_id"]
        col.update_one({"_id": idd}, {"$set": info})
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
                '$group': {
                    '_id': '$course.id',
                    'name': {
                        '$first': '$course.name'
                    }
                }
            }
        ]))


        return 200, "ok", "ok", cl
