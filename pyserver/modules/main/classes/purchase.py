import json
from xmlrpc.client import Boolean
from pymongo.database import Database, Collection
from modules.main.sonay_app import sn
from bson import ObjectId
import requests






description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
email = 'Ehraghi.aysan@gmail.com'  # Optional
mobile = '09337814796'  # Optional

# client = Client('https://sandbox.zarinpal.com/pg/services/WebGate/wsdl')
ZP_API_REQUEST = "https://api.zarinpal.com/pg/v4/payment/request.json"
ZP_API_VERIFY = "https://api.zarinpal.com/pg/v4/payment/verify.json"
ZP_API_STARTPAY = "https://www.zarinpal.com/pg/StartPay/{authority}"
CallbackURL = 'http://localhost:3000/#/paymentverify'
# CallbackURL = 'http://sahand-esteglal.ir/verify'



class SPurchase:
    database: str = "database"
    purchase_collection: str = ""
    purchase_collection: str = ""

    def __init__(self, database, purchase_collection):
        self.database = database
        self.purchase_collection = purchase_collection
    def get_redirect_url(self , st ,info):
        MERCHANT = st.extra['MERCHANT']
        
        products = "0" if info['products'] == [] else '-'.join(info['products'])
        req_data = {
            "merchant_id": MERCHANT,
            "amount": info['total_sum'],
            "callback_url": f"{CallbackURL}/{info['username']}/{info['course_id']}/{products}/{info['total_sum']}",
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



    def verify_registration(self , st,  username , course_id , products ,price, authority):
        print(username , course_id , products , authority)
        MERCHANT = st.extra['MERCHANT']
        req_data = {
            "merchant_id": MERCHANT,
            "amount" : int(price),
            "authority" : authority
     
        }
        req_header = {"accept": "application/json",
                      "content-type": "application/json'"}
        req = requests.post(url=ZP_API_VERIFY, data=json.dumps(
            req_data), headers=req_header)
        x = 87
        if req.json()['data']['code'] == 100:
            ref_id = req.json()['data']['ref_id']
            fee = req.json()['data']['fee']
        