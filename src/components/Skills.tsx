'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import KineticText from './KineticText';

export default function Skills() {
  const { lang } = useApp();

  const groups = [
    {
      title: 'Backend Core',
      skills: ['Java 21 / 25', 'Spring Boot 3', '.NET / C#', 'OAuth 2.0 / JWT', 'RESTful APIs', 'Virtual Threads']
    },
    {
      title: 'Bancos de Dados',
      skills: ['Oracle 19c', 'PL/SQL', 'Flyway DDL', 'PostgreSQL', 'JPA / Hibernate', 'Sequences & Triggers']
    },
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Axios']
    },
    {
      title: 'DevOps & Nuvem',
      skills: ['Docker', 'Azure Cloud', 'Git / GitHub', 'CI/CD Pipelines', 'Linux']
    }
  ];

  return (
    <section id="skills" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'STACK & TECNOLOGIAS' : 'STACK & TECH'}
          </span>
          <KineticText
            text={lang === 'pt' ? 'Arsenal Técnico de Engenharia' : 'Technical Engineering Stack'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-2xl space-y-3 hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-neutral-200 border border-white/[0.06] hover:border-appleRed-500/40 hover:text-white transition-all cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
