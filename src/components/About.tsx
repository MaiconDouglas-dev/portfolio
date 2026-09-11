'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Server, Database, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { lang, t } = useApp();

  const highlights = [
    {
      title: 'Java 21 / 25 & Spring Boot 3',
      desc: lang === 'pt'
        ? 'Records, Virtual Threads, Spring Security com JWT e controle de autoridades por perfil (RBAC).'
        : 'Records, Virtual Threads, Spring Security with JWT, and Role-Based Access Control.'
    },
    {
      title: 'Oracle Database 19c & PL/SQL',
      desc: lang === 'pt'
        ? 'Modelagem relacional sólida, integridade referencial e migrations automatizadas via Flyway.'
        : 'Relational modeling, data integrity, and automated schema migrations via Flyway.'
    },
    {
      title: 'Frontend & Mobile Integration',
      desc: lang === 'pt'
        ? 'Design de APIs limpas e previsíveis consumidas com alta performance por apps em React Native.'
        : 'Clean, predictable API contracts tailored for smooth React Native consumption.'
    }
  ];

  return (
    <section id="about" className="py-20 border-t border-neutral-200/60 dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'SOBRE MIM' : 'ABOUT ME'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {lang === 'pt'
              ? 'Engenharia de software com foco em resiliência, segurança e regras de negócio reais.'
              : 'Software engineering focused on resilience, security, and real-world business domains.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed pt-2">
            {lang === 'pt'
              ? 'Desenvolvedor focado em arquitetura de microsserviços e APIs REST. Atualmente liderando a evolução da API Clyvo (M-Vet), um ecossistema veterinário com agendamentos sem colisão de horários, autorizações de prontuário e integração direta com aplicativo móvel.'
              : 'Software engineer focused on microservice architectures and RESTful APIs. Currently spearheading the Clyvo (M-Vet) API, a veterinary platform with conflict-free scheduling, medical record permissions, and React Native mobile integration.'}
          </p>
        </div>

        {/* 3 Clean Horizontal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0c0c11] space-y-2"
            >
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-appleGreen-500 shrink-0" />
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
