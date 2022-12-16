import email
from importlib.metadata import requires
import os
import sys
from bson import ObjectId
import pymongo
from pymongo.database import Database, Collection 
from pymongo.collection import ReturnDocument
from typing import List
import jwt
import time
from modules.main.s_settings import SSettings
from modules.main.s_session import SSession
from modules.main.classes.user import SUser
from modules.main.database.adatabase import ADatabase
import copy
import datetime
import hashlib
import base64
import re
from persiantools.jdatetime import JalaliDate


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

    

    def get_session_token_name(self):
        return self.__session_token_name

    def get_session_manager(self):
        return self._session_manager

    def __init__(self, say, settings: SSettings):

        super(SAY, self).__init__()
        self.collect_roles()
        self.settings = settings
        self.database = say["database"]
        self.prefix = say["prefix"]
        self.access_expire = say["access_expire"]
        self.refresh_expire = say["refresh_expire"]
        self.domains = copy.deepcopy(say["domains"])
        self._secret = self.encode_pass(self._secret)
       

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
                "courses" : [{"id" : "0",
                "name" : "آموزشگاه"}],
                "phone" : "123456",
                "email" : "admin@gmail.com",
                "image" : "",
                "creator": "admin",
                "created": datetime.datetime.now(),
                "role": {"id":"admin",
                "name":"ادمین"},
                "is_enable" : True ,
                          
                "status" : {"id" : "reg",
                                      "name" : "ثبت نام شده"}
            }
            col.insert_one(x)

    def init(self):
        if self.db.type == 'mongodb':
            SSession.set_collection(self.db.mongo_db["s_session"])
            SSession.collect_garbage()
            self.init_users()


    def authenticate(self, user, password):
        passwd = self.encode_pass(password)
        usr: SUser = None
        usr = self.get_user_by_query({"username": user, "password": passwd}, {
                                         "image": 0, "password": 0, "refreshToken": 0})

        if usr is None:
            return 403, "incorrectUserPassword", 'incorrect user name or password', {"at": "", "rf": "", "usr": None}
        # elif not usr["enable"]:
        #     return 403 , "userInactive", 'user is not active', {"at": "","rf": "", "usr" :None}
        else:
            if not usr[0]['is_enable']:
                return 422, "inactive_user", 'user has been deactivated by admin', {"at": "", "rf": "", "usr": None}


            at = self.encode_auth_token(user, 'access_token')
            rt = self.encode_auth_token(user, 'refresh_token')
            # self._user_cache[usr["username"]] = usr

            # self._user_cache[user] = usr

            return 200, "ok", "ok", {"at": at, "rt": rt, "usr": usr}

    def current_user(self, access_token: str) -> SUser:
        ret: SUser = None
        status, data = self.decode_token(access_token)
        if status == 200:
            ret = self.get_user(userid=data)
        return ret
    
    def get_user_by_query(self , query : dict , fields : dict):
        col : Collection = self.db.mongo_db["s_user"]
        x= list(col.find(query , fields))
        if len(x) == 0:
            return None
        else :
            return x
        
    def get_profile_info(self,username):
        col : Collection = self.db.mongo_db["s_user"]
        info = list(col.find({'username' : username},{"bio" : 1,"address" : 1,"full_name" :1,
                                                      "email":1,"image" : 1,
                                                      "last_seen" : 1,
                                                      "last_seen_h" : 1,
                                                      "last_seen_m" : 1,
                                                      "courses" : 1,
                                                      "average_mark" : 1
                                                      }))
        return 200,"ok","ok",info
    def update_profile_info(self,username,info):
        col : Collection = self.db.mongo_db["s_user"]
        col.update_one({"username" : username},{"$set":{
            "bio" : info["bio"],
            "address" : info["address"],
            "full_name" : info["full_name"],
            "email" : info["email"],
        }})
        return 200 , "ok" , 'ok' , []

    def authorize(self, roles: list, headers) -> int:
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
                user = self.get_user(user_id=usr)
                if user is not None:

                    role_id = [user[3][0]["role"]['id']]
                    # api_roles = self.get_all_roles_of_roles(roles)

                    # final_roles = user_roles & api_roles
                    final_roles = set(role_id) & set(roles)
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
        except Exception:
            result = 401

        
        return result, data

    anonymous_user = None

    def get_user_from_token(self, token):
        if token == "null" or token == '':
            return self.anonymous_user

        [result, data] = self.decode_token(token=token)
        if result != 200:
            return self.anonymous_user
        else:
            userid = data["sub"]
            user: SUser = self.get_user(user_id=userid)
            if user is None:
                user = self.anonymous_user
            return user[3][0]

    def get_access_token_from_refresh(self, refresh_token):

     
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
        
        c = self.db.mongo_db["s_user"]
        q = c.find({}, {'_id': False, 'password': False,
                   'refreshToken': False, 'image': False})

        return list(q)



    def check_password_policy(self, password: str) -> bool:
        length_error = len(password) < 8
        if length_error :
            return True , "less","length should not be less than 8 character"
        else:
            return False , "ok"

        # # searching for digits
        # digit_error = re.search(r"\d", password) is None

        # # searching for uppercase
        # uppercase_error = re.search(r"[A-Z]", password) is None

        # # searching for lowercase
        # lowercase_error = re.search(r"[a-z]", password) is None

        # # searching for symbols
        # symbol_error = re.search(
        #     r"[ !#$%&'()*+,-./[\\\]^_`{|}~" + r'"]', password) is None

        # overall result
        # password_ok = not (
        #     length_error or digit_error or uppercase_error or lowercase_error or symbol_error)
        

    def get_online_users(self):
        return self._session_manager.get_online_users()

    def change_password(self, username: str, data: str) -> int:
        passwd = self.encode_pass(data['current'])
        usr: SUser = None
        usr = self.get_user_by_query({"username": username, "password": passwd}, {
                                    "_id" : 1})

        if usr is None:
            return 422, "wrong_password", 'current password is wrong',[]
        # elif not usr["enable"]:
        #     return 403 , "userInactive", 'user is not active', {"at": "","rf": "", "usr" :None}
        else:
            pass

        password_check = self.check_password_policy(data['new'])
        if password_check[0]:
            return  422, password_check[1], password_check[2],[]
        else:

            new_pass = self.encode_pass(data['new'])
           
             
            col: Collection = self.db.mongo_db["s_user"]
            col.update_one({"username" : username},{"$set":{"password" : new_pass}})
            return 200,'ok','password has changed' , []
            
    def log_online_state(self,username):
        col: Collection = self.db.mongo_db["s_user"]
        cc = JalaliDate.today()
        uu =datetime.datetime.today()

        col.update_one({'username' : username},{"$set" : {"last_seen" : f"{cc.year}/{cc.month}/{cc.day}" ,
         "_last_seen" : uu,
         "last_seen_h" : uu.hour,
         "last_seen_m" : uu.minute,
          }})

    def validate_save_user(self, user: dict, col: Collection ):


        required = {"username", "full_name", "phone", "courses", "role" , "is_enable"}
        if user["_id"] == "":
            #save validation
            required.add('password')
            if len(list(col.find({"username": user["username"]}))) != 0:
                return 422, "not_unique", "user already exists", None
            if user['password'] != user['confirm_password'] or user['password'] == '':
                return 422, "wrong_pass", "user already exists", None
        else:
            # edit validation
            if user['password'] != '' and user['password'] != user['confirm_password'] :
                return 422, "wrong_pass", "user already exists", None



        if len(required.difference(set(user.keys()))) != 0 :
            return 422, "missing_field", "some fields are missing", None
        if user["username"] == '' and user["full_name"] == ''  and user["phone"]=='' and  user["courses"]==[] and user["role"]['id']=="":
            return 422, "empty_field", "can not accept empty fiels", None
        
        courses = [itm['id'] for itm in user['courses']]

        if user['role']['id']=='teacher' and len(courses) != 0:
            cnt = len(list(col.find({'courses.id' : {"$in" : courses} , 'username' : {"$ne" : user['username']} , 'role.id' : 'teacher'})))
            if cnt != 0:
                return 422, "wrong_course", "selected course has another teacher", None
        

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
        res = self.validate_save_user(user, col )


        # bare_users = list(col.find({'cids' : {"$exists" : 1}}))
        
        # for user in bare_users:
        #     itm_ready = []
        #     ids = user['cids']['id']
        #     for c in ids:
        #         course = list(col2.find({"_id" : c}))[0]
        #         itm_ready.append({'id' : course['_id'] , 'name' : course['name']})
        #     col.update_one({'username' : user['username']} , {"$set" : {"courses" : itm_ready}})


        if res[0] != 200:
            return res
        if user["_id"] != "":
            #edit mode
            res = self.edit_user(user,col)
            return res

        hash_pass = self.encode_pass(user["password"])
        nu = {**user, '_id': str(ObjectId()), "password": hash_pass,
              "created": datetime.datetime.now(),
              "enable": True,
              "status" : {"id" : "reg",
                          "name" : "ثبت نام شده"},
              "creator": "self",
              "image" : "" ,
              "average_mark" : 0
              }


       

        col.insert_one(nu)
        return 200, "ok", "user inserted", nu


    def delete_user(self,username):
        col: Collection = self.db.mongo_db["s_user"]
        col.delete_one({"username":username})

        return 200,"ok","ok",username


    def enable_user(self,username,is_enable):
        col: Collection = self.db.mongo_db["s_user"]
        res = col.find_one_and_update({"username":username} , {"$set" : {"is_enable" : is_enable}},
        return_document=ReturnDocument.AFTER,
        projection={'password': False, 'created': False , "creator" : False})

        return 200,"ok","ok",res
    def edit_user(self,user,col):
        
        if "password" in user and user["password"] != "":
            hash_pass = self.encode_pass(user["password"])
            user = {**user,"password" : hash_pass}
        else:
            
            del user["password"]
        idd=user["_id"]
        del user["confirm_password"]
        del user["_id"]    
        
        
        col.update_one({"_id" : idd}, {"$set" : user})
        return 200, "ok", "user updated", {**user , '_id' : idd}

    

 

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
            "role": 
                {"id":"visitor",
                "name":"بازدید کننده"}
            ,
            "course" : {
                "id" : "-1",
                "name" : "بازدید کننده"
            },
            
              "status" : {"id" : "n_reg",
                          "name" : "عدم ثبت نام"}
        }
        col.insert_one(obj_ready)
        return 200, "ok", "user is registered", None
    
    
    def get_user_list(self ,filter):
        
        and_li = [{}]
        is_filter = False
        if "full_name" in filter and filter['full_name'] != "" : 
            and_li.append({'full_name': {'$regex': filter['full_name']}}) 
            is_filter=True 
        if "course" in filter and filter['course']['id'] != "":
            and_li.append({"courses.id" : filter['course']['id']})
            is_filter=True
        if "status" in filter and filter['status']['id'] != "":
            and_li.append({"role.id" : filter["status"]['id']})
            is_filter=True
        else:
                    and_li.append({"role.id" : 'student'})

        if "is_enable" in filter and filter['is_enable']:
            and_li.append({"is_enable" : False})
            is_filter = True

        
        col : Collection = self.db.mongo_db["s_user"]
        
        #to limit output if filter is not selected , only 20 student will return
        if is_filter:
            d = col.find({"$and" : and_li}).sort([('created', pymongo.DESCENDING)])
        else:
            d = col.find({"$and" : and_li}).sort([('created', pymongo.DESCENDING)]).limit(20)

        
        return 200, "ok", "user is registered", list(d)
    def get_user(self,user_id):
        col: Collection = self.db.mongo_db["s_user"]
        try:

            res = list(col.find({"username" : user_id}))
            if len(res) == 0 :
                res = None
                return 200, "ok", "", res
            return 200, "ok", "", res

        except:
            return 500, "server_error", "cant connect to database", None
        
        
    def get_user_by_course(self,course_id , role):
        col: Collection = self.db.mongo_db["s_user"]
        res = list(col.find({"courses.id" : course_id , "role.id" : role}))
        return 200, "ok", "", res
        
    
