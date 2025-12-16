from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/auth", tags=["auth"])

class UserLogin(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    role: str
    name: str

# Mock database
users_db = {
    "patient": {"username": "patient", "password": "123", "role": "patient", "name": "John Patient"},
    "billing": {"username": "billing", "password": "123", "role": "billing", "name": "Sarah Billing"},
    "manager": {"username": "manager", "password": "123", "role": "manager", "name": "Mike Manager"}
}

@router.post("/login", response_model=User)
async def login(user_login: UserLogin):
    user = users_db.get(user_login.username)
    if not user or user["password"] != user_login.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return User(username=user["username"], role=user["role"], name=user["name"])
