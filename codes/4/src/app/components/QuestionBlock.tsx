import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Check } from "lucide-react";

interface QuestionBlockProps {
  questionNumber: number;
  question: string;
  options: string[];
  selectedAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function QuestionBlock({
  questionNumber,
  question,
  options,
  selectedAnswer,
  onAnswerChange,
}: QuestionBlockProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#155DFC]/10 text-[#155DFC] shrink-0">
          <span className="font-semibold">{questionNumber}</span>
        </div>
        <h3 className="flex-1 pt-1">
          {question}
        </h3>
        {selectedAnswer && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 shrink-0">
            <Check className="h-4 w-4 text-green-600" />
          </div>
        )}
      </div>
      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        <div className="space-y-2 ml-12">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                selectedAnswer === option 
                  ? 'border-[#155DFC] bg-[#155DFC]/5' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <RadioGroupItem
                value={option}
                id={`q${questionNumber}-option${index}`}
                className="border-2 border-[#155DFC] text-[#155DFC] data-[state=checked]:bg-[#155DFC] data-[state=checked]:border-[#155DFC]"
              />
              <Label
                htmlFor={`q${questionNumber}-option${index}`}
                className="cursor-pointer flex-1"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}