
"use client";

import { useState } from 'react';
import { generateQuestions, type GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
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

export default function GeneratePage() {
  const [topic, setTopic] = useState('Cardiology');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateQuestionsOutput | null>(null);
  
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestDescription, setNewTestDescription] = useState("");

  const { toast } = useToast();
  const addTest = useTestStore((state) => state.addTest);
  const router = useRouter();


  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setNewTestTitle(`Practice Test: ${topic}`);
    setNewTestDescription(`A set of ${count} AI-generated questions about ${topic}.`);
    try {
      const generated = await generateQuestions({ topic, count });
      setResult(generated);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Questions",
        description: "There was a problem generating questions. Please try again.",
      });
    }
    setLoading(false);
  };

  const handleSaveTest = () => {
    if (!result || !newTestTitle) {
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
      duration: result.questions.length * 2, // 2 mins per question
      questions: result.questions as Question[],
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
                onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
                min="1"
                max="25"
                disabled={loading}
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading} className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
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
                    <CardTitle>2. Test Details</CardTitle>
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
                     <div className="relative h-64 w-full rounded-md bg-muted p-4">
                        {loading ? (
                            <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-8 w-4/5" />
                            <Skeleton className="h-8 w-2/3" />
                            </div>
                        ) : result ? (
                            <pre className="h-full w-full overflow-auto text-sm">
                            <code>{JSON.stringify(result.questions, null, 2)}</code>
                            </pre>
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
