
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const FixedCounter: React.FC = () => {
  const [certificates, setCertificates] = useState(10);
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCertificates(prev => {
        // Stop at 1 instead of resetting to 10
        if (prev <= 1) {
          return 1;
        }
        return prev - 1;
      });
    }, 20000);
    
    const handleScroll = () => {
      // Show after 300px of scroll
      setVisible(window.scrollY > 300);
      
      // Calculate scroll progress for smooth animations
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the appropriate color based on the certificate count
  const getCountColor = () => {
    if (certificates <= 5) {
      return 'text-[#ea384c]'; // Red color when 5 or less
    }
    return 'text-navy'; // Default color
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 animate-fade-in-down">
      <div className="bg-white/90 backdrop-blur-md shadow-md py-2 border-b border-light-blue/20">
        <div className="max-w-7xl mx-auto flex justify-center items-center px-4">
          <div className="inline-flex items-center gap-2">
            <div className="flex items-center text-sm font-medium px-3 py-1.5 bg-emerald/10 text-emerald rounded-full">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              <span>Apenas </span>
              <span className={`font-bold text-base mx-1 relative ${getCountColor()}`}>
                {certificates}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${certificates <= 5 ? 'bg-[#ea384c]/30' : 'bg-emerald/30'} rounded-full`}></span>
              </span>
              <span> atestados disponíveis hoje</span>
            </div>
            
            <div className="hidden md:flex items-center text-sm text-navy/70">
              <Clock className="h-4 w-4 mr-1.5 text-teal" />
              <span>Emissão em menos de 5 minutos</span>
            </div>
            
            {certificates <= 3 && (
              <div className="hidden sm:flex items-center text-sm text-amber-600 animate-pulse">
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                <span>Quase esgotado</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Progress indicator */}
      <div 
        className="h-0.5 bg-gradient-to-r from-teal to-light-blue transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

export default FixedCounter;
