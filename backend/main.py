from fastapi import FastAPI
from database import engine, Base
from routers import users, auth, tasks
from fastapi.middleware.cors import CORSMiddleware
from models.user import User
from models.task import Task, Subtask

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(tasks.router)