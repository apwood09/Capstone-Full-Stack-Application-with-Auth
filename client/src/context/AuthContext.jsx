import { createContext, useState } from 'react';
import api from '../api/api';

// create context object to store & pass down authentication state
export const AuthContext = createContext(); 

// create provider component -> wrap application 
export const AuthProvider = ({ children }) => {
    // 'user' holds logged-in user's info; initially null (logged out)
    const [user, setUser] = useState(localStorage.getItem('user') || null); 

    // handle login request 
    const login = async (username, password) => {
        try {
            const res = await api.post('/login', { username, password });
            localStorage.setItem('jwt_token', res.data.access_token);
            localStorage.setItem('user', username);
            setUser(username);
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // let the component handle error display
        }
    };

    // logout logic 
    const logout = () => {
        localStorage.removeItem('jwt_token'); 
        localStorage.removeItem('user'); 
        setUser(null); 
    }

    // provide 'user' state & 'login' function -> child components
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    ); 
}; 