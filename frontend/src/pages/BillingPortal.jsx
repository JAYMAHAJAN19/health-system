import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPatients, getUnbilledServices, generateInvoice } from '../services/api';
import { LogOut, Search, FileText, CheckCircle } from 'lucide-react';

const BillingPortal = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [unbilledServices, setUnbilledServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [generatedInvoice, setGeneratedInvoice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setIsLoading(true);
        setError('');
        try {
            const results = await searchPatients(searchTerm);
            setPatients(results);
            setSelectedPatient(null);
            setUnbilledServices([]);
        } catch (err) {
            setError('Failed to search patients');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectPatient = async (patient) => {
        setSelectedPatient(patient);
        setIsLoading(true);
        try {
            const services = await getUnbilledServices(patient.id);
            setUnbilledServices(services);
            setSelectedServiceIds([]);
        } catch (err) {
            setError('Failed to fetch services');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleService = (serviceId) => {
        setSelectedServiceIds(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleGenerateInvoice = async () => {
        if (!selectedPatient || selectedServiceIds.length === 0) return;
        setIsLoading(true);
        try {
            const invoice = await generateInvoice(selectedPatient.id, selectedServiceIds);
            setGeneratedInvoice(invoice);
            setUnbilledServices(prev => prev.filter(s => !selectedServiceIds.includes(s.id)));
            setSelectedServiceIds([]);
        } catch (err) {
            setError('Failed to generate invoice');
        } finally {
            setIsLoading(false);
        }
    };

    const totalAmount = unbilledServices
        .filter(s => selectedServiceIds.includes(s.id))
        .reduce((sum, s) => sum + s.cost, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-healthcare-primary text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Billing Management</h1>
                    <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-gray-200">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Search Patient</h2>
                    <div className="flex space-x-4 mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter patient name..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="bg-healthcare-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                        >
                            <Search size={20} />
                            <span>Search</span>
                        </button>
                    </div>

                    {patients.length > 0 && !selectedPatient && (
                        <div className="space-y-3">
                            {patients.map(patient => (
                                <div key={patient.id} className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-lg">{patient.name}</h4>
                                        <p className="text-gray-600">DOB: {patient.dob} | Phone: {patient.phone}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectPatient(patient)}
                                        className="bg-healthcare-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Select
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedPatient && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Unbilled Services for {selectedPatient.name}</h2>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Change Patient
                            </button>
                        </div>

                        {unbilledServices.length === 0 ? (
                            <p className="text-gray-500">No unbilled services found.</p>
                        ) : (
                            <div className="space-y-4">
                                {unbilledServices.map(service => (
                                    <div key={service.id} className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedServiceIds.includes(service.id)}
                                                onChange={() => toggleService(service.id)}
                                                className="h-5 w-5 text-healthcare-primary rounded focus:ring-healthcare-primary"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{service.serviceName}</h4>
                                                <p className="text-gray-600">Date: {service.date}</p>
                                            </div>
                                        </div>
                                        <div className="font-semibold">${service.cost}</div>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center pt-6 border-t mt-6">
                                    <div className="text-xl font-bold">Total: ${totalAmount}</div>
                                    <button
                                        onClick={handleGenerateInvoice}
                                        disabled={selectedServiceIds.length === 0 || isLoading}
                                        className="bg-healthcare-accent text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Generate Invoice
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {generatedInvoice && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Generated!</h3>
                                <p className="text-sm text-gray-500 mb-2">Invoice #: <span className="font-bold text-healthcare-primary">{generatedInvoice.invoiceNumber}</span></p>
                                <p className="text-sm text-gray-500 mb-6">Amount: <span className="font-bold">${generatedInvoice.amount}</span></p>
                                <button
                                    onClick={() => setGeneratedInvoice(null)}
                                    className="w-full bg-healthcare-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BillingPortal;
