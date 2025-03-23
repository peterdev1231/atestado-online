
import React, { useEffect, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon: Icon, delay = 0 }) => {
  const iconRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (iconRef.current) {
      setTimeout(() => {
        iconRef.current?.classList.add('text-teal');
        iconRef.current?.classList.remove('text-navy/40');
      }, 300 + delay);
    }
  }, [delay]);
  
  return (
    <div 
      className="card-premium flex flex-col items-center opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-light-blue/30 flex items-center justify-center mb-5">
        <Icon ref={iconRef} className="h-8 w-8 text-navy/40 transition-colors duration-1000" />
      </div>
      <h3 className="text-xl font-playfair font-semibold mb-2 text-navy">{title}</h3>
      <p className="text-center text-navy/80">{description}</p>
    </div>
  );
};

export default BenefitCard;
