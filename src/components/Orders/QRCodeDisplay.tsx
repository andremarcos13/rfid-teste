import React, { useEffect } from 'react';
import { X, Download, QrCode } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCode: string | null;
  onClose: () => void;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode, onClose }) => {
  if (!qrCode) return null;

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Generate a simple QR code pattern (for demo purposes)
  const generateQRPattern = () => {
    const size = 21;
    const pattern = [];
    for (let i = 0; i < size; i++) {
      pattern[i] = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random pattern based on QR code string
        pattern[i][j] = (i + j + qrCode.length) % 3 === 0;
      }
    }
    return pattern;
  };

  const qrPattern = generateQRPattern();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-code-title"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <h3 id="qr-code-title" className="text-lg font-semibold text-gray-900">QR Code da Ordem</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="bg-white p-8 rounded-xl border-2 border-gray-200 mb-6 inline-block">
            <div className="grid grid-cols-21 gap-0">
              {qrPattern.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`w-2 h-2 ${cell ? 'bg-black' : 'bg-white'}`}
                  />
                ))
              )}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-lg font-semibold text-gray-900">Código: {qrCode}</p>
            <p className="text-sm text-gray-500">
              Escaneie este código no token para iniciar o picking
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              onClick={() => {
                // Implementar download do QR code
                console.log('Download QR code');
              }}
            >
              <Download className="w-4 h-4" />
              Baixar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;