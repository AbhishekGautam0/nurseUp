"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { useTestStore } from '@/hooks/use-test-store';
import { tests, type Test } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { ReviewQuestion } from '@/components/review-question';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { getTestResult } = useTestStore();

  const [test, setTest] = useState<Test | undefined>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const foundTest = tests.find((t) => t.id === testId);
    const result = getTestResult(testId);
    if (!foundTest || !result) {
      notFound();
    }
    setTest(foundTest);
  }, [testId, getTestResult, router]);

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
    return <div className="flex h-screen items-center justify-center">Loading review...</div>;
  }
  
  const result = getTestResult(testId);
  if(!result) return notFound();

  const currentQuestion = test.questions[currentQuestionIndex];
  const userAnswer = result.answers[currentQuestion.id] || [];

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <header className="mb-6">
        <Button variant="outline" onClick={() => router.push('/review')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Review List
        </Button>
        <h1 className="mt-4 font-headline text-3xl font-bold">{test.title} Review</h1>
        <p className="text-muted-foreground">Reviewing your answers from the test.</p>
      </header>

      <ReviewQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={test.questions.length}
        userAnswer={userAnswer}
      />

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={goToPrevious} disabled={currentQuestionIndex === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <p className="text-sm text-muted-foreground self-center">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
        <Button onClick={goToNext} disabled={currentQuestionIndex === test.questions.length - 1}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
