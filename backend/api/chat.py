from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.model.chatbot import chatbot

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("", response_model=ChatResponse)
@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = chatbot.generate_response(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
