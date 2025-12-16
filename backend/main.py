from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MedCare Hospital Management API")

# CORS configuration
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to MedCare Hospital Management API"}

from backend.api import auth, patients, billing, analytics, chat, doctors, departments

app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(billing.router)
app.include_router(analytics.router)
app.include_router(chat.router)
app.include_router(doctors.router)
app.include_router(departments.router)
