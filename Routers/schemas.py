from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    username: str
    first_name: str
    surname: str
    password: str
    role: str