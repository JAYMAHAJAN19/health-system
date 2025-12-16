import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(username, password);
            localStorage.setItem('user', JSON.stringify(user));

            switch (user.role) {
                case 'billing':
                    navigate('/billing');
                    break;
                case 'manager':
                    navigate('/manager');
                    break;
                case 'patient':
                    navigate('/patient');
                    break;
                default:
                    setError('Unknown role');
            }
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Access your hospital management portal</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-healthcare-primary focus:border-healthcare-primary focus:z-10 sm:text-sm"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-healthcare-primary focus:border-healthcare-primary focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-healthcare-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healthcare-primary disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Accounts:</h3>
                    <div className="text-xs text-blue-700 space-y-1">
                        <div><strong>Patient:</strong> username: patient, password: 123</div>
                        <div><strong>Billing Staff:</strong> username: billing, password: 123</div>
                        <div><strong>Manager:</strong> username: manager, password: 123</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
