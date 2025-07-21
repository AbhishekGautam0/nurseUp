
"use client";

import { Clock } from 'lucide-react';

interface TestTimerProps {
  seconds: number;
}

export function TestTimer({ seconds }: TestTimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-mono text-lg font-semibold tabular-nums">
      <Clock className="h-5 w-5 text-primary" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </span>
    </div>
  );
}
