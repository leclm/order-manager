import React from "react";
import { useParams } from "react-router-dom";
import { mockOrders } from "../utils/mock";
import { Order } from "../types/types";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const order: Order | undefined = mockOrders[0].orders.find(
    (o) => o.id === orderId
  );

  if (!order) {
    return (
      <div className="text-center text-white mt-8">Pedido não encontrado.</div>
    );
  }

  const formattedDate = new Date(order.delivery_estimated).toLocaleDateString(
    "pt-BR",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  );
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Detalhes do Pedido #{order.id}
      </h1>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg mb-6 border border-gray-700 text-left">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Informações do Pedido
        </h2>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Método de Entrega:</strong> {order.shipping_method}
        </p>
        <p>
          <strong>Data Estimada de Entrega:</strong> {formattedDate}
        </p>
        <p>
          <strong>Custo de Entrega:</strong> R${order.delivery_cost.toFixed(2)}
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg mb-6 border border-gray-700 text-left">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Informações do Cliente
        </h2>
        <p>
          <strong>Nome:</strong> {order.customer.name}
        </p>
        <p>
          <strong>Endereço:</strong> {order.customer.address}
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-gray-700 justify-between">
        <h2 className="text-xl font-bold text-white mb-4">Itens do Pedido</h2>
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-3 p-2 bg-white/5 rounded-lg justify-between"
          >
            <img
              src={item.imagem}
              alt={item.name}
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />
            <div className="text-sm text-gray-300">
              <p className="font-semibold text-white">{item.name}</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
            <div className="text-sm text-gray-300">
              <p>Preço Unitário: R${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right text-white font-bold text-2xl mt-6">
        Total do Pedido: R${order.total.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderDetails;
