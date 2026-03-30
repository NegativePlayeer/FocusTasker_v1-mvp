from fastapi import APIRouter
from schemas.user import UserCreate
from main import DB_DEPENDENCY
from models.user import User

router = APIRouter()

@router.post("/users/")
async def create_user(
        user_data: UserCreate,
        db: DB_DEPENDENCY
):
    user_dict = user_data.model_dump()
    password = user_dict.pop("password")

    user_model = User(**user_dict, hashed_password=password)
    db.add(user_model)
    db.commit()
    db.refresh(user_model)

    return user_model