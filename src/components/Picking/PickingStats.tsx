import React from 'react';
import { PickingLocation } from '../../types';
import { Target, CheckCircle, Clock } from 'lucide-react';

interface PickingStatsProps {
  locations: PickingLocation[];
}

export const PickingStats: React.FC<PickingStatsProps> = ({ locations }) => {
  const totalLocations = locations.length;
  const activeLocations = locations.filter(loc => loc.isActive).length;
  const completedToday = 47; // Mock data
  const avgTime = '2.3'; // Mock data

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Target className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Posições Ativas</p>
            <p className="text-xl font-bold text-gray-900">{activeLocations}/{totalLocations}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-success-100 rounded-lg">
            <CheckCircle className="w-4 h-4 text-success-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Coletas Hoje</p>
            <p className="text-xl font-bold text-gray-900">{completedToday}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning-100 rounded-lg">
            <Clock className="w-4 h-4 text-warning-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tempo Médio</p>
            <p className="text-xl font-bold text-gray-900">{avgTime}min</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">Eficiência por Setor</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Setor A</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full w-4/5"></div>
              </div>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Setor B</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full w-3/4"></div>
              </div>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};