import React from 'react';
import { Order } from '../types/types';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-6">
      {orders.map(order => (
        <OrderCard key={order.uuid} order={order} />
      ))}
    </div>
  );
};

export default OrderList;