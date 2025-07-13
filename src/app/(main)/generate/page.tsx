
"use client";

import { useState } from 'react';
import { generateQuestions, type GenerateQuestionsOutput } from '@/ai/flows/generate-questions-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function GeneratePage() {
  const [topic, setTopic] = useState('Cardiology');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateQuestionsOutput | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
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

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = JSON.stringify(result.questions, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast({
        title: "Copied!",
        description: "The question code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedResult = result ? JSON.stringify(result.questions, null, 2) : "";

  return (
    <div className="container py-8">
      <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight">Generate Questions with AI</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Question Generator</CardTitle>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Number of Questions</Label>
              <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                min="1"
                max="10"
              />
            </div>
            <Button onClick={handleGenerate} disabled={loading} className="w-full" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              {loading ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Questions</CardTitle>
              <CardDescription>Copy this code into `src/lib/data.ts`.</CardDescription>
            </div>
             {result && (
              <Button onClick={handleCopy} variant="outline" size="icon" disabled={!result}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="relative h-96 w-full rounded-md bg-muted p-4">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-8 w-2/3" />
                </div>
              ) : result ? (
                 <pre className="h-full w-full overflow-auto text-sm">
                  <code>{formattedResult}</code>
                </pre>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    <p>Your generated questions will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
