
import React from 'react';
import DoctorCard from './DoctorCard';

interface Doctor {
  name: string;
  specialty: string;
  crm: string;
  certificatesIssued: number;
  isAvailable: boolean;
  imageSrc?: string;
}

const DoctorsList = () => {
  const doctors: Doctor[] = [
    {
      name: 'Dr. Henrique Gomes',
      specialty: 'Clínico Geral',
      crm: 'CRM-SP 881456',
      certificatesIssued: 1892,
      isAvailable: true
    },
    {
      name: 'Dra. Mariana Santos',
      specialty: 'Médica da Família',
      crm: 'CRM 789012/RJ',
      certificatesIssued: 1457,
      isAvailable: false
    },
    {
      name: 'Dr. Ricardo Torres',
      specialty: 'Clínico Geral',
      crm: 'CRM 345678/MG',
      certificatesIssued: 967,
      isAvailable: false
    }
  ];

  return (
    <section className="section-container bg-white" id="doctors">
      <div className="text-center mb-12 scroll-animate opacity-0">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy">
          Médicos disponíveis
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-teal to-light-blue/30 mx-auto mt-4"></div>
        
        <p className="mt-6 max-w-3xl mx-auto text-navy/80">
          Nossa equipe de médicos está disponível 24/7 para atender suas necessidades com profissionalismo e agilidade. 
          Todos são registrados no CRM e especializados em telemedicina.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => (
          <div key={index} className="scroll-animate opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
            <DoctorCard
              name={doctor.name}
              specialty={doctor.specialty}
              crm={doctor.crm}
              certificatesIssued={doctor.certificatesIssued}
              isAvailable={doctor.isAvailable}
              delay={index * 100}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsList;
