from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/patients", tags=["patients"])

class Patient(BaseModel):
    id: int
    name: str
    dob: str
    phone: str
    email: str

# Mock data
patients_db = [
    {"id": 1, "name": "John Doe", "dob": "1985-03-15", "phone": "555-0101", "email": "john.doe@email.com"},
    {"id": 2, "name": "Jane Smith", "dob": "1990-07-22", "phone": "555-0102", "email": "jane.smith@email.com"},
    {"id": 3, "name": "Robert Johnson", "dob": "1978-12-03", "phone": "555-0103", "email": "robert.johnson@email.com"},
    {"id": 4, "name": "Emily Davis", "dob": "1992-05-18", "phone": "555-0104", "email": "emily.davis@email.com"},
    {"id": 5, "name": "Michael Wilson", "dob": "1988-09-11", "phone": "555-0105", "email": "michael.wilson@email.com"}
]

@router.get("/search", response_model=List[Patient])
async def search_patients(name: str):
    if not name:
        return []
    return [p for p in patients_db if name.lower() in p["name"].lower()]

@router.get("/{patient_id}", response_model=Patient)
async def get_patient(patient_id: int):
    patient = next((p for p in patients_db if p["id"] == patient_id), None)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
