import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientInvoices } from '../services/api';
import { LogOut, CreditCard, CheckCircle } from 'lucide-react';

const PatientPortal = () => {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchInvoices = async () => {
            setIsLoading(true);
            try {
                // Hardcoded patient ID 1 for demo since we don't have real auth linking yet
                const result = await getPatientInvoices(1);
                setInvoices(result);
            } catch (error) {
                console.error('Failed to fetch invoices', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handlePay = (invoice) => {
        setSelectedInvoice(invoice);
        setPaymentModalOpen(true);
        setPaymentSuccess(false);
    };

    const processPayment = (e) => {
        e.preventDefault();
        // Simulate payment processing
        setTimeout(() => {
            setPaymentSuccess(true);
            setInvoices(prev => prev.map(inv =>
                inv.id === selectedInvoice.id
                    ? { ...inv, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0] }
                    : inv
            ));
            setTimeout(() => {
                setPaymentModalOpen(false);
                setSelectedInvoice(null);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-healthcare-primary text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Patient Portal</h1>
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {user?.name}</span>
                        <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-gray-200">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="bg-healthcare-secondary text-white p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-2">My Health Overview</h2>
                    <p>Manage your medical invoices and payments securely.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6">My Invoices</h3>
                    {isLoading ? (
                        <p>Loading invoices...</p>
                    ) : invoices.length === 0 ? (
                        <p className="text-gray-500">No invoices found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.map(invoice => (
                                        <tr key={invoice.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${invoice.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {invoice.status !== 'Paid' ? (
                                                    <button
                                                        onClick={() => handlePay(invoice)}
                                                        className="bg-healthcare-accent text-white px-4 py-2 rounded-lg hover:bg-green-600 text-xs font-bold"
                                                    >
                                                        Pay Now
                                                    </button>
                                                ) : (
                                                    <span className="text-green-600 flex items-center space-x-1">
                                                        <CheckCircle size={16} />
                                                        <span>Paid</span>
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {paymentModalOpen && selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                        {!paymentSuccess ? (
                            <>
                                <h3 className="text-lg font-bold mb-4">Process Payment</h3>
                                <p className="text-gray-600 mb-4">Paying <span className="font-bold">${selectedInvoice.amount}</span> for Invoice {selectedInvoice.invoiceNumber}</p>
                                <form onSubmit={processPayment} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Expiry</label>
                                            <input type="text" placeholder="MM/YY" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                                            <input type="text" placeholder="123" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-3 mt-6">
                                        <button type="button" onClick={() => setPaymentModalOpen(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg">Cancel</button>
                                        <button type="submit" className="flex-1 bg-healthcare-accent text-white py-2 rounded-lg hover:bg-green-600">Pay Now</button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Payment Successful!</h3>
                                <p className="text-gray-500">Redirecting...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientPortal;
