import React, { useState } from 'react';
import { OrderList } from './OrderList';
import { CreateOrderModal } from './CreateOrderModal';
import { QRCodeDisplay } from './QRCodeDisplay';
import { Plus, QrCode } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types';

export const OrderManagement: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOrderQR, setSelectedOrderQR] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Ordens</h2>
          <p className="text-gray-500 mt-1">Crie e gerencie ordens com QR Codes</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedOrderQR(orders[0]?.qrCode || null)}
            className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <QrCode className="w-4 h-4" />
            Ver QR Code
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Nova Ordem
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pendentes</h3>
          <p className="text-3xl font-bold text-warning-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Em Picking</h3>
          <p className="text-3xl font-bold text-primary-600">
            {orders.filter(o => o.status === 'picking').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Concluídas</h3>
          <p className="text-3xl font-bold text-success-600">
            {orders.filter(o => o.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Canceladas</h3>
          <p className="text-3xl font-bold text-red-600">
            {orders.filter(o => o.status === 'cancelled').length}
          </p>
        </div>
      </div>

      <OrderList orders={orders} onViewQR={setSelectedOrderQR} />

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <QRCodeDisplay
        qrCode={selectedOrderQR}
        onClose={() => setSelectedOrderQR(null)}
      />
    </div>
  );
};