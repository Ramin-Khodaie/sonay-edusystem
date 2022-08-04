
from typing import Dict, Callable, Union, List
from fastapi import Request, APIRouter
import logging
from modules.main.aaa.aaa import AAA
from modules.main.asettings import ASettings, load_settings
from modules.main.database.adatabase import ADatabase
from modules.main.database.db_factory import create_db_obj

from modules.main.sonay_decorator import sn_decorator

class SonayApp:
    _mode = "development"

    _settings: ASettings = None

    _aaa: AAA = None
    _state: str = "INIT"
    _state_desc: str = "initializing"
    _databases = Dict[str, ADatabase]
    _default_db = None
    _routers: list = []
    _startups: list = []

    def add_startup(self, startup: callable):
        self._startups.append(startup)

    def run_startups(self):
        for st in self._startups:
            st()

    def add_router(self, router: APIRouter):
        self._routers.append(router)

    @property
    def routers(self):
        return self._routers

    @property
    def default(self):
        return self._default_db

    @property
    def state(self):
        return self._state

    @property
    def databases(self) -> Dict[str, ADatabase]:
        return self._databases



    @property
    def aaa(self) -> AAA:
        return self._aaa

    @property
    def Settings(self) -> ASettings:
        return self._settings

    async def middleware(self, request: Request, call_next):
        # path = request.scope["path"].lower()
        # request.scope["path"] = path
        response = await call_next(request)
        response.headers["powered-by"] = "barteh"
        response.headers["version"] = self._settings.info.version
        # response.set_cookie(key="barteh-user", value="salam")
        return response

    isStarted = False

    def start(self, mode):
        print("we started the app")
        self._mode = mode
        self._state = "INIT"
        state, settings = load_settings(mode)

        if state == "READY":
            dbs = dict()
            # dbs = {}
            first_db = None
            self._aaa = AAA(settings.AAA, settings)
            for i, dbr in enumerate(settings.databases):
                db = create_db_obj(dbr)
                if i == 0:
                    first_db = db
                db.settings = settings
                dbs[db.name] = db
                if dbr.default:
                    self._default_db = db
                if self._aaa.database == dbr.name:
                    db.isAAA = True
                    self._aaa.db = db
                
                if not db.init():
                    self._state = "FAILED"
                    self._state_desc = f"database {dbr.name} with type {dbr.type} failed to initialize."
                    logging.critical(self._state_desc)
                    break
            self._settings = settings
            if self._state == "FAILED":
                return
            if self._default_db is None:
                self._default_db = first_db

            self._databases = dbs

            self.aaa.init()

            self._state = "READY"
            self._state_desc = "app is ready."
            # for startup in self._startups:
            #     startup()
        else:
            
            print("settings.json could not be loaded")
            

    def __init__(self, mode=None):
        if not self.isStarted:
            self.start(mode)
            self.isStarted = True

    def __call__(self, *, roles: list = [], fast: bool = True):
        """
        decorator default class function that Authorize APIs
        """
        return sn_decorator(self.aaa, self._settings,  roles=roles, fast=fast)
    
    
    
    



global bt
bt = SonayApp()

aaa = bt.aaa
