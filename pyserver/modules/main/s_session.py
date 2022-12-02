import datetime
import enum
import time
import uuid
import threading
import os
# from .aaa_model import AUser
from typing import Dict
from pymongo.database import Database, Collection


class SSession:
    _collection: Collection
    _session_id: str

    @property
    def session_id(self):
        return self._session_id

    def get_id(self):
        return self._session_id

    def __init__(self, session_id: str):
        sid = session_id
        if not session_id:
            sid = uuid.uuid4().hex.upper()
        self._session_id = sid

    def __call__(self, key: str) -> object:
        return self.get(key)

    def get(self, key: str) -> object:

        try:
            res = SSession._collection.find_one({"_id": self._session_id}, {key: 1})
            if res and key in res:
                return res[key]
            else:
                return None

        except:
            return None

    def set(self, key: str, new_value: object) -> bool:
        if key in ["_id", "_start", "_last_update"]:
            return False
       
        if len(list(SSession._collection.find({"_id": self._session_id}))) > 0:
            SSession._collection.update_one({"_id": self._session_id},
                                            {"$set": {key: new_value,
                                                        "_last_update": datetime.datetime.utcnow().timestamp()}})
        else:
            SSession._collection.insert_one(
                {"_id": self.session_id, key: new_value,
                    "_start": datetime.datetime.utcnow().timestamp(),
                    "_last_update": datetime.datetime.utcnow().timestamp()})

        return True
        

    def end(self) -> bool:
        try:
            SSession._collection.delete_one({"_id": self._session_id})
            return True
        except:
            return False

    @staticmethod
    def set_collection(collection: Collection):

        SSession._collection = collection

    @staticmethod
    def collect_garbage():
        try:
            dt = datetime.datetime.now() - datetime.timedelta(minutes=120)
            q = {"_last_update": {"$lt": dt.timestamp()}}
            SSession._collection.delete_many(q)
        except:
            pass








