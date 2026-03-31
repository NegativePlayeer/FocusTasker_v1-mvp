import bcrypt
from fastapi import APIRouter, status, HTTPException


def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    return hashed.decode('utf-8')

router = APIRouter()

router.post('/auth/login', status_code=status.HTTP_204_NO_CONTENT)
async def authenticate_user()