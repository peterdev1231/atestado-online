
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Stamp, FileText, Clock, Shield, CheckCircle, Server, Database, Lock, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: number;
  sender: 'doctor' | 'system' | 'user';
  content: React.ReactNode;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userName: string;
  days: string;
  reason: string;
  onPaymentClick: () => void;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  userName, 
  days, 
  reason,
  onPaymentClick,
  onBack
}) => {
  const doctorImagePath = "/lovable-uploads/64dc73ef-6b5b-4589-b87f-e32e15c98b52.png";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('Iniciando certificação do atestado...');
  const [timeRemaining, setTimeRemaining] = useState(15); // 15 minute countdown
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const firstName = userName.split(' ')[0];
  const isMobile = useIsMobile();
  const capitalizedReason = reason.charAt(0).toUpperCase() + reason.slice(1);
  
  // Define getFullReasonText function before it's used
  const getFullReasonText = (reasonKey: string): string => {
    const reasonMap: Record<string, string> = {
      'consulta': 'Consulta de rotina',
      'repouso': 'Repouso médico',
      'procedimento': 'Procedimento médico',
      'exames': 'Realização de exames',
      'outro': 'Outro motivo'
    };
    
    return reasonMap[reasonKey] || capitalizedReason;
  };
  
  const fullReasonText = getFullReasonText(reason);
  
  useEffect(() => {
    const img = new Image();
    img.src = doctorImagePath;
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prev => prev - 1);
      }
    }, 60000); // Update every minute
    
    return () => clearTimeout(timer);
  }, [timeRemaining]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isProcessing]);
  
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'system',
        content: 'Dr. Henrique Gomes entrou no chat.',
        timestamp: new Date()
      }
    ]);

    const timer1 = setTimeout(() => {
      setIsTyping(true);
      
      const timer2 = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          {
            id: 2,
            sender: 'doctor',
            content: `Olá! Tudo bem ${firstName}? Vou realizar o carimbo e a assinatura do seu atestado. Para isso, preciso confirmar seus dados. Um momento, por favor...`,
            timestamp: new Date()
          }
        ]);

        const timer3 = setTimeout(() => {
          setIsTyping(true);
          
          const timer4 = setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev, 
              {
                id: 3,
                sender: 'doctor',
                content: (
                  <Card className="w-full bg-white border-2 border-teal/20 shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="text-navy font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 text-teal mr-2" />
                        Confirme seus dados:
                      </h3>
                      <div className="space-y-3 text-navy/80">
                        <div className="flex items-start">
                          <span className="font-medium w-32">Nome:</span> 
                          <span className="flex-1">{userName}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium w-32">Dias de Atestado:</span> 
                          <span className="flex-1">{days}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="font-medium w-32">Motivo:</span> 
                          <span className="flex-1 break-words">{fullReasonText}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ),
                timestamp: new Date()
              }
            ]);
            setShowConfirmButton(true);
          }, 1500);
          
          return () => clearTimeout(timer4);
        }, 2000);
        
        return () => clearTimeout(timer3);
      }, 1200);
      
      return () => clearTimeout(timer2);
    }, 1000);
    
    return () => clearTimeout(timer1);
  }, [userName, days, reason, firstName, fullReasonText]);

  const handleConfirmData = () => {
    setShowConfirmButton(false);
    
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: 'doctor',
        content: 'Iniciando certificação do seu atestado médico...',
        timestamp: new Date()
      }
    ]);
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const totalDuration = 5500; // 5.5 seconds
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      
      setProcessingProgress(progress);
      
      if (progress > 20 && progress < 25) {
        setProcessingMessage('Verificando dados do paciente...');
      } else if (progress > 40 && progress < 45) {
        setProcessingMessage('Gerando assinatura digital...');
      } else if (progress > 60 && progress < 65) {
        setProcessingMessage('Criando certificado médico...');
      } else if (progress > 80 && progress < 85) {
        setProcessingMessage('Finalizando documento...');
      }
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsProcessing(false);
          
          setMessages(prev => [
            ...prev,
            {
              id: prev.length + 1,
              sender: 'doctor',
              content: (
                <div className="flex items-center bg-emerald/10 p-3 rounded-xl text-navy">
                  <CheckCircle className="h-5 w-5 text-emerald mr-2" />
                  <span>Documento autenticado com sucesso!</span>
                </div>
              ),
              timestamp: new Date()
            }
          ]);
          
          setShowCertificate(true);
        }, 500);
      }
    };
    
    requestAnimationFrame(updateProgress);
  };

  const handleDownload = () => {
    onPaymentClick();
  };

  const handleBackClick = () => {
    onBack();
  };

  const formatTimeRemaining = () => {
    if (timeRemaining <= 1) {
      return "menos de 1 minuto";
    } else {
      return `${timeRemaining} minutos`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-light-blue/5 rounded-xl shadow-xl overflow-hidden border border-light-blue/20 relative">
      {!isMobile && (
        <div className="absolute top-16 right-3 z-20 p-2.5 bg-white shadow-md rounded-lg border border-light-blue/20 animate-fade-in transition-all duration-300 max-w-[220px]">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#ea384c]/10 flex items-center justify-center">
              <span className="text-[#ea384c] text-xs font-bold">1</span>
            </div>
            <div>
              <p className="text-xs text-navy/80">
                <span className="font-semibold">Último atestado</span> reservado para <span className="text-navy font-medium">{firstName}</span>
              </p>
              <p className="text-xxs text-[#ea384c]">
                <Clock className="inline-block w-3 h-3 mr-1" />
                Expira em {formatTimeRemaining()}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center p-4 border-b border-light-blue/20 bg-white rounded-t-xl shadow-sm z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={handleBackClick}
        >
          ←
        </Button>
        <Avatar className="h-10 w-10 mr-3 ring-2 ring-teal/20 ring-offset-2">
          <AvatarImage src={doctorImagePath} alt="Dr. Henrique Gomes" />
          <AvatarFallback className="bg-navy text-white">HG</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-navy">Dr. Henrique Gomes</h3>
          <div className="flex items-center">
            <span className="text-xs text-navy/60">Médico • CRM-SP 881456</span>
            <span className="inline-block h-2 w-2 bg-emerald rounded-full ml-2 animate-pulse"></span>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="bg-white border-b border-light-blue/20 shadow-sm p-2 z-10 animate-fade-in transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#ea384c]/10 flex items-center justify-center">
              <span className="text-[#ea384c] text-xs font-bold">1</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-navy/80">
                <span className="font-semibold">Último atestado</span> reservado para <span className="text-navy font-medium">{firstName}</span>
              </p>
              <p className="text-xxs text-[#ea384c] font-medium">
                <Clock className="inline-block w-3 h-3 mr-1" />
                Expira em {formatTimeRemaining()}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <ScrollArea className="flex-1 p-4 relative">
        <div className="space-y-5 pb-2" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'doctor' && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 ring-1 ring-teal/20">
                  <AvatarImage src={doctorImagePath} alt="Dr. Henrique Gomes" />
                  <AvatarFallback className="bg-navy text-white">HG</AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`max-w-[85%] rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-teal text-white' 
                    : message.sender === 'system' 
                      ? 'bg-light-blue/10 text-navy text-center mx-auto text-sm py-2 px-4' 
                      : 'bg-white text-navy shadow-sm hover:shadow-md'
                }`}
              >
                {message.id === 3 ? (
                  <Card className="w-full bg-white border-2 border-teal/20 shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="text-navy font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 text-teal mr-2" />
                        Confirme seus dados:
                      </h3>
                      <div className="space-y-3 text-navy/80">
                        <div className="flex items-start">
                          <span className="font-medium w-32">Nome:</span> 
                          <span className="flex-1">{userName}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium w-32">Dias de Atestado:</span> 
                          <span className="flex-1">{days}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="font-medium w-32">Motivo:</span> 
                          <span className="flex-1 break-words">{fullReasonText}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 ring-1 ring-teal/20">
                <AvatarImage src={doctorImagePath} alt="Dr. Henrique Gomes" />
                <AvatarFallback className="bg-navy text-white">HG</AvatarFallback>
              </Avatar>
              <div className="bg-white text-navy shadow-sm max-w-[85%] rounded-2xl p-3">
                <div className="flex space-x-1.5 h-5 items-end">
                  <div className="h-2.5 w-2.5 bg-navy/30 rounded-full typing-dot"></div>
                  <div className="h-2.5 w-2.5 bg-navy/30 rounded-full typing-dot"></div>
                  <div className="h-2.5 w-2.5 bg-navy/30 rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          {isProcessing && (
            <div className="flex justify-center my-6">
              <div className="bg-white rounded-xl p-5 shadow-lg w-full max-w-md border border-light-blue/20">
                <div className="flex items-center justify-center mb-4">
                  <Stamp className="h-5 w-5 text-teal mr-2" />
                  <span className="text-navy font-medium">{processingMessage}</span>
                </div>
                <div className="h-3 bg-light-blue/20 rounded-full w-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal to-emerald rounded-full fluid-progress-bar"
                    style={{ 
                      width: `${processingProgress}%`,
                      minWidth: processingProgress > 0 ? '0.5rem' : '0'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-light-blue/20 bg-white rounded-b-xl">
        {showConfirmButton && (
          <Button 
            variant="cta" 
            className="w-full" 
            onClick={handleConfirmData}
          >
            <Check className="mr-2 h-4 w-4" /> Confirmar Dados
          </Button>
        )}
        
        {showCertificate && (
          <Button 
            variant="emerald" 
            className="w-full shadow-lg" 
            onClick={handleDownload}
          >
            <FileText className="mr-2 h-4 w-4" /> Baixar Atestado
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
