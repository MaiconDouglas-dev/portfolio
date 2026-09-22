'use client';

import React from 'react';
import { X, Layers, ShieldCheck, Database, Server, Smartphone, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectureModal({ isOpen, onClose }: Props) {
  const { lang, t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white dark:bg-[#0c0c11] border border-neutral-200 dark:border-white/[0.12] rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-neutral-200 dark:border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-appleRed-500 uppercase tracking-wider mb-1">
              <Layers size={14} />
              <span>{t('modal.arch.title')}</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('modal.arch.desc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="my-6 space-y-4">
          <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
            Fluxo de Ponta a Ponta da Solução (End-to-End Pipeline)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            {/* 1. Client Layer */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-appleBlue-400 font-bold text-sm">
                <Smartphone size={16} />
                <span>1. Client Apps</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                • React Native (App Veterinário & Tutor)
                <br />• Web Admin (Thymeleaf / React)
                <br />• Axios HTTP Client
              </p>
              <div className="pt-2 text-[11px] text-appleBlue-500 font-sans">
                Contratos JSON estritos preservados para compatibilidade total.
              </div>
            </div>

            {/* 2. Security & Gateway */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-appleGreen-500 font-bold text-sm">
                <ShieldCheck size={16} />
                <span>2. Security & RBAC</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                • Spring Security 6 Filter
                <br />• JWT Stateless Token Validation
                <br />• Authorities: ROLE_TUTOR, ROLE_VET, ROLE_CLINICA
              </p>
              <div className="pt-2 text-[11px] text-appleGreen-500 font-sans">
                Autenticação stateless com validação de status de conta e bloqueios.
              </div>
            </div>

            {/* 3. Core Business Services */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-appleViolet-400 font-bold text-sm">
                <Server size={16} />
                <span>3. Business Domain</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                • Validação de Dono do Pet
                <br />• Conflito de Horário Clínico
                <br />• Prontuário Médico (EHR)
                <br />• Vínculo Vet-Clínica
              </p>
              <div className="pt-2 text-[11px] text-appleViolet-400 font-sans">
                Tratamento global de exceções sem expor dados internos do servidor.
              </div>
            </div>

            {/* 4. Persistence & Database */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Database size={16} />
                <span>4. Data & Oracle</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                • Oracle Database 19c
                <br />• Migrations Flyway Nativas
                <br />• Spring Data JPA & Hibernate
                <br />• ddl-auto = validate
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-sans">
                Isolamento estrito de credenciais via variáveis de ambiente seguras.
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive on Critical Engineering Requirements */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/[0.08] space-y-4">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Lock size={16} className="text-appleRed-500" />
            Regras Críticas Implementadas e Preservação de Compatibilidade:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black space-y-2">
              <p className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-appleGreen-500" />
                Validação de Posse & Não-Colisão de Consultas
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Durante o agendamento de uma consulta, a service verifica se o `petId` pertence realmente ao tutor autenticado, impedindo que usuários manipulem registros de terceiros. Além disso, garante que o médico veterinário possui vínculo ativo na clínica e que o horário está livre.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black space-y-2">
              <p className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-appleGreen-500" />
                Persistência de Prontuário Médico Clínico
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Ao concluir uma consulta médica, as anotações do veterinário (`clinicalNotes`, diagnóstico e prescrição) são gravadas de forma estruturada na entidade de prontuário, garantindo histórico perene para o animal em conformidade com as diretrizes do CRMV.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black space-y-2">
              <p className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-appleGreen-500" />
                Migrations Flyway em Oracle SQL
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Substituição de instruções Postgres (como UUIDs, `gen_random_uuid()` e tipos booleanos) por tipos compatíveis com Oracle (como `RAW(16)` ou `SYS_GUID()`, `NUMBER(1)` e constraints adequadas), mantendo `ddl-auto=validate` na aplicação.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-black space-y-2">
              <p className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-appleGreen-500" />
                100% de Compatibilidade de Contrato REST
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Todas as rotas consumidas pelo aplicativo mobile em React Native (`/api/consultas`, `/api/appointments`) mantêm rigorosamente os mesmos endpoints, verbos HTTP, parâmetros e estruturas JSON de resposta.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Button */}
        <div className="mt-6 pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white/10 hover:bg-neutral-800 dark:hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {t('modal.arch.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
