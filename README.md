# MedCare Hospital Management System

MedCare is a comprehensive full-stack hospital management system designed to streamline healthcare operations. It features a modern React frontend and a robust FastAPI backend, integrating AI-powered capabilities for enhanced patient support.

## 🚀 Features

- **Patient Portal**: Secure access for patients to view medical history and manage appointments.
- **Doctor & Department Management**: Directory and management systems for hospital staff and departments.
- **Manager Dashboard**: Analytics and administrative tools for hospital managers.
- **Billing System**: Integrated billing portal and payment processing.
- **AI-Powered Chatbot**: Intelligent chat assistant using PyTorch and Transformers to support patients and staff.
- **Authentication**: Secure user authentication and authorization.
- **Responsive Design**: Modern UI built with Tailwind CSS for all devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **ML/AI**: PyTorch, Transformers (Hugging Face)
- **Server**: Uvicorn
- **Authentication**: Python-Jose, Passlib

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.8 or higher)
- **pip** (Python package manager)

## ⚡ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vivek-website
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.
API Documentation (Swagger UI) is available at `http://localhost:8000/docs`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and start the development server.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 📂 Project Structure

```
├── backend/                # FastAPI Backend
│   ├── api/                # API Routers (Auth, Patients, Billing, etc.)
│   ├── model/              # ML Models (Chatbot)
│   ├── main.py             # Application Entry Point
│   └── requirements.txt    # Python Dependencies
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable Components (Navbar, ChatWidget, etc.)
│   │   ├── pages/          # Page Components (Home, Login, Dashboard, etc.)
│   │   ├── services/       # API Services
│   │   └── ...
│   └── ...
│
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.