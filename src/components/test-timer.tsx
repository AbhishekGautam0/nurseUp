"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export function TestTimer({ initialMinutes, onTimeUp }: TestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-mono text-lg font-semibold tabular-nums">
      <Clock className="h-5 w-5 text-primary" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
