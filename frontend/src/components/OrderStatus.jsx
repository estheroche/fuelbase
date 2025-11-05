import React from "react";
import { useContractRead } from "wagmi";

const OrderStatus = ({ orderId, contractAddress }) => {
  const { data: order } = useContractRead({
    address: contractAddress,
    abi: [
      "function getOrder(uint256) view returns (tuple(uint256,address,string,uint256,uint256,uint8,uint256))",
    ],
    functionName: "getOrder",
    args: [orderId],
  });

  const getStatusText = (status) => {
    const statuses = [
      "Pending",
      "Confirmed",
      "InTransit",
      "Delivered",
      "Cancelled",
    ];
    return statuses[status] || "Unknown";
  };

  if (!order) return null;

  return (
    <div className="p-6 bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">Order #{orderId}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            order[5] === 0
              ? "bg-yellow-400/20 text-yellow-400"
              : order[5] === 1
              ? "bg-blue-400/20 text-blue-400"
              : order[5] === 2
              ? "bg-purple-400/20 text-purple-400"
              : order[5] === 3
              ? "bg-green-400/20 text-green-400"
              : "bg-red-400/20 text-red-400"
          }`}
        >
          {getStatusText(order[5])}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="text-gray-400 text-sm">Amount</div>
            <div className="text-white font-medium">
              {order[3].toString()} liters
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Total Price</div>
            <div className="text-white font-medium">
              {(parseInt(order[4].toString()) / 1e18).toFixed(4)} ETH
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Delivery Location</div>
          <div className="text-white font-medium break-words">{order[2]}</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="text-gray-400 text-sm">Ordered on</div>
        <div className="text-white">
          {new Date(Number(order[6]) * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
