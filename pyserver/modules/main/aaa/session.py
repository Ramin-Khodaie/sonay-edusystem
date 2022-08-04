'''
File: session.py
Project: aaa
File Created: Sunday, 10th January 2021 12:40:00 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:29:10 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''
import datetime
import enum
import time
import uuid
import threading
import os
# from .aaa_model import AUser
from typing import Dict
from pymongo.database import Database, Collection


class ASession:
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
            res = ASession._collection.find_one({"_id": self._session_id}, {key: 1})
            if res and key in res:
                return res[key]
            else:
                return None

        except:
            return None

    def set(self, key: str, new_value: object) -> bool:
        if key in ["_id", "_start", "_last_update"]:
            return False
        try:
            if ASession._collection.find({"_id": self._session_id}).count() > 0:
                ASession._collection.update_one({"_id": self._session_id},
                                                {"$set": {key: new_value,
                                                          "_last_update": datetime.datetime.utcnow().timestamp()}})
            else:
                ASession._collection.insert_one(
                    {"_id": self.session_id, key: new_value,
                     "_start": datetime.datetime.utcnow().timestamp(),
                     "_last_update": datetime.datetime.utcnow().timestamp()})

            return True
        except:
            return False

    def end(self) -> bool:
        try:
            ASession._collection.delete_one({"_id": self._session_id})
            return True
        except:
            return False

    @staticmethod
    def set_collection(collection: Collection):

        ASession._collection = collection

    @staticmethod
    def collect_garbage():
        try:
            dt = datetime.datetime.now() - datetime.timedelta(minutes=120)
            q = {"_last_update": {"$lt": dt.timestamp()}}
            ASession._collection.delete_many(q)
        except:
            pass

#
# class ASessionManager:
#     pass
#
#
# class ASession:
#     _user: dict
#     _mem = {}
#     _session_id: str
#     _last_use: int
#     _timeout: int
#     _expire_at: int
#     _is_expired: bool = False
#     _session_manager = None
#
#     def suicide(self):
#         self._session_manager.kill_by_id(self._session_id)
#
#     def get_id(self):
#         return self._session_id
#
#     def is_expired(self) -> bool:
#         ret = self._is_expired or self._last_use + self._timeout < time.time()
#         if ret:
#             self.end()
#             return True
#         else:
#             return False
#
#     def end(self):
#         self.clear()
#         self._is_expired = True
#         self.suicide()
#
#     def use(self) -> bool:
#         if self.is_expired():
#             self.clear()
#             return False
#
#         else:
#             self._last_use = time.time()
#             self._expire_at = self._last_use + self._timeout
#             return True
#
#     def __init__(self, session_id: str, user: dict, session_manager: ASessionManager, timeout=3600):
#         self._session_manager = session_manager
#         self._user = user
#         self._session_id = session_id
#         self._last_use = time.time()
#         self._timeout = timeout
#         self._expire_at = self._last_use + self._timeout
#
#     def clear(self) -> type(None):
#         pass
#
#     def set(self, key: str, value: object) -> bool:
#         pass
#
#     def get(self, key: str) -> object:
#         pass
#
#     def get_userid(self):
#         return self._user["userid"]
#
#     def get_user(self):
#         return self._user
#
#     def set_user(self, user: dict):
#         self._user = user
#         pass
#
#     def __call__(self, key: str):
#         return self.get(key)
#
#
# class AMemSession(ASession):
#     def clear(self) -> type(None):
#         self._mem.clear()
#
#     def set(self, key: str, value: object) -> bool:
#         if not self.is_expired():
#             self._mem[key] = value
#             return True
#         else:
#             return False
#
#     def get(self, key: str) -> object:
#
#         if not self.is_expired() and key in self._mem:
#             return self._mem[key]
#
#
# class ASessionType(enum.Enum):
#     memory = 1
#     db = 2
#
#
# class ASessionManager:
#     _stopped: bool = False
#     _garbage_collection_interval: int = 5
#     _session_type: ASessionType = ASessionType.memory
#     _sessions: Dict[str, ASession] = {}
#     _timeout: int = 200000
#
#     def stop(self):
#         self._stopped = True
#
#     def __init__(self, session_type=ASessionType.memory):
#         self._session_type = session_type
#         self.remove_expired_sessions()
#
#     def kill_by_id(self, session_id: str):
#         if session_id in self._sessions:
#             del self._sessions[session_id];
#
#     def remove_expired_sessions(self):
#         # if not self._stopped and os.environ.get('mode') != 'development' or True:
#         #     threading.Timer(10, self.remove_expired_sessions).start()
#
#         for ses in self._sessions:
#
#             if self._sessions[ses].is_expired():
#                 del self._sessions[ses]
#
#     def get_new_session(self, user: dict) -> ASession:
#
#         # uid = uuid.uuid4().hex[:24].upper()
#         uid = uuid.uuid4().hex.upper()
#         session: ASession = None
#         if self._session_type == ASessionType.memory:
#             session = AMemSession(session_id=uid, session_manager=self, user=user, timeout=self._timeout)
#
#         self._sessions[uid] = session
#         return session
#
#     def get_online_users(self):
#         g = [u.get_user() for k, u in self._sessions.items()]
#         return g
#
#     def get_session(self, session_id: str) -> ASession:
#         print(77, session_id, self._sessions.keys())
#         if session_id in self._sessions:
#             return self._sessions[session_id]
#
#     def __call__(self, session_id: str) -> ASession:
#         return self.get_session(session_id)
