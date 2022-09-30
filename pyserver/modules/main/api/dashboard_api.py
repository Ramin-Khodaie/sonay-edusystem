
from fastapi import APIRouter 

from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.s_settings import SSettings
from modules.main.classes.dashboard import SDashboard
from modules.main.classes.user import SUser
from ..classes.course import SCourse



router = APIRouter(prefix='/dashboard' , tags=["dashboard"])

sn.add_router(router)

dashboard=SDashboard('sonay' , 'course' , 's_user' , 'mark' , 'purchase')


@router.get("/getcounts")
@sn(fast=True)
def get_counts():
    ret = dashboard.get_counts()
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getyearcomparedata")
@sn(fast=True)
def get_year_compare_data():
    ret = dashboard.get_year_compare_data()
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getteacheravg")
@sn(fast=True)
def get_teacher_avg():
    ret = dashboard.get_teacher_avg()
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getrecentregistration")
@sn(fast=True)
def get_recent_registration(num = 5):
    ret = dashboard.get_recent_registration(num)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getrecentmark")
@sn(fast=True)
def get_recent_mark(num = 5):
    ret = dashboard.get_recent_mark(num)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])






@router.get("/gettopstudent")
@sn(fast=True)
def get_top_student(num = 5):
    ret = dashboard.get_top_student(num)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

##############################################################


@router.get("/getcomparestudentmark")
@sn(fast=True)
def get_compare_student_mark( user : SUser ):
    ret = dashboard.get_compare_student_mark( user )
    return api_return(ret[0],ret[1],ret[2],data=ret[3])
