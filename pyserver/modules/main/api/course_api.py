
from fastapi import APIRouter 

from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.s_settings import SSettings
from modules.main.classes.user import SUser
from modules.main.say.say import SAY
from ..classes.course import SCourse



router = APIRouter(prefix='/courses' , tags=["course"])

sn.add_router(router)

course=SCourse('sonay' , 'course' , 's_user' , 'mark' , 'registration')


@router.post("/createcourse")
@sn(fast=True,roles=['admin'])
def create_course(info : dict):
    ret = course.insert_course(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getcourse")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_course(_id : str):
    ret = course.get_course(_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getcourselist")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_course_list(full_name = "" , status = ""):
    ret = course.get_course_list(full_name , status)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.put("/getcoursebysearch")
@sn(fast=True,roles=['admin' ])
def get_mark_by_search(filter : dict):
    ret = course.get_course_by_search(filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

# @router.get("/getcourse")
# @sn()
# def get_course(course_id):
#     ret = course.get_course(course_id)
#     return api_return(ret[0] , ret[1] , ret[2] , ret[3])


    

@router.get("/getcoursebyteacher")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_course_by_teacher(teacher_id : str):
    ret = course.get_course_by_teacher(teacher_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getcoursebystudent")
@sn(fast=True,roles=['admin','teacher' , 'student'])
def get_course_by_student(student_id : str):
    ret = course.get_course_by_student(student_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getcoursehistory")
@sn(fast=True,roles=['student'])
def get_course_history(course_id : str):
    ret = course.get_course_history(course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



        
@router.get("/courseregistration")
@sn(fast=True,roles=['student'])
def course_registration(student_id : str,course_id : str):
    ret = course.course_registration(student_id,course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


                
@router.get("/getcoursedetail")
@sn(fast=True,roles=['student'])
def get_course_registration_detail( st:SSettings,username : str,course_id : str , state : str):
    ret = course.get_course_registration_detail(st , username,course_id,state)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


        
@router.get("/registrationsuccess")
@sn(fast=True,roles=['student'])
def course_registration_success( st:SSettings,username : str,course_id : str ):
    ret = course.course_registration_success(st , username,course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


        
