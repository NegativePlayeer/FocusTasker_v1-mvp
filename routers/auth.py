from typing import Annotated
from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
import auth
from database import DB_DEPENDENCY
from models.user import User
router = APIRouter()

@router.post('/auth/login')
async def authenticate_user(
        db: DB_DEPENDENCY,
        user_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user_model = db.query(User).filter(User.username == user_data.username).first()
    if user_model is None or not auth.verify_password(user_data.password, user_model.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication failed!')

    token = auth.create_access_token({'sub': user_model.username, 'id': user_model.id})
    return {'access_token': token, 'token_type': 'bearer'}
