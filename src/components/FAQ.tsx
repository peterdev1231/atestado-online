
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onClick: () => void;
  delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen = false, onClick, delay = 0 }) => {
  return (
    <div 
      className="border-b border-light-blue/30 last:border-0 py-4 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-playfair font-medium text-navy pr-6">{question}</h3>
        <ChevronDown 
          className={`h-5 w-5 text-teal transition-transform duration-300 ease-in-out flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-navy/80 pb-2">{answer}</p>
      </div>
    </div>
  );
};

interface FAQProps {
  items: { question: string; answer: string }[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="card-premium">
      {items.map((item, index) => (
        <FAQItem 
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default FAQ;
