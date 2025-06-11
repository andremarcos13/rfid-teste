import React, { useState, useRef } from 'react';
import { CameraView } from './CameraView';
import { CountingResults } from './CountingResults';
import { CountingControls } from './CountingControls';
import { Camera, Scan } from 'lucide-react';

interface CountResult {
  category: string;
  count: number;
  confidence: number;
  items: Array<{
    name: string;
    count: number;
    location?: string;
  }>;
}

export const CountThingSystem: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<CountResult[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartScanning = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResults: CountResult[] = [
        {
          category: 'EPI',
          count: 127,
          confidence: 94.5,
          items: [
            { name: 'Capacetes de Segurança', count: 23, location: 'A-01' },
            { name: 'Luvas de Proteção', count: 85, location: 'A-02' },
            { name: 'Óculos de Proteção', count: 19, location: 'A-01' }
          ]
        },
        {
          category: 'Medicamentos',
          count: 48,
          confidence: 91.2,
          items: [
            { name: 'Paracetamol 500mg', count: 12, location: 'B-01' },
            { name: 'Ibuprofeno 400mg', count: 8, location: 'B-02' },
            { name: 'Dipirona 500mg', count: 28, location: 'B-01' }
          ]
        }
      ];
      
      setResults(mockResults);
      setIsScanning(false);
    }, 3000);
  };

  const handleStopScanning = () => {
    setIsScanning(false);
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CountThing - Contagem Inteligente</h2>
          <p className="text-gray-500 mt-1">Contagem automatizada usando visão computacional</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-primary-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-sm font-medium text-gray-700">
            {isScanning ? 'Escaneando...' : 'Pronto para escanear'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CameraView 
            isScanning={isScanning} 
            videoRef={videoRef}
            selectedArea={selectedArea}
          />
          <CountingResults results={results} />
        </div>
        <div>
          <CountingControls
            isScanning={isScanning}
            selectedArea={selectedArea}
            onStartScanning={handleStartScanning}
            onStopScanning={handleStopScanning}
            onAreaChange={handleAreaChange}
          />
        </div>
      </div>
    </div>
  );
};