'''
File: api_return.py
Project: main
File Created: Saturday, 23rd January 2021 12:45:30 pm
Author: Ahad Rafat Talebi (office) (ahadrt@gmail.com)
-----
Last Modified: Thursday, 11th March 2021 1:30:47 pm
Modified By: Ahad Rafat Talebi (office) (ahadrt@gmail.com>)
-----
Copyright 2018 - 2021 Borna Mehr Fann, Borna Mehr Fann
Trademark barteh
'''

from fastapi import HTTPException


def api_return(status: int = 200, result: str = "ok", message: str = "", data=None):
    if status == 200:
        return {"result": result, "message": message, "data": data}
    else:
        raise HTTPException(status_code=status, detail={'result': result, 'message': message, "data": data})
