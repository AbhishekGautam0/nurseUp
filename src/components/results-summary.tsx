
"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MinusCircle, Trophy } from 'lucide-react';

interface ResultsSummaryProps {
  score: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalQuestions: number;
}

export function ResultsSummary({ score, correctCount, incorrectCount, unansweredCount, totalQuestions }: ResultsSummaryProps) {
  const [offset, setOffset] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passingGrade = 75;

  useEffect(() => {
    // Animate the circle based on the percentage of correct answers
    const progressOffset = ((100 - percentage) / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  const getMessage = () => {
    if (percentage >= passingGrade) {
      return { text: "Excellent Work!", className: "text-green-600"};
    }
    if (percentage >= 50) {
      return { text: "Good Effort!", className: "text-yellow-600" };
    }
    return { text: "Keep Practicing!", className: "text-red-600"};
  };
  
  const message = getMessage();

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Trophy className={`h-16 w-16 ${message.className}`} />
        <h3 className={`font-headline text-3xl ${message.className}`}>{message.text}</h3>
        <p className="text-xl text-muted-foreground">
            Your final score is <span className="font-bold text-foreground">{score} / {totalQuestions}</span>
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 text-center sm:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-4">
          <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
          <p className="mt-2 text-2xl font-bold text-green-800">{correctCount}</p>
          <p className="text-sm font-medium text-green-700">Correct</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <XCircle className="mx-auto h-8 w-8 text-red-600" />
          <p className="mt-2 text-2xl font-bold text-red-800">{incorrectCount}</p>
          <p className="text-sm font-medium text-red-700">Incorrect (-0.33)</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-4">
          <MinusCircle className="mx-auto h-8 w-8 text-gray-500" />
          <p className="mt-2 text-2xl font-bold text-gray-700">{unansweredCount}</p>
          <p className="text-sm font-medium text-gray-600">Unanswered</p>
        </div>
      </div>
    </div>
  );
}
