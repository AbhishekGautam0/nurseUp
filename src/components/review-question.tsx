import { type Question } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

interface ReviewQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string[];
}

export function ReviewQuestion({ question, questionNumber, totalQuestions, userAnswer }: ReviewQuestionProps) {
  const isCorrect = userAnswer.length === question.correctAnswers.length && userAnswer.every(ans => question.correctAnswers.includes(ans));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardDescription>
            Question {questionNumber} of {totalQuestions}
            </CardDescription>
            {isCorrect ? (
                <span className="flex items-center gap-2 text-sm font-medium text-green-600"><CheckCircle2 className="h-5 w-5" />Correct</span>
            ) : (
                <span className="flex items-center gap-2 text-sm font-medium text-red-600"><XCircle className="h-5 w-5" />Incorrect</span>
            )}
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {question.options.map(option => {
            const isSelected = userAnswer.includes(option.id);
            const isCorrectAnswer = question.correctAnswers.includes(option.id);
            
            let stateClass = "";
            let Icon = Circle;
            if (isCorrectAnswer) {
                stateClass = "border-green-500 bg-green-50 text-green-800";
                Icon = CheckCircle2;
            }
            if (isSelected && !isCorrectAnswer) {
                stateClass = "border-red-500 bg-red-50 text-red-800";
                Icon = XCircle;
            }

            return (
              <div key={option.id} className={cn("flex items-center space-x-3 rounded-md border p-4", stateClass)}>
                <Icon className={cn("h-5 w-5", isCorrectAnswer ? "text-green-600" : isSelected ? "text-red-600" : "text-muted-foreground")} />
                <Label htmlFor={`${question.id}-${option.id}`} className="text-base font-normal w-full">
                  {option.text}
                </Label>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
