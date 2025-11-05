import React from "react";
import { useAccount, useContractRead } from "wagmi";
import OrderStatus from "./OrderStatus";

const OrderHistory = ({ contractAddress }) => {
  const { address } = useAccount();

  const { data: orderIds } = useContractRead({
    address: contractAddress,
    abi: ["function getCustomerOrders(address) view returns (uint256[])"],
    functionName: "getCustomerOrders",
    args: [address],
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6">
        {!address ? (
          <div className="text-center p-8 bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600">
            <p className="text-gray-300 text-lg">
              Please connect your wallet to view your orders
            </p>
          </div>
        ) : orderIds?.length === 0 ? (
          <div className="text-center p-8 bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600">
            <p className="text-gray-300 text-lg">No orders found</p>
            <p className="text-gray-400 mt-2">
              Place your first order to get started!
            </p>
          </div>
        ) : (
          orderIds?.map((orderId) => (
            <OrderStatus
              key={orderId.toString()}
              orderId={orderId}
              contractAddress={contractAddress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
