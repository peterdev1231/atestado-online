
import React, { useState, useEffect } from 'react';
import { CheckCircle, Award } from 'lucide-react';

const Header: React.FC = () => {
  const [certificates, setCertificates] = useState(10);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCertificates(prev => {
        // Stop at 1 instead of resetting to 10
        if (prev <= 1) {
          return 1;
        }
        return prev - 1;
      });
    }, 20000); // Update every 20 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Get the appropriate color based on the certificate count
  const getCountColor = () => {
    if (certificates <= 5) {
      return 'text-[#ea384c]'; // Red color when 5 or less
    }
    return 'text-emerald'; // Default color (emerald)
  };

  return (
    <header className="relative overflow-hidden bg-header-gradient pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/stethoscope-pattern.svg')] opacity-[0.03] bg-repeat"></div>
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="animate-fade-in opacity-0 [animation-delay:0.1s]">
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center text-sm text-navy/80 font-medium px-3 py-1 bg-light-blue/30 rounded-full">
              <Award className="h-4 w-4 mr-1 text-navy" />
              Reconhecido pelo CRM
            </span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <span className={`inline-flex items-center text-sm ${getCountColor()} font-medium px-3 py-1 ${certificates <= 5 ? 'bg-[#ea384c]/10' : 'bg-emerald/10'} rounded-full`}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Apenas {certificates} atestados disponíveis hoje
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-center text-navy max-w-3xl mx-auto leading-tight">
            <span className="relative">
              Gere seu Atestado Médico Online
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal/20 to-transparent"></span>
            </span>
            {' '}
            <span className="text-teal">em menos de 5 minutos</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-center text-navy/80 max-w-2xl mx-auto">
            Serviço rápido, seguro e reconhecido em todo o Brasil.
          </p>
          
          <div className="mt-8 flex justify-center">
            <a href="#form" className="cta-button animate-soft-pulse">
              Gerar meu atestado agora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
