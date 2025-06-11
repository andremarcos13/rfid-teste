import React from 'react';
import { Play, Square, Camera, MapPin, Download } from 'lucide-react';

interface CountingControlsProps {
  isScanning: boolean;
  selectedArea: string;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onAreaChange: (area: string) => void;
}

export const CountingControls: React.FC<CountingControlsProps> = ({
  isScanning,
  selectedArea,
  onStartScanning,
  onStopScanning,
  onAreaChange
}) => {
  const areas = [
    { value: 'all', label: 'Todo o Almoxarifado' },
    { value: 'a', label: 'Setor A - EPIs' },
    { value: 'b', label: 'Setor B - Medicamentos' }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Controles</h3>
        </div>

        <div className="space-y-4">
          {/* Area Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Área para Contagem
            </label>
            <select
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              disabled={isScanning}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none disabled:opacity-50"
            >
              {areas.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
          </div>

          {/* Scan Button */}
          <button
            onClick={isScanning ? onStopScanning : onStartScanning}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isScanning
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
            }`}
          >
            {isScanning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isScanning ? 'Parar Varredura' : 'Iniciar Varredura'}
          </button>

          {/* Status */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-primary-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </div>
            <p className="text-sm text-gray-600">
              {isScanning ? 'Analisando imagens...' : 'Pronto para escanear'}
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Precisão de Detecção</span>
            <select className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option>Alta (95%+)</option>
              <option>Média (85%+)</option>
              <option>Baixa (75%+)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Resolução</span>
            <select className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Auto-Save</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Dados
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Varreduras Hoje</span>
            <span className="font-semibold text-gray-900">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Precisão Média</span>
            <span className="font-semibold text-success-600">92.8%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tempo Médio</span>
            <span className="font-semibold text-gray-900">3.2s</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Itens Processados</span>
            <span className="font-semibold text-gray-900">2,847</span>
          </div>
        </div>
      </div>
    </div>
  );
};