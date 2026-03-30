from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: str
    is_completed: str
    subtasks: str | []


