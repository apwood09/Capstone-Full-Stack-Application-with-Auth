// individual item, 'stateless' component that displays data passed to it

import React from 'react';

// component AssestCard accepts 'asset' objext as prop 
const AssetCard = ({ asset }) => {
    if (!asset) return null;
    return (
        <div className="border p-4 rounded shadow-md m-2">
            {/* display: asset name bolded with larger font size */}
            <h3 className="font-bold text-lg">{asset.name}</h3>
            {/* display: purchase date; show 'N/A' if asset.Purchase_date is null OR undefined */}
            <p className="text-sm">Added on: {asset.purchase_date || 'N/A'}</p>

            {/* delete button */}
            <button onClick={() => onDelete(asset.id)} className='mt-4 bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600'>
                Delete
            </button>
        </div>
    );
};

export default AssetCard; 