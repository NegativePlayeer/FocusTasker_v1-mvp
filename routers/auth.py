from fastapi import APIRouter, status, HTTPException
router = APIRouter()

@router.post('/auth/login', status_code=status.HTTP_201_NO_CONTENT)
async def authenticate_user():
