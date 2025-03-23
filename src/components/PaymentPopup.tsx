
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, FileText, Clock } from 'lucide-react';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ isOpen, onClose, userName }) => {
  const [minutes, setMinutes] = useState(7);
  const [seconds, setSeconds] = useState(17);
  
  const paymentUrl = "https://pay.validado.site/checkout/b49e6a18-3e32-4695-af2a-20acd28b0e2f";

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen, minutes, seconds]);
  
  const handlePaymentRedirect = () => {
    // Close the popup
    onClose();
    
    // Redirect to payment page
    window.location.href = paymentUrl;
    
    // Add console log to verify redirection is being triggered
    console.log("Redirecting to payment URL:", paymentUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-navy">EXCLUSIVO</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="bg-emerald/10 p-3 rounded-lg text-center mb-4 w-full">
            <p className="text-lg font-bold text-emerald">
              De <span className="line-through">R$ 197</span> por apenas
            </p>
            <p className="text-3xl font-bold text-emerald">R$ 67,90</p>
            <p className="text-sm text-navy/70">Taxa única de emissão – Pagamento seguro</p>
          </div>
          
          <div className="space-y-3 w-full mb-6">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-emerald mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-navy">Atestado válido em todo território nacional</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-emerald mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-navy">Assinatura digital de médico licenciado pelo CRM</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-emerald mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-navy">Suporte para validação junto ao empregador</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-emerald mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-navy">Garantia de aceite do seu dinheiro de volta</p>
            </div>
          </div>
          
          <div className="bg-navy/10 p-3 rounded-lg flex items-center justify-center mb-6 w-full">
            <Clock className="h-5 w-5 text-navy mr-2" />
            <p className="text-navy font-medium">
              Tempo restante: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          
          <Button 
            className="w-full"
            variant="emerald"
            size="lg"
            onClick={handlePaymentRedirect}
          >
            <FileText className="mr-2 h-5 w-5" /> Baixar Atestado Agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPopup;
