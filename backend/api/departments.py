from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/departments", tags=["departments"])

class Department(BaseModel):
    id: int
    name: str
    description: str
    icon: str

# Mock Data
departments_db = [
    {
        "id": 1,
        "name": "Cardiology",
        "description": "Comprehensive heart care including diagnostics, treatment, and surgery.",
        "icon": "Heart"
    },
    {
        "id": 2,
        "name": "Neurology",
        "description": "Diagnosis and treatment of disorders of the nervous system.",
        "icon": "Brain"
    },
    {
        "id": 3,
        "name": "Pediatrics",
        "description": "Medical care for infants, children, and adolescents.",
        "icon": "Baby"
    },
    {
        "id": 4,
        "name": "Orthopedics",
        "description": "Treatment of conditions involving the musculoskeletal system.",
        "icon": "Bone"
    },
    {
        "id": 5,
        "name": "Dermatology",
        "description": "Diagnosis and treatment of skin, hair, and nail conditions.",
        "icon": "Activity"
    },
    {
        "id": 6,
        "name": "Surgery",
        "description": "General and specialized surgical procedures.",
        "icon": "Scalpel"
    },
    {
        "id": 7,
        "name": "Emergency",
        "description": "24/7 emergency medical services for critical conditions.",
        "icon": "Ambulance"
    },
    {
        "id": 8,
        "name": "Radiology",
        "description": "Advanced imaging services including X-ray, MRI, and CT scans.",
        "icon": "Scan"
    }
]

@router.get("/", response_model=List[Department])
async def get_departments():
    return departments_db
