from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId

class SCourse:
    database: str = "database"
    course_collection: str = ""

    def __init__(self, database, course_collection):
        self.database = database
        self.course_collection = course_collection
    



    def insert_course(self , info):

        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        if "_id" in info and info["_id"] != "":
            res = self.edit_course(info , col)
            return res
            

        
        
        
        col.insert_one({**info , "_id" : str(ObjectId())})
        return 200, "ok", "course is inserted", None
        
    def edit_course(self , info ,col):
        pass
    def get_course_list(self,full_name , status):
        db: Database = sn.databases[self.database].db
        col: Collection = db[self.course_collection]
        filters = {}
        if full_name != "" : 
            filters["full_name"] =  {'$regex': full_name} #this will be text search
        if status != "":
            filters["status"] = status
        cl = list(col.find(filters))
        return 200, "ok", "ok", cl