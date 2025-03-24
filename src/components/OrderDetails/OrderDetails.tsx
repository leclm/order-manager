import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockOrders } from "../../utils/mock";
import { Order } from "../../types/types";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const order: Order | undefined = mockOrders[0].orders.find(
    (o) => o.id === orderId
  );

  const formattedDate = order
    ? new Date(order.delivery_estimated).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    : "Data não disponível";

  return !order ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">
        Pedido não encontrado
      </h1>
      <Link to={`/`}>
        <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
          Voltar
        </button>
      </Link>
    </div>
  ) : (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl mb-6 p-10 border border-gray-700 text-left">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/`}>
          <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
            Voltar
          </button>
        </Link>

        <h1 className="text-2xl font-bold text-white mb-6">
          Detalhes do Pedido #{order?.id}
        </h1>
      </div>
      <div className="bg-white/10 p-6 rounded-2xl shadow-xl mb-6 border border-gray-700 text-left">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Informações do Pedido
        </h2>
        <p>
          <strong className="font-semibold text-blue-200">Status:</strong>{" "}
          {order?.status}
        </p>
        <p>
          <strong className="font-semibold text-blue-200">
            Método de Entrega:
          </strong>{" "}
          {order?.shipping_method}
        </p>
        <p>
          <strong className="font-semibold text-blue-200">
            Data Estimada de Entrega:
          </strong>{" "}
          {formattedDate}
        </p>
        <p>
          <strong className="font-semibold text-blue-200">
            Custo de Entrega:
          </strong>{" "}
          R${order?.delivery_cost.toFixed(2)}
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl mb-6 border border-gray-700 text-left">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Informações do Cliente
        </h2>
        <p>
          <strong className="font-semibold text-blue-200">Nome:</strong>{" "}
          {order?.customer.name}
        </p>
        <p>
          <strong className="font-semibold text-blue-200">Endereço:</strong>{" "}
          {order?.customer.address}
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl mb-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Itens do Pedido
        </h2>
        {order?.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-3 p-2 bg-white/10 rounded-lg justify-between"
          >
            <img
              src={item.imagem}
              alt={item.name}
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />
            <div className="text-sm text-gray-400">
              <p className="font-semibold text-blue-200">{item.name}</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>Preço Unitário: R${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-gray-700 text-right">
        <h2 className="text-xl font-bold text-white">
          Total do Pedido: R${order?.total.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default OrderDetails;
