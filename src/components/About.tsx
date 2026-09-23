'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { GraduationCap, Server, Database, Cloud, Compass, Target } from 'lucide-react';
import KineticText from './KineticText';
import FuturisticCard from './FuturisticCard';

export default function About() {
  const { lang } = useApp();

  const pillars = [
    {
      icon: Server,
      titlePt: 'Ecossistema Java (Foco Principal)',
      titleEn: 'Java Ecosystem (Core Focus)',
      descPt: 'Minha principal área de estudo e aprofundamento é o ecossistema Java, trabalhando com conceitos como POO, Collections, tratamento de exceções, JDBC, Spring Boot, Spring MVC, Spring Security, JPA, DTOs, validações e desenvolvimento de APIs REST.',
      descEn: 'My primary area of study and specialization is the Java ecosystem: OOP, Collections, exception handling, JDBC, Spring Boot, Spring MVC, Spring Security, JPA, DTOs, validations, and REST API development.'
    },
    {
      icon: Database,
      titlePt: 'Banco de Dados (SQL, Oracle & PL/SQL)',
      titleEn: 'Databases (SQL, Oracle & PL/SQL)',
      descPt: 'Conhecimentos em banco de dados, principalmente SQL, Oracle e PL/SQL, incluindo modelagem relacional, normalização, consultas, relacionamentos e objetos de banco como procedures, functions e triggers.',
      descEn: 'Proficiency in relational databases, notably SQL, Oracle Database, and PL/SQL, encompassing relational modeling, normalization, queries, relationships, and database objects like procedures, functions, and triggers.'
    },
    {
      icon: Cloud,
      titlePt: 'Infraestrutura, Entrega & Nuvem',
      titleEn: 'Infrastructure, Delivery & Cloud',
      descPt: 'Experiência acadêmica e prática com Git, GitHub, Linux, Docker, Docker Compose e Microsoft Azure, incluindo containerização de aplicações Spring Boot, integração com bancos de dados e fundamentos de deploy e CI/CD.',
      descEn: 'Academic and practical experience with Git, GitHub, Linux, Docker, Docker Compose, and Microsoft Azure, including Spring Boot containerization, database integration, and deploy / CI/CD fundamentals.'
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-appleRed-500/20 bg-appleRed-500/10">
            <GraduationCap size={13} className="text-appleRed-400" />
            <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-widest">
              {lang === 'pt' ? 'TRAJETÓRIA & FORMAÇÃO' : 'BACKGROUND & EDUCATION'}
            </span>
          </div>

          <KineticText
            text={lang === 'pt' ? 'Desenvolvedor Backend Java em Formação' : 'Java Backend Developer in Training'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-4xl font-black text-white tracking-tight"
          />

          <div className="space-y-3 text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed pt-1">
            <p>
              {lang === 'pt'
                ? 'Sou desenvolvedor Backend Java em formação, cursando Análise e Desenvolvimento de Sistemas, com foco no desenvolvimento de aplicações utilizando Java e Spring Boot.'
                : 'I am a Java Backend Developer in training, pursuing a degree in Systems Analysis and Development, focused on developing applications using Java and Spring Boot.'}
            </p>
            <p className="text-neutral-400 text-sm">
              {lang === 'pt'
                ? 'Ao longo da graduação, construí uma base em programação orientada a objetos, desenvolvimento de APIs REST, persistência de dados, segurança, bancos de dados relacionais, versionamento e fundamentos de DevOps e Cloud.'
                : 'Throughout my academic journey, I built a foundation in object-oriented programming, REST API engineering, data persistence, security, relational databases, version control, and DevOps / Cloud fundamentals.'}
            </p>
          </div>
        </div>

        {/* 3 Pillars Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const glow =
              idx === 0
                ? 'rgba(255, 45, 85, 0.2)'
                : idx === 1
                ? 'rgba(59, 130, 246, 0.18)'
                : 'rgba(16, 185, 129, 0.18)';
            return (
              <FuturisticCard
                key={idx}
                glowColor={glow}
                withTilt={true}
                withCorners={true}
                className="h-full border-white/[0.08] hover:border-white/25 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                contentClassName="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-appleRed-400 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-appleRed-400 transition-colors">
                    {lang === 'pt' ? item.titlePt : item.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {lang === 'pt' ? item.descPt : item.descEn}
                  </p>
                </div>
              </FuturisticCard>
            );
          })}
        </div>

        {/* Multidisciplinary Foundation & Objective Banner */}
        <FuturisticCard
          glowColor="rgba(168, 85, 247, 0.18)"
          withTilt={false}
          withCorners={true}
          className="border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          contentClassName="p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-start gap-3">
            <Compass size={20} className="text-appleViolet-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wide">
                {lang === 'pt' ? 'Visão Multidisciplinar na Graduação' : 'Multidisciplinary Academic Perspective'}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {lang === 'pt'
                  ? 'Durante a graduação também tive contato com outras áreas e tecnologias, como C#/.NET, React, React Native, Python, Inteligência Artificial, Machine Learning e IoT. Esses conhecimentos fazem parte da minha formação acadêmica, mas atualmente meu desenvolvimento profissional está direcionado ao Backend com Java.'
                  : 'During my studies, I also explored other domains and technologies including C#/.NET, React, React Native, Python, Artificial Intelligence, Machine Learning, and IoT. While these constitute my academic background, my active professional development is firmly directed toward Java Backend.'}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-start gap-3">
            <Target size={20} className="text-appleGreen-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono font-bold text-appleGreen-500 uppercase tracking-widest block mb-1">
                {lang === 'pt' ? 'OBJETIVO PROFISSIONAL' : 'CAREER OBJECTIVE'}
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                {lang === 'pt'
                  ? 'Busco minha primeira oportunidade como Desenvolvedor Backend Java, onde possa aplicar e aprofundar meus conhecimentos em Java, Spring Boot, APIs REST e bancos de dados, contribuindo com o desenvolvimento de software e evoluindo através da experiência prática em equipe.'
                  : 'Seeking my first opportunity as a Java Backend Developer, to apply and deepen my knowledge in Java, Spring Boot, REST APIs, and databases, contributing to software development and evolving through practical team experience.'}
              </p>
            </div>
          </div>
        </FuturisticCard>

      </div>
    </section>
  );
}
