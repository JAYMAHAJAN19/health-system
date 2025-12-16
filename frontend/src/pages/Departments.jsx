import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Brain, Heart, Baby, Bone, Scan, Ambulance } from 'lucide-react';

// Map icon names to Lucide components
const iconMap = {
    'Heart': Heart,
    'Brain': Brain,
    'Baby': Baby,
    'Bone': Bone,
    'Activity': Activity,
    'Scalpel': Activity, // Fallback
    'Ambulance': Ambulance,
    'Scan': Scan
};

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Departments</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer a comprehensive range of medical services across various specialties, equipped with modern technology.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading departments...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {departments.map(dept => {
                            const IconComponent = iconMap[dept.icon] || Activity;
                            return (
                                <div key={dept.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
                                    <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                        <IconComponent className="text-healthcare-primary" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {dept.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Departments;
