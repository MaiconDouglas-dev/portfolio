'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { detailedSkillsData } from '@/data/skills';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';
import { Server, Database, Cloud, ShieldCheck, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabIcons: Record<string, React.ElementType> = {
    'all': Sparkles,
    'backend-java': Server,
    'database': Database,
    'devops-cloud': Cloud,
    'engineering-qa': ShieldCheck,
    'frontend-mobile': Smartphone,
    'emerging-tech': Sparkles,
  };

  const filteredData = activeTab === 'all'
    ? detailedSkillsData
    : detailedSkillsData.filter((group) => group.id === activeTab);

  return (
    <section id="skills" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-appleRed-500/20 bg-appleRed-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-appleRed-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-widest">
              {lang === 'pt' ? 'TECNOLOGIAS & COMPETÊNCIAS' : 'TECHNOLOGIES & SKILLS'}
            </span>
          </div>

          <KineticText
            text={lang === 'pt' ? 'Engenharia Backend & Stack Completa' : 'Backend Engineering & Full Stack Arsenal'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-4xl font-black text-white tracking-tight"
          />

          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed pt-1">
            {lang === 'pt'
              ? 'Minha principal área de desenvolvimento é Backend com Java, construída ao longo da graduação em Análise e Desenvolvimento de Sistemas e através de projetos práticos. Avancei dos fundamentos e POO até arquitetura de APIs, persistência transacional, autenticação, testes, containerização e deploy em nuvem.'
              : 'My primary focus is Java Backend Engineering, established throughout my Systems Analysis degree and production projects: advancing from OOP foundations to REST API architecture, transactional persistence, authentication, testing, containerization, and cloud deployment.'}
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <MagneticButton strength={0.2}>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-appleRed-600 text-white shadow-md shadow-appleRed-500/25 border border-appleRed-500/40'
                  : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {lang === 'pt' ? 'Todas as Áreas' : 'All Domains'}
            </button>
          </MagneticButton>

          {detailedSkillsData.map((group) => {
            const Icon = tabIcons[group.id] || Sparkles;
            const isSelected = activeTab === group.id;

            return (
              <MagneticButton key={group.id} strength={0.2}>
                <button
                  onClick={() => setActiveTab(group.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-appleRed-600 text-white shadow-md shadow-appleRed-500/25 border border-appleRed-500/40'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon size={13} className={isSelected ? 'text-white' : 'text-appleRed-400'} />
                  <span>{lang === 'pt' ? group.categoryPt.split('&')[0].trim() : group.categoryEn.split('&')[0].trim()}</span>
                </button>
              </MagneticButton>
            );
          })}
        </div>

        {/* Dynamic Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredData.map((group) => (
            <div
              key={group.id}
              className="p-6 sm:p-7 rounded-3xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl space-y-6 hover:border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.06] text-appleRed-400 border border-white/[0.08]">
                    {lang === 'pt' ? group.badgePt : group.badgeEn}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">#{group.id}</span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {lang === 'pt' ? group.categoryPt : group.categoryEn}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'pt' ? group.summaryPt : group.summaryEn}
                </p>
              </div>

              {/* Topics & Pill Items */}
              <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                {group.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-appleGreen-500 shrink-0" />
                      <span>{lang === 'pt' ? topic.titlePt : topic.titleEn}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pl-4">
                      {topic.items.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-neutral-300 border border-white/[0.06] hover:border-appleRed-500/40 hover:text-white transition-all cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
