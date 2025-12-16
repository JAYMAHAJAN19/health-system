import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-healthcare-primary p-2 rounded-full">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">MedCare</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Providing world-class healthcare services with a focus on patient comfort and advanced medical treatments. Your health is our priority.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/doctors" className="text-gray-400 hover:text-white transition-colors text-sm">Find a Doctor</Link></li>
                            <li><Link to="/departments" className="text-gray-400 hover:text-white transition-colors text-sm">Departments</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400 text-sm">Emergency Care</li>
                            <li className="text-gray-400 text-sm">Cardiology</li>
                            <li className="text-gray-400 text-sm">Neurology</li>
                            <li className="text-gray-400 text-sm">Pediatrics</li>
                            <li className="text-gray-400 text-sm">Surgery</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-400 text-sm">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                                <span>123 Harley Street, London, W1G 9QD, UK</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-sm">
                                <Phone size={18} className="flex-shrink-0" />
                                <span>+44 20 7123 4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400 text-sm">
                                <Mail size={18} className="flex-shrink-0" />
                                <span>info@medcare.com</span>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} MedCare Hospital Management System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
