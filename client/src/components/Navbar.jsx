// navigation, 'Logout logic' (manage authentication state)

import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); 

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <h1>HomeKeep</h1>
            {user ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
};

export default Navbar; 