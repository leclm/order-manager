import React from "react";

interface OrderFiltersProps {
  searchName: string;
  searchStatus: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchName,
  searchStatus,
  setSearchName,
  setSearchStatus,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar por nome do cliente..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 shadow-inner"
      />

      <select
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
        className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white shadow-inner"
        role="listbox"
      >
        <option value="">Todos os Status</option>
        <option value="Aprovado">Aprovado</option>
        <option value="Cancelado">Cancelado</option>
        <option value="Entregue">Entregue</option>
        <option value="Pendente">Pendente</option>
      </select>
    </div>
  );
};

export default OrderFilters;