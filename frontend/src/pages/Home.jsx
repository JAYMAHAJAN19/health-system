import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Heart, UserCheck, Clock } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            Advanced Healthcare for You and Your Family
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Experience world-class medical care with our team of expert doctors and state-of-the-art facilities. Your health is our priority.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/doctors"
                                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                            >
                                Find a Doctor
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors text-center"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute bottom-0 right-0 opacity-10">
                    <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M45.7,-70.5C58.9,-62.5,69.3,-49.4,75.9,-34.7C82.5,-20,85.4,-3.7,82.4,11.1C79.4,25.9,70.5,39.2,59.3,49.6C48.1,60,34.6,67.5,20.3,71.7C6,75.9,-9.1,76.8,-23.4,72.3C-37.7,67.8,-51.2,57.9,-61.6,45.5C-72,33.1,-79.3,18.2,-80.5,2.6C-81.7,-13,-76.8,-29.3,-66.9,-42.3C-57,-55.3,-42.1,-65,-27.6,-72.1C-13.1,-79.2,1,-83.7,14.3,-81.8C27.6,-79.9,40.1,-71.6,45.7,-70.5Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <UserCheck className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Doctors</h3>
                            <p className="text-gray-600">
                                Our team of highly qualified doctors and specialists are dedicated to providing the best medical care.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <Activity className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Modern Technology</h3>
                            <p className="text-gray-600">
                                We use the latest medical technology and equipment to ensure accurate diagnosis and effective treatment.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <Clock className="text-red-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Emergency</h3>
                            <p className="text-gray-600">
                                Our emergency department is open 24 hours a day, 7 days a week to handle any medical emergency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to prioritize your health?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Book an appointment with one of our specialists today and take the first step towards a healthier life.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 bg-healthcare-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                        <span>Book Appointment</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
