from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.product import SProduct
from modules.main.classes.purchase import SPurchase
from modules.main.s_settings import SSettings




router = APIRouter(prefix='/purchase' , tags=["purchase"])

sn.add_router(router)

purchase=SPurchase('sonay' , 'purchase')


@router.post("/getredirecturl")
@sn(fast=True)
def get_redirect_url(st : SSettings,info : dict):
    ret = purchase.get_redirect_url(st ,info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/verifyregistration")
@sn(fast=True)
def verify_registration(st : SSettings, username , course_id , products,price , authority):
    ret = purchase.verify_registration( st ,username , course_id , products ,price , authority)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])
