import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Doctors', path: '/doctors' },
        { name: 'Departments', path: '/departments' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-healthcare-primary p-2 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-800">MedCare</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-healthcare-primary ${isActive(link.path) ? 'text-healthcare-primary' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Button */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                                <Link
                                    to={`/${user.role}`}
                                    className="bg-healthcare-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                                >
                                    Portal
                                </Link>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 bg-healthcare-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                            >
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'bg-blue-50 text-healthcare-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 mt-4">
                            {user ? (
                                <div className="space-y-3">
                                    <div className="px-3 text-sm text-gray-500">Signed in as {user.name}</div>
                                    <Link
                                        to={`/${user.role}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 text-base font-medium text-healthcare-primary hover:bg-blue-50 rounded-md"
                                    >
                                        Go to Portal
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 text-base font-medium text-healthcare-primary hover:bg-blue-50 rounded-md"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
