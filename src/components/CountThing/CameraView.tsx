import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import BoxCounter from "./BoxCounter";

interface CameraViewProps {
  isScanning: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  selectedArea: string;
}

export const CameraView: React.FC<CameraViewProps> = ({
  isScanning,
  videoRef,
  selectedArea,
}) => {
  /* ------------------------------------------------------------
   *  Exemplo simplificado: quando `isScanning` for true, mostra
   *  o BoxCounter; caso contrário, exibe apenas um “placeholder”.
   * ------------------------------------------------------------ */
  const [bgUrl] = useState<string>("/tubos.jpg");

  /* Se estiver escaneando, exibe o contador de caixas */
  if (isScanning) {
    return <BoxCounter />;
  }

  /* Visualização padrão quando NÃO está escaneando */
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Visualização da Câmera
          </h3>
          <p className="text-gray-500 text-sm">
            Área selecionada:{" "}
            {selectedArea === "all"
              ? "Todo o almoxarifado"
              : `Setor ${selectedArea.toUpperCase()}`}
          </p>
        </div>
      </div>

      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <span className="text-gray-400">
          Aguardando início da varredura…
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------
 * Exemplo de página que usa o componente acima
 * ------------------------------------------------------------ */
export default function SuaPagina() {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-100">
      <button
        onClick={() => setIsScanning((prev) => !prev)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white
                   hover:bg-blue-700 transition mb-4"
      >
        {isScanning ? "Parar varredura" : "Iniciar varredura"}
      </button>

      <CameraView
        isScanning={isScanning}
        videoRef={videoRef}
        selectedArea="all"
      />
    </main>
  );
}
