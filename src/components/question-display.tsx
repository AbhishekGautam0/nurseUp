import type { Question } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string[];
  onAnswerChange: (answer: string[]) => void;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
}: QuestionDisplayProps) {
  const handleSingleChange = (value: string) => {
    onAnswerChange([value]);
  };

  const handleMultipleChange = (checked: boolean, optionId: string) => {
    if (checked) {
      onAnswerChange([...userAnswer, optionId]);
    } else {
      onAnswerChange(userAnswer.filter((id) => id !== optionId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Question {questionNumber} of {totalQuestions}
        </CardDescription>
        <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === 'single' ? (
          <RadioGroup value={userAnswer[0]} onValueChange={handleSingleChange} className="space-y-4">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 rounded-md border p-4 transition-colors hover:bg-secondary has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                <Label htmlFor={`${question.id}-${option.id}`} className="text-base font-normal cursor-pointer w-full">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select all that apply.</p>
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 rounded-md border p-4 transition-colors hover:bg-secondary has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:border-primary">
                <Checkbox
                  id={`${question.id}-${option.id}`}
                  checked={userAnswer.includes(option.id)}
                  onCheckedChange={(checked) => handleMultipleChange(!!checked, option.id)}
                />
                <Label htmlFor={`${question.id}-${option.id}`} className="text-base font-normal cursor-pointer w-full">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
