from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from ..classes.course import SCourse



router = APIRouter(prefix='/courses' , tags=["course"])

sn.add_router(router)

course=SCourse('sonay' , 'course')


@router.post("/createcourse")
@sn(fast=True)
def create_course(info : dict):
    ret = course.insert_course(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

@router.get("/getcourselist")
@sn(fast=True)
def get_course_list(full_name = "" , status = ""):
    ret = course.get_course_list(full_name , status)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getcourse")
@sn()
def get_course(course_id):
    ret = course.get_course(course_id)
    return api_return(ret[0] , ret[1] , ret[2] , ret[3])