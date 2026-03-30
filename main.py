from typing import Annotated
from fastapi import FastAPI, Depends
from schemas.user import UserCreate
from database import engine, Base, SessionLocal
from models.user import User
from sqlalchemy.orm import Session
app = FastAPI()
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DB_DEPENDENCY = Annotated[Session, Depends(get_db)]

@app.post("/users/")
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