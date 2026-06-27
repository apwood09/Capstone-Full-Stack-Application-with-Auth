import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    // AuthProvider: give child components access to auth state
    <AuthProvider>
      {/* BrowserRouter: enables navigation in browser */}
      <BrowserRouter>
        <Routes>
          {/* redirect root URL -> /login automatically */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* route paths & components endered */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}