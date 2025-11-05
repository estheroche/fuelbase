import React, { useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

const OrderForm = ({ contractAddress, pricePerLiter }) => {
  const [fuelAmount, setFuelAmount] = useState("");
  const [location, setLocation] = useState("");
  const { address } = useAccount();

  const { write: createOrder, data: orderData } = useContractWrite({
    address: contractAddress,
    abi: ["function createOrder(string,uint256)"],
    functionName: "createOrder",
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: orderData?.hash,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = parseFloat(fuelAmount) * parseFloat(pricePerLiter);
    createOrder({
      args: [location, fuelAmount],
      value: parseEther(totalPrice.toString()),
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-700/30 backdrop-blur-sm rounded-xl shadow-xl border border-gray-600">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Delivery Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter delivery address"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Fuel Amount (Liters)
          </label>
          <input
            type="number"
            value={fuelAmount}
            onChange={(e) => setFuelAmount(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount in liters"
            required
          />
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Price per liter:</span>
            <span className="text-white">{pricePerLiter} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Price:</span>
            <span className="text-white">
              {(
                parseFloat(fuelAmount || 0) * parseFloat(pricePerLiter)
              ).toFixed(4)}{" "}
              ETH
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={!address || isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700"
        >
          {!address
            ? "Connect Wallet to Order"
            : isLoading
            ? "Processing..."
            : "Place Order"}
        </button>
        {isSuccess && (
          <div className="mt-4 p-4 bg-green-900/50 border border-green-500 text-green-400 rounded-lg text-center">
            Order placed successfully! 🎉
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
