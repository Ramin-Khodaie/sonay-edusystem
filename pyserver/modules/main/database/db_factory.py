
from .mongodb import *
from .adatabase_base import ADatabaseBase
import copy

db_types = {
    'mongodb': AMongodb,
}


def create_db_obj(dbset: ADatabaseBase) -> ADatabase:
    db = copy.deepcopy(dbset)
    db.__class__ = db_types[dbset.type]
    return db
