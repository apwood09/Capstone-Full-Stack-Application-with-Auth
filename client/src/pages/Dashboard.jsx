// user sees their data
// uses api instance to fetch private resources 

import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api'; 
import AssetCard from '../components/AssetCard'; 
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [assets, setAssets] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { logout } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await api.get('/assets'); 
                setAssets(res.data); 
            } catch (err) {
                console.error("Error fetching assets", err); 
            } finally {
                setLoading(false);
            }
        }; 
        fetchAssets(); 
    }, []);

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    }; 

    if (loading) return <div className="p-8">Loading your assets...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Home Assets</h1>

            <button 
                onClick={handleLogout} 
                className='bg-red-500 text-white p-2 mb-6 rounded'
            >
                Logout 
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.isArray(assets) && assets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    ); 
}; 

export default Dashboard;