from typing import Optional
from pydantic import BaseModel, ConfigDict


class SubtaskCreate(BaseModel):
    title: str
    is_completed: bool = False

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: int
    is_completed: bool = False
    subtasks: list[SubtaskCreate] = []

class SubtaskResponse(BaseModel):
    id: int
    title: str
    is_completed: bool = False
    model_config = ConfigDict(from_attributes=True)

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    is_completed: bool = False
    subtasks: list[SubtaskResponse]

    model_config = ConfigDict(from_attributes=True)

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = None
    is_completed: Optional[bool] = None

class SubtaskUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None

class DecomposeStep(BaseModel):
    title: str
    duration_minutes: int

class DecomposeAccept(BaseModel):
    steps: list[DecomposeStep]