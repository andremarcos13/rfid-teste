import React from 'react';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Lightbulb,
  Camera,
  FileText,
  Settings,
  Warehouse,
  Smartphone,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'user-flow', label: 'Fluxo Operador', icon: UserCheck },
  { id: 'inventory', label: 'Estoque', icon: Package },
  { id: 'orders', label: 'Ordens', icon: ClipboardList },
  { id: 'picking', label: 'Picking Light', icon: Lightbulb },
  { id: 'counting', label: 'CountThing', icon: Camera },
  { id: 'token', label: 'Token Device', icon: Smartphone },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-primary-950 text-white w-64 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-lg">
          <Warehouse className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">SmartWarehouse</h1>
          <p className="text-primary-300 text-sm">Sistema Inteligente</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'text-primary-300 hover:text-white hover:bg-primary-800'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-slow' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-br from-primary-800 to-accent-900 rounded-lg">
        <p className="text-sm text-primary-100 mb-2">Status do Sistema</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-primary-200">Todos os sistemas operacionais</span>
        </div>
      </div>
    </div>
  );
};