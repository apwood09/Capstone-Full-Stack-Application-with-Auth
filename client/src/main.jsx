import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// render application tree 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap <App /> in AuthProvider.
      uses React Context API to provide authentication state 
      (current user or login status) to every component in app.
    */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);