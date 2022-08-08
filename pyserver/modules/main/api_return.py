

from fastapi import HTTPException


def api_return(status: int = 200, result: str = "ok", message: str = "", data=None):
    if status == 200:
        return {"result": result, "message": message, "data": data}
    else:
        raise HTTPException(status_code=status, detail={'result': result, 'message': message, "data": data})
