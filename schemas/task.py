from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str
    priority: int
    is_completed: bool = False


