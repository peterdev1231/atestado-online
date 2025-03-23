
import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Shield, Calendar, CircleCheck } from 'lucide-react';

const CertificatePreview: React.FC = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHighlighted(true);
      
      setTimeout(() => {
        setIsHighlighted(false);
      }, 1500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="card-premium overflow-hidden transform transition-all duration-500 hover:shadow-xl max-w-md mx-auto">
      <div className="relative p-4 sm:p-6 bg-white border border-light-blue/30 rounded-xl shadow-soft">
        {/* Header of certificate */}
        <div className="bg-navy text-white text-center py-3 sm:py-4 px-4 sm:px-6 rounded-t-lg -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-4 sm:mb-6">
          <h3 className="font-playfair font-bold text-lg sm:text-xl">Atestado Médico</h3>
          <p className="text-white/80 text-xs sm:text-sm">Documento oficial com validade legal</p>
        </div>

        {/* Doctor information */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-light-blue/10 rounded-lg">
          <div>
            <div className="font-playfair font-semibold text-navy text-base sm:text-lg">Dr. Carlos Oliveira</div>
            <div className="text-xs sm:text-sm text-navy/70">Clínico Geral</div>
            <div className="text-xs text-navy/60">CRM-SP 123456</div>
          </div>
          <div className="sm:ml-auto flex items-center space-x-2">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-navy/60 mr-1" />
              <span className="text-xs sm:text-sm text-navy/80">21/03/2025</span>
            </div>
            <div className={`
              bg-emerald/10 px-2 py-0.5 rounded-md text-emerald 
              text-xs font-medium flex items-center 
              ${isHighlighted ? 'ring-1 ring-emerald animate-pulse' : ''}
            `}>
              <CircleCheck className="h-3 w-3 mr-1" /> Válido
            </div>
          </div>
        </div>
        
        {/* Certificate title */}
        <div className="text-center mb-4 sm:mb-6">
          <h4 className="text-base sm:text-lg font-bold text-navy uppercase tracking-wider border-b border-gray-200 pb-2">
            ATESTADO MÉDICO
          </h4>
        </div>
        
        {/* Certificate content */}
        <div className="bg-light-blue/5 border border-light-blue/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-navy/90 leading-relaxed text-xs sm:text-sm">
            Atesto para os devidos fins que o(a) paciente <span className="font-semibold">Maria Silva</span> necessita de afastamento 
            de suas atividades por <span className="font-semibold">1 dia</span> a partir de <span className="font-semibold">21/03/2025</span>, 
            devido a <span className="font-semibold">consulta médica de rotina</span>.
          </p>
          
          <div className="flex justify-between items-center mt-3 sm:mt-4 text-xs text-navy/60">
            <div>CID: -</div>
            <div>Código: AT0896</div>
          </div>
        </div>
        
        {/* Doctor signature */}
        <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4 text-xs sm:text-sm">
          <div className="border-b border-navy/60 pb-1 text-navy/80">
            Dr. Carlos Oliveira<br />
            <span className="text-xs text-navy/60">CRM-SP 123456</span>
          </div>
          
          <div className="text-xxs sm:text-xs text-navy/60">
            São Paulo, 21 de março de 2025
          </div>
          
          <div className={`
            w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald/10 flex items-center justify-center border border-emerald/20
            ${isHighlighted ? 'ring-2 ring-emerald/30 animate-pulse' : ''}
          `}>
            <div className="text-[8px] sm:text-[10px] text-emerald font-bold text-center">
              SELO<br/>DIGITAL
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-xxs sm:text-xs text-navy/60 mt-4 sm:mt-6 flex items-center justify-center">
          <Shield className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
          Emitido por médicos licenciados e verificado online com selo digital.
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
