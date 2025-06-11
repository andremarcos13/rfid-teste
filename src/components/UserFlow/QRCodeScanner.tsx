import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle, ArrowRight } from 'lucide-react';

interface QRCodeScannerProps {
  userName: string;
  onQRScanned: (qrCode: string, orderData: any) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ userName, onQRScanned }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');

  const mockOrders = {
    'QR_ORD001_2024': {
      id: 'ORD001',
      items: [
        { id: '1', name: 'Capacete de Segurança', quantity: 5, location: 'A-01-03' },
        { id: '2', name: 'Luvas de Proteção', quantity: 10, location: 'A-02-01' },
        { id: '4', name: 'Óculos de Proteção', quantity: 3, location: 'A-01-07' }
      ],
      priority: 'Alta',
      estimatedTime: '8 min'
    },
    'QR_ORD002_2024': {
      id: 'ORD002',
      items: [
        { id: '3', name: 'Paracetamol 500mg', quantity: 2, location: 'B-01-05' },
        { id: '5', name: 'Ibuprofeno 400mg', quantity: 1, location: 'B-02-03' }
      ],
      priority: 'Média',
      estimatedTime: '5 min'
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);

    // Simulate QR code detection
    setTimeout(() => {
      const codes = Object.keys(mockOrders);
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      setScannedCode(randomCode);
      setIsScanning(false);

      setTimeout(() => {
        onQRScanned(randomCode, mockOrders[randomCode as keyof typeof mockOrders]);
      }, 1500);
    }, 2500);
  };

  const handleManualInput = () => {
    if (manualCode.trim() && mockOrders[manualCode as keyof typeof mockOrders]) {
      setScannedCode(manualCode);
      setTimeout(() => {
        onQRScanned(manualCode, mockOrders[manualCode as keyof typeof mockOrders]);
      }, 1000);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white rounded-t-3xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Escanear Ordem</h1>
          <p className="text-xl text-gray-600">Olá, {userName}</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white flex">
          {/* Scanner Interface */}
          <div className="flex-1 p-8">
            {/* Scanner Area */}
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-square mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Scanning State */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary-500 bg-opacity-20 animate-pulse"></div>
                    <div className="bg-black bg-opacity-70 p-8 rounded-xl text-center">
                      <Scan className="w-16 h-16 text-primary-400 animate-spin mx-auto mb-4" />
                      <p className="text-white text-xl font-medium">Procurando QR Code...</p>
                      <div className="flex justify-center mt-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success State */}
                {scannedCode && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-success-500 bg-opacity-95 p-8 rounded-xl text-center">
                      <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
                      <p className="text-white font-bold text-2xl">QR Code Detectado!</p>
                      <p className="text-white text-lg mt-3 font-mono">{scannedCode}</p>
                    </div>
                  </div>
                )}

                {/* Scanner Frame */}
                <div className="absolute top-12 left-12 w-12 h-12 border-l-4 border-t-4 border-primary-400"></div>
                <div className="absolute top-12 right-12 w-12 h-12 border-r-4 border-t-4 border-primary-400"></div>
                <div className="absolute bottom-12 left-12 w-12 h-12 border-l-4 border-b-4 border-primary-400"></div>
                <div className="absolute bottom-12 right-12 w-12 h-12 border-r-4 border-b-4 border-primary-400"></div>

                {/* Center Target */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 border-3 border-primary-400 rounded-xl flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-primary-400" />
                  </div>
                </div>

                {/* Scanning Line */}
                {isScanning && (
                  <div className="absolute inset-x-12 top-12 bottom-12">
                    <div className="w-full h-1 bg-primary-400 animate-bounce-slow"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={handleStartScan}
              disabled={isScanning || !!scannedCode}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-5 rounded-2xl font-semibold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 mb-6"
            >
              {isScanning ? 'Escaneando...' : scannedCode ? 'QR Code Lido!' : 'Iniciar Escaneamento'}
            </button>

            {/* Manual Input */}
            <div className="border-t border-gray-200 pt-6">
              <label className="block text-xl font-medium text-gray-700 mb-3">
                Entrada Manual
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="QR_ORD001_2024"
                  className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleManualInput()}
                />
                <button
                  onClick={handleManualInput}
                  className="px-6 py-3 bg-accent-100 text-accent-700 rounded-xl hover:bg-accent-200 transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="w-96 bg-gray-50 p-8 border-l border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ordens Recentes</h2>
            <div className="space-y-3">
              {Object.entries(mockOrders).map(([code, order]) => (
                <button
                  key={code}
                  onClick={() => {
                    setScannedCode(code);
                    setTimeout(() => onQRScanned(code, order), 1000);
                  }}
                  className="w-full text-left p-4 bg-white hover:bg-primary-50 rounded-xl transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-lg text-gray-900">{order.id}</p>
                      <p className="text-base text-gray-500">{order.items.length} itens • {order.estimatedTime}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${order.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                      order.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                      {order.priority}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-b-3xl p-6 text-center">
          <p className="text-lg text-gray-600">
            Posicione o QR Code dentro da área de escaneamento
          </p>
        </div>
      </div>
    </div>
  );
};