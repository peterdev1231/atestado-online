import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import BenefitCard from '@/components/BenefitCard';
import StepItem from '@/components/StepItem';
import TestimonialCard from '@/components/TestimonialCard';
import StatCard from '@/components/StatCard';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CertificatePreview from '@/components/CertificatePreview';
import Notification from '@/components/Notification';
import FixedCounter from '@/components/FixedCounter';
import DoctorsList from '@/components/DoctorsList';
import ChatInterface from '@/components/ChatInterface';
import PaymentPopup from '@/components/PaymentPopup';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  CalendarIcon, 
  CheckSquare, 
  Shield, 
  Clock, 
  LockKeyhole,
  FileText,
  ClipboardCheck,
  UserCheck,
  Send,
  Activity,
  Users,
  ThumbsUp,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Index = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [days, setDays] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1 && name && reason) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedDate && days) {
      console.log('Form submitted:', { name, reason, selectedDate, days });
      setShowChat(true);
    }
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleBackToForm = () => {
    setShowChat(false);
  };

  const handlePaymentClick = () => {
    setShowPaymentPopup(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentPopup(false);
  };
  
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(el => {
        observer.observe(el);
      });
      
      return observer;
    };
    
    const observer = animateOnScroll();
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const faqItems = [
    {
      question: "O atestado médico online é válido?",
      answer: "Sim, nossos atestados médicos online possuem validade legal em todo o território nacional, com assinatura digital certificada e médicos devidamente registrados no CRM."
    },
    {
      question: "Como funciona o processo de emissão?",
      answer: "Você preenche um formulário simples com seus dados, escolhe o motivo do atestado, o período desejado e recebe o documento validado e assinado digitalmente em seu e-mail em poucos minutos."
    },
    {
      question: "Quais são os médicos que emitem os atestados?",
      answer: "Contamos com uma equipe de médicos licenciados, com registro ativo no CRM e experiência clínica. Todos os profissionais são verificados e seguem rigorosos padrões éticos."
    },
    {
      question: "Por quanto tempo o atestado é válido?",
      answer: "A validade do atestado depende do período solicitado, que pode variar de 1 a 15 dias, conforme a necessidade do paciente e avaliação médica."
    },
    {
      question: "Como verificar a autenticidade do atestado?",
      answer: "Todos os nossos atestados possuem um código QR e um número de verificação que pode ser consultado em nosso site para confirmar sua autenticidade."
    }
  ];

  return (
    <div className="min-h-screen bg-off-white overflow-x-hidden">
      <Header />
      <FixedCounter />
      <Notification showInterval={15000} />
      
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        <div className={`transition-all duration-500 ease-in-out ${showChat ? 'opacity-40 pointer-events-none filter blur-sm' : ''}`}>
          {/* Benefits Section */}
          <section className="mb-16" id="benefits">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
                Por que escolher nosso serviço
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal to-light-blue/30 mx-auto mt-4"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="scroll-animate opacity-0" style={{ animationDelay: '100ms' }}>
                <BenefitCard 
                  title="Atestado 100% Online" 
                  description="Emissão rápida, prática e confiável a qualquer hora, sem precisar sair de casa."
                  icon={Clock}
                  delay={100}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '200ms' }}>
                <BenefitCard 
                  title="Validade Legal" 
                  description="Com assinatura digital certificada e médicos registrados no CRM em todo o Brasil."
                  icon={CheckSquare}
                  delay={200}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '300ms' }}>
                <BenefitCard 
                  title="Segurança de Dados" 
                  description="Proteção total dos seus dados e conformidade com a LGPD para sua tranquilidade."
                  icon={Shield}
                  delay={300}
                />
              </div>
            </div>
          </section>
          
          {/* Certificate Model Section */}
          <section className="py-16 bg-light-blue/10 rounded-3xl mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 scroll-animate opacity-0">
                <CertificatePreview />
              </div>
              
              <div className="order-1 md:order-2 scroll-animate opacity-0">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy mb-4">
                  Conheça o modelo do nosso atestado
                </h2>
                
                <p className="text-navy/80 mb-6">
                  Documento oficial com assinatura digital, informações completas e validade legal em todo o território nacional. Emitido por médicos licenciados e verificado online.
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Assinatura digital certificada",
                    "Dados completos do paciente",
                    "Registro do médico responsável",
                    "Verificação online da autenticidade",
                    "Compatível com padrões de documentos médicos"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckSquare className="h-5 w-5 text-emerald mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a href="#form" className="cta-button inline-flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Gerar meu atestado agora
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="mb-16 bg-light-blue/10 rounded-3xl py-16" id="steps">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
                Como funciona
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal to-light-blue/30 mx-auto mt-4"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="scroll-animate opacity-0" style={{ animationDelay: '100ms' }}>
                <StepItem 
                  number={1} 
                  title="Preencha o formulário" 
                  description="Informe seus dados pessoais e detalhes necessários para o atestado."
                  icon={ClipboardCheck}
                  delay={100}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '200ms' }}>
                <StepItem 
                  number={2} 
                  title="Escolha o motivo do atestado" 
                  description="Selecione o motivo entre as opções disponíveis para sua necessidade."
                  icon={FileText}
                  delay={200}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '300ms' }}>
                <StepItem 
                  number={3} 
                  title="Gere o documento em poucos segundos" 
                  description="Nosso sistema processa rapidamente as informações fornecidas."
                  icon={Clock}
                  delay={300}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '400ms' }}>
                <StepItem 
                  number={4} 
                  title="Receba o atestado validado e assinado" 
                  description="Documento enviado por e-mail com assinatura digital certificada."
                  icon={UserCheck}
                  isLast={true}
                  delay={400}
                />
              </div>
            </div>
          </section>
          
          {/* Doctors Section */}
          <DoctorsList />
          
          {/* Form Section */}
          <section className="relative z-10 mb-16" id="form">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-light-blue/20 -z-10 rounded-3xl"></div>
            
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy mb-2">
                  Comece agora: preencha seus dados
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-teal to-light-blue mx-auto"></div>
                <p className="text-navy/80 mt-4 text-xl">Em poucos passos, seu atestado estará pronto.</p>
              </div>
              
              <div className="form-highlight form-glow p-8 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald via-teal to-emerald"></div>
                
                <form onSubmit={handleSubmit}>
                  {currentStep === 1 ? (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label htmlFor="name" className="block text-navy font-medium mb-2">Nome completo</label>
                        <input
                          type="text"
                          id="name"
                          className="input-field"
                          placeholder="Digite seu nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="reason" className="block text-navy font-medium mb-2">Motivo do atestado</label>
                        <select
                          id="reason"
                          className="input-field"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                        >
                          <option value="">Selecione o motivo</option>
                          <option value="consulta">Consulta de rotina</option>
                          <option value="repouso">Repouso médico</option>
                          <option value="procedimento">Procedimento médico</option>
                          <option value="exames">Realização de exames</option>
                          <option value="outro">Outro motivo</option>
                        </select>
                      </div>
                      
                      <div className="pt-4">
                        <button type="submit" className="cta-button w-full">
                          Continuar para próxima etapa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label htmlFor="date" className="block text-navy font-medium mb-2">Data desejada</label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <button
                              id="date"
                              className="input-field flex justify-between items-center"
                              type="button"
                            >
                              {selectedDate ? (
                                format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                              ) : (
                                <span className="text-gray-400">Selecione a data</span>
                              )}
                              <CalendarIcon className="h-5 w-5 text-navy/60" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 bg-white rounded-xl shadow-card border border-light-blue/30 w-auto">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              locale={ptBR}
                              className="p-3 pointer-events-auto rounded-xl"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label htmlFor="days" className="block text-navy font-medium mb-2">Dias de atestado</label>
                        <select
                          id="days"
                          className="input-field"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                          required
                        >
                          <option value="">Selecione o número de dias</option>
                          {[...Array(15)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} {i + 1 === 1 ? 'dia' : 'dias'}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <button 
                          type="button" 
                          className="px-8 py-4 rounded-xl border border-teal text-teal font-semibold hover:bg-teal/5 transition-colors"
                          onClick={handleBackStep}
                        >
                          Voltar
                        </button>
                        <button type="submit" className="cta-button flex-1 flex items-center justify-center">
                          <Send className="h-5 w-5 mr-2" />
                          Gerar atestado agora
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="mb-16 bg-light-blue/10 rounded-3xl py-16" id="testimonials">
            <div className="text-center mb-12 scroll-animate opacity-0">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
                O que dizem nossos clientes
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal to-light-blue/30 mx-auto mt-4"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="scroll-animate opacity-0" style={{ animationDelay: '100ms' }}>
                <TestimonialCard 
                  name="Roberto Almeida" 
                  location="São Paulo, SP" 
                  text="Processo extremamente rápido e eficiente. Em menos de 5 minutos recebi meu atestado por e-mail. Recomendo!"
                  delay={100}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '200ms' }}>
                <TestimonialCard 
                  name="Camila Rodrigues" 
                  location="Rio de Janeiro, RJ" 
                  text="Serviço excelente, não tive nenhum problema com o atestado no meu trabalho. Médicos muito profissionais."
                  delay={200}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '300ms' }}>
                <TestimonialCard 
                  name="Lucas Ferreira" 
                  location="Belo Horizonte, MG" 
                  text="Facilidade impressionante! O atestado foi aceito sem questionamentos e todo o processo online foi muito intuitivo."
                  delay={300}
                />
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="mb-16" id="stats">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="scroll-animate opacity-0" style={{ animationDelay: '100ms' }}>
                <StatCard 
                  icon={Activity} 
                  value={50} 
                  label="Atestados emitidos por hora" 
                  suffix="+" 
                  delay={100}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '200ms' }}>
                <StatCard 
                  icon={ThumbsUp} 
                  value={98} 
                  label="Índice de satisfação" 
                  suffix="%" 
                  delay={200}
                />
              </div>
              <div className="scroll-animate opacity-0" style={{ animationDelay: '300ms' }}>
                <StatCard 
                  icon={Users} 
                  value={100} 
                  label="Taxa de aceitação" 
                  suffix="%" 
                  delay={300}
                />
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mb-16 bg-light-blue/10 rounded-3xl py-16" id="faq">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
                Perguntas frequentes
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal to-light-blue/30 mx-auto mt-4"></div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <FAQ items={faqItems} />
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="mb-16">
            <div className="card-premium bg-gradient-to-br from-navy to-teal text-white p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                  Pronto para gerar seu atestado?
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Não perca tempo e obtenha seu atestado médico online agora mesmo, com validade legal em todo o Brasil.
                </p>
                <a href="#form" className="inline-block bg-emerald text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:bg-emerald/90">
                  Gerar meu atestado agora
                </a>
              </div>
            </div>
          </section>
        </div>
        
        {/* Fixed Chat Interface - Only shown when form is submitted */}
        {showChat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/10 backdrop-blur-sm transition-all animate-fade-in">
            <div className="relative w-full max-w-4xl h-[600px] mx-auto animate-scale-in">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleBackToForm}
                  className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-navy/5 transition-colors"
                >
                  <X size={18} className="text-navy/70" />
                </button>
              </div>
              <ChatInterface 
                userName={name}
                days={days}
                reason={reason}
                onPaymentClick={handlePaymentClick}
                onBack={handleBackToForm}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Popup */}
      <PaymentPopup 
        isOpen={showPaymentPopup} 
        onClose={handlePaymentClose} 
        userName={name}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
