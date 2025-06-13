import { useEffect, useRef, useState } from "react";

export default function BoxCounter() {
    const [cvReady, setCvReady] = useState(false);
    const [count, setCount] = useState<number | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imgReady, setImgReady] = useState(false);

    /* --------------------------------------------------------- *
     * 1) Carrega OpenCV.js + WASM                               *
     * --------------------------------------------------------- */
    useEffect(() => {
        if (cvReady) return;                   // já pronto

        // Evita duplicar o script
        if (document.getElementById("opencvjs")) return;

        // 1a. Define o 'Module' ANTES de carregar o script
        (window as any).Module = {
            locateFile: (path: string) =>
                // Garante que o .wasm venha da MESMA pasta do JS
                `https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.7.0/${path}`,
        };

        // 1b. Injeta o script
        const s = document.createElement("script");
        s.id = "opencvjs";
        s.src =
            "https://cdn.jsdelivr.net/npm/@techstark/opencv-js@4.7.0/opencv.js";
        s.async = true;
        s.onload = () => {
            (window as any).cv.onRuntimeInitialized = () => {
                // só prossegue se a função existir mesmo
                if (typeof (window as any).cv.imread === "function") {
                    setCvReady(true);
                } else {
                    console.error("OpenCV carregou, mas imread não existe.");
                }
            };
        };
        s.onerror = () =>
            console.error("Falha ao baixar opencv.js — verifique a conexão/CORS");
        document.body.appendChild(s);
    }, [cvReady]);

    /* --------------------------------------------------------- *
     * 2) Carrega imagem padrão                                 *
     * --------------------------------------------------------- */
    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = "/tubos.jpg";   // sua imagem em public/
            setCount(null);
            setImgReady(false);
        }
    }, []);

    /* --------------------------------------------------------- *
     * 3) Processa quando tudo pronto                           *
     * --------------------------------------------------------- */
    useEffect(() => {
        if (cvReady && imgReady) processImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cvReady, imgReady]);

    /* --------------------------------------------------------- *
     * 4) Função principal                                      *
     * --------------------------------------------------------- */
    const processImage = () => {
        const cv = (window as any).cv;
        if (!cv || !imgRef.current || !canvasRef.current) return;

        // a) Sincroniza tamanho
        canvasRef.current.width = imgRef.current.naturalWidth;
        canvasRef.current.height = imgRef.current.naturalHeight;

        // b) Pipeline
        const src = cv.imread(imgRef.current);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.GaussianBlur(gray, gray, new cv.Size(3, 3), 0);

        const edged = new cv.Mat();
        cv.Canny(gray, edged, 50, 150);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(edged, contours, hierarchy,
            cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        // c) Filtra retângulos (ajuste areaMin/Max se precisar)
        let boxCount = 0;
        for (let i = 0; i < contours.size(); i++) {
            const cnt = contours.get(i);
            const rect = cv.boundingRect(cnt);

            const aspect = rect.width / rect.height;
            const area = rect.width * rect.height;
            const areaMin = 1400, areaMax = 18000;

            if (aspect > 0.8 && aspect < 1.25 && area > areaMin && area < areaMax) {
                boxCount++;
                cv.rectangle(
                    src,
                    new cv.Point(rect.x, rect.y),
                    new cv.Point(rect.x + rect.width, rect.y + rect.height),
                    [255, 0, 0, 255],
                    2
                );
            }
            cnt.delete();
        }

        cv.imshow(canvasRef.current, src);
        setCount(boxCount);

        [src, gray, edged, contours, hierarchy].forEach((m: any) => m.delete());
    };

    /* --------------------------------------------------------- *
     * 5) (Opcional) trocar imagem                               *
     * --------------------------------------------------------- */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !imgRef.current) return;
        imgRef.current.src = URL.createObjectURL(file);
        setCount(null);
        setImgReady(false);
    };

    /* --------------------------------------------------------- *
     * 6) Render                                                 *
     * --------------------------------------------------------- */
    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <h1 className="text-2xl font-semibold">Contador de Caixas</h1>

            {/* Botão + input opcional */}
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    onClick={processImage}
                    disabled={!cvReady}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-green-700 transition"
                >
                    {cvReady ? "Contar" : "Carregando OpenCV…"}
                </button>
            </div>

            {/* Imagem + canvas sobreposto */}
            <div className="relative w-full max-w-4xl">
                <img
                    ref={imgRef}
                    alt="preview"
                    className="w-full shadow"
                    onLoad={() => setImgReady(true)}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
            </div>

            {count !== null && (
                <div className="text-xl font-bold text-indigo-700">
                    Total de caixas: {count}
                </div>
            )}
        </div>
    );
}
