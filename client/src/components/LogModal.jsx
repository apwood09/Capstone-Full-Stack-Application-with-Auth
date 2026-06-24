import React, { useState, useEffect } from 'react';
import api from '../api/api';

const LogModal = ({ asset, onClose }) => {
    const [logs, setLogs] = useState([]); 
   const [formData, setFormData] = useState({ 
        description: '', 
        service_date: '', 
        category: 'Maintenance' 
    });

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await api.get(`/assets/${asset.id}/logs`); 
            setLogs(res.data); 
        }; 

        fetchLogs(); 

    }, [asset.id]); 

    const handleAddLog = async (e) => {
        e.preventDefault();
        const res = await api.post(`/assets/${asset.id}/logs`, formData); 
        setLogs([...logs, res.data]); 
        setFormData({ description: '', service_date: '', category: 'Maintenance' });
    };

    const handleDelete = async (logId) => {
        try {
            await api.delete(`/logs/${logId}`);
            setLogs(logs.filter(log => log.id !== logId)); 
        } catch (err) {
            console.error("Failed to delete log", err); 
        }
    }; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Logs for {asset.name}</h2>
                <ul className="mb-4">
                    {logs.map(log => (
                        <li key={log.id} className="flex justify-between items-center border-b py-2">
                            <span>
                                <strong>{log.category}</strong>: {log.description} ({log.service_date})
                            </span>
                            <button onClick={() => handleDelete(log.id)} className="text-red-500 text-sm ml-2">Delete</button>
                        </li>
                    ))}
                </ul>
                
                <form onSubmit={handleAddLog} className="space-y-2">
                    <input 
                        className="border p-2 w-full"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <input 
                        type="date"
                        className="border p-2 w-full"
                        value={formData.service_date}
                        onChange={(e) => setFormData({...formData, service_date: e.target.value})}
                    />
                    <select 
                        className="border p-2 w-full"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        <option value="Maintenance">Maintenance</option>
                        <option value="Repair">Repair</option>
                        <option value="Upgrade">Upgrade</option>
                    </select>
                    <button type="submit" className="bg-green-500 text-white p-2 w-full">Add Log</button>
                </form>
                <button onClick={onClose} className="mt-4 text-gray-500">Close</button>
            </div>
        </div>
    ); 
}; 

export default LogModal;