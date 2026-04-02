from fastapi import APIRouter, status, HTTPException
from database import DB_DEPENDENCY
from models.task import  Task, Subtask
from schemas.task import TaskCreate, TaskResponse, TaskUpdate, SubtaskResponse, SubtaskCreate
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

@router.get('/tasks/', response_model=list[TaskResponse])
async def get_all_tasks(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY
):
    tasks = db.query(Task).filter(Task.owner_id == current_user.get('id')).all()

    return tasks

@router.delete('/tasks/{task_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        task_id : int
):
    task = db.query(Task).filter(Task.owner_id == current_user.get('id'), Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found!')

    db.delete(task)
    db.commit()

@router.put('/tasks/{task_id}', response_model=TaskResponse)
async def update_task(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        task_request: TaskUpdate,
        task_id: int
):
    task = db.query(Task).filter(Task.owner_id == current_user.get('id'), Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found!')

    update_data = task_request.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

@router.post('/tasks/{task_id}/subtasks', response_model=SubtaskResponse)
async def update_subtasks(
        db: DB_DEPENDENCY,
        current_user: USER_DEPENDENCY,
        subtask_request: SubtaskCreate,
        task_id: int
):
    task = db.query(Task).filter(Task.owner_id == current_user.get('id'), Task.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Task not found!')

    subtask_model = Subtask(task_id=task_id, **subtask_request.model_dump())

    db.add(subtask_model)
    db.commit()
    db.refresh(subtask_model)

    return subtask_model

