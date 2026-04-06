from fastapi import APIRouter, status, HTTPException
from database import DB_DEPENDENCY
from auth import USER_DEPENDENCY
from models.task import Task, Subtask
from agents.task_decomposer import decompose_task as dt

router = APIRouter()

@router.post('/ai/decompose/{task_id}', status_code=status.HTTP_201_CREATED)
async def decompose_task(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        task_id: int
):
    task = db.query(Task).filter(Task.owner_id == current_user.get('id'), Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found!')
    title = task.title

    decomposed_task = dt(title)

    for step in decomposed_task['steps']:
        subtask_title = f"{step['title']} (about:{step['duration_minutes']} mins)"
        subtask_model = Subtask(title=subtask_title, task_id=task_id)
        db.add(subtask_model)
        db.commit()
        db.refresh(subtask_model)
