
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorCardProps {
  name: string;
  specialty: string;
  crm: string;
  certificatesIssued: number;
  isAvailable: boolean;
  delay?: number;
  imageSrc?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  name, 
  specialty, 
  crm, 
  certificatesIssued, 
  isAvailable,
  delay = 0,
  imageSrc
}) => {
  const [count, setCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    if (isAvailable) {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= certificatesIssued) {
            clearInterval(interval);
            return certificatesIssued;
          }
          return prev + Math.ceil(certificatesIssued / 30);
        });
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setCount(certificatesIssued);
    }
  }, [certificatesIssued, isAvailable]);

  // Improved image preloading with immediate display if cached
  useEffect(() => {
    if (imageSrc) {
      // Set imageLoaded to true immediately for cached images
      const img = new Image();
      
      // Set imageLoaded to true right away if the image is cached
      if (img.complete || (img.width+img.height) > 0) {
        setImageLoaded(true);
      }
      
      img.onload = () => {
        setImageLoaded(true);
      };
      
      img.src = imageSrc;
      
      // Failsafe - never leave users waiting too long
      const timeoutId = setTimeout(() => {
        setImageLoaded(true);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setImageLoaded(true);
    }
  }, [imageSrc]);
  
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-100 shadow-sm h-full flex flex-col items-center py-8 px-4 ${!isAvailable ? 'grayscale opacity-70' : ''}`}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
    >
      <div className="flex flex-col items-center">
        {/* Doctor Image */}
        <div className="mb-5">
          <Avatar className="w-24 h-24 border-2 border-gray-100 rounded-full overflow-hidden">
            {(imageLoaded || !imageSrc) && (
              <AvatarImage 
                src={imageSrc} 
                alt={name} 
                className="object-cover" 
              />
            )}
            <AvatarFallback className="bg-light-blue/30 text-navy/60 text-xl">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* Doctor Info */}
        <div className="text-center mb-4 space-y-0.5">
          <h3 className="text-xl font-playfair font-semibold text-navy">{name}</h3>
          <p className="text-navy/70">
            {specialty} 
            {isAvailable && (
              <span className="text-emerald ml-1">(online)</span>
            )}
          </p>
          <p className="text-gray-500 text-sm">{crm}</p>
        </div>
        
        {/* Certificate Count */}
        <div className="text-center mb-6">
          <p className="text-4xl font-playfair font-semibold text-navy">
            {count.toLocaleString('pt-BR')}
          </p>
          <p className="text-sm text-gray-500">atestados emitidos</p>
        </div>
      </div>
      
      {/* Action Button - Updated with the same animation style as other buttons */}
      <div className="mt-auto w-full">
        <a 
          href="#form"
          className={`block text-center w-full rounded-md transition-all duration-300 shadow-sm transform hover:scale-[1.02] active:scale-[0.98] py-3 px-4 font-medium ${
            isAvailable 
              ? 'bg-emerald text-white hover:bg-emerald/90 hover:shadow-md' 
              : 'bg-gray-200 text-gray-500'
          }`}
          onClick={(e) => !isAvailable && e.preventDefault()}
        >
          {isAvailable ? 'Gerar atestado' : 'Indisponível'}
        </a>
      </div>
    </div>
  );
};

export default DoctorCard;
