import React from "react";
import { Order } from "../../types/types";
import OrderCard from "../OrderCard/OrderCard";

interface OrderListProps {
  orders: Order[];
  errorMessage: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders, errorMessage }) => {
  return (
    <div className="space-y-6" role="list">
      {errorMessage && (
        <p className="text-red-400 bg-red-900/20 border border-red-500 p-2 rounded-lg shadow-md mt-4">
          {errorMessage}
        </p>
      )}

      {orders.map((order) => (
        <OrderCard key={order.uuid} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
