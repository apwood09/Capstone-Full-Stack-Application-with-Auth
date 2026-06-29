// individual item, 'stateless' component that displays data passed to it

import React from 'react';

// component AssestCard accepts 'asset' objext as prop 
const AssetCard = ({ asset, onDelete, onOpenLogs }) => {
    if (!asset) return null;
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl hover:bg-white/20 transition-all">
            <h3 className="font-bold text-lg text-white">{asset.name}</h3>
            <p className="text-white/70 text-sm mb-4">Added on: {asset.purchase_date || 'N/A'}</p>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => onOpenLogs()} 
                    className="flex-1 bg-white/20 text-white py-2 rounded-xl text-sm font-medium hover:bg-white/30"
                >
                    Manage Logs
                </button>
                <button 
                    onClick={onDelete}
                    className="flex-1 bg-rose-500/30 text-rose-100 py-2 rounded-xl text-sm font-medium hover:bg-rose-500/50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AssetCard; 