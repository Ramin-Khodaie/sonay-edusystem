from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from ..classes.course import SCourse



router = APIRouter(prefix='/courses')

sn.add_router(router)

course=SCourse('educational_app' , 'courses')


@router.post("/createcourse")
@sn(fast=True)
def create_course(say: SAY , info : dict):
    return

