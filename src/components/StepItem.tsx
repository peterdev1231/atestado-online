
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
  delay?: number;
}

const StepItem: React.FC<StepItemProps> = ({ 
  number, 
  title, 
  description, 
  icon: Icon,
  isLast = false,
  delay = 0
}) => {
  return (
    <div className="relative flex opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-teal bg-white shadow-soft text-navy font-semibold">
          {number}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-gradient-to-b from-teal to-light-blue/30 mt-3"></div>
        )}
      </div>
      
      <div className="pt-2 pb-8">
        <div className="flex items-center mb-1">
          <Icon className="h-5 w-5 mr-2 text-teal" />
          <h3 className="text-xl font-playfair font-semibold text-navy">{title}</h3>
        </div>
        <p className="text-navy/80">{description}</p>
      </div>
    </div>
  );
};

export default StepItem;
