import { Children, createContext, useState } from 'react';
import axios from 'axios';

// create context object to store & pass down authentication state
export const AuthContext = createContext(); 

// create provider component -> wrap application 
export const AuthProvider = ({ Children}) => {
    // 'user' holds logged-in user's info; initially null (logged out)
    const [user, setUser] = useState(null); 

    // handle login request 
    const login = async (username, password) => {
        // send credentials -> Flask backend 
        const res = await axios.post('/api/login', {username, password}); 
        // store returned JWT token in browser storage: persist on refresh
        localStorage.setItem('jwt_token', res.data.access_token); 
        // update 'user' state reflect logged in 
        setUser(username); 
    }; 

    // provide 'user' state & 'login' function -> child components
    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    ); 
}; 