
import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const countingStarted = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countingStarted.current) {
          countingStarted.current = true;
          
          setTimeout(() => {
            const interval = setInterval(() => {
              setCount(prev => {
                if (prev >= value) {
                  clearInterval(interval);
                  return value;
                }
                return prev + Math.ceil(value / 30);
              });
            }, 50);
            
            return () => clearInterval(interval);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, delay]);
  
  return (
    <div 
      ref={elementRef}
      className="card-premium flex flex-col items-center opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="h-8 w-8 text-teal mb-3" />
      <div className="text-3xl md:text-4xl font-playfair font-bold text-navy mb-1">
        {count.toLocaleString('pt-BR')}{suffix}
      </div>
      <p className="text-navy/70 text-center">{label}</p>
    </div>
  );
};

export default StatCard;
