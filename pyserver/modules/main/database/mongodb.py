'''
File: mongodb.py
Project: database
File Created: Thursday, 24th December 2020 12:51:28 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:30:08 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

from .adatabase import ADatabase
from .adatabase_base import AMongodbBase
from pymongo import MongoClient
from pymongo.database import Database
import sys


import datetime


# class AVersion(Document):
#     meta = {
#         'db_alias': 'barteh3'
#     }
#     version = StringField(primary_key=True)


class AMongodb(AMongodbBase, ADatabase):
    def __init__(self):
        pass

    client: MongoClient = None
    pymngo: Database
    isAAA: bool = False
    db: Database

    def init(self):

        try:
            client = MongoClient(host=self.host,
                                 port=self.port,
                                 username=self.username,
                                 password=self.password,
                                 authSource='the_database',

                                 )

            client.server_info()

            # if self.database not in client.list_database_names():
            info_in_db = {"_id": 0, **self.settings.info, "database_name": self.database, "isAAA": self.isAAA}
            db = client[self.database]
            self.db = client[self.database]
            info = db["app_info"]
            inf = info.find({})

            if len(list(inf)) == 0:
                info.insert_one(info_in_db)
            else:
                del info_in_db["_id"]
                info.update_many({}, {"$set": info_in_db})

            self.mongo_db = client[self.database]

            # client[self.database].system_js.insert_one({'_id': 'doo', 'value': 'function(a){return 2*a;}'})
            # info.insert_one(self.settings.info.__dict__)
            self.client = client
            # client.close()
            con_attr = {
                "db": self.database,
                "host": self.host,
                "port": self.port,
                # "alias": self.database

            }
            # connect(**con_attr, alias=self.database)

            # connect(db=self.database, host=self.host, port=self.port, alias=self.name)
            
            
            
            ######################################################
            # if self.isAAA:
            #     connect(**con_attr, alias="aaa")

            # connect(**con_attr, alias=self.database)

                # connect(db=self.database, host=self.host, port=self.port, alias='aaa')
                
            ######################################################

            return True
        except:
            err = sys.exc_info()
            print(err[1])
            return False
