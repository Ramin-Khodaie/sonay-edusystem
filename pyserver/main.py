from fastapi.middleware.cors import CORSMiddleware
from imp import reload
import click
from fastapi import FastAPI
# from pyserver.modules.main.user_api import test
import uvicorn

from modules.main.sonay_app import SonayApp, sn


sn = SonayApp()

app = FastAPI()




if sn.state == "READY":

    for r in sn.routers:
        app.include_router(router=r, prefix='/api')

    origins = [
        "//192.168.0.1",
        "*",
        "//0.0.0.0",
        "//localhost:8080",
        "//localhost:3000",
        "//0.0.0.0:3000",
        "//127.0.0.1:8000/"
        "//0.0.0.0/",
        "//sahand-esteglal.ir"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # @app.middleware("http")
    # async def case_sens_middleware(request: Request, call_next):
    #     path = request.scope["path"].lower()
    #     request.scope["path"] = path
    #     response = await call_next(request)
    #     return response

    # barteh_app = ABartehApp()



def app_start():
    if sn.state != "READY":
        print("could not initilize sonay app")
        return
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    app_start()
