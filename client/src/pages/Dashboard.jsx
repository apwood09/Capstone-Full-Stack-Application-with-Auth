// user sees their data
// uses api instance to fetch private resources 

import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api'; 
import AssetCard from '../components/AssetCard'; 
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// AddAssetForm
const AddAssetForm = ({ onAssetAdded }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // send POST request -> backend
            const res = await api.post('/assets', { name, purchase_date: date });
            onAssetAdded(res.data); // update: local dashboard state
            setName(''); // clear inputs
            setDate('');
        } catch (err) {
            console.error("Failed to add asset", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow-sm">
            <input 
                placeholder="Asset Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="border p-2 mr-2 rounded"
                required
            />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="border p-2 mr-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Asset</button>
        </form>
    );
};

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

    // update state without page refresh
    const handleAddAsset = (newAsset) => {
        setAssets([...assets, newAsset]);
    };

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    }; 

    if (loading) return <div className="p-8">Loading your assets...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Home Assets</h1>

            <button onClick={handleLogout} className='bg-red-500 text-white p-2 mb-6 rounded'>
                Logout 
            </button>

            {/* integrate form: onAssetAdded */}
            <AddAssetForm onAssetAdded={handleAddAsset} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.isArray(assets) && assets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    ); 
}; 

export default Dashboard;