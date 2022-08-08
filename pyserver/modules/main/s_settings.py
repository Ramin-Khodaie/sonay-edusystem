'''
File: asettings.py
Project: main
File Created: Saturday, 14th November 2020 3:43:36 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:30:54 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

import codecs
import datetime
import json
from os import path
from typing import List

from .database.adatabase_base import ADatabaseBase, db_type_factory


class SSettings:
    def __init__(self, **sd):

        if 'info' in sd:
            self.info = sd['info']
        else:
            self.info={}


        self.databases = []
        if 'databases' in sd:
            if type(sd['databases']) == list:
                dbs = sd['databases']
                for db in dbs:
                    if 'type' in db:
                        T = db_type_factory(db['type'])
                        self.databases.append(T(**db))

        
        self.SAY = sd['SAY']

        if 'extra' in sd:
            self.extra = sd["extra"]
        else:
            self.extra = {}

    databases: List[ADatabaseBase]
    extra: dict


def load_settings(mode, filename="pyserver/settings.json"):
    """
    Loads the configuration file named settings.json by default.
    Returns an array with two
        state which is limited to following values:
    
    'READY' means configuration is ready to use.

    'ISREADING' means settings.json file is being reading.

    'FAILED' means reading the settings file failed to read.

    'NOTEXIST' means settings file is not exist.

    'BADFORMAT' means settings file format is not correct.

    'INIT' means config is not yet ready.
    
    'INVALID' means data has been manipulated and information is invalid
    
    """

    _mode = mode
    _settings = None
    _state = "ISREADING"

    if path.isfile(path.abspath(filename)):
        data = json.load(codecs.open(filename, 'r', 'utf-8-sig'))
        _settings = SSettings(**data)
        _state = "READY"
    else:
        _state = "NOTEXIST"

    return _state, _settings
