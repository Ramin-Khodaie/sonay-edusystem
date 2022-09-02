from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.mark import SMark




router = APIRouter(prefix='/marks' , tags=["mark"])

sn.add_router(router)

mark=SMark('sonay' , 'mark')


@router.post("/createmark")
@sn(fast=True)
def create_mark(info : dict):
    ret = mark.insert_mark(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])
