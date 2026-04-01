from typing import Annotated
from fastapi import HTTPException, status, Depends
import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from config import settings
from fastapi.security import OAuth2PasswordBearer

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/login')

def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict) -> str:
    payload = data.copy()

    expires = datetime.now(timezone.utc) + timedelta(minutes=30)
    payload.update({"exp": expires})

    return jwt.encode(payload, key=settings.SECRET_API_KEY, algorithm='HS256')

def verify_token(token: str) -> dict:
    try:
        user_token = jwt.decode(token, key=settings.SECRET_API_KEY, algorithms=['HS256'])
        return {'username':user_token.get('sub'), 'id':user_token.get('id'),
                'role': user_token.get('role')}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

def get_current_user(
        token: Annotated[str, Depends(oauth2_bearer)],
):
    return verify_token(token)