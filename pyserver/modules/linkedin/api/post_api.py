from datetime import datetime, timedelta
from fastapi import Depends,  HTTPException, status , APIRouter
from fastapi.security import  OAuth2PasswordRequestForm

from pyserver.dependencies import get_token_header
from pyserver.modules.linkedin.post.models import PostModel
from pyserver.modules.linkedin.post.post import Post
from pyserver.modules.main.users.user import User


router = APIRouter(
    prefix="/posts",
    tags=["posts"],
  
    responses={404: {"description": "Not found"}},
)

post = Post()

router.get("/posts/savepost")
def save_post(item=PostModel):
    post.save_post(item)