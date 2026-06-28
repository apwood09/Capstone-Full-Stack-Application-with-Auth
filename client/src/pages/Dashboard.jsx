// user sees their data
// uses api instance to fetch private resources 

import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api'; 
import AssetCard from '../components/AssetCard'; 
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogModal from '../components/LogModal';

// AddAssetForm: creating new assets
const AddAssetForm = ({ onAssetAdded }) => {
    const [formData, setFormData] = useState({ name: '', date: '', docUrl: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                purchase_date: formData.date,
                document_url: formData.docUrl
            };
            const res = await api.post('/api/assets', payload);
            onAssetAdded(res.data);
            setFormData({ name: '', date: '', docUrl: '' });
        } catch (err) {
            console.error("Server Error:", err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-slate-800">Add New Asset</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    placeholder="Asset Name" required className="border p-2 rounded-lg" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
                <input 
                    type="date" className="border p-2 rounded-lg" 
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} 
                />
                <input 
                    placeholder="Document URL (Optional)" className="border p-2 rounded-lg" 
                    value={formData.docUrl} onChange={(e) => setFormData({...formData, docUrl: e.target.value})} 
                />
            </div>
            <button type="submit" className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                Add Asset
            </button>
        </form>
    );
};

const Dashboard = () => {
    const [assets, setAssets] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeAsset, setActiveAsset] = useState(null);

    const { logout } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await api.get('/api/assets');
                console.log("Assets fetched:", res.data);
                setAssets(res.data); 
            } catch (err) {
                console.error("Error fetching assets", err); 
            } finally {
                setLoading(false);
            }
        }; 
        fetchAssets(); 
    }, []);

    // delete asset
    const handleDelete = async (id) => {
        console.log("ID received in handleDelete:", id);

        if (!id) {
        console.error("Attempted to delete an asset with no ID");
        return;
        }

        try {
            await api.delete(`/api/assets/${id}`);
            setAssets(assets.filter(asset => asset.id !== id));
        } catch (err) {
            console.error("Failed to delete asset", err);
        }
    }; 

    // add asset
    const handleAddAsset = (newAsset) => {
        setAssets([...assets, newAsset]);
    };

    // logout
    const handleLogout = () => {
        logout(); 
        navigate('/login');
    }; 

    if (loading) return <div className="p-8">Loading your assets...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Home Assets</h1>

            {activeAsset && (
                <LogModal 
                    asset={activeAsset} 
                    onClose={() => setActiveAsset(null)} 
                />
            )}

            <button onClick={handleLogout} className='bg-red-500 text-white p-2 mb-6 rounded'>
                Logout 
            </button>

            <AddAssetForm onAssetAdded={handleAddAsset} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.isArray(assets) && assets.map(asset => (
                    <AssetCard 
                        key={asset.id} 
                        asset={asset} 
                        onDelete={() => handleDelete(asset.id)}
                        // pass the trigger function to open the modal
                        onOpenLogs={() => {
                             console.log("Setting active asset:", asset);
                             setActiveAsset(asset);
                        }}
                    />
                ))}
            </div>
        </div>
    ); 
};

export default Dashboard;