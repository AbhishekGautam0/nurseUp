
"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTick: (secondsLeft: number) => void;
}

export function TestTimer({ initialSeconds, onTimeUp, onTick }: TestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            const newTime = prevTime - 1;
            onTick(newTime);
            return newTime;
        });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, onTick]);

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
