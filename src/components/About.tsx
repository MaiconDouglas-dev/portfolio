'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, GraduationCap, Server, Database, Cloud } from 'lucide-react';
import KineticText from './KineticText';

export default function About() {
  const { lang } = useApp();

  const highlights = [
    {
      icon: Server,
      title: 'Backend Java & Spring Boot',
      desc: lang === 'pt'
        ? 'POO sólida, Collections, tratamento de exceções, APIs RESTful semânticas, Spring Security com JWT/OAuth2 e microsserviços.'
        : 'Solid OOP, Collections, exception handling, semantic RESTful APIs, Spring Security with JWT/OAuth2, and microservices.'
    },
    {
      icon: Database,
      title: 'Oracle Database, PL/SQL & NoSQL',
      desc: lang === 'pt'
        ? 'Modelagem conceitual, lógica e relacional, procedures, packages, triggers, sequences, integridade ACID e MongoDB.'
        : 'Conceptual, logical and relational modeling, procedures, packages, triggers, sequences, ACID integrity, and MongoDB.'
    },
    {
      icon: Cloud,
      title: 'DevOps, Azure Cloud & Qualidade',
      desc: lang === 'pt'
        ? 'Docker multi-stage, VMs, Azure App Service/SQL, pipelines CI/CD, Linux, Git Flow e testes automatizados com JUnit.'
        : 'Multi-stage Docker, VMs, Azure App Service/SQL, CI/CD pipelines, Linux, Git Flow, and automated testing with JUnit.'
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-appleRed-500/20 bg-appleRed-500/10">
            <GraduationCap size={13} className="text-appleRed-400" />
            <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-widest">
              {lang === 'pt' ? 'TRAJETÓRIA & FORMAÇÃO' : 'BACKGROUND & EDUCATION'}
            </span>
          </div>

          <KineticText
            text={lang === 'pt' ? 'Engenharia de Software com Foco em Backend' : 'Software Engineering with Backend Focus'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-4xl font-black text-white tracking-tight"
          />

          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed pt-1">
            {lang === 'pt'
              ? 'Minha principal área de desenvolvimento é Backend com Java, construída ao longo da graduação em Análise e Desenvolvimento de Sistemas e através de projetos práticos. Durante minha formação, avancei dos fundamentos da programação e Programação Orientada a Objetos até o desenvolvimento de APIs completas, persistência de dados em Oracle DB, autenticação e autorização stateless, testes automatizados, containerização com Docker e deploy em nuvem na Microsoft Azure.'
              : 'My primary focus is Java Backend Engineering, established throughout my Systems Analysis and Development degree and through production projects. Across my formation, I advanced from programming fundamentals and OOP to designing complete RESTful APIs, relational persistence with Oracle DB, stateless authentication/authorization, automated testing with JUnit, Docker containerization, and Microsoft Azure cloud deployment.'}
          </p>
        </div>

        {/* 3 Pillars Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl hover:border-white/20 transition-all duration-300 space-y-3 group shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-appleRed-400 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-appleRed-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-appleGreen-500">
                  <CheckCircle2 size={13} />
                  <span>{lang === 'pt' ? 'Prática comprovada' : 'Proven practice'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
