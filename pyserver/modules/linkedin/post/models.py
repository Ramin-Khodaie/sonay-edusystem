from pydantic import BaseModel

class PostModel(BaseModel):
    text : str
    hashtags : list
    owner : str
    media_url : list = None
    p_access: str = "everyone"
    c_access : str = "everyone"