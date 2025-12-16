import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import BillingPortal from './pages/BillingPortal';
import ManagerDashboard from './pages/ManagerDashboard';
import PatientPortal from './pages/PatientPortal';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Departments from './pages/Departments';
import Contact from './pages/Contact';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRole="billing">
                <BillingPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRole="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRole="patient">
                <PatientPortal />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
