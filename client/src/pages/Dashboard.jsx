// user sees their data
// uses api instance to fetch private resources 

import React from 'react';
import { useEffect, useState } from "react";
import api from '../api/api'; 
import AssetCard from '../components/AssetCard'

const Dashboard = () => {
    // intialize local state: store list of assets
    const [assets, setAssets] = useState([]); 

    // useEffect triggers logic when components mount 
    useEffect (() => {
        const fetchAssets = async () => {
            try {
                // API instance: configured with interceptors to send JWT
                const res = await api.get('/assets'); 
                // update state: data received from backend 
                setAssets(res.data); 
            } catch (err) {
                console.error("Error fetching assets", err); 
            }
        }; 

        fetchAssets(); 
    }, []); // empty dependency array: ensures only runs once on load 

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Home Assets</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assets.map(assets => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    ); 
}; 

export default Dashboard;