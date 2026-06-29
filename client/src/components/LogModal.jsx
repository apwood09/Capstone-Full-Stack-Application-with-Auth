import React, { useState, useEffect } from 'react';
import api from '../api/api';

// components receive 'asset' workong on & function 'onClose' to hide modal 
const LogModal = ({ asset, onClose }) => {
    const [logs, setLogs] = useState([]); // stores list service logs 
    const [formData, setFormData] = useState({ 
        description: '', 
        service_date: '', 
        category: 'Maintenance', 
        document_url: ''
    });

    // fetch logs: specific asset -> modal opens OR asset changes 
    useEffect(() => {
        const fetchLogs = async () => {
            const res = await api.get(`/api/assets/${asset.id}/logs`); 
            setLogs(Array.isArray(res.data) ? res.data : []); 
        }; 

        if (asset?.id) fetchLogs(); 

    }, [asset.id]); // dependency array: re-runs if asset ID changes

    // handle add log -> db
    const handleAddLog = async (e) => {
    e.preventDefault();
    try {
        
        // POST: send new log data -> flask backend
        const res = await api.post(`/api/assets/${asset.id}/logs`, formData); 
        
        // updates local state include new log without page refresh 
        setLogs([...logs, res.data]); 
        
        // clears form inputs after successful submission 
        setFormData({ description: '', service_date: '', category: 'Maintenance', document_url: '' });
    } catch (err) {
        console.error("Failed to add log", err);
    }
};

// handle delete: delete log entry by ID 
    const handleDelete = async (logId) => {
        try {
            await api.delete(`/api/logs/${logId}`);
            // use filter: remove specific log from state array
            setLogs(logs.filter(log => log.id !== logId)); 
        } catch (err) {
            console.error("Failed to delete log", err); 
        }
    }; 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-theme-glass backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 w-96 max-h-[80vh] overflow-y-auto text-white">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Logs for {asset.name}</h2>
                
                <ul className="mb-6 space-y-4">
                    {Array.isArray(logs) && logs.map(log => (
                        <li key={log.id} className="bg-theme-grey/30 p-4 rounded-2xl border border-white/5">
                            <p className="font-bold text-sm text-theme-yellow">
                                {log.category}:
                            </p>
                            <p className="text-sm">{log.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{log.service_date}</p>
                            
                            {log.document_url && (
                                <a href={log.document_url} target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-300 text-xs underline block mt-2">
                                    View Record
                                </a>
                            )}
                            
                            <button 
                                onClick={() => handleDelete(log.id)} 
                                className="text-theme-red text-xs font-bold mt-3 hover:text-red-400"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                
                <form onSubmit={handleAddLog} className="space-y-3">
                    <input 
                        className="w-full bg-theme-grey/50 border border-white/10 p-3 rounded-xl text-white placeholder-gray-400 outline-none" 
                        placeholder="Description" 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        required 
                    />
                    <input 
                        type="date" 
                        className="bg-theme-grey/50 border border-white/10 p-3 rounded-xl text-white" 
                        value={formData.service_date} 
                        onChange={(e) => setFormData({...formData, service_date: e.target.value})} 
                    />
                    <input 
                        className="border p-2 w-full rounded-lg" 
                        placeholder="Document URL (Optional)" 
                        value={formData.document_url} 
                        onChange={(e) => setFormData({...formData, document_url: e.target.value})} 
                    />
                    <select 
                        className="bg-theme-grey/50 border border-white/10 p-3 rounded-xl text-white" 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        <option value="Maintenance">Maintenance</option>
                        <option value="Repair">Repair</option>
                        <option value="Upgrade">Upgrade</option>
                    </select>
                    <button type="submit" className="w-full bg-theme-yellow text-black font-bold p-3 rounded-xl hover:bg-yellow-400 transition">
                        Add Log
                    </button>
                </form>
                
                <button onClick={onClose} className="mt-4 w-full text-gray-400 text-sm hover:text-white">
                    Close
                </button>
            </div>
        </div>
    );
};

export default LogModal;