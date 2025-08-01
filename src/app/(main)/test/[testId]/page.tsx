
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { useTestStore, type AnswersState } from '@/hooks/use-test-store';

import { Button } from '@/components/ui/button';
import { TestTimer } from '@/components/test-timer';
import { QuestionDisplay } from '@/components/question-display';
import { ArrowLeft, ArrowRight, CheckCircle, PanelLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import type { Test } from '@/lib/data';

function QuestionGrid({ questions, currentQuestionIndex, answers, onQuestionSelect, className }: { questions: any[], currentQuestionIndex: number, answers: AnswersState, onQuestionSelect: (index: number) => void, className?: string }) {
    return (
        <div className={cn("grid grid-cols-5 gap-2 pr-4", className)}>
        {questions.map((q, i) => (
          <Button
            key={q.id}
            variant={currentQuestionIndex === i ? 'default' : (answers[q.id] && answers[q.id].length > 0) ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => onQuestionSelect(i)}
            className={cn(
              "h-10 w-10 rounded-full transition-all duration-200", 
              currentQuestionIndex === i && "ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary scale-110",
              (answers[q.id] && answers[q.id].length > 0) && "bg-green-600 hover:bg-green-700 text-white"
              )}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    )
}

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { setTestResult, getTest, getTestResult } = useTestStore();

  const [test, setTest] = useState<Test | undefined>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getSessionStorageKey = useCallback(() => `test-session-${testId}`, [testId]);

  const handleSubmit = useCallback(() => {
    if (!test) return;
    setTestResult(test.id, answers);
    // Clear session storage BEFORE navigating away to ensure a clean state for the next visit
    sessionStorage.removeItem(getSessionStorageKey());
    router.push(`/test/${test.id}/results`);
  }, [test, answers, setTestResult, router, getSessionStorageKey]);


  // Load state from session storage on mount
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
      return;
    } 
    
    setTest(foundTest);
    
    const existingResult = getTestResult(testId);
    const sessionState = sessionStorage.getItem(getSessionStorageKey());

    if (existingResult && !sessionState) {
        sessionStorage.removeItem(getSessionStorageKey());
        setAnswers({});
        setCurrentQuestionIndex(0);
        setTimeLeft(foundTest.duration * 60);
        return;
    }
    
    try {
      if (sessionState) {
        const { savedAnswers, savedTimeLeft, savedQuestionIndex } = JSON.parse(sessionState);
        setAnswers(savedAnswers);
        setTimeLeft(savedTimeLeft);
        setCurrentQuestionIndex(savedQuestionIndex);
      } else {
        setTimeLeft(foundTest.duration * 60);
        setAnswers({});
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      setTimeLeft(foundTest.duration * 60);
      setAnswers({});
      setCurrentQuestionIndex(0);
    }
    
  }, [testId, getTest, router, getSessionStorageKey, getTestResult]);
  
  // Save state to session storage whenever it changes
  useEffect(() => {
      if (!isClient || timeLeft === null) return;
      try {
          const stateToSave = {
              savedAnswers: answers,
              savedTimeLeft: timeLeft,
              savedQuestionIndex: currentQuestionIndex,
          };
          sessionStorage.setItem(getSessionStorageKey(), JSON.stringify(stateToSave));
      } catch (error) {
          console.error("Could not save test state to session storage", error);
      }

  }, [answers, timeLeft, currentQuestionIndex, isClient, getSessionStorageKey]);

  // Main timer logic moved to the parent component
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);


  const handleAnswerChange = (questionId: string, answer: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
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
  
  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsSheetOpen(false); // Close sheet on selection
  }

  if (!isClient || !test || timeLeft === null) {
    return <div className="flex h-screen items-center justify-center">Loading test...</div>;
  }
  
  const currentQuestion = test.questions[currentQuestionIndex];
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Question Area */}
        <div className="md:col-span-2 lg:col-span-3">
          <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-headline text-3xl font-bold">{test.title}</h1>
              <p className="text-muted-foreground">{test.description}</p>
            </div>
            <TestTimer seconds={timeLeft} />
          </header>
          
          <QuestionDisplay
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={test.questions.length}
            userAnswer={answers[currentQuestion.id] || []}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />

          {/* Desktop Navigation */}
          <div className="mt-6 hidden justify-between md:flex">
            <Button variant="outline" onClick={goToPrevious} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={goToNext} disabled={currentQuestionIndex === test.questions.length - 1}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Question Panel */}
        <aside className="hidden md:block">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Questions</CardTitle>
              <CardDescription>{Object.values(answers).filter(a => a.length > 0).length} / {test.questions.length} Answered</CardDescription>
            </CardHeader>
            <CardContent className="flex h-[calc(100vh-22rem)] flex-col">
              <ScrollArea className="flex-grow">
                <QuestionGrid 
                    questions={test.questions}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    onQuestionSelect={handleQuestionSelect}
                />
              </ScrollArea>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="mt-6 w-full flex-shrink-0" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
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
      </div>

       {/* Mobile Floating Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card p-2 md:hidden">
            <div className="container mx-auto flex items-center justify-between gap-2">
                <Button variant="outline" size="icon" onClick={goToPrevious} disabled={currentQuestionIndex === 0} aria-label="Previous Question">
                    <ArrowLeft />
                </Button>

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                        <PanelLeft className="mr-2"/> 
                        Questions ({currentQuestionIndex + 1}/{test.questions.length})
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-4/5">
                    <SheetHeader className="mb-4">
                      <SheetTitle>Navigate Questions</SheetTitle>
                    </SheetHeader>
                     <ScrollArea className="h-[calc(100%-4rem)]">
                        <QuestionGrid 
                            questions={test.questions}
                            currentQuestionIndex={currentQuestionIndex}
                            answers={answers}
                            onQuestionSelect={handleQuestionSelect}
                            className="grid-cols-6 gap-3 p-1"
                        />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
                
                <Button variant="outline" size="icon" onClick={goToNext} disabled={currentQuestionIndex === test.questions.length - 1} aria-label="Next Question">
                    <ArrowRight/>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                      <CheckCircle /> <span className="ml-2">Submit</span>
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
    </div>
  );
}
