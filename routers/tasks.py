from fastapi import APIRouter, status, HTTPException
from database import DB_DEPENDENCY
from models.task import  Task, Subtask
from schemas.task import TaskCreate
from auth import USER_DEPENDENCY

router = APIRouter()

@router.post('/tasks/create', status_code=status.HTTP_201_CREATED)
async def create_task(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        task_request: TaskCreate
):
    task_model = Task(**task_request.model_dump(exclude={'subtasks'}), owner_id=current_user.get('id'))
    try:
        db.add(task_model)
        db.flush()  # Grant ID for a new task

        for subtask in task_request.subtasks:
            subtask_model = Subtask(task_id=task_model.id, **subtask.model_dump())
            db.add(subtask_model)
        db.commit()
        db.refresh(task_model)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Database error')

    return task_model

@router.get('/tasks/')
async def get_all_tasks(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY
):
    tasks = db.query(Task).filter(Task.owner_id == current_user.get('id')).all()

    return tasks