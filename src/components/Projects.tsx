'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Terminal, Layers, Github, ArrowRight } from 'lucide-react';
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
            {lang === 'pt' ? 'PROJETOS' : 'PROJECTS'}
          </span>
          <KineticText
            text={lang === 'pt' ? 'Sistemas em Produção & Arquitetura' : 'Production Systems & Architecture'}
            as="h2"
            staggerDelayMs={18}
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          />
        </div>

        {/* Featured Card: Clyvo M-Vet API */}
        <div className="rounded-3xl border border-appleRed-500/30 bg-black/60 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-[0_10px_40px_rgba(255,45,85,0.08)] hover:border-appleRed-500/50 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-appleRed-500/10 text-appleRed-400 border border-appleRed-500/20">
              {lang === 'pt' ? 'PROJETO ESTRELA • ENTERPRISE' : 'FEATURED STAR PROJECT'}
            </span>
            <span className="text-xs font-mono text-neutral-400">api-clyvo-m_vet</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Clyvo M-Vet — API de Gestão Veterinária
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-3xl">
              {lang === 'pt'
                ? 'Plataforma clínica para médicos veterinários, clínicas parceiras e tutores. Validação de propriedade de pets, controle de colisões de agenda, persistência definitiva de prontuários com CRMV e controle de permissões por roles (Spring Security).'
                : 'Clinical platform for veterinarians, clinics, and pet owners. Enforces pet ownership checks, conflict-free doctor scheduling, permanent medical record persistence, and RBAC authorization.'}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Java 21/25', 'Spring Boot 3', 'Spring Security', 'Oracle 19c', 'Flyway', 'Docker', 'React Native'].map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                {t}
              </span>
            ))}
          </div>

          {/* Clean Magnetic Action Buttons */}
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
          </div>
        </div>

        {/* Secondary Project: FoodFlow */}
        <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-2xl space-y-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-mono font-bold text-neutral-400">JAVA & SPRING BOOT</span>
            <h4 className="text-lg font-bold text-white">FoodFlow — Delivery Core</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {lang === 'pt'
                ? 'Motor de pedidos com máquina de estados finita, idempotência de pagamentos e cache Redis para alta concorrência.'
                : 'Delivery engine with finite state machines, payment idempotency, and Redis caching for high throughput.'}
            </p>
          </div>
          <MagneticButton strength={0.25} className="pt-2 sm:pt-0 shrink-0">
            <a
              href="https://github.com/MaiconDouglas-dev/FoodFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-appleRed-400 hover:text-white transition-all"
            >
              <Github size={14} />
              <span>{lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}</span>
              <ArrowRight size={12} />
            </a>
          </MagneticButton>
        </div>

      </div>

      {/* Interactive Architecture & Swagger Modals */}
      <ArchitectureModal isOpen={archModalOpen} onClose={() => setArchModalOpen(false)} />
      <ApiSwaggerModal isOpen={swaggerModalOpen} onClose={() => setSwaggerModalOpen(false)} />
    </section>
  );
}
