
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { useTestStore, type AnswersState } from '@/hooks/use-test-store';

import { Button } from '@/components/ui/button';
import { TestTimer } from '@/components/test-timer';
import { QuestionDisplay } from '@/components/question-display';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { setTestResult, getTest } = useTestStore();

  const [test, setTest] = useState(getTest(testId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const foundTest = getTest(testId);
    if (!foundTest) {
       setTimeout(() => {
        const refoundTest = getTest(testId);
        if (!refoundTest) {
          notFound();
        } else {
           setTest(refoundTest);
        }
      }, 500);
    } else {
      setTest(foundTest);
    }
  }, [testId, getTest, router]);

  const handleAnswerChange = (questionId: string, answer: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setTestResult(testId, answers);
    router.push(`/test/${testId}/results`);
  };

  const goToNext = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  if (!isClient || !test) {
    return <div className="flex h-screen items-center justify-center">Loading test...</div>;
  }
  
  const currentQuestion = test.questions[currentQuestionIndex];
  
  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-headline text-3xl font-bold">{test.title}</h1>
            <p className="text-muted-foreground">{test.description}</p>
          </div>
          <TestTimer initialMinutes={test.duration} onTimeUp={handleSubmit} />
        </header>
        
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={test.questions.length}
          userAnswer={answers[currentQuestion.id] || []}
          onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
        />

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={goToPrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={goToNext} disabled={currentQuestionIndex === test.questions.length - 1}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <aside className="hidden md:block">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="text-lg">Questions</CardTitle>
            <CardDescription>{test.questions.length} total</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="grid grid-cols-5 gap-2 pr-4">
                {test.questions.map((q, i) => (
                  <Button
                    key={q.id}
                    variant={currentQuestionIndex === i ? 'default' : answers[q.id]?.length > 0 ? 'secondary' : 'outline'}
                    size="icon"
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={cn("h-10 w-10 rounded-full", currentQuestionIndex === i && "ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary")}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="mt-6 w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Submit Test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you ready to submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You cannot change your answers after submitting. Please review your answers before proceeding.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </aside>
       <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 md:hidden">
         <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Submit Test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you ready to submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You cannot change your answers after submitting. Please review your answers before proceeding.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  );
}
