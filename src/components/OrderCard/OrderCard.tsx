import React from "react";
import { Link } from "react-router-dom";
import { Order } from "../../types/types";

interface OrderCardProps {
  order: Order;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovado":
      return "bg-blue-100 text-blue-900";
    case "Cancelado":
      return "bg-red-100 text-red-900";
    case "Entregue":
      return "bg-green-100 text-green-900";
    case "Pendente":
      return "bg-yellow-100 text-yellow-900";
    default:
      return "bg-gray-100 text-gray-900";
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white/10 border border-gray-700 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Pedido #{order.id}
            </h2>
            <p className="text-sm text-gray-400">
              <strong>Cliente:</strong> {order.customer.name}
            </p>
          </div>

          <p
            className={`text-sm font-semibold py-1 px-2 rounded-md ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-200 mb-2 text-left">
            Itens:
          </h3>
          {order.items.map((item, index) => (
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
                <p>Preço: {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end mt-4">
          <p className="text-white font-semibold text-lg mb-2">
            Total: R${order.total.toFixed(2)}
          </p>
          <Link to={`/order/${order.id}`}>
            <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
              Ver Detalhes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
