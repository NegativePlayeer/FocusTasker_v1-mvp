from fastapi import APIRouter, status, HTTPException
from schemas.user import UserCreate,UserResponse
from database import DB_DEPENDENCY
from models.user import User
from auth import hash_password

router = APIRouter()

@router.post("/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
        user_data: UserCreate,
        db: DB_DEPENDENCY
):
    user_dict = user_data.model_dump()
    user_dict.pop("password")

    user_model = User(**user_dict, hashed_password=hash_password(user_data.password))
    db.add(user_model)
    db.commit()
    db.refresh(user_model)

    return user_model

