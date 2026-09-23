'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { skillsInventory, SkillGroup } from '@/data/skills';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';
import FuturisticCard from './FuturisticCard';
import { Server, Database, Cloud, Code2, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabIcons: Record<string, React.ElementType> = {
    'all': Sparkles,
    'backend-java': Server,
    'database': Database,
    'devops-tools': Cloud,
    'complementary': Code2,
    'academic-contact': GraduationCap,
  };

  const primarySkills = skillsInventory.filter((g) => g.tier === 'primary');
  const secondarySkills = skillsInventory.filter((g) => g.tier === 'secondary');
  const academicSkills = skillsInventory.filter((g) => g.tier === 'academic');

  return (
    <section id="skills" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-appleRed-500/20 bg-appleRed-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-appleRed-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-widest">
              {lang === 'pt' ? 'TECNOLOGIAS & CONHECIMENTOS' : 'TECHNOLOGIES & KNOWLEDGE'}
            </span>
          </div>

          <KineticText
            text={lang === 'pt' ? 'Tecnologias & Conhecimentos' : 'Technologies & Core Competencies'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-4xl font-black text-white tracking-tight"
          />

          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl leading-relaxed pt-1">
            {lang === 'pt'
              ? 'Minha principal área de desenvolvimento é Backend com Java, construída ao longo da graduação em Análise e Desenvolvimento de Sistemas e através de projetos práticos. Durante minha formação, avancei dos fundamentos e POO até o desenvolvimento de APIs REST, persistência de dados, autenticação, bancos relacionais, containerização e noções de cloud.'
              : 'My primary development focus is Java Backend, built through my degree in Systems Analysis and Development and practical projects. From OOP foundations to REST API design, data persistence, authentication, relational databases, containerization, and cloud basics.'}
          </p>
        </div>

        {/* Filter Tabs (Horizontal Scroll on Mobile, Wrapped on Desktop) */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar max-w-full pb-1 sm:flex-wrap">
          <MagneticButton strength={0.2}>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-appleRed-600 text-white shadow-md shadow-appleRed-500/25 border border-appleRed-500/40'
                  : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {lang === 'pt' ? 'Todas as Áreas' : 'All Domains'}
            </button>
          </MagneticButton>

          {skillsInventory.map((group) => {
            const Icon = tabIcons[group.id] || Sparkles;
            const isSelected = activeTab === group.id;

            return (
              <MagneticButton key={group.id} strength={0.2}>
                <button
                  onClick={() => setActiveTab(group.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-appleRed-600 text-white shadow-md shadow-appleRed-500/25 border border-appleRed-500/40'
                      : 'bg-white/[0.04] text-neutral-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon size={13} className={isSelected ? 'text-white' : 'text-appleRed-400'} />
                  <span>{lang === 'pt' ? group.categoryPt : group.categoryEn}</span>
                </button>
              </MagneticButton>
            );
          })}
        </div>

        {/* Primary Focus Grid (Tier: Primary) */}
        {(activeTab === 'all' || primarySkills.some((g) => g.id === activeTab)) && (
          <div className="space-y-4">
            {activeTab === 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-wider">
                  {lang === 'pt' ? 'Foco Principal (Backend & Infraestrutura)' : 'Primary Focus (Backend & Infrastructure)'}
                </span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {primarySkills
                .filter((g) => activeTab === 'all' || g.id === activeTab)
                .map((group) => {
                  const Icon = tabIcons[group.id] || Server;
                  const glow =
                    group.id === 'backend-java'
                      ? 'rgba(255, 45, 85, 0.22)' // Ruby (Java Core)
                      : group.id === 'database'
                      ? 'rgba(14, 165, 233, 0.22)' // Sky Cyan (Oracle/SQL)
                      : 'rgba(16, 185, 129, 0.22)'; // Emerald (Docker/Cloud)
                  return (
                    <FuturisticCard
                      key={group.id}
                      glowColor={glow}
                      withTilt={true}
                      withCorners={true}
                      className="h-full border-white/[0.1] hover:border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                      contentClassName="p-5 sm:p-6 flex flex-col justify-between h-full space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-appleRed-500/10 text-appleRed-400 border border-appleRed-500/20">
                            {lang === 'pt' ? group.badgePt : group.badgeEn}
                          </span>
                          <Icon size={16} className="text-neutral-400" />
                        </div>

                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {lang === 'pt' ? group.categoryPt : group.categoryEn}
                        </h3>

                        <p className="text-xs text-neutral-400 leading-relaxed min-h-[48px]">
                          {lang === 'pt' ? group.summaryPt : group.summaryEn}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                          {lang === 'pt' ? 'Tecnologias & Tópicos:' : 'Technologies & Topics:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-neutral-200 border border-white/[0.08] hover:border-appleRed-500/40 hover:text-white transition-all cursor-default"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </FuturisticCard>
                  );
                })}
            </div>
          </div>
        )}

        {/* Secondary & Academic Sections (Distinct Subdued Prominence) */}
        {(activeTab === 'all' || activeTab === 'complementary' || activeTab === 'academic-contact') && (
          <div className="space-y-4 pt-4">
            {activeTab === 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  {lang === 'pt' ? 'Conhecimentos Complementares & Contato Acadêmico' : 'Complementary Knowledge & Academic Exposure'}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conhecimentos Complementares */}
              {(activeTab === 'all' || activeTab === 'complementary') &&
                secondarySkills.map((group) => (
                  <FuturisticCard
                    key={group.id}
                    glowColor="rgba(139, 92, 246, 0.15)"
                    withTilt={true}
                    withCorners={false}
                    className="bg-black/40 border-white/[0.06] hover:border-white/[0.16]"
                    contentClassName="p-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.04] text-neutral-400 border border-white/[0.08]">
                          {lang === 'pt' ? group.badgePt : group.badgeEn}
                        </span>
                        <Code2 size={16} className="text-neutral-500" />
                      </div>
                      <h4 className="text-base font-bold text-neutral-200">
                        {lang === 'pt' ? group.categoryPt : group.categoryEn}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {lang === 'pt' ? group.summaryPt : group.summaryEn}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                      {group.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-neutral-400 border border-white/[0.05] hover:text-neutral-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </FuturisticCard>
                ))}

              {/* Contato Acadêmico */}
              {(activeTab === 'all' || activeTab === 'academic-contact') &&
                academicSkills.map((group) => (
                  <FuturisticCard
                    key={group.id}
                    glowColor="rgba(59, 130, 246, 0.15)"
                    withTilt={true}
                    withCorners={false}
                    className="bg-black/40 border-white/[0.06] hover:border-white/[0.16]"
                    contentClassName="p-6 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.04] text-neutral-400 border border-white/[0.08]">
                          {lang === 'pt' ? group.badgePt : group.badgeEn}
                        </span>
                        <GraduationCap size={16} className="text-neutral-500" />
                      </div>
                      <h4 className="text-base font-bold text-neutral-200">
                        {lang === 'pt' ? group.categoryPt : group.categoryEn}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {lang === 'pt' ? group.summaryPt : group.summaryEn}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                      {group.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-neutral-400 border border-white/[0.05] hover:text-neutral-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </FuturisticCard>
                ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
