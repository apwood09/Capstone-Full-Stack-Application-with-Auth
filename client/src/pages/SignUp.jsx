import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

// Signup
const SignUp = () => {
    // local state: controlled inputs 
    // allows React "own" data inputed from user 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useNavigate hook: redirect user after success 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // prevent page refresh on submission 
        e.preventDefault();
        try {
            // send registration request -> flask backend 
            await api.post('/api/signup', { username, password });
            alert("Account created! Please log in.");

            // redirect -> login page 
            navigate('/login');
        } catch (err) {
            console.error("Signup failed", err);
            alert("Signup failed. Try a different username.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign Up</h2>
                <input 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full p-3 mb-4 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-yellow-400 outline-none" 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-3 mb-6 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-yellow-400 outline-none" 
                    required
                />
                <button type="submit" className="w-full bg-emerald-600 text-white p-3 rounded-lg font-bold hover:bg-slate-700 transition">
                    Sign Up
                </button>
                <p className="mt-6 text-sm text-slate-600 text-center">
                    Already have an account? 
                    <Link to="/login" className="text-yellow-400 font-bold ml-1 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;