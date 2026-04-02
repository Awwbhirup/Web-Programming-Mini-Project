import { BookOpen, CheckCircle, Circle } from "lucide-react";

interface Module {
  id: number;
  title: string;
  lessons: string[];
  completed: boolean;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to Marine Safety",
    lessons: [
      "Welcome & Overview",
      "Safety Regulations",
      "Emergency Procedures"
    ],
    completed: true
  },
  {
    id: 2,
    title: "Horn Signals & Communication",
    lessons: [
      "Understanding Horn Signals",
      "Audio Examples",
      "Practice Quiz"
    ],
    completed: false
  },
  {
    id: 3,
    title: "Navigation Basics",
    lessons: [
      "Reading Charts",
      "Using Compass",
      "GPS Systems"
    ],
    completed: false
  },
  {
    id: 4,
    title: "Weather & Conditions",
    lessons: [
      "Weather Patterns",
      "Storm Safety",
      "Forecasting"
    ],
    completed: false
  }
];

export function CourseModules() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Course Modules</h2>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start gap-2 mb-2">
              {module.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-2">{module.title}</h3>
                <ul className="space-y-1">
                  {module.lessons.map((lesson, index) => (
                    <li
                      key={index}
                      className={`text-sm pl-4 py-1 rounded cursor-pointer transition-colors ${
                        index === 1 && module.id === 2
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
