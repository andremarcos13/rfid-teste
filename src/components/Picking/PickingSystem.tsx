import React, { useState, useEffect } from 'react';
import { PickingGrid } from './PickingGrid';
import { PickingControls } from './PickingControls';
import { PickingStats } from './PickingStats';
import { mockPickingLocations } from '../../data/mockData';
import { PickingLocation } from '../../types';

export const PickingSystem: React.FC = () => {
  const [locations, setLocations] = useState<PickingLocation[]>(mockPickingLocations);
  const [isActive, setIsActive] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);

  const handleStartPicking = (orderId: string) => {
    setCurrentOrder(orderId);
    setIsActive(true);
    
    // Simulate activating specific locations for the order
    setLocations(prev => prev.map(loc => ({
      ...loc,
      isActive: ['A-01-03', 'A-02-01'].includes(loc.id)
    })));
  };

  const handleStopPicking = () => {
    setIsActive(false);
    setCurrentOrder(null);
    setLocations(prev => prev.map(loc => ({ ...loc, isActive: false })));
  };

  const handleLocationPicked = (locationId: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === locationId 
        ? { ...loc, isActive: false, hasItem: false }
        : loc
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sistema Picking by Light</h2>
          <p className="text-gray-500 mt-1">Direcionamento luminoso para coleta eficiente</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-success-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-sm font-medium text-gray-700">
            {isActive ? 'Sistema Ativo' : 'Sistema Inativo'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <PickingGrid 
            locations={locations} 
            onLocationPicked={handleLocationPicked}
            isSystemActive={isActive}
          />
        </div>
        <div className="space-y-6">
          <PickingControls 
            isActive={isActive}
            currentOrder={currentOrder}
            onStartPicking={handleStartPicking}
            onStopPicking={handleStopPicking}
          />
          <PickingStats locations={locations} />
        </div>
      </div>
    </div>
  );
};