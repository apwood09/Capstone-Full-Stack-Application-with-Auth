// individual item, 'stateless' component that displays data passed to it

// component AssestCard accepts 'asset' objext as prop 
const AssetCard = ({ asset }) => {
    return (
        <div className="border p-4 rounded shadow-md m-2">
            {/* display: asset name bolded with larger font size */}
            <h3 className="font-bold text-lg">{asset.name}</h3>
            {/* display: purchase date; show 'N/A' if asset.Purchase_date is null OR undefined */}
            <p className="text-sm">Added on: {asset.purchase_date || 'N/A'}</p>
        </div>
    );
};

export default AssetCard; 