from ast import Return
from fastapi import APIRouter 

from modules.main.say.say import SAY
from modules.main.api_return import api_return

from modules.main.sonay_app import sn
from modules.main.classes.product import SProduct




router = APIRouter(prefix='/products' , tags=["product"])

sn.add_router(router)

product=SProduct('sonay' , 'product')


@router.post("/createproduct")
@sn(fast=True)
def create_product(info : dict):
    ret = product.insert_product(info)
    return api_return(ret[0],ret[1],ret[2],data=ret[3])

@router.get("/getproductlist")
@sn(fast=True)
def get_product_list():
    ret = product.get_product_list()
    return api_return(ret[0],ret[1],ret[2],data=ret[3])


@router.get("/getproduct")
@sn()
def get_product(product_id):
    ret = product.get_product(product_id)
    return api_return(ret[0] , ret[1] , ret[2] , ret[3])