import React, { useState, useEffect } from 'react';
import { Radio, CheckCircle, Package, ArrowLeft, Home, AlertCircle } from 'lucide-react';

interface RFIDMapProps {
  orderData: any;
  collectedItems: string[];
  onComplete: () => void;
  onBackToHome: () => void;
}

interface Item {
  id: string;
  name: string;
  location: string;
  quantity: number;
}

export const RFIDMap: React.FC<RFIDMapProps> = ({
  orderData,
  collectedItems,
  onComplete,
  onBackToHome
}) => {
  const [rfidDetections, setRfidDetections] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [scanStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - scanStartTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [scanStartTime]);

  // Simulate RFID detection
  useEffect(() => {
    if (isScanning && !isComplete) {
      const interval = setInterval(() => {
        const undetectedItems = collectedItems.filter(id => !rfidDetections.includes(id));
        if (undetectedItems.length > 0) {
          const randomItem = undetectedItems[Math.floor(Math.random() * undetectedItems.length)];
          setRfidDetections(prev => [...prev, randomItem]);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isScanning, collectedItems, rfidDetections, isComplete]);

  // Auto-complete when all items detected
  useEffect(() => {
    if (rfidDetections.length === collectedItems.length && collectedItems.length > 0 && !isComplete) {
      setIsComplete(true);
      setIsScanning(false);
    }
  }, [rfidDetections, collectedItems, isComplete]);

  const getItemDetails = (itemId: string): Item | undefined => {
    return orderData.items.find((item: Item) => item.id === itemId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDetectionStatus = () => {
    if (isComplete) return 'success';
    if (rfidDetections.length === 0) return 'waiting';
    if (rfidDetections.length < collectedItems.length) return 'scanning';
    return 'error';
  };

  const getStatusMessage = () => {
    const status = getDetectionStatus();
    switch (status) {
      case 'success':
        return 'Todos os itens foram verificados com sucesso!';
      case 'waiting':
        return 'Aguardando início da verificação RFID...';
      case 'scanning':
        return 'Verificando itens via RFID...';
      case 'error':
        return 'Erro na verificação RFID';
      default:
        return '';
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white rounded-t-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <Radio className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verificação RFID</h1>
              <p className="text-xl text-gray-600">Confirmação de Itens</p>
            </div>
          </div>

          {/* Status and Progress */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${isComplete ? 'bg-success-500' :
                  rfidDetections.length > 0 ? 'bg-primary-500 animate-pulse' :
                    'bg-gray-400'
                  }`}></div>
                <span className="text-xl font-medium text-gray-700">
                  {getStatusMessage()}
                </span>
              </div>
              <div className="text-xl font-medium text-gray-900">
                {formatTime(elapsedTime)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Progresso da Verificação</span>
                <span>{rfidDetections.length}/{collectedItems.length} itens</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-success-500 to-success-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${collectedItems.length > 0 ? (rfidDetections.length / collectedItems.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 bg-white p-8 overflow-auto">
          <div className="space-y-4">
            {collectedItems.map((itemId) => {
              const item = getItemDetails(itemId);
              const isDetected = rfidDetections.includes(itemId);

              return (
                <div
                  key={itemId}
                  className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 ${isDetected
                    ? 'bg-success-50 border-2 border-success-200'
                    : 'bg-white border-2 border-gray-200'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isDetected ? 'bg-success-500' : 'bg-gray-300'
                    }`}>
                    {isDetected ? (
                      <CheckCircle className="w-7 h-7 text-white" />
                    ) : (
                      <Radio className="w-7 h-7 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className={`text-xl font-medium ${isDetected ? 'text-success-900' : 'text-gray-900'}`}>
                        {item?.name}
                      </p>
                      {isDetected && (
                        <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                          Verificado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-base text-gray-600">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        <span>Qtd: {item?.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio className="w-5 h-5" />
                        <span>Local: {item?.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-b-3xl p-8">
          {isComplete ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Verificação Concluída!</h3>
              <p className="text-xl text-gray-600 mb-8">
                Todos os itens foram verificados via RFID em {formatTime(elapsedTime)}
              </p>
              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-6 rounded-2xl font-semibold text-2xl flex items-center justify-center gap-4 hover:shadow-lg transition-all duration-200"
              >
                <Home className="w-6 h-6" />
                <span>Finalizar e Voltar ao Início</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <Radio className="w-10 h-10 text-blue-600 mx-auto mb-3 animate-pulse" />
                <p className="text-xl text-blue-900 font-medium">Aguardando detecção RFID...</p>
                <p className="text-lg text-blue-700 mt-2">
                  Mantenha os itens próximos ao leitor
                </p>
              </div>

              <button
                onClick={() => setShowConfirmation(true)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar ao Início</span>
              </button>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirmar Ação</h3>
              <p className="text-lg text-gray-600 mb-8">
                Tem certeza que deseja voltar à tela inicial? O processo atual será encerrado.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={onBackToHome}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-medium"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};