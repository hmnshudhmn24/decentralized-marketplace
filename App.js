import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MarketplaceABI from "./Marketplace.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const marketplaceContract = new ethers.Contract(CONTRACT_ADDRESS, MarketplaceABI.abi, signer);
                setContract(marketplaceContract);
                fetchItems(marketplaceContract);
            }
        }
        loadBlockchainData();
    }, []);

    async function fetchItems(contract) {
        const itemCount = await contract.itemCount();
        let itemsArray = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await contract.items(i);
            itemsArray.push(item);
        }
        setItems(itemsArray);
    }

    async function listItem() {
        if (!contract) return;
        const tx = await contract.listItem(name, ethers.utils.parseEther(price));
        await tx.wait();
        fetchItems(contract);
    }

    async function buyItem(id, price) {
        if (!contract) return;
        const tx = await contract.buyItem(id, { value: price });
        await tx.wait();
        fetchItems(contract);
    }

    return (
        <div className="container mx-auto p-5 text-center">
            <h1 className="text-2xl font-bold mb-4">Decentralized Marketplace</h1>
            <div>
                <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border" />
                <input type="text" placeholder="Price in ETH" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border ml-2" />
                <button onClick={listItem} className="bg-blue-500 text-white p-2 rounded ml-2">List Item</button>
            </div>
            <ul className="mt-4">
                {items.map((item, index) => (
                    <li key={index} className="p-2 border mt-2">
                        {item.name} - {ethers.utils.formatEther(item.price)} ETH
                        {item.buyer === ethers.constants.AddressZero ? (
                            <button onClick={() => buyItem(item.id, item.price)} className="bg-green-500 text-white p-2 rounded ml-2">Buy</button>
                        ) : (
                            <span className="ml-2 text-gray-500">Sold</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
