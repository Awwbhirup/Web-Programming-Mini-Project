import { Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

interface HornSignal {
  id: number;
  title: string;
  description: string;
  pattern: string;
  duration: string;
}

const hornSignals: HornSignal[] = [
  {
    id: 1,
    title: "One Short Blast",
    description: "I am altering my course to starboard (right)",
    pattern: "• —",
    duration: "1 sec"
  },
  {
    id: 2,
    title: "Two Short Blasts",
    description: "I am altering my course to port (left)",
    pattern: "• — • —",
    duration: "1 sec each"
  },
  {
    id: 3,
    title: "Three Short Blasts",
    description: "I am operating astern propulsion (reversing)",
    pattern: "• — • — • —",
    duration: "1 sec each"
  },
  {
    id: 4,
    title: "Five or More Short Blasts",
    description: "Danger signal - I don't understand your intentions",
    pattern: "• — • — • — • — • —",
    duration: "1 sec each"
  },
  {
    id: 5,
    title: "One Prolonged Blast",
    description: "Warning signal when leaving dock or approaching blind bend",
    pattern: "———",
    duration: "4-6 sec"
  }
];

export function AudioExamples() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const handlePlayPause = (id: number) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // In a real implementation, this would trigger audio playback
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Volume2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Audio Examples</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Click the play button next to each horn signal to hear how it sounds. 
        Pay attention to the duration and pattern of each blast.
      </p>

      <div className="space-y-4">
        {hornSignals.map((signal) => (
          <div
            key={signal.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Play Button */}
              <button
                onClick={() => handlePlayPause(signal.id)}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  playingId === signal.id
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                aria-label={playingId === signal.id ? "Pause" : "Play"}
              >
                {playingId === signal.id ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{signal.title}</h3>
                <p className="text-gray-600 mb-2">{signal.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Pattern:</span>
                    <span className="font-mono text-blue-600">{signal.pattern}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{signal.duration}</span>
                  </div>
                </div>

                {/* Progress bar when playing */}
                {playingId === signal.id && (
                  <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-pulse w-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These audio examples are for educational purposes. 
          Always refer to your local maritime authority for official horn signal regulations 
          in your area.
        </p>
      </div>
    </div>
  );
}
