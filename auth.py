import bcrypt
from jose import jwt
from datetime import datetime, timedelta, timezone
from config import settings

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