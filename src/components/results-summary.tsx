"use client";

import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface ResultsSummaryProps {
  percentage: number;
  score: number;
  totalQuestions: number;
}

export function ResultsSummary({ percentage, score, totalQuestions }: ResultsSummaryProps) {
  const [offset, setOffset] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const passingGrade = 75;

  useEffect(() => {
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
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40">
        <svg className="h-full w-full" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="hsl(var(--border))"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke={percentage >= passingGrade ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{percentage}%</span>
            <span className="text-sm text-muted-foreground">Score</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className={`font-headline text-3xl ${message.className}`}>{message.text}</h3>
        <p className="text-lg text-muted-foreground">
            You answered <span className="font-bold text-foreground">{score}</span> out of <span className="font-bold text-foreground">{totalQuestions}</span> questions correctly.
        </p>
      </div>
    </div>
  );
}
