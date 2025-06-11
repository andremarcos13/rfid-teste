import React from 'react';
import { BarChart3 } from 'lucide-react';

export const ActivityChart: React.FC = () => {
  const data = [
    { day: 'Seg', picking: 45, counting: 12 },
    { day: 'Ter', picking: 52, counting: 8 },
    { day: 'Qua', picking: 38, counting: 15 },
    { day: 'Qui', picking: 61, counting: 10 },
    { day: 'Sex', picking: 55, counting: 18 },
    { day: 'Sáb', picking: 28, counting: 5 },
    { day: 'Dom', picking: 15, counting: 3 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.picking, d.counting)));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Atividade Semanal</h3>
          <p className="text-gray-500 text-sm">Operações de Picking e Contagem</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.day} className="flex items-center gap-4">
            <div className="w-8 text-sm font-medium text-gray-600">{item.day}</div>
            <div className="flex-1 flex gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Picking</span>
                  <span className="text-xs font-medium text-gray-700">{item.picking}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(item.picking / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Contagem</span>
                  <span className="text-xs font-medium text-gray-700">{item.counting}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(item.counting / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};