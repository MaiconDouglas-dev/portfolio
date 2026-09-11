'use client';

import React, { useState } from 'react';
import { Terminal as TermIcon, Play, CheckCircle2, Shield, Database, Cpu, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function TerminalCard() {
  const { lang, t } = useApp();
  const [selectedCmd, setSelectedCmd] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const commands = [
    {
      label: 'GET /actuator/health',
      desc: 'Health Check & DB Status',
      request: `curl -X GET https://api.clyvo.com.br/actuator/health`,
      response: {
        status: 'UP',
        components: {
          jvm: {
            version: 'Java 21 / 25 LTS (Virtual Threads Ready)',
            vendor: 'Oracle Corporation'
          },
          oracleDatabase: {
            status: 'UP',
            version: 'Oracle Database 19c Enterprise Edition',
            flywayMigrations: 'APPLIED (V1__init_schema.sql)',
            ddlAuto: 'validate'
          },
          springSecurity: { status: 'UP', mode: 'STATELESS_JWT' }
        },
        uptimeSeconds: 948201
      }
    },
    {
      label: 'POST /auth/login',
      desc: 'OAuth2 / JWT Token Issue',
      request: `curl -X POST https://api.clyvo.com.br/api/v1/auth/login \\\n  -H "Content-Type: application/json" \\\n  -d '{"email":"dr.marcelo@clyvo.vet","password":"***"}'`,
      response: {
        status: 'SUCCESS',
        authenticated: true,
        account: {
          id: 42,
          nome: 'Dr. Marcelo Ribeiro',
          crmv: '18492-SP',
          authorities: ['ROLE_VETERINARIO']
        },
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        expiresIn: 86400
      }
    },
    {
      label: 'POST /api/consultas',
      desc: 'Strict Pet Ownership Check',
      request: `curl -X POST https://api.clyvo.com.br/api/v1/consultas \\\n  -H "Authorization: Bearer [JWT_TOKEN]" \\\n  -d '{"petId":88,"vetId":42,"clinicaId":10,"data":"2026-09-18T14:30"}'`,
      response: {
        protocolo: 'CLY-2026-0918-0512',
        status: 'AGENDADA',
        validations: {
          petBelongsToAuthenticatedTutor: true,
          vetLinkedToClinic: true,
          slotCollisionDetected: false,
          medicalRecordAuthorizationGranted: true
        }
      }
    }
  ];

  const handleSelectCommand = (idx: number) => {
    setIsRunning(true);
    setSelectedCmd(idx);
    setTimeout(() => {
      setIsRunning(false);
    }, 280);
  };

  const current = commands[selectedCmd];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c0c11] shadow-2xl shadow-appleRed-500/5 backdrop-blur-2xl transition-all duration-300">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-100/90 dark:bg-black/90 border-b border-neutral-200 dark:border-white/[0.08] select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-appleRed-500" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-appleGreen-500" />
          <span className="ml-2 text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <TermIcon size={13} className="text-appleRed-500" />
            ClyvoApiApplication.java
          </span>
        </div>

        {/* Live Status Pill with Apple Green */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-appleGreen-500/10 text-appleGreen-500 border border-appleGreen-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-appleGreen-500 animate-pulse" />
            SPRING BOOT 3 • LIVE
          </span>
        </div>
      </div>

      {/* Simulated Interactive Command Selector */}
      <div className="px-4 py-2.5 bg-neutral-50/70 dark:bg-appleDark-900/60 border-b border-neutral-200/60 dark:border-white/[0.06] flex flex-wrap gap-1.5">
        {commands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectCommand(idx)}
            className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedCmd === idx
                ? 'bg-gradient-to-r from-appleRed-500 to-appleRed-600 text-white font-semibold shadow-sm'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-appleRed-500 dark:hover:text-appleRed-400 border border-neutral-200 dark:border-white/[0.06]'
            }`}
          >
            <Play size={10} className={selectedCmd === idx ? 'text-white' : 'text-appleRed-500'} />
            {cmd.label}
          </button>
        ))}
      </div>

      {/* Terminal Body with Pure Dark Pitch Black */}
      <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-[360px] overflow-y-auto custom-scrollbar bg-black text-neutral-200">
        {/* Command line */}
        <div className="flex items-start gap-2 text-neutral-400 mb-3 pb-2 border-b border-neutral-900">
          <span className="text-appleRed-500 select-none font-bold">maicon@clyvo-mvet-core:~$</span>
          <span className="text-neutral-200 whitespace-pre-wrap">{current.request}</span>
        </div>

        {/* Output */}
        {isRunning ? (
          <div className="py-8 flex items-center justify-center gap-2 text-appleRed-400">
            <RefreshCw size={16} className="animate-spin" />
            <span>Processando requisição Spring Security & Oracle DB...</span>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-appleGreen-400 font-semibold mb-2">
              <CheckCircle2 size={14} />
              <span>HTTP/2 200 OK — Application/JSON</span>
            </div>
            <pre className="text-neutral-300 text-[11px] sm:text-xs overflow-x-auto p-3 rounded-xl bg-neutral-950 border border-neutral-900 text-emerald-400/90">
              {JSON.stringify(current.response, null, 2)}
            </pre>
          </div>
        )}

        {/* Stack metadata indicators */}
        <div className="mt-4 pt-3 border-t border-neutral-900 grid grid-cols-3 gap-2 text-[10px] text-neutral-400">
          <div className="flex items-center gap-1">
            <Cpu size={12} className="text-appleViolet-400" />
            <span>Java 21 / 25 LTS</span>
          </div>
          <div className="flex items-center gap-1">
            <Database size={12} className="text-amber-400" />
            <span>Oracle 19c (Flyway DDL)</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={12} className="text-appleBlue-400" />
            <span>OAuth 2.0 / RBAC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
