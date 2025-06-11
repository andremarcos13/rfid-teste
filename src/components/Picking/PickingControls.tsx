import React, { useState } from 'react';
import { Play, Square, QrCode, Lightbulb } from 'lucide-react';

interface PickingControlsProps {
  isActive: boolean;
  currentOrder: string | null;
  onStartPicking: (orderId: string) => void;
  onStopPicking: () => void;
}

export const PickingControls: React.FC<PickingControlsProps> = ({
  isActive,
  currentOrder,
  onStartPicking,
  onStopPicking
}) => {
  const [qrInput, setQrInput] = useState('');

  const handleStartSimulation = () => {
    if (!isActive) {
      onStartPicking('ORD001');
    } else {
      onStopPicking();
    }
  };

  const handleQRScan = () => {
    if (qrInput.trim()) {
      onStartPicking(qrInput.trim());
      setQrInput('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Controles</h3>
      </div>

      <div className="space-y-4">
        {/* QR Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código QR da Ordem
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="QR_ORD001_2024"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
            />
            <button
              onClick={handleQRScan}
              disabled={!qrInput.trim() || isActive}
              className="px-3 py-2 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success-500' : 'bg-gray-400'}`}></div>
          </div>
          <p className="text-sm text-gray-600">
            {isActive ? `Ativo - Ordem ${currentOrder}` : 'Aguardando ordem'}
          </p>
        </div>

        {/* Control Button */}
        <button
          onClick={handleStartSimulation}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            isActive
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:shadow-lg'
          }`}
        >
          {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Parar Picking' : 'Simular Picking'}
        </button>

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Escaneie o QR Code para iniciar</p>
          <p>• Siga as luzes para coletar itens</p>
          <p>• Clique nas posições ativas para simular coleta</p>
        </div>
      </div>
    </div>
  );
};