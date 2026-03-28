from fastapi import FastAPI
from database import engine, Base, SessionLocal
from Models import task, user
app = FastAPI()
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
