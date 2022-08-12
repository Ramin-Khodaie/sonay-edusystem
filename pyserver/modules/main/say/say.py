import email
from importlib.metadata import requires
import os
import sys
from typing import Collection, List
from bson import ObjectId
import jwt
import time
from modules.main.s_settings import SSettings
from modules.main.database.adatabase import ADatabase
import copy
from .session import ASession
from .say_model import *
import datetime
import hashlib
import base64
import re


__all__ = ['SAY']


class SAY():

    db: ADatabase
    settings: SSettings = None
    _secret: str = "MySecretCode"
    _user_cache = {}
    # _session_manager: ASessionManager
    __session_token_name: str = "sid"
    _roles: list = []
    _all_inherited_roles: dict = {}

    def get_roles(self):
        return self._roles

    _admin_role: dict

    def finalize_roles(self):
        self._all_inherited_roles = dict()
        for r in self._roles:

            if "inherits" not in r:
                r["inherits"] = []
            else:
                inherits: list = r["inherits"]
                children = self.get_all_child_roles(r)
                self._all_inherited_roles[r["name"]] = children
                r["all_inherits"] = children

        for r in self._roles:
            parents = self.get_all_parent_roles(r)
            r["all_parents"] = parents

    _local_admin_role = None

    def add_roles(self, namespace: str, roles: list) -> None:
        new_roles = [{**r, "namespace": namespace} for r in roles]
        self._roles = self._roles + new_roles

        for r in new_roles:
            if r["name"] == "admin":
                if "inherits" not in r:
                    r["inherits"] = []
                self._admin_role = r
            if r["name"] == "local.admin":
                self._local_admin_role = r

            if '.' in r["name"] and r["name"].split(".")[1] == "local":
                self._local_admin_role["inherits"].append(r["name"])
            if "top" in r:
                self._admin_role["inherits"].append(r["name"])
        self.finalize_roles()

    def get_all_parent_roles(self, role: dict) -> set:
        ret = set()
        for parent_role in self._roles:
            if role["name"] in parent_role["all_inherits"]:
                ret.add(parent_role["name"])
        return list(ret)

    def get_all_child_roles(self, role: dict) -> set:
        if "inherits" in role and isinstance(role["inherits"], list):
            ret = set()
            inherits: list = role["inherits"]
            for r in self._roles:
                if r["name"] in inherits:
                    ret = ret | set([r["name"]])
                    ret = ret | set(self.get_all_child_roles(r))
            return list(ret)
        else:
            return list()

    def get_all_roles_of_roles(self, roles: list):
        ret: set = set()
        for r in roles:
            if r in self._all_inherited_roles:
                ret = ret | set(self._all_inherited_roles[r])
        return ret | set(roles)

    def get_all_full_roles(self, roles):
        all_roles = list(self.get_all_roles_of_roles(roles))
        return [r for r in self._roles if r["name"] in all_roles]

    def get_session_token_name(self):
        return self.__session_token_name

    def get_session_manager(self):
        return self._session_manager

    def __init__(self, aaa, settings: SSettings):

        super(SAY, self).__init__()
        self.collect_roles()
        self.settings = settings
        self.database = aaa["database"]
        self.prefix = aaa["prefix"]
        self.access_expire = aaa["access_expire"]
        self.refresh_expire = aaa["refresh_expire"]
        self.domains = copy.deepcopy(aaa["domains"])
        self._secret = self.encode_pass(self._secret)
        self.anonymous_user = {"userid": "anonymous", "geo": {
            "geoid": "", "name": "", "level": -1}, "roles": []}

        # self._session_manager = ASessionManager()

        pass

    def encode_pass(self, passwd):
        m = hashlib.sha256()
        ps = passwd.encode(encoding="UTF-8", errors='strict')
        m.update(ps)
        eps = m.digest()
        return base64.b64encode(eps).decode()

    def init_users(self):
        col: Collection = self.db.mongo_db['s_user']

        count = col.find({})
        if len(list(count)) == 0:
            ps = self.encode_pass("admin")

            x = {
                "_id" : str(ObjectId()),
                "username": "admin",
                "enable": True,
                "password": ps,
                "full_name": "admin",
                "course" : {"id" : "0",
                "name" : "آموزشگاه"},
                "phone" : "123456",
                "email" : "admin@gmail.com",
                "image" : "",
                "creator": "admin",
                "created": datetime.datetime.now(),
                "roles": [{"id":"admin",
                "name":"ادمین"}],
            }
            col.insert_one(x)

    def init(self):
        if self.db.type == 'mongodb':
            ASession.set_collection(self.db.mongo_db["a_session"])
            ASession.collect_garbage()
            self.init_users()

    def activate_user(self, userid: str, editor: dict, state: bool):

        pass

    def authenticate(self, user, password):
        res = {}
        passwd = self.encode_pass(password)
        usr: SUser = None
        try:
            usr = self.get_user_by_query({"userid": user, "password": passwd}, {
                                         "image": 0, "password": 0, "refreshToken": 0})
        except:
            return 500, "databaseError", 'cant connect to database', {"at": "", "rf": "", "usr": None}
        if usr is None:
            return 403, "incorrectUserPassword", 'incorrect user name or password', {"at": "", "rf": "", "usr": None}
        # elif not usr["enable"]:
        #     return 403 , "userInactive", 'user is not active', {"at": "","rf": "", "usr" :None}
        else:
            at = self.encode_auth_token(user, 'access_token')
            rt = self.encode_auth_token(user, 'refresh_token')
            self._user_cache[usr["userid"]] = usr

            self._user_cache[user] = usr

            return 200, "ok", "ok", {"at": at, "rt": rt, "usr": usr}

    def current_user(self, access_token: str) -> SUser:
        ret: SUser = None
        status, data = self.decode_token(access_token)
        if status == 200:
            ret = self.get_user(userid=data)
        return ret

    def authorize(self, roles: list, headers) -> int:
        # if os.environ['mode'] == 'development':
        aut = os.environ['aut'] if 'aut' in os.environ else 'yes'
        mode = os.environ['mode'] if 'mode' in os.environ else 'production'
        if len(roles) == 0 or (mode == 'development' and aut == 'no'):
            return 200

        hdrs = dict(headers)
        if 'authorization' in hdrs:
            authorization: list[str] = hdrs['authorization'].split(' ')
            if len(authorization) != 2:
                return 403
            prefix: str = ""
            token: str = ""
            [prefix, token] = authorization
            if prefix.lower() not in [self.prefix, 'bearer']:
                return 403
            data: dict = None
            decode_result: int = 0
            decode_result, data = self.decode_token(token=token)
            if decode_result == 200:
                usr = data['sub']
                user = self.get_user(userid=usr)
                if user is not None:

                    n = user["roles"]
                    user_roles = self.get_all_roles_of_roles(user["roles"])
                    # api_roles = self.get_all_roles_of_roles(roles)

                    # final_roles = user_roles & api_roles
                    final_roles = user_roles & set(roles)
                    role_permit = len(final_roles) > 0

                    if not role_permit:
                        return 403

            return decode_result
        else:
            return 403

    algorithm = 'HS256'
    jwt_options = {
        'verify_signature': False,
        'verify_exp': True,
        'verify_nbf': False,
        'verify_iat': True,
        'verify_aud': False
    }

    def encode_auth_token(self, user_id, type: str):
        """
        Generates the Auth Token
        :return: string
        """

        expire = self.access_expire if type == 'access_token' else self.refresh_expire

        now = int(time.time())

        payload = {
            'exp': now + expire,
            'iat': now,
            'sub': user_id,
            'type': type
        }

        j = jwt.encode(
            payload,
            self._secret,
            algorithm=self.algorithm,
        )
        return j.decode('utf-8')

    def decode_token(self, token: str) -> tuple:
        result = 200
        data = None
        try:
            data = jwt.decode(token, self._secret, 'utf-8',
                              algorithms=[self.algorithm], options=self.jwt_options)
            if 'sub' not in data or 'type' not in data:
                result = 401
            elif not (data['type'] == 'access_token' or data['type'] == 'refresh_token'):
                result = 400
            else:
                result = 200
        # except jwt.exceptions.ExpiredSignature:
        #     result = 401
        except Exception:
            result = 401

        return result, data

    anonymous_user = None

    def get_user_from_token(self, token):
        if token == "":
            return self.anonymous_user

        [result, data] = self.decode_token(token=token)
        if result != 200:
            return self.anonymous_user
        else:
            userid = data["sub"]
            user: SUser = self.get_user(userid=userid)
            if user is None:
                user = self.anonymous_user
            return user

    def get_access_token_from_refresh(self, refresh_token):

        print(self.settings.info)

        # here
        result, data = self.decode_token(refresh_token)

        if result == 200:
            if 'sub' in data and 'type' in data:
                tk_type = data['type']
                user = data['sub']
                usr: SUser = None
                if user in self._user_cache:
                    usr = self._user_cache[user]
                else:
                    usr = self.get_user(userid=user)
                    self._user_cache[usr.userid] = usr
                if usr is not None:
                    if usr.enable:
                        if tk_type == 'refresh_token' and refresh_token == usr.refreshToken:
                            acc_tok = self.encode_auth_token(
                                user, 'access_token')
                            self._user_cache[usr.userid] = usr
                            return result, acc_tok
        return 401, None

    def all_users(self):
        # SUser.field_names.
        # return SUser.objects.exclude('password', 'refreshToken', 'image', 'id')
        c = self.db.mongo_db["s_user"]
        q = c.find({}, {'_id': False, 'password': False,
                   'refreshToken': False, 'image': False})

        return list(q)
        # return SUser.objects.exclude('userid')



    def get_user_by_query(self, query: dict, fields: dict):
        col: Collection = self.db.mongo_db["s_user"]

        usr = list(col.find(query, fields))
        # usr = SUser.objects(userid=userid).exclude("password", "image", "refreshToken").first()
        if len(usr) != 0:

            return usr[0]
        else:
            return None

    def check_password_policy(self, password: str) -> bool:
        length_error = len(password) < 8

        # searching for digits
        digit_error = re.search(r"\d", password) is None

        # searching for uppercase
        uppercase_error = re.search(r"[A-Z]", password) is None

        # searching for lowercase
        lowercase_error = re.search(r"[a-z]", password) is None

        # searching for symbols
        symbol_error = re.search(
            r"[ !#$%&'()*+,-./[\\\]^_`{|}~" + r'"]', password) is None

        # overall result
        password_ok = not (
            length_error or digit_error or uppercase_error or lowercase_error or symbol_error)
        return password_ok
        # return [password_ok,{
        # 'password_ok' : password_ok,
        # 'length_error' : length_error,
        # 'digit_error' : digit_error,
        # 'uppercase_error' : uppercase_error,
        # 'lowercase_error' : lowercase_error,
        # 'symbol_error' : symbol_error,
        # ]

    def get_online_users(self):
        return self._session_manager.get_online_users()

    def change_password(self, userid: str, password: str) -> int:

        ret = False
        q = self.get_user(userid=userid)
        if q is None:
            ret = "userNotFound"
        else:
            if not self.check_password_policy(password):
                return "tooSimple"

            epass = self.encode_pass(password)
            try:
                # q.update(password=epass)
                self.update_user(q, {"password": epass})
                ret = "ok"
            except:
                ret = "database"

        return ret

    def validate_save_user(self, user: dict, col: Collection ):
        required = {"username","email", "full_name", "phone", "password", "course", "roles"}
        if len(required.difference(set(user.keys()))) != 0 :
            return 422, "missing_field", "some fields are missing", None
        if not (user["username"] and user["full_name"] and user["email"] and user["phone"] and user["password"] and user["course"] and user["roles"]):
            return 422, "empty_field", "can not accept empty fiels", None
        if len(list(col.find({"username": user["username"]}))) != 0:
            return 422, "not_unique", "user already exists", None

        return 200, "ok", "is valid", None

    def validate_edit_user(self, user: dict, col: Collection ):
        required = {"username","email", "full_name", "phone", "course", "roles"}
        if len(required.difference(set(user.keys()))) != 0 :
            return 422, "missing_field", "some fields are missing", None
        if not (user["username"] and user["full_name"] and user["email"] and user["phone"] and  user["course"] and user["roles"]):
            return 422, "empty_field", "can not accept empty fiels", None


        return 200, "ok", "is valid", None

    def check_register_form(self,user_name : str,email : str , phone) -> dict:
        
        col: Collection = self.db.mongo_db["s_user"]
        username = list(col.find({"username" : user_name }))
        eemail = list(col.find({"email" : email }))
        if phone:
            phone = list(col.find({"phone" : str(phone)}))
            if len(phone) > 0:
                return 422,"phone_unique", "phone must be unique",None
        if len(username) > 0:
            return 422,"user_unique", "username must be unique",None
            
            
        
        elif len(eemail) > 0:
            return 422,"email_unique", "email must be unique",None
        
            
        else:
            return 200,"ok", "ok" , None
            

    def logout(self, userid: str) -> bool:

        usr = self.get_user(userid)
        if usr is not None:
            del self._user_cache[usr["userid"]]
            usr.update(refreshToken="")
            return True
        else:
            return False

    __all_roles: dict

    def collect_roles(self):
        pass

    def update_user(self, usr: dict, values: dict):
        pass

    def insert_new_user(self, user: dict):
        col: Collection = self.db.mongo_db["s_user"]

        if user["_id"] != "":
            #edit mode
            res = self.edit_user(user,col)
            return res

        res = self.validate_save_user(user, col )
        if res[0] != 200:
            return res
        hash_pass = self.encode_pass(user["password"])
        nu = {**user, '_id': str(ObjectId()), "password": hash_pass,
              "created": datetime.datetime.now(),
              "enable": True,
              "creator": "self",
              "image" : ""}

        col.insert_one(nu)
        return 200, "ok", "user inserted", None

    def edit_user(self,user,col):
        res = self.validate_edit_user(user, col)
        if res[0] != 200:
            return res
        if "password" in user and user["password"] != "":
            hash_pass = self.encode_pass(user["password"])
            user = {**user,"password" : hash_pass}
        idd=user["_id"]
        del user["_id"]
        col.update_one({"_id" : idd}, {"$set" : user})
        return 200, "ok", "user updated", None

    def delete_user(self, userid: str):

        if self.get_user(userid=userid) is None:
            return 404, "not_found", "user not found", None
        else:
            try:
                col: Collection = self.db.mongo_db["s_user"]

                col.delete_one({"userid": userid})
                if userid in self._user_cache:
                    del self._user_cache[userid]
                return 200, "ok", "user is deleted", None
            except:
                return 500, "error", "error accrued during delete user", None

    def user_registration(self, user_info: dict) -> List:
        col: Collection = self.db.mongo_db["s_user"]
        idd = str(ObjectId())
        obj_ready = {
            "_id": idd,
            "username": user_info["username"],
            "enable": False,
            "password": self.encode_pass(user_info["password"]),
            "full_name": user_info["full_name"],
            "creator": "self",
            "created": datetime.datetime.now(),
            "email": user_info["email"],
            "image" :"",
            "roles": [
                {"id":"visitor",
                "name":"بازدید کننده"}
            ],
            "course" : {
                "id" : "-1",
                "name" : "بازدید کننده"
            }
        }
        col.insert_one(obj_ready)
        return 200, "ok", "user is registered", None
    
    
    def get_user_list(self , fullname , course , status):
        
        filters = {}
        if fullname != "" : 
            filters["fullname"] = fullname #this will be text search
        if course != "":
            filters["course"] =course
        if status != "":
            filters["status"] = status
        col : Collection = self.db.mongo_db["s_user"]
        data = list(col.find(filters,{"_id" : 1,"image" : 1,"full_name" : 1 ,"email" : 1,"course" : 1,"enable" : 1,"phone" : 1}))
        return 200, "ok", "user is registered", data
    def get_user(self,user_id):
        col: Collection = self.db.mongo_db["s_user"]
        try:

            res = list(col.find({"_id" : user_id}))
            if len(res) == 0 :
                res = None
                return 200, "ok", "", res
            return 200, "ok", "", res

        except:
            return 500, "server_error", "cant connect to database", None

