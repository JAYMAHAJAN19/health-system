from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
import random

router = APIRouter(prefix="/analytics", tags=["analytics"])

class PeakHour(BaseModel):
    hour: str
    visits: int
    utilization: int

class AnalyticsData(BaseModel):
    peakHours: List[PeakHour]
    totalPatients: int
    dailyAverage: float
    lastRefresh: str

# Mock Data
analytics_data = {
    "peakHours": [
        {"hour": "8:00 AM", "visits": 12, "utilization": 60},
        {"hour": "9:00 AM", "visits": 18, "utilization": 90},
        {"hour": "10:00 AM", "visits": 15, "utilization": 75},
        {"hour": "11:00 AM", "visits": 20, "utilization": 100},
        {"hour": "12:00 PM", "visits": 8, "utilization": 40},
        {"hour": "1:00 PM", "visits": 5, "utilization": 25},
        {"hour": "2:00 PM", "visits": 14, "utilization": 70},
        {"hour": "3:00 PM", "visits": 16, "utilization": 80},
        {"hour": "4:00 PM", "visits": 11, "utilization": 55},
        {"hour": "5:00 PM", "visits": 9, "utilization": 45}
    ],
    "totalPatients": 128,
    "dailyAverage": 12.8,
    "lastRefresh": datetime.now().isoformat()
}

@router.get("/", response_model=AnalyticsData)
async def get_analytics():
    return analytics_data

@router.post("/refresh", response_model=AnalyticsData)
async def refresh_analytics():
    # Simulate data refresh
    for hour in analytics_data["peakHours"]:
        hour["visits"] = max(0, hour["visits"] + random.randint(-2, 2))
        # Simple utilization calc
        hour["utilization"] = min(100, int((hour["visits"] / 20) * 100))
        
    analytics_data["lastRefresh"] = datetime.now().isoformat()
    return analytics_data
