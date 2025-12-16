import re
import random

class ChatbotModel:
    def __init__(self):
        self.hospital_name = "MedCare Hospital"
        
    def generate_response(self, message: str) -> str:
        message = message.lower().strip()
        
        # Greetings
        if any(word in message for word in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
            return f"Hello! Welcome to {self.hospital_name}. I'm here to help you with information about our services, appointments, and general inquiries. How can I assist you today?"
        
        # Appointments
        if any(word in message for word in ['appointment', 'book', 'schedule', 'visit']):
            return "I can help you with appointments! Please call our reception at (555) 123-4567 or visit our patient portal online. What department would you like to schedule with?"
        
        # Services/Departments
        if any(word in message for word in ['department', 'service', 'doctor', 'specialist']):
            return "We offer various departments including Cardiology, Neurology, Orthopedics, Pediatrics, Emergency Care, and General Medicine. Which department interests you?"
        
        # Hours
        if any(word in message for word in ['hours', 'open', 'time', 'when']):
            return "Our hospital is open 24/7 for emergency services. Regular departments operate Monday-Friday 8AM-6PM, Saturday 9AM-4PM. Emergency department is always available."
        
        # Emergency
        if any(word in message for word in ['emergency', 'urgent', 'help', 'pain']):
            return "For medical emergencies, please call 911 immediately or visit our Emergency Department. For urgent but non-emergency care, our Urgent Care is available 24/7."
        
        # Location/Contact
        if any(word in message for word in ['location', 'address', 'where', 'contact', 'phone']):
            return f"{self.hospital_name} is located at 123 Healthcare Ave. Phone: (555) 123-4567. We're easily accessible with parking available."
        
        # Insurance
        if any(word in message for word in ['insurance', 'coverage', 'payment']):
            return "We accept most major insurance plans. Please bring your insurance card and ID to your appointment. For specific coverage questions, contact our billing department at (555) 123-4568."
        
        # Default response
        return f"Thank you for contacting {self.hospital_name}. I can help with information about appointments, departments, hours, and services. Could you please be more specific about what you need help with?"

chatbot = ChatbotModel()
