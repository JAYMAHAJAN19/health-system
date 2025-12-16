from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/doctors", tags=["doctors"])

class Doctor(BaseModel):
    id: int
    name: str
    specialty: str
    department: str
    image: str
    bio: str
    experience: int

# Mock Data
doctors_db = [
    {
        "id": 1,
        "name": "Dr. Sarah Johnson",
        "specialty": "Cardiologist",
        "department": "Cardiology",
        "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Johnson is a renowned cardiologist with over 15 years of experience in treating complex heart conditions.",
        "experience": 15
    },
    {
        "id": 2,
        "name": "Dr. Michael Chen",
        "specialty": "Neurologist",
        "department": "Neurology",
        "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Chen specializes in neurological disorders and has pioneered several treatment methods for migraines.",
        "experience": 12
    },
    {
        "id": 3,
        "name": "Dr. Emily Davis",
        "specialty": "Pediatrician",
        "department": "Pediatrics",
        "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Davis is dedicated to the health and well-being of children, providing compassionate care for infants to adolescents.",
        "experience": 10
    },
    {
        "id": 4,
        "name": "Dr. James Wilson",
        "specialty": "Orthopedic Surgeon",
        "department": "Orthopedics",
        "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Wilson is an expert in sports medicine and joint replacement surgeries.",
        "experience": 20
    },
    {
        "id": 5,
        "name": "Dr. Lisa Brown",
        "specialty": "Dermatologist",
        "department": "Dermatology",
        "image": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Brown specializes in cosmetic and medical dermatology, helping patients achieve healthy skin.",
        "experience": 8
    },
    {
        "id": 6,
        "name": "Dr. Robert Taylor",
        "specialty": "General Surgeon",
        "department": "Surgery",
        "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
        "bio": "Dr. Taylor performs a wide range of surgical procedures with a focus on minimally invasive techniques.",
        "experience": 18
    }
]

@router.get("/", response_model=List[Doctor])
async def get_doctors():
    return doctors_db

@router.get("/{doctor_id}", response_model=Doctor)
async def get_doctor(doctor_id: int):
    doctor = next((d for d in doctors_db if d["id"] == doctor_id), None)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor
