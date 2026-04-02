import { useState } from "react";
import { QuestionBlock } from "./components/QuestionBlock";
import { DrawingCanvas } from "./components/DrawingCanvas";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { ClipboardCheck, Send } from "lucide-react";

export default function App() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const questions = [
    {
      id: "q1",
      question: "What does a red octagonal sign indicate?",
      options: ["Yield", "Stop", "Caution", "No Parking"],
    },
    {
      id: "q2",
      question: "What is the shape of a yield sign?",
      options: [
        "Circle",
        "Triangle pointing down",
        "Rectangle",
        "Diamond",
      ],
    },
    {
      id: "q3",
      question: "What does a yellow diamond-shaped sign typically indicate?",
      options: [
        "Regulatory information",
        "Warning of road conditions",
        "School zone",
        "Railroad crossing",
      ],
    },
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => !answers[q.id as keyof typeof answers]);
    
    if (unanswered.length > 0) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    toast.success("Assessment submitted successfully!");
    console.log("Submitted answers:", answers);
  };

  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <div className="bg-gradient-to-r from-[#155DFC] to-[#0f4ad1] text-white py-8 px-10 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ClipboardCheck className="h-8 w-8" />
              <h1 className="text-center">Final Assessment</h1>
            </div>
            <p className="text-center text-blue-100 text-sm">
              Complete all questions and the drawing exercise
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-[#155DFC]">
                {answeredCount} of {questions.length} questions answered
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#155DFC] to-[#0f4ad1] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <QuestionBlock
              key={q.id}
              questionNumber={index + 1}
              question={q.question}
              options={q.options}
              selectedAnswer={answers[q.id as keyof typeof answers]}
              onAnswerChange={(value) => handleAnswerChange(q.id, value)}
            />
          ))}

          <DrawingCanvas />

          <div className="flex justify-center pt-6 pb-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="px-12 py-6 bg-gradient-to-r from-[#155DFC] to-[#0f4ad1] hover:from-[#0f4ad1] hover:to-[#155DFC] shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            >
              <Send className="h-5 w-5" />
              Submit Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}