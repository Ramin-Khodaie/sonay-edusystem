from datetime import datetime, timedelta
from os import stat
from fastapi import Depends,  HTTPException, status , APIRouter ,  Response


from dependencies import get_token_header
from modules.main.s_settings import SSettings
from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.user import SUser
class User:
    pass



router = APIRouter(prefix='/users' ,tags=["user"])

sn.add_router(router)




@router.post("/login")
@sn(fast=True)
def login(say: SAY , info : dict):
    ret = say.authenticate(info["username"] , info['password'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.post("/register")
@sn(fast=True)
def register_user(say: SAY, user_info : dict):
    
    ret = say.user_registration(user_info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

  
 
@router.post("/createuser")
@sn()
def insert_new_user(say :SAY , user : dict  ):
    ret = say.insert_new_user(user)     
    return api_return(ret[0],ret[1],ret[2],data=ret[3])
    


@router.get("/checkregisterform")
@sn()
def check_register_form(say :SAY ,user_name:str = "" , email : str = "",phone : str = None   ):
    ret = say.check_register_form(user_name,email , phone)     
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getuserlist")
@sn()
def get_user_list(say : SAY , full_name = "" , course = "" , status = ""):
    ret = say.get_user_list(full_name , course , status)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getuser")
@sn()
def get_user(say : SAY , user_id ):
    try:
        ret = say.get_user_by_query({'_id' : user_id} , {})
        return api_return(200 , 'ok' , 'ok',data=[ret[0]])

    except:
        return 500 , "server_error" , 'cant connect to DataBAse' , []



@router.get("/getuserbycourse")
@sn()
def get_user(say : SAY , course_id , role ):
    ret = say.get_user_by_course(course_id , role)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getteacherlist")
@sn()
def get_teacher_list(say : SAY  ):
    try:
        ret = say.get_user_by_query({"roles.id" : "teacher"} , {'id' : '$_id' , 'name' : "$full_name"})
        return api_return(200 , 'ok' , 'ok',data=[ret])
    except:
        return 500 , "server_error" , 'cant connect to DataBAse' , []





@router.get("/userinfo")
@sn(roles=[], fast=True)
async def userinfo(user: SUser):
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
    u = {**user, "refreshToken": "", "password": "",
        #  "today": today
         }
    if '_id' in u:
        del u["_id"]
    ret = {**u, "info": sn.Settings.info}
    return ret
