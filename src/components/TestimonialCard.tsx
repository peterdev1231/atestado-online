
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, location, text, delay = 0 }) => {
  return (
    <div 
      className="card-premium opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-gold fill-gold" />
        ))}
      </div>
      
      <p className="text-navy/80 mb-4 italic">{text}</p>
      
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-light-blue/30 flex items-center justify-center text-navy font-medium text-sm">
          {name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-navy font-medium">{name}</p>
          <p className="text-navy/60 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
