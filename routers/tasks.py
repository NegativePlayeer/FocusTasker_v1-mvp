from fastapi import APIRouter, status, Depends
from database import DB_DEPENDENCY
from models.task import  Task, Subtask
from schemas.task import TaskCreate
from typing import Annotated
from auth import get_current_user

router = APIRouter()

@router.post('/tasks/create', status_code=status.HTTP_201_CREATED)
async def create_task(
        db: DB_DEPENDENCY,
        task_request: TaskCreate,
        current_user: Annotated[dict, Depends(get_current_user)]
):
    task_model = Task(**task_request.model_dump(exclude={'subtasks'}), owner_id=current_user.get('id'))
    db.add(task_model)
    db.flush() # Grant ID for a new task

    for subtask in task_request.subtasks:
        subtask_model = Subtask(task_id=task_model.id, **subtask.model_dump())
        db.add(subtask_model)
    db.commit()
    db.refresh(task_model)

    return task_model