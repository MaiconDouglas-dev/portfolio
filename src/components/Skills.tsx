'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

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
    <section id="skills" className="py-20 border-t border-neutral-200/60 dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'STACK & TECNOLOGIAS' : 'STACK & TECH'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {lang === 'pt' ? 'Arsenal Técnico de Engenharia' : 'Technical Stack'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0c0c11] space-y-3"
            >
              <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-white/[0.05] text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-white/[0.06]"
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
