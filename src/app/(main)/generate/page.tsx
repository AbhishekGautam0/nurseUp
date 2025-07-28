
"use client";

import { useState } from 'react';
import { type GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
import { useTestStore } from '@/hooks/use-test-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Save, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import type { Test, Question } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { QuestionDisplay } from '@/components/question-display';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Helper to add temporary unique IDs to questions for rendering
const withTempIds = (questions: Question[]): Question[] => {
    return questions.map((q, index) => ({
        ...q,
        id: `temp-${Date.now()}-${index}`
    }));
}


export default function GeneratePage() {
  const [topic, setTopic] = useState('Cardiology');
  const [count, setCount] = useState<number | ''>(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateQuestionsOutput | null>(null);
  
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestDescription, setNewTestDescription] = useState("");

  const { toast } = useToast();
  const addTest = useTestStore((state) => state.addTest);
  const router = useRouter();


  const handleGenerate = async () => {
    if (!count || count < 1) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a valid number of questions (at least 1).",
        });
        return;
    }

    setLoading(true);
    setResult(null);
    setNewTestTitle(`Practice Test: ${topic}`);
    setNewTestDescription(`A set of ${count} AI-generated questions about ${topic}.`);
    try {
       const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to generate questions');
      }

      const generated = await response.json();

       if (generated && generated.questions) {
        // Assign temporary unique IDs for the review UI
        const questionsWithTempIds = withTempIds(generated.questions as Question[]);
        setResult({ questions: questionsWithTempIds });
      } else {
        setResult(generated); // handle case where generation might be empty
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Questions",
        description: error instanceof Error ? error.message : "There was a problem generating questions. Please try again.",
      });
    }
    setLoading(false);
  };

  const handleSaveTest = () => {
    if (!result || !newTestTitle || !result.questions) {
      toast({
        variant: "destructive",
        title: "Cannot Save Test",
        description: "A title and generated questions are required to save.",
      });
      return;
    }

    const newTest: Test = {
      id: `test-${Date.now()}`,
      title: newTestTitle,
      description: newTestDescription,
      duration: result.questions.length * 1, // 1 mins per question
      questions: result.questions.map((q, index) => ({...q, id: `q-${index}`})) as Question[], // Finalize IDs on save
      category: 'practice',
    };
    
    addTest(newTest);

    toast({
      title: "Test Saved!",
      description: `"${newTest.title}" has been added to your practice library.`,
      action: (
         <Button asChild size="sm">
            <a href="/dashboard">Go to Dashboard <ArrowRight/></a>
        </Button>
      ),
    });
    
    // Reset state
    setResult(null);
    setNewTestTitle("");
    setNewTestDescription("");
    router.push('/dashboard');
  };


  return (
    <div className="container py-8">
      <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight">Generate Questions with AI</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Question Generator</CardTitle>
            <CardDescription>Enter a topic and the number of questions you want to generate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Pharmacology, Pediatrics"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Number of Questions</Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => {
                  const value = e.target.value;
                  setCount(value === '' ? '' : parseInt(value, 10));
                }}
                min="1"
                max="25"
                placeholder="e.g., 10"
                disabled={loading}
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading || !count} className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="mr-2 h-4 w-4" /> Generate Questions</>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className={result ? '' : 'opacity-50'}>
                <CardHeader>
                    <CardTitle>2. Test Details & Review</CardTitle>
                    <CardDescription>Review the generated questions and give your new test a title.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="newTestTitle">Test Title</Label>
                        <Input
                        id="newTestTitle"
                        value={newTestTitle}
                        onChange={(e) => setNewTestTitle(e.target.value)}
                        placeholder="e.g., Cardiology Practice Exam"
                        disabled={!result || loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newTestDescription">Test Description</Label>
                        <Textarea
                        id="newTestDescription"
                        value={newTestDescription}
                        onChange={(e) => setNewTestDescription(e.target.value)}
                        placeholder="A short description for your test."
                        disabled={!result || loading}
                        />
                    </div>
                     <div className="relative h-[450px] w-full rounded-md border bg-muted p-1">
                        {loading ? (
                            <div className="space-y-4 p-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-2/3" />
                            </div>
                        ) : result && result.questions ? (
                           <ScrollArea className="h-full w-full rounded-md bg-background p-4">
                             <div className="space-y-6">
                                {result.questions.map((q, i) => (
                                    <div key={q.id}>
                                        <QuestionDisplay
                                            question={q as Question}
                                            questionNumber={i + 1}
                                            totalQuestions={result.questions.length}
                                            userAnswer={[]}
                                            onAnswerChange={() => {}} // No-op on review page
                                        />
                                        {i < result.questions.length - 1 && <Separator className="mt-6" />}
                                    </div>
                                ))}
                             </div>
                           </ScrollArea>
                        ) : (
                            <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                                <p>Generated questions will appear here for review.</p>
                            </div>
                        )}
                        </div>
                    <Button onClick={handleSaveTest} disabled={!result || loading || !newTestTitle} className="w-full">
                        <Save className="mr-2 h-4 w-4" /> Save Test to Library
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
