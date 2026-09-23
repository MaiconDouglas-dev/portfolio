'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { projects } from '@/data/projects';
import { Terminal, Layers, Github, ExternalLink, Sparkles, Cpu, Database, Server, Cloud, Code2, ArrowUpRight } from 'lucide-react';
import ArchitectureModal from './ArchitectureModal';
import ApiSwaggerModal from './ApiSwaggerModal';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';
import FuturisticCard from './FuturisticCard';

export default function Projects() {
  const { lang } = useApp();
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [swaggerModalOpen, setSwaggerModalOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Track active project card in viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.42;
      projects.forEach((proj, idx) => {
        const el = document.getElementById(`project-card-${proj.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (top <= scrollPos) {
            setActiveProjectIdx(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (id: string) => {
    const el = document.getElementById(`project-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Color Psychology: Harmonious spectrum across the engineering pipeline
  // 01: Ruby (Core Engine) | 02: Sky Cyan (APIs/Data) | 03: Electric Violet (Integration/Cache) | 04: Emerald Mint (Cloud/Prod)
  const getGlowColor = (idx: number) => {
    switch (idx) {
      case 0:
        return 'rgba(255, 45, 85, 0.25)'; // Apple Crimson / Ruby
      case 1:
        return 'rgba(14, 165, 233, 0.22)'; // Sky Cyan
      case 2:
        return 'rgba(139, 92, 246, 0.22)'; // Electric Violet
      case 3:
      default:
        return 'rgba(16, 185, 129, 0.22)'; // Emerald Mint
    }
  };

  const getBadgeStyle = (idx: number) => {
    switch (idx) {
      case 0:
        return 'bg-appleRed-500/10 text-appleRed-400 border-appleRed-500/30';
      case 1:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 2:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 3:
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getActivePillStyle = (idx: number) => {
    switch (idx) {
      case 0:
        return 'bg-appleRed-600 text-white shadow-lg shadow-appleRed-500/30 border-appleRed-500/50';
      case 1:
        return 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 border-sky-500/50';
      case 2:
        return 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 border-purple-500/50';
      case 3:
      default:
        return 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 border-emerald-500/50';
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* Section Header & Lusion-inspired Project Stepper */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-appleRed-500/20 bg-appleRed-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-appleRed-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-appleRed-400 uppercase tracking-widest">
                {lang === 'pt' ? 'PROJETOS & DESENVOLVIMENTO // 04 RELEASES' : 'PROJECTS & RELEASES // 04 SLOTS'}
              </span>
            </div>

            <KineticText
              text={lang === 'pt' ? 'Projetos & Desenvolvimento' : 'Projects & Development'}
              as="h2"
              staggerDelayMs={18}
              className="text-2xl sm:text-4xl font-black text-white tracking-tight"
            />

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              {lang === 'pt'
                ? 'Arquitetura backend em Java, APIs REST, modelagem relacional no Oracle, microsserviços e integração contínua.'
                : 'Backend architecture in Java, REST APIs, Oracle relational data modeling, microservices, and continuous delivery.'}
            </p>
          </div>

          {/* Quick-Jump Stepper Pills (Touch Friendly & Horizontally Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar">
            {projects.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              const activeStyle = getActivePillStyle(idx);

              return (
                <MagneticButton key={proj.id} strength={0.2}>
                  <button
                    onClick={() => scrollToProject(proj.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono border transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? activeStyle
                        : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-[10px] opacity-75 font-bold">{proj.number}</span>
                    <span>{idx === 0 ? 'Clyvo (Vet)' : `Slot ${proj.number}`}</span>
                    {proj.isPlaceholder && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
                    )}
                  </button>
                </MagneticButton>
              );
            })}
          </div>
        </div>

        {/* Lusion-Style Stacking Horizon Deck */}
        <div className="space-y-12 sm:space-y-16 relative pb-16">
          {projects.map((proj, idx) => {
            const isFirst = idx === 0;
            const glow = getGlowColor(idx);
            const badgeStyle = getBadgeStyle(idx);
            const stackingTopOffset = `calc(4.75rem + ${idx * 14}px)`;

            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className="sticky transition-all duration-300 will-change-transform"
                style={{ top: stackingTopOffset }}
              >
                <FuturisticCard
                  withBorderBeam={isFirst}
                  withTilt={true}
                  withCorners={true}
                  glowColor={glow}
                  data-cursor-text={isFirst ? (lang === 'pt' ? 'EXPLORAR' : 'EXPLORE') : (lang === 'pt' ? `SLOT 0${idx + 1}` : `SLOT 0${idx + 1}`)}
                  className={`border border-white/[0.12] bg-[#0c0c12]/95 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] hover:border-white/30 transition-all duration-300 ${
                    isFirst ? 'border-appleRed-500/40 shadow-[0_24px_70px_rgba(255,45,85,0.12)]' : ''
                  }`}
                  contentClassName="p-5 sm:p-9 space-y-5 sm:space-y-6 relative overflow-hidden"
                >
                  {/* Giant Decorative Holographic Numerals */}
                  <span
                    className="absolute -top-6 -right-2 sm:-right-4 text-7xl sm:text-9xl font-black font-mono text-white/[0.03] select-none pointer-events-none tracking-tighter"
                    aria-hidden="true"
                  >
                    {proj.number}
                  </span>

                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${badgeStyle}`}>
                        {lang === 'pt' ? proj.badgePt : proj.badgeEn}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 truncate max-w-[180px] sm:max-w-none">
                        {proj.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span>{proj.number} / 04</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                      {lang === 'pt' ? proj.titlePt : proj.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-neutral-300 leading-relaxed max-w-3xl">
                      {lang === 'pt' ? proj.subtitlePt : proj.subtitleEn}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl pt-0.5">
                      {lang === 'pt' ? proj.descPt : proj.descEn}
                    </p>
                  </div>

                  {/* Metrics Blueprint Grid */}
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1 relative z-10">
                      {proj.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
                        >
                          <span className="text-[10px] font-mono text-neutral-400 block uppercase truncate">
                            {lang === 'pt' ? m.labelPt : m.labelEn}
                          </span>
                          <span className="text-xs font-bold text-neutral-200 block truncate mt-0.5">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Placeholder Visual HUD for upcoming project slots (Slots 02, 03, 04) */}
                  {proj.isPlaceholder && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-dashed border-white/[0.12] space-y-2 relative z-10">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                          <Sparkles size={13} />
                          {lang === 'pt' ? 'Slot Reservado para Novo Projeto' : 'Reserved Slot for New Project'}
                        </span>
                        <span className="text-[10px] text-neutral-400 hidden sm:inline">src/data/projects.ts</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {lang === 'pt'
                          ? 'Este espaço já está formatado e com integração pronta. Assim que você me passar os dados do seu projeto, os textos, endpoints, métricas e links deste card serão atualizados instantaneamente.'
                          : 'This slot is formatted and ready for integration. As soon as you provide the details for this project, its title, copy, endpoints, and links will be updated instantly.'}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-neutral-300 border border-white/[0.06] hover:border-white/20 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 relative z-10">
                    {isFirst ? (
                      <>
                        <MagneticButton strength={0.25} className="w-full sm:w-auto">
                          <button
                            onClick={() => setSwaggerModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-appleRed-500/20 hover:scale-[1.02] cursor-pointer transition-all"
                          >
                            <Terminal size={14} />
                            <span>{lang === 'pt' ? 'Testar Endpoints (Swagger)' : 'Explore Endpoints (Swagger)'}</span>
                          </button>
                        </MagneticButton>

                        <MagneticButton strength={0.25} className="w-full sm:w-auto">
                          <button
                            onClick={() => setArchModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-neutral-200 font-semibold text-xs hover:border-appleViolet-500/40 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                          >
                            <Layers size={14} className="text-appleViolet-400" />
                            <span>{lang === 'pt' ? 'Ver Arquitetura' : 'View Architecture'}</span>
                          </button>
                        </MagneticButton>

                        <MagneticButton strength={0.25} className="w-full sm:w-auto">
                          <a
                            href={proj.githubUrl || 'https://github.com/MaiconDouglas-dev'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-neutral-400 font-medium text-xs hover:text-white hover:border-white/20 transition-all cursor-pointer"
                          >
                            <Github size={14} />
                            <span>{lang === 'pt' ? 'GitHub' : 'GitHub'}</span>
                          </a>
                        </MagneticButton>
                      </>
                    ) : (
                      <>
                        <MagneticButton strength={0.25} className="w-full sm:w-auto">
                          <a
                            href="https://github.com/MaiconDouglas-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/[0.12] hover:scale-[1.02] cursor-pointer transition-all"
                          >
                            <Github size={14} />
                            <span>{lang === 'pt' ? 'Repositório no GitHub' : 'GitHub Repository'}</span>
                            <ArrowUpRight size={13} className="text-neutral-400" />
                          </a>
                        </MagneticButton>

                        <span className="text-xs font-mono text-neutral-400 italic">
                          {lang === 'pt' ? '• Pronto para receber novos dados' : '• Ready to receive new project data'}
                        </span>
                      </>
                    )}
                  </div>
                </FuturisticCard>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Architecture & Swagger Modals for Clyvo */}
      <ArchitectureModal isOpen={archModalOpen} onClose={() => setArchModalOpen(false)} />
      <ApiSwaggerModal isOpen={swaggerModalOpen} onClose={() => setSwaggerModalOpen(false)} />
    </section>
  );
}
