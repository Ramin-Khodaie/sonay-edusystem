
from ast import Return
from fastapi import APIRouter ,File, UploadFile , Form
from typing import List
from modules.main.say.say import SAY
from modules.main.api_return import api_return
from pymongo.database import Database, Collection
import datetime
from modules.main.sonay_app import sn
from modules.main.classes.mark import SMark
from modules.main.classes.docs import Docs

from modules.main.s_settings import SSettings
from modules.main.classes.user import SUser


docs = Docs(database='sonay' , collection='docs',app='educational')


router = APIRouter(prefix='/media' , tags=["media"])

sn.add_router(router)


# api, files: List[UploadFile] = File(...)
@router.put("/uploadimage")
@sn(roles=[], fast=True)
def upload(user : SUser,file: UploadFile = File(...) ,category: str = Form(...),
           _id: str = Form(...)):
    # if not ObjectId.is_valid(sys_code):
    #     return api_return(status=422, result="invalid_plan_id", data=[])

    rets = docs.save_docs(file, category=category,
                     product_id=_id, creator=user["username"], create_datetime=datetime.datetime.now())

    
    return api_return(status=200, result="result", data="rets")








@router.delete("/catalog/systems/deletedoc")
@sn(roles=['data_catalog.system_edit'])
def delete_doc(docid: str, thumbnail: str = None):

    delete_count = 0

    db: Database = sn.databases["data_catalog"].db

    col: Collection = db["docs"]
    q1 = col.find({"_id": docid}, {"_id": 0, "sys_code": 1})
    pid = q1[0]["sys_code"]
    delete_count = col.delete_one({"_id": docid}).deleted_count
    col2: Collection = db["a_system"]

    system = list(col2.find({"code": pid}))
    count = len(system[0]['docs']) - delete_count
    done = False if count == 0 else True



    col2.update_one({"code": pid}, {"$pull": {"docs": {"_id": docid}},
                                        "$set": {"final_state.$[ii].done": done,
                                                 "final_state.$[ii].count": count

                                                 },
                             },
                   array_filters=[{'ii.label': 'docs'}])

    # except:
    #     e = sys.exc_info()
    #     api_return(status=500, result="error", message=str(e[1]))

    if delete_count > 0:
        return api_return(status=200, result="ok")
    else:
        return api_return(status=404, result="not_found")
##############################################################################################################
