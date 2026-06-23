import React, { useState, useEffect } from 'react';
import api from '../api/api';

const LogModal = ({ asset, onClose }) => {
    const [logs, setLogs] = useState([]); 
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await api.get(`/assets/${asset.id}/logs`); 
            setLogs(res.data); 
        }; 

        fetchLogs(); 

    }, [asset.id]); 

    const handleAddLog = async (e) => {
        e.preventDefault();
        const res = await api.post(`/assets/${asset.id}/logs`, {description}); 
        setLogs([...logs, res.data]); 
        setDescription(''); 
    }; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Logs for {asset.name}</h2>
                <ul className="mb-4">
                    {logs.map(log => <li key={log.id} className="border-b py-1">{log.description}</li>)}
                </ul>
                <form onSubmit={handleAddLog}>
                    <input 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='New service note...'
                    />
                    <button className="bg-green-500 text-white p-2 w-full">Add Log</button>
                </form>
                <button onClick={onClose} className="mt-4 text-gray-500">Close</button>
            </div>
        </div>
    ); 
}; 

export default LogModal;