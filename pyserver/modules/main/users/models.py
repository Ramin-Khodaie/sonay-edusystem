from pydantic import BaseModel
class Token(BaseModel):
        access_token: str
        token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(UserBase):
    hashed_password: str


class UserRegistration(BaseModel):
    username: str
    email: str
    full_name: str 
    password : str 
    password_confirm : str
