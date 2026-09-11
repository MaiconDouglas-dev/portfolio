'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Database, Server, Smartphone, CheckCircle2, Award, Zap } from 'lucide-react';

export default function About() {
  const { t } = useApp();

  const cards = [
    {
      val: t('about.card1.val'),
      label: t('about.card1.label'),
      icon: Server,
      accentText: 'text-appleRed-500',
      accentBg: 'bg-appleRed-500/10'
    },
    {
      val: t('about.card2.val'),
      label: t('about.card2.label'),
      icon: Database,
      accentText: 'text-amber-400',
      accentBg: 'bg-amber-500/10'
    },
    {
      val: t('about.card3.val'),
      label: t('about.card3.label'),
      icon: Zap,
      accentText: 'text-appleViolet-400',
      accentBg: 'bg-appleViolet-500/10'
    },
    {
      val: t('about.card4.val'),
      label: t('about.card4.label'),
      icon: Smartphone,
      accentText: 'text-appleBlue-400',
      accentBg: 'bg-appleBlue-500/10'
    }
  ];

  const pills = [
    t('about.pill1'),
    t('about.pill2'),
    t('about.pill3'),
    t('about.pill4')
  ];

  return (
    <section id="about" className="py-24 bg-neutral-50/50 dark:bg-black border-y border-neutral-200/60 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="inline-block text-xs font-mono font-bold text-appleRed-600 dark:text-appleRed-500 uppercase tracking-[0.2em] mb-3">
            {t('about.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t('about.title')}
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Deep Story & Engineering Methodology */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('about.p2')}
            </p>

            {/* Highlighted Engineering Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0c0c11] border border-neutral-200/80 dark:border-white/[0.08] shadow-sm hover:border-appleRed-500/30 transition-colors"
                >
                  <CheckCircle2 size={18} className="text-appleGreen-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {pill}
                  </span>
                </div>
              ))}
            </div>

            {/* Clean Code Quote / Principle */}
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-[#0c0c11] border-l-4 border-appleRed-500 text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-300">
              💡 &quot;Código limpo, modelagem relacional consistente e contratos de API imutáveis são os alicerces que permitem a uma empresa escalar sem reescrever suas bases.&quot;
            </div>
          </div>

          {/* Right: Key Competencies Cards in Pure Dark Obsidian */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0c11] hover:border-appleRed-500/40 hover:shadow-xl transition-all duration-200 space-y-3"
                >
                  <div className={`w-12 h-12 rounded-2xl ${card.accentBg} flex items-center justify-center ${card.accentText}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {card.val}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {card.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
