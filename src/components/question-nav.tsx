import { type AnswersState } from '@/hooks/use-test-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuestionNavProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  answers: AnswersState;
}

export function QuestionNav({
  totalQuestions,
  currentQuestionIndex,
  onQuestionSelect,
  answers,
}: QuestionNavProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="grid grid-cols-5 gap-2 pr-4">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const questionId = `${i}`; // Assuming question IDs are their index for this component
              const isAnswered = answers[questionId] && answers[questionId].length > 0;
              return (
              <Button
                key={i}
                variant={currentQuestionIndex === i ? 'default' : isAnswered ? 'secondary' : 'outline'}
                size="icon"
                onClick={() => onQuestionSelect(i)}
                className={cn(
                  "h-10 w-10 rounded-full",
                  currentQuestionIndex === i && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {i + 1}
              </Button>
            )})}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
