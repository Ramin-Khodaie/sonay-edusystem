
from fastapi import APIRouter 

from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.s_settings import SSettings
from modules.main.classes.dashboard import SDashboard
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
