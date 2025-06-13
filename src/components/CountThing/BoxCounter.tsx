import { useEffect, useState } from "react";

export default function BoxCounterGrid() {
    // Defina manualmente as posições das caixas (x, y, number)
    // Exemplo: ajuste os valores conforme desejar
    const boxes = [
        { x: 680, y: 10, number: 1 },
        { x: 750, y: 20, number: 2 },
        { x: 815, y: 30, number: 3 },
        { x: 866, y: 40, number: 4 },
        { x: 100, y: 65, number: 5 },
        { x: 220, y: 65, number: 6 },
        { x: 340, y: 65, number: 7 },
        { x: 470, y: 65, number: 8 },
        { x: 580, y: 65, number: 9 },
        { x: 682, y: 85, number: 10 },
        { x: 760, y: 85, number: 11 },
        { x: 820, y: 95, number: 12 },
        { x: 860, y: 95, number: 13 },
        { x: 100, y: 195, number: 14 },
        { x: 220, y: 195, number: 15 },
        { x: 340, y: 195, number: 16 },
        { x: 470, y: 195, number: 17 },
        { x: 580, y: 195, number: 18 },
        { x: 682, y: 215, number: 19 },
        { x: 760, y: 215, number: 20 },
        { x: 820, y: 225, number: 21 },
        { x: 860, y: 225, number: 22 },
        { x: 100, y: 325, number: 23 },
        { x: 220, y: 325, number: 24 },
        { x: 340, y: 325, number: 25 },
        { x: 470, y: 325, number: 26 },
        { x: 580, y: 325, number: 27 },
        { x: 682, y: 345, number: 28 },
        { x: 760, y: 335, number: 29 },
        { x: 820, y: 325, number: 30 },
        { x: 860, y: 315, number: 31 },
        { x: 100, y: 525, number: 32 },
        { x: 220, y: 525, number: 33 },
        { x: 370, y: 505, number: 34 },
        { x: 500, y: 455, number: 35 },
        { x: 595, y: 455, number: 36 },
        { x: 680, y: 455, number: 37 },
        { x: 760, y: 415, number: 38 },
        { x: 820, y: 415, number: 39 },
        { x: 860, y: 415, number: 40 },
        { x: 110, y: 605, number: 41 },
        { x: 240, y: 605, number: 42 },
        { x: 370, y: 605, number: 43 },
        { x: 500, y: 585, number: 44 },
        { x: 595, y: 585, number: 45 },
        { x: 680, y: 535, number: 46 },
        { x: 760, y: 515, number: 47 },
        { x: 820, y: 515, number: 48 },
        { x: 860, y: 485, number: 49 },
        { x: 680, y: 610, number: 50 },
        { x: 750, y: 600, number: 51 },
        { x: 810, y: 590, number: 52 },
        { x: 860, y: 590, number: 53 },

        // Adicione mais caixas aqui...
    ];

    const [isScanning, setIsScanning] = useState(false);
    const [showCircles, setShowCircles] = useState(false);
    const [visibleCircles, setVisibleCircles] = useState(0);

    // Linha de varredura
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        if (!isScanning) return;
        setScanProgress(0);
        setShowCircles(false);
        setVisibleCircles(0);

        let start = Date.now();
        const duration = 1200; // 2.5 segundos para a linha

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setScanProgress(progress);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setShowCircles(true);
            }
        };
        animate();
    }, [isScanning]);

    // Animação dos círculos, um a um
    useEffect(() => {
        if (!showCircles) return;
        setVisibleCircles(0);
        let idx = 0;
        const interval = setInterval(() => {
            idx++;
            setVisibleCircles(idx);
            if (idx >= boxes.length) clearInterval(interval);
        }, 60); // 60ms entre cada círculo
        return () => clearInterval(interval);
    }, [showCircles, boxes.length]);

    // Inicia varredura ao montar
    useEffect(() => {
        setIsScanning(true);
    }, []);

    // Calcula a posição da linha de varredura
    const sweepLineY = scanProgress * 650; // ajuste para altura da imagem

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <div className="relative w-full max-w-4xl">
                <img
                    src="/tubos.jpg"
                    alt="preview"
                    className="w-full shadow"
                />
                {/* Linha de varredura animada */}
                {isScanning && (
                    <div
                        className="absolute left-0 w-full h-2 bg-green-400/70 z-20 transition-all duration-75"
                        style={{ top: sweepLineY }}
                    ></div>
                )}
                {/* Círculos animados */}
                {boxes.map((box, idx) => (
                    <div
                        key={box.number}
                        className={`absolute flex items-center justify-center border-2 border-red-500 bg-black bg-opacity-60 text-white font-bold transition-all duration-300
                            ${showCircles && idx < visibleCircles ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                        style={{
                            left: box.x,
                            top: box.y,
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            zIndex: 10,
                        }}
                    >
                        {box.number}
                    </div>
                ))}
            </div>
            <div className="text-xl font-bold text-indigo-700">
                Total de caixas: {boxes.length}
            </div>
            {/* Botão para recomeçar animação */}
            {!isScanning && !showCircles && (
                <button
                    onClick={() => setIsScanning(true)}
                    className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Repetir varredura
                </button>
            )}
        </div>
    );
}
