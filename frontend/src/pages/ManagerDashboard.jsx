import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalytics, refreshAnalytics } from '../services/api';
import { LogOut, RefreshCw, Users, Clock, TrendingUp } from 'lucide-react';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const result = await getAnalytics();
            setData(result);
        } catch (error) {
            console.error('Failed to fetch analytics', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            const result = await refreshAnalytics();
            setData(result);
        } catch (error) {
            console.error('Failed to refresh analytics', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const peakHour = data.peakHours.reduce((max, curr) => curr.visits > max.visits ? curr : max, data.peakHours[0]);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-healthcare-primary text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Hospital Analytics</h1>
                    <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-gray-200">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                        <p className="text-gray-500 text-sm">Last updated: {new Date(data.lastRefresh).toLocaleString()}</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="bg-healthcare-accent text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 disabled:opacity-50"
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                        <span>Refresh Data</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-healthcare-primary">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Patients</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{data.totalPatients}</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Users className="text-healthcare-primary" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-healthcare-secondary">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Peak Hour</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{peakHour.hour}</h3>
                                <p className="text-xs text-gray-500 mt-1">{peakHour.visits} visits</p>
                            </div>
                            <div className="bg-sky-100 p-3 rounded-full">
                                <Clock className="text-healthcare-secondary" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-healthcare-accent">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Daily Average</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{data.dailyAverage.toFixed(1)}</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <TrendingUp className="text-healthcare-accent" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold mb-6">Hourly Utilization</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hour</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.peakHours.map((hour, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hour.hour}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hour.visits}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                                                <div
                                                    className={`h-2.5 rounded-full ${hour.utilization > 80 ? 'bg-red-500' : hour.utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                    style={{ width: `${hour.utilization}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs ml-2">{hour.utilization}%</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hour.utilization > 80 ? 'bg-red-100 text-red-800' :
                                                    hour.utilization > 50 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                {hour.utilization > 80 ? 'High' : hour.utilization > 50 ? 'Moderate' : 'Normal'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagerDashboard;
