import React, { useState, useEffect, useMemo } from "react";
import { mockOrders } from "../utils/mock";
import { Order } from "../types/types";
import OrderFilters from "../components/OrderFilters/OrderFilters";
import OrderList from "../components/OrderList/OrderList";

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");

  useEffect(() => {
    const allOrders = mockOrders[0].orders;
    setOrders(allOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesName = order.customer.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesStatus =
        searchStatus === "" || order.status === searchStatus;
      return matchesName && matchesStatus;
    });
  }, [searchName, searchStatus, orders]);

  const errorMessage = useMemo(() => {
    if (filteredOrders.length === 0) {
      if (searchName && searchStatus) {
        return "Nenhum pedido encontrado com esse nome e status.";
      } else if (searchName) {
        return "Nenhum pedido encontrado com esse nome.";
      } else if (searchStatus) {
        return "Nenhum pedido encontrado com esse status.";
      }
    }
    return "";
  }, [filteredOrders, searchName, searchStatus]);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl mb-6 p-10 border border-gray-700 text-left">
      <h1 className="text-2xl font-bold text-white mb-6">Lista de Pedidos</h1>

      <OrderFilters
        searchName={searchName}
        searchStatus={searchStatus}
        setSearchName={setSearchName}
        setSearchStatus={setSearchStatus}
      />

      <OrderList orders={filteredOrders} errorMessage={errorMessage} />
    </div>
  );
};

export default Home;
