'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Terminal, Layers, Github, ExternalLink, ArrowRight } from 'lucide-react';
import ArchitectureModal from './ArchitectureModal';
import ApiSwaggerModal from './ApiSwaggerModal';

export default function Projects() {
  const { lang } = useApp();
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [swaggerModalOpen, setSwaggerModalOpen] = useState(false);

  return (
    <section id="projects" className="py-20 border-t border-neutral-200/60 dark:border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'PROJETOS' : 'PROJECTS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {lang === 'pt' ? 'Sistemas em Produção & Arquitetura' : 'Production Systems & Architecture'}
          </h2>
        </div>

        {/* Featured Card: Clyvo M-Vet API */}
        <div className="rounded-3xl border border-appleRed-500/25 bg-white dark:bg-[#0c0c11] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-appleRed-500/10 text-appleRed-500 border border-appleRed-500/20">
              {lang === 'pt' ? 'PROJETO ESTRELA • ENTERPRISE' : 'FEATURED STAR PROJECT'}
            </span>
            <span className="text-xs font-mono text-neutral-500">api-clyvo-m_vet</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Clyvo M-Vet — API de Gestão Veterinária
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
              {lang === 'pt'
                ? 'Plataforma clínica para médicos veterinários, clínicas parceiras e tutores. Validação de propriedade de pets, controle de colisões de agenda, persistência definitiva de prontuários com CRMV e controle de permissões por roles (Spring Security).'
                : 'Clinical platform for veterinarians, clinics, and pet owners. Enforces pet ownership checks, conflict-free doctor scheduling, permanent medical record persistence, and RBAC authorization.'}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Java 21/25', 'Spring Boot 3', 'Spring Security', 'Oracle 19c', 'Flyway', 'Docker', 'React Native'].map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-md bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {/* Clean Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setSwaggerModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-appleRed-500/20 hover:scale-[1.02] cursor-pointer"
            >
              <Terminal size={14} />
              <span>{lang === 'pt' ? 'Testar Endpoints (Swagger)' : 'Explore Endpoints (Swagger)'}</span>
            </button>

            <button
              onClick={() => setArchModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-semibold text-xs hover:border-appleViolet-500/40 transition-colors cursor-pointer"
            >
              <Layers size={14} className="text-appleViolet-400" />
              <span>{lang === 'pt' ? 'Ver Arquitetura' : 'View Architecture'}</span>
            </button>
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FoodFlow */}
          <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0c0c11] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-neutral-500">JAVA & SPRING BOOT</span>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">FoodFlow — Delivery Core</h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === 'pt'
                  ? 'Motor de pedidos com máquina de estados finita, idempotência de pagamentos e cache Redis para alta concorrência.'
                  : 'Delivery engine with finite state machines, payment idempotency, and Redis caching for high throughput.'}
              </p>
            </div>
            <a
              href="https://github.com/MaiconDouglas-dev/FoodFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-appleRed-500 hover:text-appleRed-400 pt-2"
            >
              <Github size={14} />
              <span>{lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}</span>
              <ArrowRight size={12} />
            </a>
          </div>

          {/* Customer BFF */}
          <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0c0c11] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-neutral-500">.NET / C# & DOCKER</span>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Customer BFF API</h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === 'pt'
                  ? 'Camada Backend-For-Frontend agregando microsserviços para consumo ágil em dispositivos móveis.'
                  : 'Backend-For-Frontend layer orchestrating underlying microservices for React Native mobile clients.'}
              </p>
            </div>
            <a
              href="https://github.com/MaiconDouglas-dev/tmrs-costumerbff-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-appleRed-500 hover:text-appleRed-400 pt-2"
            >
              <Github size={14} />
              <span>{lang === 'pt' ? 'Ver no GitHub' : 'View on GitHub'}</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* Modals */}
      <ArchitectureModal isOpen={archModalOpen} onClose={() => setArchModalOpen(false)} />
      <ApiSwaggerModal isOpen={swaggerModalOpen} onClose={() => setSwaggerModalOpen(false)} />
    </section>
  );
}
