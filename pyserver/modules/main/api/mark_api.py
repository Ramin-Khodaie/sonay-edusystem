from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.mark import SMark
from modules.main.s_settings import SSettings




router = APIRouter(prefix='/marks' , tags=["mark"])

sn.add_router(router)

mark=SMark('sonay' , 'mark' , 's_user')


@router.post("/createmark")
@sn(fast=True)
def create_mark(st:SSettings, info : dict):
    ret = mark.insert_mark(info , st)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getmarkbyteacher")
@sn(fast=True)
def get_mark_by_teacher(teacher_id : str):
    ret = mark.get_mark_by_teacher(teacher_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getmark")
@sn(fast=True)
def get_mark(mark_id : str):
    ret = mark.get_mark(mark_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.put("/getmarkbysearch")
@sn(fast=True)
def get_mark_by_search(filter : dict):
    ret = mark.get_mark_by_search(filter['filter'])
    return api_return(ret[0],ret[1],ret[2],data=ret[3])




@router.get("/getselectedmark")
@sn(fast=True)
def get_selected_mark(username : str , course_id : str):
    ret = mark.get_selected_mark(username=username , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])







@router.get("/getfinalstatus")
@sn(fast=True)
def get_final_status(student_id : str , course_id : str):
    ret = mark.get_final_status(student_id=student_id , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



@router.get("/getcomparechartdata")
@sn(fast=True)
def get_compare_chart_data(username : str , course_id : str):
    ret = mark.get_compare_chart_data(username=username , course_id=course_id)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])



