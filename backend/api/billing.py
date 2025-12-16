from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

router = APIRouter(prefix="/billing", tags=["billing"])

class Service(BaseModel):
    id: int
    serviceId: int
    serviceName: str
    date: str
    cost: float
    status: str

class Invoice(BaseModel):
    id: int
    invoiceNumber: str
    patientId: int
    amount: float
    status: str
    date: str
    paymentDate: Optional[str] = None
    services: List[int]

class GenerateInvoiceRequest(BaseModel):
    patientId: int
    serviceIds: List[int]

# Mock Data
services_catalog = [
    {"id": 1, "name": "General Consultation", "cost": 150},
    {"id": 2, "name": "Blood Test", "cost": 90},
    {"id": 3, "name": "X-Ray", "cost": 250},
    {"id": 4, "name": "CT Scan", "cost": 500},
    {"id": 5, "name": "Ultrasound", "cost": 200},
    {"id": 6, "name": "MRI Scan", "cost": 800}
]

unbilled_services_db = [
    {"id": 1, "patientId": 1, "serviceId": 1, "date": "2024-01-15", "cost": 150, "status": "Unbilled"},
    {"id": 2, "patientId": 1, "serviceId": 2, "date": "2024-01-15", "cost": 90, "status": "Unbilled"},
    {"id": 3, "patientId": 2, "serviceId": 3, "date": "2024-01-16", "cost": 250, "status": "Unbilled"},
    {"id": 4, "patientId": 3, "serviceId": 1, "date": "2024-01-17", "cost": 150, "status": "Unbilled"},
    {"id": 5, "patientId": 4, "serviceId": 4, "date": "2024-01-18", "cost": 500, "status": "Unbilled"},
    {"id": 6, "patientId": 5, "serviceId": 6, "date": "2024-01-19", "cost": 800, "status": "Unbilled"}
]

invoices_db = [
    {"id": 1, "invoiceNumber": "INV-001", "patientId": 1, "amount": 300, "status": "Paid", "date": "2024-01-10", "paymentDate": "2024-01-12", "services": [1, 2]},
    {"id": 2, "invoiceNumber": "INV-002", "patientId": 1, "amount": 150, "status": "Unpaid", "date": "2024-01-20", "paymentDate": None, "services": [3]},
    {"id": 3, "invoiceNumber": "INV-003", "patientId": 2, "amount": 400, "status": "Paid", "date": "2024-01-15", "paymentDate": "2024-01-16", "services": [4, 5]},
    {"id": 4, "invoiceNumber": "INV-004", "patientId": 2, "amount": 250, "status": "Unpaid", "date": "2024-01-21", "paymentDate": None, "services": [6]},
    {"id": 5, "invoiceNumber": "INV-005", "patientId": 3, "amount": 200, "status": "Paid", "date": "2024-01-18", "paymentDate": "2024-01-19", "services": [7]}
]

next_invoice_number = 6

@router.get("/unbilled/{patient_id}", response_model=List[Service])
async def get_unbilled_services(patient_id: int):
    services = []
    for us in unbilled_services_db:
        if us["patientId"] == patient_id and us["status"] == "Unbilled":
            service_name = next((s["name"] for s in services_catalog if s["id"] == us["serviceId"]), "Unknown Service")
            services.append({
                "id": us["id"],
                "serviceId": us["serviceId"],
                "serviceName": service_name,
                "date": us["date"],
                "cost": us["cost"],
                "status": us["status"]
            })
    return services

@router.post("/generate", response_model=Invoice)
async def generate_invoice(request: GenerateInvoiceRequest):
    global next_invoice_number
    
    selected_services = [s for s in unbilled_services_db if s["id"] in request.serviceIds]
    if not selected_services:
        raise HTTPException(status_code=400, detail="No valid services selected")
        
    total_amount = sum(s["cost"] for s in selected_services)
    new_invoice_number = f"INV-{str(next_invoice_number).zfill(3)}"
    
    new_invoice = {
        "id": next_invoice_number,
        "invoiceNumber": new_invoice_number,
        "patientId": request.patientId,
        "amount": total_amount,
        "status": "Billed",
        "date": str(date.today()),
        "paymentDate": None,
        "services": request.serviceIds
    }
    
    invoices_db.append(new_invoice)
    
    # Update status of unbilled services
    for s in unbilled_services_db:
        if s["id"] in request.serviceIds:
            s["status"] = "Billed"
            
    next_invoice_number += 1
    return new_invoice

@router.get("/patient/{patient_id}", response_model=List[Invoice])
async def get_patient_invoices(patient_id: int):
    return [inv for inv in invoices_db if inv["patientId"] == patient_id]
