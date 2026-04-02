import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Trash2, PenTool } from "lucide-react";

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#155DFC";
        ctx.lineWidth = 4;
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.beginPath();
      context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    context?.closePath();
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#155DFC]/10">
            <PenTool className="h-5 w-5 text-[#155DFC]" />
          </div>
          <div>
            <h3 className="mb-0">Canvas: Draw the Traffic Sign</h3>
            <p className="text-sm text-gray-500 mt-1">
              Use your mouse to draw
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>
      <div className="relative border-2 border-dashed border-[#155DFC]/20 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full cursor-crosshair bg-white/80 backdrop-blur-sm"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        {!isDrawing && context && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-gray-300 text-center">
              <PenTool className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Click and drag to draw</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}