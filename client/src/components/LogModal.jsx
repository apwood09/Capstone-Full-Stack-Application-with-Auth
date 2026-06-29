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
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-96 max-h-[80vh] overflow-y-auto text-white">
                <h2 className="text-2xl font-bold mb-4">Logs for {asset.name}</h2>
                
                <ul className="mb-6 space-y-3">
                    {Array.isArray(logs) && logs.map(log => (
                        <li key={log.id} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                            <p className="font-semibold text-sm">
                                {log.category}: {log.description}
                            </p>
                            <p className="text-xs text-slate-500">{log.service_date}</p>
                            
                            {log.document_url && (
                                <a href={log.document_url} target="_blank" rel="noopener noreferrer" 
                                   className="text-indigo-600 text-xs underline block mt-1">
                                    View Record
                                </a>
                            )}
                            
                            <button 
                                onClick={() => handleDelete(log.id)} 
                                className="text-rose-500 text-xs font-medium mt-1 hover:text-rose-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                
                <form onSubmit={handleAddLog} className="space-y-2">
                    <input 
                        className="w-full bg-white/10 border border-white/20 p-3 rounded-xl text-white placeholder-white/50 outline-none" 
                        placeholder="Description" 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        required 
                    />
                    <input 
                        type="date" 
                        className="border p-2 w-full rounded-lg" 
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
                        className="border p-2 w-full rounded-lg bg-white" 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        <option value="Maintenance">Maintenance</option>
                        <option value="Repair">Repair</option>
                        <option value="Upgrade">Upgrade</option>
                    </select>
                    <button type="submit" className="w-full bg-white/20 hover:bg-white/30 border border-white/20 p-3 rounded-xl transition">
                        Add Log
                    </button>
                </form>
                
                <button onClick={onClose} className="mt-4 w-full text-white/60 text-sm hover:text-white">
                    Close
                </button>
            </div>
        </div>
    );
};

export default LogModal;