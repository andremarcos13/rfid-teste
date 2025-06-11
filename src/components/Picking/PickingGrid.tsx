import React from 'react';
import { PickingLocation } from '../../types';
import { Package, MapPin } from 'lucide-react';

interface PickingGridProps {
  locations: PickingLocation[];
  onLocationPicked: (locationId: string) => void;
  isSystemActive: boolean;
}

export const PickingGrid: React.FC<PickingGridProps> = ({ 
  locations, 
  onLocationPicked, 
  isSystemActive 
}) => {
  const zoneA = locations.filter(loc => loc.zone === 'A');
  const zoneB = locations.filter(loc => loc.zone === 'B');

  const renderLocation = (location: PickingLocation) => {
    const isActive = location.isActive && isSystemActive;
    
    return (
      <div
        key={location.id}
        onClick={() => isActive && onLocationPicked(location.id)}
        className={`
          relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
          ${isActive 
            ? 'border-success-500 bg-success-50 shadow-lg animate-glow' 
            : location.hasItem 
            ? 'border-gray-300 bg-white hover:border-gray-400' 
            : 'border-gray-200 bg-gray-50'
          }
        `}
      >
        {/* Light indicator */}
        <div className={`
          absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white
          ${isActive 
            ? 'bg-success-500 animate-pulse shadow-lg' 
            : location.hasItem 
            ? 'bg-gray-400' 
            : 'bg-gray-200'
          }
        `}></div>

        <div className="flex items-center gap-3 mb-2">
          <div className={`
            p-2 rounded-lg
            ${isActive 
              ? 'bg-success-100 text-success-600' 
              : 'bg-gray-100 text-gray-400'
            }
          `}>
            <Package className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{location.id}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Setor {location.zone} • Estante {location.shelf}
            </p>
          </div>
        </div>

        {isActive && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium animate-bounce-slow">
              Coletar Item
            </div>
          </div>
        )}

        {!location.hasItem && (
          <div className="text-center">
            <span className="text-xs text-gray-400">Vazio</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Mapa do Almoxarifado</h3>
      
      <div className="space-y-8">
        {/* Zone A */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-900">Setor A - EPIs</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {zoneA.map(renderLocation)}
          </div>
        </div>

        {/* Zone B */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-900">Setor B - Medicamentos</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {zoneB.map(renderLocation)}
          </div>
        </div>
      </div>

      {!isSystemActive && (
        <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Sistema inativo. Escaneie um QR Code para iniciar o picking.</p>
        </div>
      )}
    </div>
  );
};