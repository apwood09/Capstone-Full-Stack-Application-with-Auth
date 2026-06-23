// individual item, 'stateless' component that displays data passed to it

import React from 'react';

// component AssestCard accepts 'asset' objext as prop 
const AssetCard = ({ asset, onDelete }) => {
    if (!asset) return null;
    return (
        <div className="border p-4 rounded shadow-md m-2">
            <h3 className="font-bold text-lg">{asset.name}</h3>
            <p className="text-sm">Added on: {asset.purchase_date || 'N/A'}</p>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => onOpenLogs()} 
                    className='mt-4 bg-gray-500 text-white px-3 py-1 rounded text-xs'
                >
                    Manage Logs
                </button>
                <button 
                    onClick={() => onDelete(asset.id)} 
                    className='mt-4 bg-red-500 text-white px-3 py-1 rounded text-xs'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AssetCard; 