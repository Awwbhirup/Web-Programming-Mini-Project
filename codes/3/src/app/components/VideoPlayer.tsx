import { Play } from "lucide-react";

export function VideoPlayer() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
        {/* Video Placeholder */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/20 transition-all cursor-pointer">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
          <p className="text-white/80 mt-4">Video: Horn Signals & Communication</p>
        </div>

        {/* Video Controls Overlay (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-4">
            <div className="text-white text-sm">0:00 / 8:45</div>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
