'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Terminal, Layers, Github, ExternalLink } from 'lucide-react';
import ArchitectureModal from './ArchitectureModal';
import ApiSwaggerModal from './ApiSwaggerModal';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';

export default function Projects() {
  const { lang } = useApp();
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [swaggerModalOpen, setSwaggerModalOpen] = useState(false);

  return (
    <section id="projects" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'PROJETOS & DESENVOLVIMENTO' : 'PROJECTS & DEVELOPMENT'}
          </span>
          <KineticText
            text={lang === 'pt' ? 'Projetos & Desenvolvimento' : 'Projects & Development'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          />
        </div>

        {/* Featured Card: Clyvo — Sistema de Gestão Veterinária */}
        <div className="rounded-3xl border border-appleRed-500/30 bg-black/60 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-[0_10px_40px_rgba(255,45,85,0.08)] hover:border-appleRed-500/50 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-appleRed-500/10 text-appleRed-400 border border-appleRed-500/20">
              {lang === 'pt' ? 'PROJETO PRINCIPAL' : 'FEATURED PROJECT'}
            </span>
            <span className="text-xs font-mono text-neutral-400">clyvo-gestao-veterinaria</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'pt' ? 'Clyvo — Sistema de Gestão Veterinária' : 'Clyvo — Veterinary Management System'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {lang === 'pt'
                ? 'Aplicação desenvolvida para gerenciar o ecossistema de clínicas veterinárias, médicos com registro CRMV, tutores e pacientes (pets). Foco em modelagem relacional no Oracle, validação de regras de negócio, persistência com JPA e controle de permissões por roles com Spring Security.'
                : 'Application designed to manage the clinical veterinary ecosystem: clinics, certified veterinarians (CRMV), pet owners, and animal patients. Focused on Oracle relational modeling, business rule validation, JPA persistence, and role-based access control with Spring Security.'}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Java 21', 'Spring Boot 3', 'APIs REST', 'Spring Security', 'Oracle Database', 'PL/SQL', 'Docker', 'Swagger / OpenAPI'].map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton strength={0.25}>
              <button
                onClick={() => setSwaggerModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-appleRed-500/20 hover:scale-[1.02] cursor-pointer transition-all"
              >
                <Terminal size={14} />
                <span>{lang === 'pt' ? 'Testar Endpoints (Swagger)' : 'Explore Endpoints (Swagger)'}</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <button
                onClick={() => setArchModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-neutral-200 font-semibold text-xs hover:border-appleViolet-500/40 hover:text-white transition-all cursor-pointer backdrop-blur-md"
              >
                <Layers size={14} className="text-appleViolet-400" />
                <span>{lang === 'pt' ? 'Ver Arquitetura' : 'View Architecture'}</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href="https://github.com/MaiconDouglas-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-neutral-400 font-medium text-xs hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <Github size={14} />
                <span>{lang === 'pt' ? 'GitHub' : 'GitHub'}</span>
              </a>
            </MagneticButton>
          </div>
        </div>

      </div>

      {/* Interactive Architecture & Swagger Modals */}
      <ArchitectureModal isOpen={archModalOpen} onClose={() => setArchModalOpen(false)} />
      <ApiSwaggerModal isOpen={swaggerModalOpen} onClose={() => setSwaggerModalOpen(false)} />
    </section>
  );
}
