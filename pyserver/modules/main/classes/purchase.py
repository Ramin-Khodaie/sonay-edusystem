import json
from xmlrpc.client import Boolean
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
import requests




MERCHANT = 'eef9f4c5-a94d-498c-a2d4-75e0bdadbad0'

description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
email = 'Ehraghi.aysan@gmail.com'  # Optional
mobile = '09337814796'  # Optional

# client = Client('https://sandbox.zarinpal.com/pg/services/WebGate/wsdl')
ZP_API_REQUEST = "https://api.zarinpal.com/pg/v4/payment/request.json"
ZP_API_VERIFY = "https://api.zarinpal.com/pg/v4/payment/verify.json"
ZP_API_STARTPAY = "https://www.zarinpal.com/pg/StartPay/{authority}"
# CallbackURL = 'http://127.0.0.1:8000/verify'
CallbackURL = 'http://sahand-esteglal.ir/verify'



class SPurchase:
    database: str = "database"
    purchase_collection: str = ""
    purchase_collection: str = ""

    def __init__(self, database, purchase_collection):
        self.database = database
        self.purchase_collection = purchase_collection
    def get_redirect_url(self , info):
        req_data = {
            "merchant_id": MERCHANT,
            "amount": info['total_sum'],
            "callback_url": f"/",
            "description": description,
            "metadata": {"mobile": mobile, "email": email}
        }
        req_header = {"accept": "application/json",
                      "content-type": "application/json'"}
        req = requests.post(url=ZP_API_REQUEST, data=json.dumps(
            req_data), headers=req_header)
        authority = req.json()['data']['authority']
        if len(req.json()['errors']) == 0:
            return 200 , 'ok' , 'ok' ,ZP_API_STARTPAY.format(authority=authority)
        return 403 , 'forbidden' , 'authorize failed' , ''
