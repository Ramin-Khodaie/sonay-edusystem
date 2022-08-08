'''
File: adatabase_base.py
Project: database
File Created: Saturday, 31st October 2020 3:35:37 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:29:48 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

class ADatabaseBase:
    def __init__(self, **db):

        
        self.__dict__.update(**db)
        pass

    default: bool = False
    name = ''
    type = ''  # sqlserver | mongodb
    database = ''
    username = ''
    password = ''  # hashed need password
    appName = 'barteh'  # barteh



class AMongodbPoolOptionsBase:
    maxPoolSize = 0  # 0
    maxIdleTimeMS = 600  # 600
    waitQueueMultiple = 50  # 50
    waitQueueTimeoutMS = 20000  # 20000


class AMongodbOptionsBase:
    retryReads = ''
    retryWrites = True
    ssl = False
    tlsCertificateKeyFile = ''
    tlsCertificateKeyFilePassword = ''
    tlsCAFile = ''
    tlsAllowInvalidCertificates = True
    tlsAllowInvalidHostnames = True
    tlsInsecure = True
    connectTimeoutMS = 20000  # 20000
    socketTimeoutMS = 20000
    compressors = ''  # "zstd"
    zlibCompressionLevel = -1  # -1
    poolOptions: AMongodbPoolOptionsBase


class AMongodbBase(ADatabaseBase):
    def __init__(self, **db):
        super().__init__(**db)
        pass

    host = ''
    port = 27017
    options: AMongodbOptionsBase
    isSAY: False
    isLog: False


class APostgreSqlBase(ADatabaseBase):
    host: str = "localhost"
    port: int = 5432
    pass


dbset_types = {
    'mongodb': AMongodbBase,
}


def db_type_factory(dbtype: str):
    if dbtype in dbset_types:
        return dbset_types[dbtype]
    else:
        return None

# class ADatabase(ADatabaseBase):
#     pass
