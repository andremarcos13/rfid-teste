import React from 'react';
import { Package, CheckCircle, AlertCircle } from 'lucide-react';

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

interface CountingResultsProps {
  results: CountResult[];
}

export const CountingResults: React.FC<CountingResultsProps> = ({ results }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-600 bg-success-100';
    if (confidence >= 80) return 'text-warning-600 bg-warning-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence: number) => {
    return confidence >= 85 ? CheckCircle : AlertCircle;
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados da Contagem</h3>
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma contagem realizada ainda</p>
          <p className="text-sm text-gray-400 mt-2">Inicie uma varredura para ver os resultados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Resultados da Contagem</h3>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success-500" />
          <span className="text-sm font-medium text-success-600">Contagem concluída</span>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => {
          const ConfidenceIcon = getConfidenceIcon(result.confidence);
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Package className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{result.category}</h4>
                    <p className="text-2xl font-bold text-primary-600">{result.count} itens</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getConfidenceColor(result.confidence)}`}>
                  <ConfidenceIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{result.confidence.toFixed(1)}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-700 text-sm">Detalhamento:</h5>
                {result.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      {item.location && (
                        <p className="text-xs text-gray-500">Localização: {item.location}</p>
                      )}
                    </div>
                    <span className="font-bold text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">Total Geral:</span>
          <span className="text-2xl font-bold text-primary-600">
            {results.reduce((sum, result) => sum + result.count, 0)} itens
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">Confiança média:</span>
          <span className="text-sm font-medium text-gray-900">
            {(results.reduce((sum, result) => sum + result.confidence, 0) / results.length).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};