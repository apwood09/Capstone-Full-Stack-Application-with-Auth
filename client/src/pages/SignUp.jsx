import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

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
            await api.post('/signup', { username, password });
            alert("Account created! Please log in.");

            // redirect -> login page 
            navigate('/login');
        } catch (err) {
            console.error("Signup failed", err);
            alert("Signup failed. Try a different username.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <input 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
                className="border p-2 w-full mb-2" 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="border p-2 w-full mb-4" 
            />
            <button type="submit" className="bg-green-500 text-white p-2 w-full">Sign Up</button>
        </form>
    );
};

export default SignUp;