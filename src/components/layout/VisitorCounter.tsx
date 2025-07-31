
'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Set an initial "daily" number based on the current date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const pseudoRandom = () => {
      let x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * (1500 - 500 + 1)) + 500; // Random base between 500 and 1500
    };
    const initialCount = pseudoRandom();
    setVisitorCount(initialCount);

    // Animate the counter to make it feel "live"
    const interval = setInterval(() => {
        setVisitorCount(prevCount => (prevCount ? prevCount + 1 : initialCount + 1));
    }, 3000); // Increment every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="py-6 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-card shadow-lg max-w-sm mx-auto">
                <div className="relative">
                    <Users size={32} className="text-primary"/>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-foreground transition-all duration-300">
                        {visitorCount ? visitorCount.toLocaleString() : '...'}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                        Live Visitors Today
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
