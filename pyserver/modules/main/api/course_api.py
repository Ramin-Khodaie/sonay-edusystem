from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from ..classes.course import SCourse



router = APIRouter(prefix='/courses' , tags=["course"])

sn.add_router(router)

course=SCourse('educational_app' , 'course')


@router.post("/createcourse")
@sn(fast=True)
def create_course(info : dict):
    ret = course.insert_course(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

