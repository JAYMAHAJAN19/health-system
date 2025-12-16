import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions or need assistance? Reach out to us and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <MapPin className="text-healthcare-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                                    <p className="text-gray-600 text-sm">123 Harley Street,<br />London, W1G 9QD, UK</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <Phone className="text-healthcare-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone Number</h3>
                                    <p className="text-gray-600 text-sm">+44 20 7123 4567</p>
                                    <p className="text-gray-600 text-sm">+44 20 7987 6543</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <Mail className="text-healthcare-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                                    <p className="text-gray-600 text-sm">info@medcare.com</p>
                                    <p className="text-gray-600 text-sm">support@medcare.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                            {submitted ? (
                                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                                    Thank you for your message! We will get back to you shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                                            placeholder="Your message here..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-healthcare-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                                    >
                                        <span>Send Message</span>
                                        <Send size={18} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
