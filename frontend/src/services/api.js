import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const searchPatients = async (name) => {
    const response = await api.get(`/patients/search?name=${name}`);
    return response.data;
};

export const getUnbilledServices = async (patientId) => {
    const response = await api.get(`/billing/unbilled/${patientId}`);
    return response.data;
};

export const generateInvoice = async (patientId, serviceIds) => {
    const response = await api.post('/billing/generate', { patientId, serviceIds });
    return response.data;
};

export const getPatientInvoices = async (patientId) => {
    const response = await api.get(`/billing/patient/${patientId}`);
    return response.data;
};

export const getAnalytics = async () => {
    const response = await api.get('/analytics');
    return response.data;
};

export const refreshAnalytics = async () => {
    const response = await api.post('/analytics/refresh');
    return response.data;
};

export const sendChatMessage = async (message) => {
    const response = await api.post('/chat', { message });
    return response.data;
};

export default api;
