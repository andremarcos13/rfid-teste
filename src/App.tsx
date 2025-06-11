import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InventoryManagement } from './components/Inventory/InventoryManagement';
import { OrderManagement } from './components/Orders/OrderManagement';
import { PickingSystem } from './components/Picking/PickingSystem';
import { CountThingSystem } from './components/CountThing/CountThingSystem';
import { TokenInterface } from './components/Token/TokenInterface';
import { UserFlowManager } from './components/UserFlow/UserFlowManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <InventoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'picking':
        return <PickingSystem />;
      case 'counting':
        return <CountThingSystem />;
      case 'token':
        return <TokenInterface onQRScanned={(code) => {
          console.log('QR Code escaneado:', code);
          setActiveTab('picking');
        }} />;
      case 'user-flow':
        return <UserFlowManager />;
      case 'reports':
        return <div className="p-6"><h2 className="text-2xl font-bold">Relatórios - Em Desenvolvimento</h2></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Configurações - Em Desenvolvimento</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  // Se estiver na página do token ou user-flow, renderizar fullscreen
  if (activeTab === 'token' || activeTab === 'user-flow') {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header activeTab={activeTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;