from fastapi import APIRouter, status, HTTPException
from schemas.user import UserCreate, UserResponse, UserProfileUpdate
from database import DB_DEPENDENCY
from models.user import User
from auth import hash_password, USER_DEPENDENCY

router = APIRouter()

@router.post("/users/", response_model=UserResponse)
async def create_user(
        user_data: UserCreate,
        db: DB_DEPENDENCY
):
    user_dict = user_data.model_dump()
    user_dict.pop("password")

    validate_user = db.query(User).filter((User.username == user_data.username) | (User.email == user_data.email)).first()
    if validate_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='User already created')

    user_model = User(**user_dict, hashed_password=hash_password(user_data.password))

    db.add(user_model)
    db.commit()
    db.refresh(user_model)

    return user_model

@router.get("/users/me", response_model=UserResponse)
async def get_me(
        current_user: USER_DEPENDENCY,
        db: DB_DEPENDENCY
):
    user_model = db.query(User).filter(User.id == current_user.get('id')).first()

    return user_model

@router.put("/users/me", response_model=UserResponse)
async def update_preferences(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        user_request:UserProfileUpdate
):
    user_model = db.query(User).filter(User.id == current_user.get('id')).first()

    if user_model is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    updated_preferences = user_request.model_dump(exclude_unset=True)
    for key, value in updated_preferences.items():
        setattr(user_model, key, value)
    db.commit()
    db.refresh(user_model)