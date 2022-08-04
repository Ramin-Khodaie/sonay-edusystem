'''
File: db_factory.py
Project: database
File Created: Saturday, 31st October 2020 4:22:23 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:30:01 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

from .postgresql import *
from .mongodb import *
from .sqlserver import *
from .adatabase_base import ADatabaseBase
import copy

db_types = {
    'sqlserver': ASqlServer,
    'mongodb': AMongodb,
    'postgresql': APostgreSql
}


def create_db_obj(dbset: ADatabaseBase) -> ADatabase:
    db = copy.deepcopy(dbset)
    db.__class__ = db_types[dbset.type]
    return db
