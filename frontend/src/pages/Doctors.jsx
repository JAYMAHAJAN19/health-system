import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Star } from 'lucide-react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const specialties = ['All', ...new Set(doctors.map(d => d.specialty))];

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Specialists</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet our team of experienced and dedicated doctors who are here to provide you with the best medical care.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                            {specialties.map(specialty => (
                                <button
                                    key={specialty}
                                    onClick={() => setSelectedSpecialty(specialty)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedSpecialty === specialty
                                            ? 'bg-healthcare-primary text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {specialty}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-20">Loading doctors...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDoctors.map(doctor => (
                            <div key={doctor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                            <p className="text-healthcare-primary font-medium">{doctor.specialty}</p>
                                        </div>
                                        <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                            {doctor.experience} Yrs Exp
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
                                    <div className="flex items-center text-gray-500 text-sm mb-6">
                                        <MapPin size={16} className="mr-1" />
                                        <span>{doctor.department} Department</span>
                                    </div>
                                    <button className="w-full bg-white border border-healthcare-primary text-healthcare-primary py-2 rounded-lg hover:bg-healthcare-primary hover:text-white transition-colors font-medium">
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors;
