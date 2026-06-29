// individual item, 'stateless' component that displays data passed to it

import React from 'react';

// component AssestCard accepts 'asset' objext as prop 
const AssetCard = ({ asset, onDelete, onOpenLogs }) => {
    if (!asset) return null;
    return (
        <div className="bg-theme-glass backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl">
            <h3 className="font-bold text-lg text-white mb-1">{asset.name}</h3>
            <p className="text-gray-300 text-sm mb-4">Added on: {asset.purchase_date || 'N/A'}</p>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => onOpenLogs()} 
                    className="flex-1 bg-theme-yellow text-black py-2 rounded-xl font-bold hover:bg-yellow-400 transition"
                >
                    Manage Logs
                </button>
                <button 
                    onClick={onDelete}
                    className="flex-1 bg-theme-red/80 text-white py-2 rounded-xl font-bold hover:bg-theme-red transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AssetCard; 