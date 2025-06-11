import React, { useState } from 'react';
import { X, Package, Plus, Minus } from 'lucide-react';
import { mockInventoryItems } from '../../data/mockData';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItem {
  itemId: string;
  quantity: number;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const availableItems = mockInventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    item.status === 'available'
  );

  const handleAddItem = (itemId: string) => {
    const existingItem = selectedItems.find(item => item.itemId === itemId);
    if (existingItem) {
      setSelectedItems(prev => 
        prev.map(item => 
          item.itemId === itemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems(prev => [...prev, { itemId, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setSelectedItems(prev => 
        prev.map(item => 
          item.itemId === itemId 
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating order with items:', selectedItems);
    onClose();
  };

  const getItemDetails = (itemId: string) => {
    return mockInventoryItems.find(item => item.id === itemId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Criar Nova Ordem</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Available Items */}
          <div className="flex-1 p-6 border-r border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Itens Disponíveis</h4>
            <input
              type="text"
              placeholder="Buscar itens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none mb-4"
            />
            <div className="overflow-y-auto h-[480px] space-y-2">
              {availableItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.location} • Qtd: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => handleAddItem(item.id)}
                    className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Items */}
          <div className="flex-1 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Itens Selecionados ({selectedItems.length})</h4>
            <div className="overflow-y-auto h-[480px] space-y-2">
              {selectedItems.map((orderItem) => {
                const item = getItemDetails(orderItem.itemId);
                if (!item) return null;
                
                return (
                  <div key={orderItem.itemId} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(orderItem.itemId, orderItem.quantity - 1)}
                        className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{orderItem.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(orderItem.itemId, orderItem.quantity + 1)}
                        className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(orderItem.itemId)}
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {selectedItems.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum item selecionado</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Ordem
          </button>
        </div>
      </div>
    </div>
  );
};