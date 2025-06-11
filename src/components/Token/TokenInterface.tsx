import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Scan, CheckCircle, AlertCircle, Radio, Lightbulb, Package } from 'lucide-react';

interface TokenInterfaceProps {
  onQRScanned?: (qrCode: string) => void;
}

export const TokenInterface: React.FC<TokenInterfaceProps> = ({ onQRScanned }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [scanHistory, setScanHistory] = useState<Array<{
    code: string;
    timestamp: Date;
    status: 'success' | 'error';
  }>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate RFID signal transmission
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate QR code detection after 2 seconds
    setTimeout(() => {
      const mockQRCode = `QR_ORD${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}_2024`;
      setScannedCode(mockQRCode);
      setIsScanning(false);
      setIsTransmitting(true);
      
      // Add to history
      setScanHistory(prev => [{
        code: mockQRCode,
        timestamp: new Date(),
        status: 'success'
      }, ...prev.slice(0, 4)]);

      // Simulate RFID transmission
      setTimeout(() => {
        setIsTransmitting(false);
        onQRScanned?.(mockQRCode);
      }, 1500);
    }, 2000);
  };

  const handleManualInput = (code: string) => {
    if (code.trim()) {
      setScannedCode(code);
      setIsTransmitting(true);
      
      setScanHistory(prev => [{
        code: code,
        timestamp: new Date(),
        status: 'success'
      }, ...prev.slice(0, 4)]);

      setTimeout(() => {
        setIsTransmitting(false);
        onQRScanned?.(code);
      }, 1500);
    }
  };

  const clearScan = () => {
    setScannedCode(null);
    setIsTransmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-900 to-gray-800 p-4">
      <div className="max-w-md mx-auto">
        {/* Device Header */}
        <div className="bg-gray-800 rounded-t-2xl p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">SmartToken v2.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${isConnected ? 'text-success-400' : 'text-red-400'}`} />
              <div className="flex items-center gap-1">
                <div className="w-6 h-3 border border-white rounded-sm">
                  <div 
                    className={`h-full rounded-sm transition-all duration-300 ${
                      batteryLevel > 20 ? 'bg-success-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
                <span className="text-white text-xs">{batteryLevel}%</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-white text-lg font-bold">Token de Picking</h1>
            <p className="text-gray-300 text-sm">Escaneie QR Code para iniciar</p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-b-2xl overflow-hidden shadow-2xl">
          {/* Scanner Area */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="relative bg-black rounded-xl overflow-hidden aspect-square mb-4">
              {/* Camera simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Scanning overlay */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary-500 bg-opacity-20 animate-pulse"></div>
                    <div className="bg-black bg-opacity-70 p-4 rounded-lg">
                      <Scan className="w-8 h-8 text-success-400 animate-spin mx-auto mb-2" />
                      <p className="text-white text-sm">Escaneando...</p>
                    </div>
                  </div>
                )}

                {/* RFID Transmission overlay */}
                {isTransmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-accent-500 bg-opacity-20 animate-pulse"></div>
                    <div className="bg-black bg-opacity-70 p-4 rounded-lg text-center">
                      <Radio className="w-8 h-8 text-accent-400 animate-pulse mx-auto mb-2" />
                      <p className="text-white text-sm">Transmitindo RFID...</p>
                      <div className="flex justify-center mt-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success state */}
                {scannedCode && !isTransmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-success-500 bg-opacity-90 p-6 rounded-lg text-center">
                      <CheckCircle className="w-12 h-12 text-white mx-auto mb-3" />
                      <p className="text-white font-bold">QR Code Lido!</p>
                      <p className="text-white text-sm mt-1">{scannedCode}</p>
                    </div>
                  </div>
                )}

                {/* Corner indicators */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-success-400"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-success-400"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-success-400"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-success-400"></div>

                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 border-2 border-success-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStartScan}
                disabled={isScanning || isTransmitting}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
              >
                <QrCode className="w-6 h-6" />
                {isScanning ? 'Escaneando...' : 'Escanear QR Code'}
              </button>

              {scannedCode && (
                <button
                  onClick={clearScan}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Limpar Scan
                </button>
              )}
            </div>
          </div>

          {/* Manual Input */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Entrada Manual</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="QR_ORD001_2024"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleManualInput((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="QR_ORD001_2024"]') as HTMLInputElement;
                  if (input?.value) {
                    handleManualInput(input.value);
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors"
              >
                OK
              </button>
            </div>
          </div>

          {/* Status and History */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Status do Sistema</h3>
              <div className="flex items-center gap-2">
                <Lightbulb className={`w-4 h-4 ${isTransmitting ? 'text-accent-500 animate-pulse' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {isTransmitting ? 'Ativando Picking Light...' : 'Aguardando'}
                </span>
              </div>
            </div>

            {scanHistory.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Últimos Scans</h4>
                <div className="space-y-2">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-900">{scan.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success-500" />
                        <span className="text-xs text-gray-500">
                          {scan.timestamp.toLocaleTimeString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};