'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { skillCategories } from '@/data/skills';
import { Server, Database, Smartphone, Cloud, Cpu, Terminal, ShieldCheck, Network, Layers, Layout, FileCode, Palette, Box, GitCommit, GitBranch, Code2 } from 'lucide-react';

export default function Skills() {
  const { lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<string>('backend');

  const tabIcons: Record<string, any> = {
    backend: Server,
    database: Database,
    'frontend-mobile': Smartphone,
    'devops-cloud': Cloud,
  };

  const skillIcons: Record<string, any> = {
    Cpu,
    Server,
    Terminal,
    ShieldCheck,
    Network,
    Database,
    Code2,
    GitBranch,
    Layers,
    Layout,
    FileCode,
    Smartphone,
    Palette,
    Box,
    Cloud,
    GitCommit
  };

  const currentCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="py-24 bg-neutral-50/50 dark:bg-black border-y border-neutral-200/60 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="inline-block text-xs font-mono font-bold text-appleRed-600 dark:text-appleRed-500 uppercase tracking-[0.2em] mb-3">
            {t('skills.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Tabs Selector */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-neutral-200 dark:border-white/[0.08]">
          {skillCategories.map((cat) => {
            const Icon = tabIcons[cat.id] || Server;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-appleRed-600 to-rose-600 text-white shadow-md shadow-appleRed-500/20'
                    : 'bg-white dark:bg-[#0c0c11] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-white/[0.08]'
                }`}
              >
                <Icon size={16} />
                <span>{lang === 'pt' ? cat.titlePt : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Description */}
        <div className="py-4">
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
            {lang === 'pt' ? currentCategory.descriptionPt : currentCategory.descriptionEn}
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {currentCategory.items.map((skill) => {
            const Icon = skillIcons[skill.iconName] || Cpu;
            return (
              <div
                key={skill.name}
                className="group p-5 rounded-3xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0c11] hover:border-appleRed-500/40 hover:shadow-xl transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-appleRed-500/10 flex items-center justify-center text-appleRed-500 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.08]">
                    {skill.level}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-neutral-900 dark:text-white">
                    {skill.name}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {lang === 'pt' ? skill.descriptionPt : skill.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
