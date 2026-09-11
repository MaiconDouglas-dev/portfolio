'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { projects } from '@/data/projects';
import { Layers, Terminal, Github, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import ArchitectureModal from './ArchitectureModal';
import ApiSwaggerModal from './ApiSwaggerModal';

export default function Projects() {
  const { lang, t } = useApp();
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [swaggerModalOpen, setSwaggerModalOpen] = useState(false);

  const starProject = projects.find((p) => p.id === 'clyvo-m-vet')!;
  const secondaryProjects = projects.filter((p) => p.id !== 'clyvo-m-vet');

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="inline-block text-xs font-mono font-bold text-appleRed-600 dark:text-appleRed-500 uppercase tracking-[0.2em] mb-3">
            {t('projects.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="space-y-8">
          
          {/* STAR PROJECT (CLYVO M-VET) - APPLE PRO STYLE */}
          <div className="relative rounded-3xl border border-appleRed-500/30 dark:border-appleRed-500/30 bg-white dark:bg-[#0c0c11] p-6 sm:p-10 shadow-2xl shadow-appleRed-500/5 hover:border-appleRed-500/50 transition-all duration-300 overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-appleRed-600/10 via-appleViolet-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-6">
              
              {/* Top Row: Badge & Project Number */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-appleRed-500/10 border border-appleRed-500/20 text-appleRed-600 dark:text-appleRed-400 text-xs font-mono font-bold">
                  <Sparkles size={14} className="text-appleRed-500" />
                  <span>{lang === 'pt' ? starProject.badgePt : starProject.badgeEn}</span>
                </div>
                <span className="text-3xl sm:text-4xl font-mono font-black text-neutral-300 dark:text-neutral-800 select-none">
                  {starProject.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                  {lang === 'pt' ? starProject.titlePt : starProject.titleEn}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-appleRed-600 dark:text-appleRed-400">
                  {lang === 'pt' ? starProject.subtitlePt : starProject.subtitleEn}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl">
                {lang === 'pt' ? starProject.descPt : starProject.descEn}
              </p>

              {/* Key Highlights / Rules Checklist */}
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-black/80 border border-neutral-200/80 dark:border-white/[0.08] space-y-3">
                <p className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-appleRed-500" />
                  {t('projects.keyFeatures')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                  {(lang === 'pt' ? starProject.architectureHighlightsPt : starProject.architectureHighlightsEn).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-appleGreen-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {starProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactive Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08]">
                {/* Button 1: Open Swagger Console */}
                <button
                  type="button"
                  onClick={() => setSwaggerModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs transition-all duration-200 shadow-xl shadow-appleRed-500/25 hover:scale-[1.02] cursor-pointer"
                >
                  <Terminal size={15} />
                  <span>{t('projects.openSwagger')}</span>
                </button>

                {/* Button 2: Open Architecture Diagram */}
                <button
                  type="button"
                  onClick={() => setArchModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 dark:border-white/[0.12] bg-white dark:bg-[#121218] text-neutral-800 dark:text-neutral-200 hover:border-appleViolet-500 font-semibold text-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <Layers size={15} className="text-appleViolet-400" />
                  <span>{t('projects.openArchitecture')}</span>
                </button>

                {/* Button 3: GitHub Link */}
                <a
                  href={starProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-semibold text-xs transition-colors"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>

            </div>
          </div>

          {/* SECONDARY PROJECTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryProjects.map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0c11] hover:border-appleRed-500/40 hover:shadow-xl transition-all duration-200 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08]">
                      {lang === 'pt' ? proj.badgePt : proj.badgeEn}
                    </span>
                    <span className="text-2xl font-mono font-black text-neutral-300 dark:text-neutral-800">
                      {proj.number}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    {lang === 'pt' ? proj.titlePt : proj.titleEn}
                  </h4>

                  <p className="text-xs sm:text-sm font-medium text-appleRed-600 dark:text-appleRed-400">
                    {lang === 'pt' ? proj.subtitlePt : proj.subtitleEn}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {lang === 'pt' ? proj.descPt : proj.descEn}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {(lang === 'pt' ? proj.architectureHighlightsPt : proj.architectureHighlightsEn).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <CheckCircle2 size={13} className="text-appleGreen-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-appleRed-500 transition-colors"
                    >
                      <Github size={14} />
                      <span>{t('projects.viewCode')}</span>
                      <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Modals */}
      <ArchitectureModal isOpen={archModalOpen} onClose={() => setArchModalOpen(false)} />
      <ApiSwaggerModal isOpen={swaggerModalOpen} onClose={() => setSwaggerModalOpen(false)} />
    </section>
  );
}
