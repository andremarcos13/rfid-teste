import React from 'react';
import { Package, QrCode, AlertTriangle, CheckCircle } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'picking',
      message: 'Ordem ORD001 finalizada - 15 itens coletados',
      timestamp: '2 min atrás',
      icon: CheckCircle,
      color: 'success'
    },
    {
      id: 2,
      type: 'rfid',
      message: 'Novo item cadastrado: Máscara N95 (RFID006)',
      timestamp: '5 min atrás',
      icon: Package,
      color: 'primary'
    },
    {
      id: 3,
      type: 'qr',
      message: 'QR Code gerado para ordem ORD003',
      timestamp: '8 min atrás',
      icon: QrCode,
      color: 'accent'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Alerta: Estoque baixo detectado no setor B',
      timestamp: '12 min atrás',
      icon: AlertTriangle,
      color: 'warning'
    },
    {
      id: 5,
      type: 'counting',
      message: 'Inventário completado no setor A-01',
      timestamp: '15 min atrás',
      icon: CheckCircle,
      color: 'success'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success': return 'text-success-600 bg-success-100';
      case 'primary': return 'text-primary-600 bg-primary-100';
      case 'accent': return 'text-accent-600 bg-accent-100';
      case 'warning': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividade Recente</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
        Ver todas as atividades
      </button>
    </div>
  );
};