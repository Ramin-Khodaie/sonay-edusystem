from xmlrpc.client import Boolean
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId


class SPurchase:
    database: str = "database"
    purchase_collection: str = ""
    purchase_collection: str = ""

    def __init__(self, database, purchase_collection):
        self.database = database
        self.purchase_collection = purchase_collection
    def register_for_new_course(self , info):
        pass
