import React, { useState } from 'react';
import { InventoryList } from './InventoryList';
import { InventoryFilters } from './InventoryFilters';
import { AddItemModal } from './AddItemModal';
import { Plus } from 'lucide-react';
import { mockInventoryItems } from '../../data/mockData';

export const InventoryManagement: React.FC = () => {
  const [items] = useState(mockInventoryItems);
  const [filteredItems, setFilteredItems] = useState(mockInventoryItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleFiltersChange = (search: string, category: string, status: string) => {
    setSearchTerm(search);
    setCategoryFilter(category);
    setStatusFilter(status);

    let filtered = items;

    if (search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.rfidTag.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    if (status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Estoque</h2>
          <p className="text-gray-500 mt-1">Gerencie itens com tecnologia RFID</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Adicionar Item
        </button>
      </div>

      <InventoryFilters onFiltersChange={handleFiltersChange} />
      <InventoryList items={filteredItems} />
      
      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};