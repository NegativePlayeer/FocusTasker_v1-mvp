from typing import Optional

from pydantic import BaseModel, ConfigDict
class UserCreate(BaseModel):
    email: str
    username: str
    first_name: str
    surname: str
    password: str
    role: str
    preferences: Optional[str] = None
    struggles: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    surname: str
    role: str
    is_active: bool
    preferences: Optional[str] = None
    struggles: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class UserProfileUpdate(BaseModel):
    preferences: Optional[str] = None
    struggles: Optional[str] = None