from datetime import datetime, timedelta
from os import stat
from fastapi import Depends,  HTTPException, status, APIRouter,  Response


from dependencies import get_token_header
from modules.main.s_settings import SSettings
from modules.main.say.say import SAY
from modules.main.api_return import api_return
from modules.main.s_session import SSession

from modules.main.sonay_app import sn
from modules.main.classes.user import SUser
from fastapi.responses import StreamingResponse

import random
from captcha.image import ImageCaptcha
class User:
    pass

captcha_image = ImageCaptcha()
router = APIRouter(prefix='/users', tags=["user"])

sn.add_router(router)


chars = 'ABCDEFGHIJKLMNOQRSTUVWXYZ0123456789'

@router.get("/captcha")
@sn(roles=[])
async def get_captcha(session: SSession):
    show_str = ""

    for i in range(0,4):
        nn=random.randint(0,25)
        show_str = show_str +chars[nn]

        pass

    captcha_str = show_str.lower()

    # while True:
    #     n = random.randint(12345, 98765)
    #     li = [char for char in str(n)]
    #     if "1" not in li and "7" not in li:
    #         break
    # captcha_str=str(n)

    session.set('captcha', captcha_str)

    # image = ImageCaptcha()
    data = captcha_image.generate(show_str, 'png')
    res = StreamingResponse(data, media_type="image/png")
    return res


@router.post("/login")
@sn(fast=True)
def login(say: SAY,session: SSession, info: dict):
    session_captcha = session('captcha')
    if info["captcha"].lower() != session_captcha:
        return api_return(422, "wrong_captcha", "captcha is incorrect", [])

    ret = say.authenticate(info["username"], info['password'])
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.post("/register")
@sn(fast=True)
def register_user(say: SAY, user_info: dict):

    ret = say.user_registration(user_info)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.post("/createuser")
@sn(roles=['admin'])
def insert_new_user(say: SAY, user: dict):
    ret = say.insert_new_user(user)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])




@router.delete("/deleteuser")
@sn(roles=['admin'])
def delete_user(say: SAY, username: str):
    ret = say.delete_user(username)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])



@router.delete("/enableuser")
@sn(roles=['admin'])
def enable_user(say: SAY, username: str , is_enable:bool):
    ret = say.enable_user(username,is_enable)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.get("/checkregisterform")
@sn()
def check_register_form(say: SAY, user_name: str = "", email: str = "", phone: str = None):
    ret = say.check_register_form(user_name, email, phone)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.put("/getuserlist")
@sn(roles=['admin'])
def get_user_list(say: SAY, filter:dict):
    ret = say.get_user_list(filter['filter'])
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.get("/getuser")
@sn(roles=['admin' , 'teacher' , 'student'])
def get_user(say: SAY, user_id):
    try:
        ret = say.get_user_by_query({'_id': user_id}, {})
        return api_return(200, 'ok', 'ok', data=[ret[0]])

    except:
        return 500, "server_error", 'cant connect to DataBAse', []


@router.get("/getuserbyrole")
@sn(roles=['admin' ])
def get_user_by_role(say: SAY, role):
    try:
        ret = say.get_user_by_query({'role.id': role}, {'name' : '$full_name' , 'id' : '$_id' , '_id' : 1})
        return api_return(200, 'ok', 'ok', data=list(ret))

    except:
        return 500, "server_error", 'cant connect to DataBAse', []


@router.get("/getuserbycourse")
@sn(roles=['admin' , 'teacher' , 'student'])
def get_user_by_course(say: SAY, course_id, role):
    ret = say.get_user_by_course(course_id, role)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])


@router.get("/getstudentmarkbycourse")
@sn(roles=[ 'teacher'])
def get_user_by_course(say: SAY, course_id):
    ret = say.get_user_by_course(course_id)
    return api_return(ret[0], ret[1], ret[2], data=ret[3])



@router.get("/getteacherlist")
@sn(roles=['admin'])
def get_teacher_list(say: SAY):
    
    ret = say.get_user_by_query({"role.id": "teacher"}, {
                                'id': '$_id', 'name': "$full_name"})
    return api_return(200, 'ok', 'ok', data=ret if ret != None else [])
    


@router.get("/getprofileinfo")
@sn(roles=['admin','teacher','student'])
def get_profile_info(user: SUser , say : SAY ,username=""):
    u = user["username"] if username=="" else username
    
    ret = say.get_profile_info(username=u)
    return api_return(200, 'ok', 'ok', data=ret[3])

@router.put("/updateprofileinfo")
@sn(roles=['admin','teacher','student'])
def update_profile_info(user: SUser , say : SAY , info:dict):
    
    ret = say.update_profile_info(username=user['username'] , info=info['info'])
    return api_return(ret[0], ret[1],ret[2], ret[3])



@router.put("/changepassword")
@sn(roles=['admin','teacher','student'])
def change_password(user: SUser , say : SAY , data:dict):
    
    ret = say.change_password(username=user['username'] , data=data)
    # return api_return(200, 'ok', 'ok', data=[])

    return api_return(ret[0], ret[1], ret[2], data=[3])
    



@router.get("/userinfo")
@sn(roles=[], fast=True)
async def userinfo(user: SUser , say:SAY):
    # UTC = datetime.datetime.now()
    # date = cal.get_date_props(UTC)
    # datestr = cal.to_jalali(UTC)
    # year = date['year']
    # month = date['month']
    # day = date['day']
    # weekday = weekdays_g[UTC.weekday()]
    # pweekday = weekdays_j[UTC.weekday()]
    # today = {'year': year, 'month': month, 'day': day, 'datastr': datestr, 'weekday': weekday, 'pweekday': pweekday,
    #          'utc': UTC}

    

    if user is None:
        return {
            "username": "anonymous",
            "role": {'id' : "" , 'name' : ""},
            "full_roles": [],
            "refreshToken": "",
            "password": "",
            "info" :  sn.Settings.info

        }
    else:
        say.log_online_state(user['username'])
        u = {**user, "refreshToken": "", "password": "",
             #  "today": today
             }

        if '_id' in u:
            del u["_id"]
        ret = {**u, 'full_roles' : [u['role']['id']],  "info": sn.Settings.info}
        return ret
