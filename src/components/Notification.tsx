
import React, { useEffect, useState } from 'react';
import { Bell, Clock, FileCheck } from 'lucide-react';

const cities = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília',
  'Curitiba', 'Fortaleza', 'Recife', 'Porto Alegre', 'Manaus', 'Goiânia',
  'Belém', 'Florianópolis', 'Vitória', 'Campo Grande', 'Cuiabá', 'João Pessoa'
];

const names = [
  'João', 'Ana', 'Carlos', 'Maria', 'Pedro', 'Paula', 'Lucas', 'Camila', 'Marcelo',
  'Juliana', 'Roberto', 'Fernanda', 'Eduardo', 'Beatriz', 'Felipe', 'Amanda', 'Renato',
  'Larissa', 'Rodrigo', 'Carolina', 'Gustavo', 'Mariana', 'André', 'Patrícia'
];

const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
const getRandomTime = () => Math.floor(Math.random() * 10) + 1;

interface NotificationProps {
  showInterval?: number;
}

const Notification: React.FC<NotificationProps> = ({ showInterval = 20000 }) => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: getRandomElement(names),
    city: getRandomElement(cities),
    time: getRandomTime(),
  });
  
  useEffect(() => {
    const showNotification = () => {
      const newNotification = {
        name: getRandomElement(names),
        city: getRandomElement(cities),
        time: getRandomTime(),
      };
      
      setNotification(newNotification);
      setVisible(true);
      
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const interval = setInterval(showNotification, showInterval);
    
    // Show first notification after a delay
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [showInterval]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-emerald-500 text-white rounded-xl shadow-lg border border-emerald-600 p-4 transform transition-all duration-500 hover:scale-102 animate-[notificationPopIn_0.5s_ease-out_forwards]">
      <div className="flex items-start space-x-3">
        <div className="mt-0.5 bg-white/20 p-2 rounded-full">
          <FileCheck className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-base font-bold">Novo atestado emitido!</p>
            <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white/20">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-white/40"></span>
              <span className="relative h-2 w-2 rounded-full bg-white"></span>
            </span>
          </div>
          <p className="text-sm text-white/90 font-medium">
            {notification.name} de {notification.city}
          </p>
          <div className="flex items-center mt-1 text-xs text-white/80">
            <Clock className="h-3 w-3 mr-1" />
            <span>Há {notification.time} {notification.time === 1 ? 'minuto' : 'minutos'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
