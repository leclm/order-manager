import React, { useState, useEffect } from "react";
import OrderList from "../components/OrderList";
import { mockOrders } from "../utils/mock";
import { Order } from "../types/types";
import OrderFilters from "../components/OrderFilters";

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");

  useEffect(() => {
    const allOrders = mockOrders[0].orders;
    setOrders(allOrders);
    setFilteredOrders(allOrders);
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesName = order.customer.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesStatus = searchStatus === "" || order.status === searchStatus;
      return matchesName && matchesStatus;
    });

    setFilteredOrders(filtered);
  }, [searchName, searchStatus, orders]);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl mb-6 p-10 border border-gray-700 text-left">
      <h1 className="text-2xl font-bold text-white mb-6">Lista de Pedidos</h1>
      
      <OrderFilters 
        searchName={searchName} 
        searchStatus={searchStatus} 
        setSearchName={setSearchName} 
        setSearchStatus={setSearchStatus} 
      />

      <OrderList orders={filteredOrders} />
    </div>
  );
};

export default Home;
