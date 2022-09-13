from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.product import SProduct
from modules.main.classes.purchase import SPurchase




router = APIRouter(prefix='/purchase' , tags=["purchase"])

sn.add_router(router)

purchase=SPurchase('sonay' , 'purchase')


@router.post("/registerfornewcourse")
@sn(fast=True)
def register_for_new_course(info : dict):
    ret = purchase.register_for_new_course(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])
