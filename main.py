from fastapi import FastAPI
from schemas.user import UserCreate
from database import engine, Base, DB_DEPENDENCY
from models.user import User
app = FastAPI()
Base.metadata.create_all(bind=engine)
