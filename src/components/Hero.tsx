'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import TerminalCard from './TerminalCard';
import { ArrowDown, MessageSquare, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t } = useApp();

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Apple-style ambient lighting glow: Crimson red to deep purple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-appleRed-600/15 via-appleViolet-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Availability Badge in Apple Green */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-appleGreen-500/30 bg-appleGreen-500/10 dark:bg-appleGreen-500/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-appleGreen-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-appleGreen-500" />
              </span>
              <span className="text-xs font-mono font-semibold text-appleGreen-600 dark:text-appleGreen-400 tracking-wide">
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Title & Role with Apple-inspired Red/Violet Gradient */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-mono font-medium text-neutral-500 dark:text-neutral-400">
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                <span className="text-neutral-900 dark:text-white">
                  {t('hero.name')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-appleRed-500 via-rose-500 via-appleViolet-500 to-appleBlue-500 bg-clip-text text-transparent">
                  {t('hero.role')}
                </span>
              </h1>
            </div>

            {/* Strategic Value Proposition */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              {t('hero.sub')}
            </p>

            {/* CTAs Button Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-sm shadow-xl shadow-appleRed-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{t('hero.btnProjects')}</span>
                <ArrowDown size={15} />
              </button>

              <a
                href="https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-white/[0.12] bg-white/80 dark:bg-black/80 text-neutral-700 dark:text-neutral-200 font-semibold text-sm hover:border-appleRed-500/50 hover:text-appleRed-500 dark:hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <MessageSquare size={16} className="text-appleRed-500" />
                <span>{t('hero.btnWhatsApp')}</span>
              </a>
            </div>

            {/* Quick Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://github.com/MaiconDouglas-dev"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-3 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0e0e14] text-neutral-600 dark:text-neutral-300 hover:border-appleRed-500 hover:text-appleRed-500 transition-all duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/maicon-douglas-b244571b5/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-3 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0e0e14] text-neutral-600 dark:text-neutral-300 hover:border-appleBlue-500 hover:text-appleBlue-500 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:maicondouglasdev1@gmail.com"
                title="Email"
                className="p-3 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0e0e14] text-neutral-600 dark:text-neutral-300 hover:border-appleRed-500 hover:text-appleRed-500 transition-all duration-200"
              >
                <Mail size={18} />
              </a>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 ml-2 border-l border-neutral-200 dark:border-white/[0.08] pl-3">
                11 93718-4412
              </span>
            </div>

            {/* Highlights Grid with Pure Black Surfaces */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08]">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/70 dark:border-white/[0.06]">
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Java 21 / 25</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Spring Boot 3+</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/70 dark:border-white/[0.06]">
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Oracle 19c</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">PL/SQL & Flyway</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/70 dark:border-white/[0.06]">
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">React Native</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Mobile Client</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#0c0c11] border border-neutral-200/70 dark:border-white/[0.06]">
                <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Docker & Cloud</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Azure Deployment</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Backend Terminal Card */}
          <div className="lg:col-span-5">
            <TerminalCard />
          </div>

        </div>
      </div>
    </section>
  );
}
