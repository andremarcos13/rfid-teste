import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface InventoryFiltersProps {
  onFiltersChange: (search: string, category: string, status: string) => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({ onFiltersChange }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const handleFilterChange = () => {
    onFiltersChange(search, category, status);
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [search, category, status]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, RFID ou localização..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">Todas as Categorias</option>
          <option value="EPI">EPI</option>
          <option value="Medicamento">Medicamento</option>
        </select>
        
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">Todos os Status</option>
          <option value="available">Disponível</option>
          <option value="reserved">Reservado</option>
          <option value="out">Indisponível</option>
        </select>
      </div>
    </div>
  );
};