from datetime import datetime, timedelta
from os import stat
from fastapi import Depends,  HTTPException, status , APIRouter ,  Response
from fastapi.security import  OAuth2PasswordRequestForm
from urllib3 import Retry

from dependencies import get_token_header
from modules.main.s_settings import SSettings
from modules.main.say.say import SAY
from modules.main.api_return import api_return
from ..users.models import *

from modules.main.sonay_app import sn
class User:
    pass



router = APIRouter(prefix='/users')

sn.add_router(router)




@router.post("/login")
@sn(fast=True)
def login(say: SAY , info : dict):
    ret = say.authenticate(info["username"] , info['password'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


# @router.get("/users/me/", response_model=UserBase)
# async def read_users_me(current_user: User = Depends(usr.get_current_active_user)):
#     return current_user


# @router.get("/me/items/")
# async def read_own_items(current_user: UserBase = Depends(usr.get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]


@router.post("/register")
@sn(fast=True)
def register_user(say: SAY, user_info : dict):
    
    ret = say.user_registration(user_info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

  
   
    


# @router.get("/checkregisterform")
# def check_register_user(response : Response,user_name:str = "" , email : str = ""   ):
#     res = usr.check_register_form(user_name,email)
#     if res["status"] == 422:
#         response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        
#     return {"status" : res["status"] , "result" :res["result"], "message" : res["message"]}



# @router.get("/userinfo")
# def get_user_info(response : Response):
#     pass