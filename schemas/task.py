from pydantic import BaseModel

class SubtaskCreate(BaseModel):
    title: str
    is_completed: bool = False

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: int
    is_completed: bool = False
    subtasks: list[SubtaskCreate] = []


