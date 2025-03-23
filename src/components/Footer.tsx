
import React from 'react';
import { Shield, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-off-white to-light-blue/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-playfair font-semibold text-navy mb-4">Seu Atestado Online</h3>
            <p className="text-navy/70 mb-4">
              Emissão de atestados médicos online com validade legal em todo o Brasil.
            </p>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-emerald mr-2" />
              <span className="text-sm font-medium text-navy/80">Site 100% seguro</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold text-navy mb-4">Contato</h3>
            <div className="flex items-center mb-3">
              <Mail className="h-5 w-5 text-teal mr-2" />
              <a href="mailto:contato@atestado.com.br" className="text-navy/70 hover:text-teal transition-colors">
                contato@atestado.com.br
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-teal mr-2" />
              <a href="tel:+551199999999" className="text-navy/70 hover:text-teal transition-colors">
                (11) 9999-9999
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold text-navy mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Sobre nós</a>
              </li>
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Nossa equipe</a>
              </li>
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold text-navy mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Termos de uso</a>
              </li>
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Política de privacidade</a>
              </li>
              <li>
                <a href="#" className="text-navy/70 hover:text-teal transition-colors">Política de cookies</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-light-blue/30 pt-8 flex flex-col items-center">
          <p className="text-center text-navy/60 text-sm">
            © 2025 Seu Atestado Online. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
