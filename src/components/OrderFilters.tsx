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
        className="w-full p-2 rounded-lg border border-gray-700 bg-white/10 text-white placeholder-gray-400"
      />

      <select
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
        className="p-2 rounded-lg border border-gray-700 bg-white/10 text-white"
      >
        <option value="" className="text-black">
          Todos os Status
        </option>
        <option value="Cancelado" className="text-black">
          Cancelado
        </option>
        <option value="Entregue" className="text-black">
          Entregue
        </option>
        <option value="Pendente" className="text-black">
          Pendente
        </option>
      </select>
    </div>
  );
};

export default OrderFilters;
