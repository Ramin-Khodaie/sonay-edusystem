
from inspect import iscoroutinefunction, signature
from starlette.responses import JSONResponse

from fastapi import Request, Response, HTTPException

from modules.main.say.say import SAY
from modules.main.say.session import ASession
from modules.main.say.say_model import SUser
from .s_settings import SSettings

# from mongoengine.fields import BaseQuerySet
# from mongoengine.base import BaseDocument

import orjson
from typing import Any,List ,Union

# from .docs import get_doc_saver,TUploadSaver
__all__ = ['bt_decorator']


class CustomResponse(JSONResponse):
    media_type = "application/json"

    def render(self, content: Any) -> bytes:
        return orjson.dumps(content, default=prepare)


def sn_decorator(say: SAY, settings: SSettings, *, roles : List[str] = [], fast: bool = True,
                 files: Union[None, List[str]] = None):
    session_token_name = say.get_session_token_name()

    def api_wrapper(api: callable):

        sig1 = signature(api)

        params = sig1.parameters
        extras = dict()
        context = {}
        normals = {}
        main_params = []
        request_param_name: str = ""
        response_param_name: str = ""
        user_parameter_name: str = ""
        session_param_name: str = ""
        for param, v in params.items():
            main_params.append(param)
            full_name = v.__str__()
            if v.__str__().find('.SAY') != -1:
                extras[param] = say

            elif v.__str__().find('.ASettings') != -1:
                extras[param] = settings
            elif v.__str__().find('.ASession') != -1:
                session_param_name = param
                extras[param] = None
            
            elif v.__str__().find('.Request') != -1:
                request_param_name = param
                context[param] = Request

            elif v.__str__().find('.Response') != -1:
                response_param_name = param
                context[param] = Response
            elif full_name.find('.SUser') != -1:
                user_parameter_name = param
                extras[param] = None
            else:
                normals[param] = v

        async def _async_wrapper(*args, **kwargs):

            response: Response = kwargs[response_param_name]
            request: Request = kwargs[request_param_name]
            req_headers = request.headers.items()

            result: int = say.authorize(roles=roles, headers=req_headers)
            if result != 200:
                raise HTTPException(status_code=result)

            user: SUser = None
            hdrs = dict(req_headers)
            token = ''
            if 'authorization' in hdrs:
                authorization: List[str] = hdrs['authorization'].split(' ')
                if len(authorization) == 2:
                    [prefix, token] = authorization
            usr = say.get_user_from_token(token)
            user = usr

            if user_parameter_name in extras:
                um = usr
                usr_dict = um
                rls = say.get_all_full_roles(usr["roles"])
                final_user_object = {**usr_dict, "full_roles": rls, "all_roles": [r["name"] for r in rls]}
                extras[user_parameter_name] = final_user_object

            session_id: str = request.cookies.get(session_token_name)

            session = ASession(session_id)



            if session_param_name in extras:
                extras[session_param_name] = session
            response.set_cookie(session_token_name, session.get_id(), samesite="Lax")

            modified_kwargs = {k: v for (k, v) in kwargs.items() if k in main_params}

            ret = None

            if iscoroutinefunction(api):
                ret = await api(*args, **modified_kwargs, **extras)
            else:
                ret = api(*args, **modified_kwargs, **extras)

            if fast and not isinstance(ret, Response):
                return CustomResponse(ret, headers=response.headers)
            else:
                if isinstance(ret, Response):
                    ret.set_cookie(session_token_name, session.get_id(), samesite="Lax")

                return ret

        _async_wrapper.__signature__ = None

        api_params = tuple(sig1.parameters.values())
        api_params = [x for x in api_params if x.name not in extras]

        def dummy(response: Response, request: Request):
            pass

        filtered_params = tuple(signature(dummy).parameters.values())
        filtered_params = [x for x in filtered_params if x.name not in context]
        all_params = filtered_params + api_params
        # if files is not None:
        #     all_params=all_params+[{"saver":get_doc_saver()}]
        if request_param_name == "":
            request_param_name = 'request'
        if response_param_name == "":
            response_param_name = 'response'
        _async_wrapper.__signature__ = sig1.replace(parameters=all_params)

        return _async_wrapper

    return api_wrapper


def prepare(obj):
    ret = obj
    return

    # if isinstance(obj, BaseQuerySet):
    #     # ret = [{k: v if k != 'id' else str(v) for k, v in r._data.items()} for r in obj]
    #     ret = [mongo_to_dict(r) for r in obj]

    # elif isinstance(obj, BaseDocument):
    #     ret = mongo_to_dict(obj)
    # elif isinstance(obj, ObjectId):
    #     ret = str(obj)
    # elif isinstance(obj, Cursor):
    #     ret = list(obj)
    #     # ret = [o for o in obj]

    # return ret


# def mongo_to_dict(o: BaseDocument) -> dict:
#     if "_data" in o:
#         return {k: v if k != 'id' else str(v) for k, v in o._data.items()}
#     else:
#         return {k: v if k != '_id' else str(v) for k, v in o.items()}
