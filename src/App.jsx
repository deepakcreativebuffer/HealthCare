import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ResidentLayout from './resident-panel/layouts/ResidentLayout';
import Dashboard from './resident-panel/pages/Dashboard';
import Profile from './resident-panel/pages/Profile';

// Mock Login Page Component
const MockLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const user = {
      name: role === 'resident' ? 'Jimmy Chu' : 'Admin User',
      role: role
    };
    localStorage.setItem('user', JSON.stringify(user));
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/resident-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900">Oasis Notes Login Simulator</h1>
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('resident')}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Login as Resident (Jimmy Chu)
          </button>
          <button 
            onClick={() => handleLogin('admin')}
            className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-900 transition-colors"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Mock Page
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-8 text-gray-600">This is a mock admin panel.</p>
      <button 
        onClick={() => {
          localStorage.removeItem('user');
          navigate('/');
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userStr);

  if (user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/resident-dashboard'} replace />;
  }

  return children;
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MockLogin />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Resident Panel Routes (Separate Module) */}
        <Route 
          path="/resident-dashboard" 
          element={
            <ProtectedRoute allowedRole="resident">
              <ResidentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
