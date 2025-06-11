import React, { useEffect, useState } from 'react';
import { Camera, Focus, Scan } from 'lucide-react';

interface CameraViewProps {
  isScanning: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  selectedArea: string;
}

export const CameraView: React.FC<CameraViewProps> = ({ isScanning, videoRef, selectedArea }) => {
  const [detectedItems, setDetectedItems] = useState<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    confidence: number;
  }>>([]);

  useEffect(() => {
    if (isScanning) {
      // Simulate object detection
      const interval = setInterval(() => {
        const mockDetections = [
          { x: 20, y: 15, width: 80, height: 60, label: 'Capacete', confidence: 0.94 },
          { x: 120, y: 80, width: 60, height: 40, label: 'Luvas', confidence: 0.87 },
          { x: 200, y: 45, width: 70, height: 50, label: 'Óculos', confidence: 0.91 }
        ];
        setDetectedItems(mockDetections);
      }, 500);

      return () => clearInterval(interval);
    } else {
      setDetectedItems([]);
    }
  }, [isScanning]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Visualização da Câmera</h3>
          <p className="text-gray-500 text-sm">Área selecionada: {selectedArea === 'all' ? 'Todo o almoxarifado' : `Setor ${selectedArea.toUpperCase()}`}</p>
        </div>
      </div>

      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {/* Camera feed simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-gray-600"></div>
              ))}
            </div>
          </div>

          {/* Simulated shelving units */}
          <div className="absolute inset-4">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-2 flex flex-col">
                  <div className="flex-1 bg-gray-600 rounded mb-2"></div>
                  <div className="flex-1 bg-gray-600 rounded mb-2"></div>
                  <div className="flex-1 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection boxes */}
          {isScanning && detectedItems.map((item, index) => (
            <div
              key={index}
              className="absolute border-2 border-success-400 bg-success-400 bg-opacity-10 animate-pulse"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.width}px`,
                height: `${item.height}px`
              }}
            >
              <div className="absolute -top-6 left-0 bg-success-400 text-black text-xs px-2 py-1 rounded">
                {item.label} ({Math.round(item.confidence * 100)}%)
              </div>
            </div>
          ))}

          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-500 bg-opacity-10 animate-pulse"></div>
              <div className="bg-black bg-opacity-50 p-4 rounded-lg flex items-center gap-3">
                <Scan className="w-6 h-6 text-success-400 animate-spin" />
                <span className="text-white font-medium">Analisando imagem...</span>
              </div>
            </div>
          )}

          {/* Center focus point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Focus className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>

        {/* Corner indicators */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-success-400"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-success-400"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-success-400"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-success-400"></div>
      </div>

      {/* Status indicator */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-success-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">
            {isScanning ? 'Processando...' : 'Aguardando comando'}
          </span>
        </div>
        {detectedItems.length > 0 && (
          <span className="text-sm font-medium text-success-600">
            {detectedItems.length} itens detectados
          </span>
        )}
      </div>
    </div>
  );
};