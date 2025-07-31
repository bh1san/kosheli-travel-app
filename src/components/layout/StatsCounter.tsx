
'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 37, label: 'DESTINATIONS' },
  { value: 10000, label: 'HAPPY CLIENTS' },
  { value: 156, label: 'CUPS OF COFFEE' },
  { value: 65, label: 'UNIQUE IDEAS' },
];

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (endValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
  
    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
          frame++;
          const progress = easeOutExpo(frame / totalFrames);
          setCount(Math.round(endValue * progress));
    
          if (frame === totalFrames) {
            clearInterval(counter);
          }
        }, frameRate);
    
        return () => clearInterval(counter);
      }, [endValue, duration, totalFrames]);

    // Format for '10k'
    if (endValue === 10000) {
        if (count >= 10000) return '10k';
        if (count > 1000) return `${(count / 1000).toFixed(1)}k`;
    }

    return count.toLocaleString();
};

const StatCard = ({ value, label }: { value: number, label: string }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    const animatedValue = useCountUp(isIntersecting ? value : 0, 2000);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="bg-card text-center p-6 rounded-2xl shadow-lg w-full">
            <div className="text-5xl font-bold text-orange-500" style={{ color: 'hsl(var(--primary))' }}>
                {animatedValue}
            </div>
            <div className="text-sm font-semibold text-muted-foreground mt-2 uppercase tracking-wider">
                {label}
            </div>
        </div>
    );
};

export function StatsCounter() {
  return (
    <div className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-headline text-center text-foreground mb-12">
          We can take you anywhere
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
