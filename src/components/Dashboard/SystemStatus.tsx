import React from 'react';
import { Radio, Wifi, Camera, Shield } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const systems = [
    { name: 'RFID', status: 'online', icon: Radio, color: 'success' },
    { name: 'Picking Light', status: 'online', icon: Wifi, color: 'success' },
    { name: 'CountThing', status: 'maintenance', icon: Camera, color: 'warning' },
    { name: 'Security', status: 'online', icon: Shield, color: 'success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success-600 bg-success-100';
      case 'maintenance': return 'text-warning-600 bg-warning-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'maintenance': return 'Manutenção';
      case 'offline': return 'Offline';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Status dos Sistemas</h3>
      
      <div className="space-y-4">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <div key={system.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">{system.name}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                {getStatusText(system.status)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="text-sm font-medium text-gray-900">99.8%</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full w-[99.8%]"></div>
        </div>
      </div>
    </div>
  );
};