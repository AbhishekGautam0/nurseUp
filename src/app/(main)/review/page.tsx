
"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTestStore } from '@/hooks/use-test-store';
import { type Test } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { History, ArrowRight } from 'lucide-react';

export default function ReviewListPage() {
  const { tests, getResultsForCurrentUser } = useTestStore();
  const [completedTests, setCompletedTests] = useState<Test[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [results, setResults] = useState<{[testId: string]: any}>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const userResults = getResultsForCurrentUser();
      setResults(userResults);
      const completedIds = Object.keys(userResults);
      const filteredTests = tests.filter(test => completedIds.includes(test.id));
      setCompletedTests(filteredTests);
    }
  }, [getResultsForCurrentUser, tests, isClient]);

  if (!isClient) {
    return <div className="container py-8">Loading reviewable tests...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight">Review Completed Tests</h1>
      
      {completedTests.length > 0 ? (
        <div className="space-y-6">
          {completedTests.map(test => {
            const result = results[test.id];
            // Handle case where result might not exist yet
            if (!result) return null;
            return (
              <Card key={test.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{test.title}</CardTitle>
                  <CardDescription>
                    Completed on: {format(new Date(result.submittedAt), "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href={`/review/${test.id}`}>Review Answers <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
            <History className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Tests to Review</h3>
            <p className="mt-2 text-muted-foreground">You haven't completed any tests yet. Go to the dashboard to start one!</p>
            <Button asChild className="mt-6">
                <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
