
"use client";

import { useEffect, useState } from 'react';
import { useTestStore } from '@/hooks/use-test-store';
import { TestCard } from "@/components/test-card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { tests, deleteTest } = useTestStore();
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteTest = (testId: string) => {
    deleteTest(testId);
    toast({
        title: "Test Deleted",
        description: "The practice test has been removed from your library.",
    })
  };

  if (!isClient) {
     return <div className="container py-8">Loading tests...</div>;
  }

  const activeTests = tests.filter((test) => test.category === 'active');
  const practiceTests = tests.filter((test) => test.category === 'practice');

  return (
    <div className="container py-8">
      <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight">Dashboard</h1>
      
      {activeTests.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary">Active Tests</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </section>
      )}

      <section className={activeTests.length > 0 ? "mt-12" : ""}>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Practice Library</h2>
             <Button asChild variant="outline">
                <Link href="/generate">Generate New Test</Link>
            </Button>
        </div>
        {practiceTests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practiceTests.map((test) => (
              <TestCard key={test.id} test={test} onDelete={handleDeleteTest} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
            <h3 className="mt-4 text-xl font-semibold">The Practice Library is Empty</h3>
            <p className="mt-2 text-muted-foreground">Use the 'Generate Questions' feature to create a new test!</p>
            <Button asChild className="mt-6">
                <Link href="/generate">Generate a Test</Link>
            </Button>
        </div>
        )}
      </section>
    </div>
  );
}
