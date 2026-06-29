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
            await login(formData.username, formData.password);
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
                className="w-full p-3 mb-4 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Username" 
            />
            {/* password input */}
            <input 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                type="password" className="w-full p-3 mb-6 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Password" 
            />
            {/* submission button */}
            <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition">Login</button>

            {/* sign Up */}
            <p className="mt-6 text-sm text-slate-600 text-center">
                Don't have an account?
                <Link to="/signup" lassName="text-indigo-600 font-bold ml-1 hover:underline">
                    Sign up here
                </Link>
            </p>
        </form>
    );
}; 

export default Login; 