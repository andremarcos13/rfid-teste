import React, { useState, useEffect } from 'react';
import { Package, MapPin, CheckCircle, Lightbulb, ArrowRight, Clock } from 'lucide-react';

interface PickingInterfaceProps {
  orderData: any;
  onItemCollected: (itemId: string) => void;
  onPickingComplete: () => void;
}

export const PickingInterface: React.FC<PickingInterfaceProps> = ({ 
  orderData, 
  onItemCollected, 
  onPickingComplete 
}) => {
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isCollecting, setIsCollecting] = useState(false);
  const [startTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentItem = orderData.items[currentItemIndex];
  const isComplete = collectedItems.length === orderData.items.length;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleCollectItem = (itemId: string) => {
    setIsCollecting(true);
    
    setTimeout(() => {
      setCollectedItems(prev => [...prev, itemId]);
      onItemCollected(itemId);
      setIsCollecting(false);
      
      if (currentItemIndex < orderData.items.length - 1) {
        setCurrentItemIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          onPickingComplete();
        }, 1500);
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLocationZone = (location: string) => {
    return location.startsWith('A') ? 'A' : 'B';
  };

  const getLocationColor = (location: string) => {
    return location.startsWith('A') ? 'primary' : 'accent';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Picking Ativo</h1>
              <p className="text-gray-600">{orderData.id}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {collectedItems.length}/{orderData.items.length} itens
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(collectedItems.length / orderData.items.length) * 100}%` }}
            ></div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success-700">
              {isComplete ? 'Coleta Concluída!' : 'Sistema Picking Light Ativo'}
            </span>
          </div>
        </div>

        {/* Current Item */}
        {!isComplete && currentItem && (
          <div className="bg-white border-t border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center animate-pulse">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Item Atual</h3>
                  <p className="text-gray-600">Siga a luz para localizar</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border-2 border-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-${getLocationColor(currentItem.location)}-100 rounded-xl flex items-center justify-center`}>
                    <Package className={`w-8 h-8 text-${getLocationColor(currentItem.location)}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{currentItem.name}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">Qtd: {currentItem.quantity}</span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="font-mono">{currentItem.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Indicator */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`px-4 py-2 bg-${getLocationColor(currentItem.location)}-500 text-white rounded-full font-bold text-lg animate-bounce`}>
                    Setor {getLocationZone(currentItem.location)}
                  </div>
                </div>

                <button
                  onClick={() => handleCollectItem(currentItem.id)}
                  disabled={isCollecting}
                  className="w-full bg-gradient-to-r from-success-500 to-success-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  {isCollecting ? 'Coletando...' : 'Confirmar Coleta'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white border-t border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lista de Itens</h3>
            <div className="space-y-3">
              {orderData.items.map((item: any, index: number) => {
                const isCollected = collectedItems.includes(item.id);
                const isCurrent = index === currentItemIndex && !isCollected;
                
                return (
                  <div 
                    key={item.id} 
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      isCollected 
                        ? 'bg-success-50 border-2 border-success-200' 
                        : isCurrent 
                        ? 'bg-primary-50 border-2 border-primary-200 animate-pulse' 
                        : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCollected 
                        ? 'bg-success-500' 
                        : isCurrent 
                        ? 'bg-primary-500' 
                        : 'bg-gray-300'
                    }`}>
                      {isCollected ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Package className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${isCollected ? 'text-success-900' : 'text-gray-900'}`}>
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">Qtd: {item.quantity}</span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCollected && (
                        <div className="text-success-600 text-sm font-medium">
                          ✓ Coletado
                        </div>
                      )}
                      {isCurrent && (
                        <div className="text-primary-600 text-sm font-medium animate-pulse">
                          → Atual
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Complete State */}
        {isComplete && (
          <div className="bg-white rounded-b-2xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coleta Concluída!</h3>
              <p className="text-gray-600 mb-4">
                Todos os itens foram coletados em {formatTime(elapsedTime)}
              </p>
              <button
                onClick={onPickingComplete}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-200"
              >
                <span>Continuar para RFID</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};