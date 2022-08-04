from datetime import datetime, timedelta
from os import stat
from fastapi import Depends,  HTTPException, status , APIRouter ,  Response
from fastapi.security import  OAuth2PasswordRequestForm

from dependencies import get_token_header
from modules.main.asettings import ASettings
from ..users.models import *

from modules.main.sonay_app import bt
class User:
    pass



router = APIRouter()

bt.add_router(router)




fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

@router.get("/login")
@bt(fast=True)
def login(st : ASettings):
    
    return {"access_token": "fghfghfgh", "token_type": "bearer"}


# @router.get("/users/me/", response_model=UserBase)
# async def read_users_me(current_user: User = Depends(usr.get_current_active_user)):
#     return current_user


# @router.get("/me/items/")
# async def read_own_items(current_user: UserBase = Depends(usr.get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]


# @router.post("/register")
# def register_user(response : Response, user_info : UserRegistration):
#     if user_info.password != user_info.password_confirm:
#         raise HTTPException(
#             status_code=422,
#             detail="confirm password is not same as password"
#             # headers={"WWW-Authenticate": "Bearer"},
#         )
#     res = usr.register_user(user_name=user_info.username , email=user_info.email ,full_name= user_info.full_name,
#     password=usr.get_password_hash(user_info.password))
#     if res["status"] == 422:
#         response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        
#     return {"status" : res["status"] , "result" :res["result"], "message" : res["message"]}


# @router.get("/checkregisterform")
# def check_register_user(response : Response,user_name:str = "" , email : str = ""   ):
#     res = usr.check_register_form(user_name,email)
#     if res["status"] == 422:
#         response.status_code= status.HTTP_422_UNPROCESSABLE_ENTITY
        
#     return {"status" : res["status"] , "result" :res["result"], "message" : res["message"]}



# @router.get("/userinfo")
# def get_user_info(response : Response):
#     pass