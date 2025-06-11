import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
}

const tabTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'user-flow': 'Fluxo do Operador',
  inventory: 'Gestão de Estoque',
  orders: 'Gestão de Ordens',
  picking: 'Sistema Picking by Light',
  counting: 'CountThing - Contagem Inteligente',
  token: 'Token Device - Interface de Campo',
  reports: 'Relatórios e Analytics',
  settings: 'Configurações do Sistema'
};

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{tabTitles[activeTab]}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Sistema integrado de gestão com RFID, Picking by Light e CountThing
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-500 rounded-full animate-pulse"></div>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin Usuario</p>
              <p className="text-xs text-gray-500">Supervisor</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};