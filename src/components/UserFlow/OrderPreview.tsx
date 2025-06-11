import React from 'react';
import { Package, MapPin, Clock, ArrowRight, AlertTriangle } from 'lucide-react';

interface OrderPreviewProps {
  orderData: any;
  qrCode: string;
  onStartCollection: () => void;
}

export const OrderPreview: React.FC<OrderPreviewProps> = ({ orderData, qrCode, onStartCollection }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'Média': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Baixa': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 p-8">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-t-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{orderData.id}</h1>
              <p className="text-xl text-gray-600">Ordem de Coleta</p>
            </div>
            <div className={`px-4 py-2 rounded-full border-2 text-lg font-medium ${getPriorityColor(orderData.priority)}`}>
              {orderData.priority}
            </div>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-primary-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-medium text-primary-700">Itens</span>
              </div>
              <p className="text-4xl font-bold text-primary-900">{orderData.items.length}</p>
            </div>
            <div className="bg-accent-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-accent-600" />
                <span className="text-xl font-medium text-accent-700">Tempo Est.</span>
              </div>
              <p className="text-4xl font-bold text-accent-900">{orderData.estimatedTime}</p>
            </div>
          </div>

          {/* QR Code Info */}
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-xl font-medium text-gray-700">QR Code Validado</span>
            </div>
            <p className="text-lg font-mono text-gray-600">{qrCode}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white flex">
          {/* Items List */}
          <div className="flex-1 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Itens para Coleta</h3>
            <div className="space-y-4">
              {orderData.items.map((item: any, index: number) => (
                <div key={item.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-medium text-gray-900">{item.name}</h4>
                    <div className="flex items-center gap-6 mt-2">
                      <div className="flex items-center gap-2 text-lg text-gray-600">
                        <span>Qtd: {item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="w-96 bg-gray-50 p-8 border-l border-gray-200">
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl">
              <AlertTriangle className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h4 className="text-xl font-medium text-blue-900 mb-3">Instruções</h4>
                <ul className="text-lg text-blue-700 space-y-2">
                  <li>• Siga as luzes do Picking Light</li>
                  <li>• Confirme cada item coletado</li>
                  <li>• Mantenha a ordem de coleta</li>
                  <li>• Use o mapa RFID para localização</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-b-3xl p-8">
          <button
            onClick={onStartCollection}
            className="w-full bg-gradient-to-r from-success-500 to-success-600 text-white py-6 rounded-2xl font-semibold text-2xl flex items-center justify-center gap-4 hover:shadow-lg transition-all duration-200"
          >
            <span>Iniciar Coleta</span>
            <ArrowRight className="w-8 h-8" />
          </button>

          <p className="text-center text-lg text-gray-500 mt-4">
            O sistema Picking Light será ativado automaticamente
          </p>
        </div>
      </div>
    </div>
  );
};