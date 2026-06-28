// primary user interaction point for authentication flow 

import React from 'react';
import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
    // local state: track input fileds username & password
    const [formData, setFormData] = useState({ username: '', password: ''}); 

    // import login function -> AuthContext handle authentication 
    const { login } = useContext(AuthContext); 

    // react router hook: redirect user after sucessful login
    const navigate = useNavigate(); 

    // handle form submission logic 
    const handleSubmit = async (e) => {
        // prevent broswer refreshing page on submit 
        e.preventDefault(); 
        try {
            // attempt login: calls backend -> AuthContext
            await api.post('/login', { username: formData.username, password: formData.password }); 
            // successful login: redirect user -> dashbaord 
            navigate('/dashboard'); 
        } catch (err) {
            // login fails: send alert message below 
            alert('Login failed. Please check your credentials.');
        }
    }; 

    return (
        <form onSubmit={handleSubmit} className="p-8">
            {/* username input */}
            <input 
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="border p-2 block w-full mb-4" placeholder="Username" 
            />
            {/* password input */}
            <input 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                type="password" className="border p-2 block w-full mb-4" placeholder="Password" 
            />
            {/* submission button */}
            <button className="bg-blue-500 text-white p-2 w-full">Login</button>

            {/* sign Up */}
            <p className="mt-4 text-sm">
                Don't have an account?
                <Link to="/signup" className="text-blue-500 underline ml-2">
                    Sign up here
                </Link>
            </p>
        </form>
    );
}; 

export default Login; 