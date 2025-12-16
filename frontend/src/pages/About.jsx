import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About MedCare</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Dedicated to providing compassionate, high-quality healthcare to our community for over 20 years.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=600"
                            alt="Hospital Building"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            At MedCare, our mission is to improve the health and well-being of the people we serve by providing excellent medical care in a compassionate and respectful environment. We strive to be the healthcare provider of choice for our community.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We envision a future where everyone has access to high-quality, affordable healthcare. We are committed to innovation, continuous improvement, and patient-centered care.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="text-healthcare-primary mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold">Patient-Centered Care</h4>
                                    <p className="text-sm text-gray-500">We put our patients first in everything we do.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="text-healthcare-primary mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold">Excellence & Innovation</h4>
                                    <p className="text-sm text-gray-500">We strive for the highest standards of clinical excellence.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="text-healthcare-primary mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold">Compassion & Integrity</h4>
                                    <p className="text-sm text-gray-500">We treat everyone with kindness, dignity, and respect.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
