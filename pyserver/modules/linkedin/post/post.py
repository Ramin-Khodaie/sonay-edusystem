
from datetime import datetime

from bson import ObjectId
from pyserver.modules.main.database import mongo_client
from pyserver.dependencies import load_settings
class Post:
    def __init__(self) -> None:
        
        data = load_settings()
        self.__SECRET_KEY =  data["API"]["SECRET_KEY"]
        self.__ALGORITHM = data["API"]["ALGORITHM"]
        self.ACCESS_TOKEN_EXPIRE_MINUTES = data["API"]["ACCESS_TOKEN_EXPIRE_MINUTES"]
    def save_post(self , item):
        db  = mongo_client["accounts"]
        col = db["users"]
        nw = datetime.now()
        item = {
            "_id" : str(ObjectId()),
            'owner' : item.owner,
            "text" : item.text,
            "hashtags" : item.hashtags,
            "post_date" : nw ,
            "edit_date" : nw,
            "media_url" : item.media_url,
            "comments" : [],
            "likes" : [],
            "p_access" : item.p_access,
            "c_access" : item.c_access,
        }

        col.insert_one(item)
        return "ok"


        

    def get_post(self):
        pass
    

    def delete_post(self):
        pass
