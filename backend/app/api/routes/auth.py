"""Authentication routes."""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserCreate, UserResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    user_create: UserCreate,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    try:
        user = await AuthService.register(user_create, session)
        return {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": str(user.created_at),
            "updated_at": str(user.updated_at),
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.post("/login")
async def login(
    login_data: LoginRequest,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    try:
        result = await AuthService.login(login_data, session)
        return {"access_token": result.access_token, "token_type": result.token_type}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@router.get("/me")
async def get_current_user_profile(
    current_user: Annotated[User, Depends(get_current_user)],
):
    try:
        return {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "role": current_user.role,
            "is_active": current_user.is_active,
            "created_at": str(current_user.created_at),
            "updated_at": str(current_user.updated_at),
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


__all__ = ["router"]
