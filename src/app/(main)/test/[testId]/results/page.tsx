"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { useTestStore } from '@/hooks/use-test-store';
import { tests } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ResultsSummary } from '@/components/results-summary';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const { getTestResult } = useTestStore();

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const test = tests.find((t) => t.id === testId);
    const result = getTestResult(testId);

    if (!test || !result) {
      // Maybe redirect to dashboard if no result is found
      // router.push('/dashboard');
      return;
    }

    let correctAnswers = 0;
    test.questions.forEach((q) => {
      const userAnswer = result.answers[q.id] || [];
      const isCorrect =
        userAnswer.length === q.correctAnswers.length &&
        userAnswer.every((ans) => q.correctAnswers.includes(ans));
      if (isCorrect) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setTotalQuestions(test.questions.length);
  }, [testId, getTestResult, router]);

  if (!isClient) {
    return <div className="flex h-screen items-center justify-center">Calculating results...</div>;
  }

  const test = tests.find((t) => t.id === testId);
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Test Results</CardTitle>
          <CardDescription className="text-lg">{test?.title}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <ResultsSummary percentage={percentage} score={score} totalQuestions={totalQuestions} />
          
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
