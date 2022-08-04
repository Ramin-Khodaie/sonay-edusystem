'''
File: aaa.py
Project: aaa
File Created: Sunday, 21st February 2021 2:43:04 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:28:19 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

import os
import sys
from typing import Collection, List
import jwt
import time
from modules.main.asettings import AAABase, ASettings
from modules.main.database.adatabase import ADatabase
import copy
from .session import ASession
from .aaa_model import *
import datetime
import hashlib
import base64
import re
from utils.persiandate import to_jalali
from ..geo import AGeos
from ..org import AOrgChart

__all__ = ['AAA']


class AAA(AAABase):
    
    _geos: AGeos
    _orgCharts: AOrgChart
    db: ADatabase
    settings: ASettings = None
    _secret: str = "ABartehSecret"
    _user_cache = {}
    # _session_manager: ASessionManager
    __session_token_name: str = "sid"
    _roles: list = []
    _all_inherited_roles: dict = {}

    @property
    def geos(self) -> AGeos:
        return self._geos

    @property
    def org_chart(self) -> AOrgChart:
        return self._orgChart

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

    # def add_roles(self, namespace: str, roles: list) -> None:
    #     new_roles = [{**r, "namespace": namespace + r["name"]} for r in roles]
    #     self._roles = self._roles + new_roles
    #
    #     for r in new_roles:
    #         if r["name"] == "admin":
    #             self._admin_role = r
    #         if "top" in r:
    #             self._admin_role.inhe
    #
    #         if "inherits" not in r:
    #             r["inherits"] = []
    #         else:
    #             inherits: list = r["inherits"]
    #             children = self.get_all_child_roles(r)
    #             self._all_inherited_roles[r["name"]] = children
    #             r["all_inherits"] = children
    #
    #     for r in new_roles:
    #         parents = self.get_all_parent_roles(r)
    #         r["all_parents"] = parents
    

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

    def __init__(self, aaa: AAABase, settings: ASettings):

        super(AAA, self).__init__()
        self.collect_roles()
        self.settings = settings
        self.database = aaa.database
        self.prefix = aaa.prefix
        self.access_expire = aaa.access_expire
        self.refresh_expire = aaa.refresh_expire
        self.domains = copy.deepcopy(aaa.domains)
        self._secret = self.encode_pass(self._secret)
        self.anonymous_user = {"userid":"anonymous", "geo":{"geoid": "", "name": "", "level": -1},"roles" : []}

        # self._session_manager = ASessionManager()

        pass

    def encode_pass(self, passwd):
        m = hashlib.sha256()
        ps = passwd.encode(encoding="UTF-8", errors='strict')
        m.update(ps)
        eps = m.digest()
        return base64.b64encode(eps).decode()
    def init_users(self):
        col : Collection = self.db.mongo_db['a_user']
        ab_dict = {**self._orgChart.get_admin_box()}
        count = col.find({}).count()
        if count == 0:
            ps = self.encode_pass("admin")
          
            del ab_dict["level"]
            del ab_dict["parent"]
            if "_id" in ab_dict:
                del ab_dict["_id"]

            x = {
                "userid": "admin",
                "enable": True,
                "password": ps,
                "fname": "admin",
                "lname": "admin",
                "box": ab_dict,
                "geo": {
                    "geoid": "IR",
                    "level_name": "",
                    "name": "ایران",
                    "full_name": "کشور ایران",
                    "level": 2,
                    "geo_type": {"id": "country", "name": "", "scope": ""},
                },
                "creator": "admin",
                "created": datetime.datetime.now(),
                "j_created": to_jalali(datetime.datetime.now()),
                "scope" : "HQ",
                
                "roles": ["admin"],
            }
            col.insert_one(x)
    def init(self):
        if self.db.type == 'mongodb':
            ASession.set_collection(self.db.mongo_db["a_session"])
            ASession.collect_garbage()
            # self._session = MongoSession
            self._geos = AGeos(db=self.db.mongo_db)
            self._geos.init_geos()
            self._orgChart = AOrgChart(db=self.db.mongo_db, settings=self.settings)

            self._orgChart.init()
            
            self.init_users()
    #         count = AUser.objects.count()
    #         if count == 0:
    #             ps = self.encode_pass('admin')
    #             ab_dict = {**self._orgChart.get_admin_box()}
    #             del ab_dict["level"]
    #             del ab_dict["parent"]
    #             if '_id' in ab_dict:
    #                 del ab_dict['_id']

    #             ab = ABoxField(**ab_dict)
                
                
                
    #             x = {"userid":'admin', "enable":True, "password":ps, "fname":'admin', "lname":'admin', "box":ab,
    #                   "geo":{"geoid": "world", 'level_name': "", "name": "ایران", "full_name": "کشور ایران", "level": 2,
    #                        "geo_type" : {
    #   "id": "country",
    #   "name": "",
    #   "scope": ""
    # }},
    #                   "creator":'admin', "created":datetime.datetime.now(), "roles":['admin']}

    #             AUser(userid='admin', enable=True, password=ps, fname='admin', lname='admin', box=ab,
    #                   geo={"geoid": "world", 'level_name': "", "name": "ایران", "full_name": "کشور ایران", "level": 2,
    #                        "geo_type" : {
    #   "id": "country",
    #   "name": "",
    #   "scope": ""
    # }},
    #                   creator='admin', created=datetime.datetime.now(), roles=['admin']).save()

            #

    def activate_user(self, userid: str, editor: dict, state: bool):

        try:
            eu = self.get_user(userid)
            if eu:
                if 'admin' in eu["roles"] and 'admin' not in editor['roles']:
                    return 403, "access_denied", 'you cant edit admin user'

            self.update_user(eu , {"enable" : state})
            u = self.get_user(userid, refresh=True)

            if u is None:
                return 404, "not_found", None
            else:
                u.pop("_id")
                return 200, "ok", u
            # AUser.objects(userid=userid).exclude("password", "image","refreshToken").as_pymongo()[0]

        except:
            e = sys.exc_info()[0]
            return 500, "error", None

    def authenticate(self, user, password):
        passwd = self.encode_pass(password)
        usr: AUser = None
        try:
            # usr = AUser.objects(userid=user, password=passwd).exclude("image", "password", "refreshToken").first()
            usr = self.get_user_by_query({"userid" : user , "password" : passwd},{"image":0, "password":0, "refreshToken":0})
        except:
            return "databaseError", 'cant connect to database', "", "", None
        if usr is None:
            return "incorrectUserPassword", 'incorrect user name or password', "", "", None
        elif not usr["enable"]:
            return "userInactive", 'user is not active', "", "", None
        else:
            at = self.encode_auth_token(user, 'access_token')
            rt = self.encode_auth_token(user, 'refresh_token')
            self._user_cache[usr["userid"]] = usr
            # usr.refreshToken = rt
            # usr.reload()
            # usr.update(refreshToken=rt)
            self._user_cache[user] = usr

            return "ok", "ok", at, rt, usr

    def remote_authenticate(self):
        pass

    def current_user(self, access_token: str) -> AUser:
        ret: AUser = None
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
        'verify_signature': True,
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
        try:
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
        except Exception as e:
            return e

    def decode_token(self, token: str) -> tuple:
        result = 200
        data = None
        try:
            data = jwt.decode(token, self._secret, 'utf-8', algorithms=[self.algorithm], options=self.jwt_options)
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
            user: AUser = self.get_user(userid=userid)
            if user is None:
                user = self.anonymous_user
            return user
        

    def get_access_token_from_refresh(self, refresh_token):
        
        
        print(self.settings.info)
        
        
        #here
        result, data = self.decode_token(refresh_token)
        
        if result == 200:
            if 'sub' in data and 'type' in data:
                tk_type = data['type']
                user = data['sub']
                usr: AUser = None
                if user in self._user_cache:
                    usr = self._user_cache[user]
                else:
                    usr = self.get_user(userid=user)
                    self._user_cache[usr.userid] = usr
                if usr is not None:
                    if usr.enable:
                        if tk_type == 'refresh_token' and refresh_token == usr.refreshToken:
                            acc_tok = self.encode_auth_token(user, 'access_token')
                            self._user_cache[usr.userid] = usr
                            return result, acc_tok
        return 401, None

    def all_users(self):
        # AUser.field_names.
        # return AUser.objects.exclude('password', 'refreshToken', 'image', 'id')
        c = self.db.mongo_db["a_user"]
        q = c.find({}, {'_id': False, 'password': False, 'refreshToken': False, 'image': False})

        return list(q)
        # return AUser.objects.exclude('userid')

    def get_user(self, userid, refresh: bool = False) -> AUser:
        col : Collection = self.db.mongo_db["a_user"]
        if userid in self._user_cache and not refresh:
            return self._user_cache[userid]
        else:
            usr = list(col.find({"userid" : userid} , {"password" : 0 , "image" : 0 , "refreshToken" : 0}))
            # usr = AUser.objects(userid=userid).exclude("password", "image", "refreshToken").first()
            if len(usr) != 0:
                self._user_cache[userid] = usr[0]
                return usr[0]
            else:
                return None
       
    def get_user_by_query(self,query:dict,fields:dict):
        col : Collection = self.db.mongo_db["a_user"]
        
        usr = list(col.find(query , fields))
        # usr = AUser.objects(userid=userid).exclude("password", "image", "refreshToken").first()
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
        symbol_error = re.search(r"[ !#$%&'()*+,-./[\\\]^_`{|}~" + r'"]', password) is None

        # overall result
        password_ok = not (length_error or digit_error or uppercase_error or lowercase_error or symbol_error)
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
                self.update_user(q,{"password" : epass})
                ret = "ok"
            except:
                ret = "database"

        return ret

    def create_new_user(self, usr: dict) -> list:
        # this function is not used anymore
        validate_result = self.validate_user(usr)
        if validate_result != "ok":
            return validate_result, None
        else:
            passwd = self.encode_pass(usr["password"])
            user = AUser(**usr, password=passwd)
            return "ok", user

    def validate_user(self, usr: dict, user: AUser, mode="save"):
        #this validation is deprecated
        if "password" not in usr:
            return "password"
        elif not self.check_password_policy(usr["password"]):
            return "password_to_easy"
        elif "roles" not in usr or not isinstance(usr["roles"], list) or len(usr["roles"]) < 1:
            return "rolesnotset"



        else:
            return "ok"
        pass

    def validate_user_2(self, usr: dict, user: AUser, mode="save"):
        if 'all_parents' in usr['geo']:
            del usr['geo']['all_parents']

        if 'parent' in usr['geo']:
            del usr['geo']['parent']

        if 'children' in usr['geo']:
            del usr['geo']['children']

        if 'all_children' in usr['geo']:
            del usr['geo']['all_children']

        elif "userid" not in usr or \
                "fname" not in usr or \
                "lname" not in usr:
            return "incomplete", None

        user_geoid = user["geo"]["geoid"]
        usr_usrerid = usr["userid"]
        user_userid = user["userid"]
        user_boxid = user['box']['boxid']
        usr_boxid = usr['box']['boxid']
        usr_geoid = usr["geo"]["geoid"]

        # edit validator
        if mode == "edit":

            # exist_user = AUser.objects(userid=usr["userid"]).first()
            exist_user = self.get_user(usr["userid"])

            # user cant edit geo and box
            if usr_boxid != exist_user['box']['boxid']:
                return "cant_edit_box", None
            if usr_geoid != exist_user['geo']['geoid']:
                if user_geoid not in ["IR", "HQ"]:
                    # return "cant_edit_geo", None
                    pass

            creator = exist_user["creator"]
            limit = 0
            li = ["admin"]
            # user access authorization
            while creator != "admin":
                li.append(creator)
                # x = AUser.objects(userid=creator).first()
                x = self.get_user(userid=creator)
                creator = x["creator"]

                limit += 1
                if limit > 7:
                    break
            if user_userid not in li and user_geoid != "IR":
                return "wrong_user", None

            # users cant edit themselves

            if user_userid == usr_usrerid:
                return "self_edit", None

        # geo authorization

        if user_geoid != "IR":  # except IR users ,they should be able edit only their descendants

            editable_geos = self.geos.get_descendants(user_geoid)
            if not (usr_geoid == user_geoid or usr_geoid in editable_geos):
                return "wrong_geo", None

        # box authorization

        if not (user_boxid == usr_boxid or user_boxid == '1' or self.org_chart.is_in_sub_chart(usr_boxid, user_boxid)):
            return "wrong_box", None

        return "ok", usr

    def validate_delete_activate_user(self, usr, user):
        exist_user = self.get_user(userid=usr)
        if exist_user is None:
            return "not_found", None
        user_geoid = user["geo"]["geoid"]
        user_userid = user["userid"]
        user_boxid = user['box']['boxid']
        usr_boxid = exist_user['box']['boxid']
        usr_geoid = exist_user["geo"]["geoid"]



        creator = exist_user["creator"]
        limit = 0
        li = ["admin"]
        # user access authorization
        while creator != "admin":
            li.append(creator)
            # x = AUser.objects(userid=creator).first()
            x = self.get_user(userid=creator)
            creator = x["creator"]

            limit += 1
            if limit > 7:
                break
        if user_userid not in li and user_geoid != "IR":
            return "wrong_user", None
            # pass
        # box authorization

        if not (user_boxid == usr_boxid or user_boxid == '1' or self.org_chart.is_in_sub_chart(usr_boxid, user_boxid)):
            return "wrong_box", None
            # pass




        # geo authorization

        if user_geoid != "IR":  # except IR users ,they should be able edit only their descendants

            editable_geos = self.geos.get_descendants(user_geoid)
            if not (usr_geoid == user_geoid or usr_geoid in editable_geos):
                return "wrong_geo", None



        return "ok", None
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
        # mdls=__import__('modules')
        # for mdl in mdls:
        #     print(mdl)
        pass

    def update_user(self, usr: dict, values: dict):
        col : Collection = self.db.mongo_db['a_user']
        if not usr["userid"] or not usr["fname"] or not usr["lname"]:
            return 422, "insufficient_input", "", None
        u: dict = {**usr}
        if "password" in usr:
            if not u["password"]:
                del u["password"]
            else:
                hash_pass = self.encode_pass(usr["password"])
                u["password"] = hash_pass
        # try:
            
            
        user = self.get_user(userid=u["userid"])
        if user is None:
            return 404, "not_found", "user is not exist", None
        if 'id' in u:
            del u['id']
        if '_id' in u:
            del u['_id']
        if "userid" not in user:
            return 422, "not_found", "userid is missing", None
            
        col.update_one({"userid" : user["userid"]} , {"$set" : u})
        # user.update(**u)
        return 200, "ok", "user is updated successfully", u
        # except:
        #     e = sys.exc_info()
        #     return 500, "error", str(e[1]), None

    def insert_new_user(self, usr: dict, creator: str):
        col : Collection = self.db.mongo_db["a_user"]
        if not usr["userid"] or not usr["password"] or not usr["fname"] or not usr["lname"] or 'geo' not in usr or not \
                usr['geo'] or not isinstance(usr['geo'], dict):
            return 422, "insufficient_input", "", None
        has_pass = self.encode_pass(usr["password"])
        nu = {**usr, "password": has_pass, "creator": creator,
              "created": datetime.datetime.now()}

        try:
            # su = AUser(**nu)
            col.insert_one(nu)
            # su.save(force_insert=True)
            return 200, "ok", "user inserted", nu
        except:
            e = sys.exc_info()
            return 500, "server_error", str(e[1]), None

        pass

    def delete_user(self, userid: str):
        

        if self.get_user(userid=userid) is None:
            return 404, "not_found", "user not found", None
        else:
            try:
                col : Collection = self.db.mongo_db["a_user"]
                
                # AUser.objects(userid=userid).delete()
                col.delete_one({"userid" : userid})
                if userid in self._user_cache:
                    del self._user_cache[userid]
                return 200, "ok", "user is deleted", None
            except:
                return 500, "error", "error accrued during delete user", None

