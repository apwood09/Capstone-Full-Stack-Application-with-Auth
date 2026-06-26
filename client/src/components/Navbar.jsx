// navigation, 'Logout logic' (manage authentication state)

import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'; 

const Navbar = () => {
    // access 'user' & 'logout' function from globally shared AuthContext
    const { user, logout } = useContext(AuthContext); 

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            {/* app title */}
            <h1>HomeKeep</h1>
            {/* 'user' exist (not null), display logout button */}
            {user ? (
                // clicked -> triggers logout function 
                <button onClick={logout}>Logout</button>
            ) : (
                // 'user' -> null: show login page link 
                <a href="/login">Login</a>
            )}
        </nav>
    );
};

export default Navbar; 