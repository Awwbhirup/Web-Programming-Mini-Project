import { CourseModules } from "./components/CourseModules";
import { VideoPlayer } from "./components/VideoPlayer";
import { CourseDescription } from "./components/CourseDescription";
import { AudioExamples } from "./components/AudioExamples";

export default function App() {
  return (
    <div className="size-full flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <CourseModules />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          <VideoPlayer />
          <CourseDescription />
          <AudioExamples />
        </div>
      </main>
    </div>
  );
}
