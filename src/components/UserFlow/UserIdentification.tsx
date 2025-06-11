import React, { useState } from 'react';
import { User, Scan, CheckCircle, AlertCircle } from 'lucide-react';

interface UserIdentificationProps {
  onUserIdentified: (userId: string, userName: string) => void;
}

export const UserIdentification: React.FC<UserIdentificationProps> = ({ onUserIdentified }) => {
  const [userId, setUserId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const mockUsers = [
    { id: 'USR001', name: 'João Silva', role: 'Operador Senior' },
    { id: 'USR002', name: 'Maria Santos', role: 'Supervisora' },
    { id: 'USR003', name: 'Pedro Costa', role: 'Operador' }
  ];

  const handleScanBadge = () => {
    setIsScanning(true);
    setError('');

    // Simulate badge scan
    setTimeout(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      setUserId(randomUser.id);
      setIsScanning(false);

      setTimeout(() => {
        onUserIdentified(randomUser.id, randomUser.name);
      }, 1000);
    }, 2000);
  };

  const handleManualLogin = () => {
    if (!userId.trim()) {
      setError('Digite seu ID de usuário');
      return;
    }

    const user = mockUsers.find(u => u.id.toLowerCase() === userId.toLowerCase());
    if (user) {
      onUserIdentified(user.id, user.name);
    } else {
      setError('Usuário não encontrado');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-12 text-center">
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">SmartDepot</h1>
          <p className="text-xl text-primary-100">Identificação do Operador</p>
        </div>

        {/* Content */}
        <div className="p-12 space-y-8">
          {/* Badge Scanner */}
          <div className="text-center">
            <div className={`
              relative w-48 h-48 mx-auto mb-6 rounded-3xl border-4 transition-all duration-300
              ${isScanning
                ? 'border-primary-500 bg-primary-50 animate-pulse'
                : 'border-gray-300 bg-gray-50 hover:border-primary-300'
              }
            `}>
              <div className="absolute inset-0 flex items-center justify-center">
                {isScanning ? (
                  <Scan className="w-24 h-24 text-primary-500 animate-spin" />
                ) : userId ? (
                  <CheckCircle className="w-24 h-24 text-success-500" />
                ) : (
                  <User className="w-24 h-24 text-gray-400" />
                )}
              </div>

              {/* Scanning animation */}
              {isScanning && (
                <div className="absolute inset-0 border-4 border-primary-500 rounded-3xl animate-ping"></div>
              )}
            </div>

            <button
              onClick={handleScanBadge}
              disabled={isScanning}
              className="w-full max-w-md bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 text-xl rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
            >
              {isScanning ? 'Escaneando Crachá...' : 'Escanear Crachá'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-lg">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-3">
                ID do Usuário
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError('');
                }}
                placeholder="USR001"
                className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleManualLogin()}
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-600 text-lg">
                <AlertCircle className="w-6 h-6" />
                {error}
              </div>
            )}

            <button
              onClick={handleManualLogin}
              className="w-full bg-gray-100 text-gray-700 py-4 text-xl rounded-2xl font-medium hover:bg-gray-200 transition-colors"
            >
              Entrar Manualmente
            </button>
          </div>

          {/* Quick Access */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">Acesso Rápido:</p>
            <div className="grid grid-cols-3 gap-4">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => onUserIdentified(user.id, user.name)}
                  className="p-4 text-base bg-gray-50 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors text-center"
                >
                  <div className="font-medium text-lg">{user.id}</div>
                  <div className="text-gray-500">{user.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};