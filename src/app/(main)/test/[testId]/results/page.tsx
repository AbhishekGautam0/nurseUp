
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';

import { useTestStore } from '@/hooks/use-test-store';
import { Button } from '@/components/ui/button';
import { ResultsSummary } from '@/components/results-summary';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { getTestResult, getTest } = useTestStore();

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const test = getTest(testId);

  useEffect(() => {
    setIsClient(true);
    const result = getTestResult(testId);

    if (!test || !result) {
      setTimeout(() => {
          const recheckResult = getTestResult(testId);
          if(!getTest(testId) || !recheckResult) {
            // notFound();
          }
      }, 500)
      return;
    }

    let correct = 0;
    let incorrect = 0;

    test.questions.forEach((q) => {
      const userAnswer = result.answers[q.id];
      if (!userAnswer || userAnswer.length === 0) {
        // Unanswered
      } else {
        const isCorrect =
          userAnswer.length === q.correctAnswers.length &&
          userAnswer.every((ans) => q.correctAnswers.includes(ans));
        if (isCorrect) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    
    const finalScore = (correct * 1) - (incorrect * 0.33);

    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setTotalQuestions(test.questions.length);
    setUnansweredCount(test.questions.length - correct - incorrect);
    setScore(parseFloat(finalScore.toFixed(2)));

  }, [testId, getTestResult, router, test]);

  if (!isClient) {
    return <div className="flex h-screen items-center justify-center">Calculating results...</div>;
  }

  if (!test) {
      return <div className="flex h-screen items-center justify-center">Loading results...</div>;
  }
  
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Test Results</CardTitle>
          <CardDescription className="text-lg">{test?.title}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <ResultsSummary 
            score={score}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            unansweredCount={unansweredCount}
            totalQuestions={totalQuestions} 
          />
          
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
            </Button>
            <Button asChild style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              <Link href={`/review/${testId}`}><RefreshCw className="mr-2 h-4 w-4" /> Review Answers</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
