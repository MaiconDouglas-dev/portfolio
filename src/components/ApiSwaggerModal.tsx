'use client';

import React, { useState } from 'react';
import { X, Terminal, CheckCircle2, RefreshCw, Send, Code2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { clyvoMockEndpoints } from '@/data/projects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiSwaggerModal({ isOpen, onClose }: Props) {
  const { lang, t } = useApp();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);

  if (!isOpen) return null;

  const current = clyvoMockEndpoints[selectedIdx];

  const handleSimulate = () => {
    setIsSimulating(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsSimulating(false);
      setHasExecuted(true);
    }, 450);
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-appleBlue-500/10 text-appleBlue-500 border-appleBlue-500/20';
      case 'POST':
        return 'bg-appleGreen-500/10 text-appleGreen-500 border-appleGreen-500/20';
      case 'PUT':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

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
              <Code2 size={15} />
              <span>{t('modal.swagger.title')}</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('modal.swagger.desc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Swagger-like Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
          
          {/* Left: Endpoint Navigation List */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Endpoints Disponíveis ({clyvoMockEndpoints.length})
            </p>
            {clyvoMockEndpoints.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIdx(idx);
                  setHasExecuted(false);
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-150 flex flex-col gap-1 cursor-pointer ${
                  selectedIdx === idx
                    ? 'border-appleRed-500 bg-appleRed-500/10 shadow-sm'
                    : 'border-neutral-200 dark:border-white/[0.08] hover:border-neutral-300 dark:hover:border-white/[0.15] bg-neutral-50/50 dark:bg-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadgeClass(ep.method)}`}>
                    {ep.method}
                  </span>
                  <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 truncate">
                    {ep.path}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {lang === 'pt' ? ep.summaryPt : ep.summaryEn}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Endpoint Inspector & Execution Console */}
          <div className="lg:col-span-8 space-y-4">
            {/* Endpoint Summary Card */}
            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-black space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getMethodBadgeClass(current.method)}`}>
                    {current.method}
                  </span>
                  <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white">
                    {current.path}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {current.role}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {lang === 'pt' ? current.summaryPt : current.summaryEn}
              </p>
            </div>

            {/* Request Body (if any) */}
            {current.requestBody && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Request Payload (JSON Body):
                </span>
                <pre className="p-3 rounded-2xl bg-black text-neutral-300 font-mono text-xs border border-neutral-900 overflow-x-auto">
                  {current.requestBody}
                </pre>
              </div>
            )}

            {/* Execute Button */}
            <div>
              <button
                type="button"
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-appleRed-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Executando no Spring Boot...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>{t('modal.swagger.try')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Response Section */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {t('modal.swagger.response')}
                </span>
                <span className="text-[11px] font-mono text-appleGreen-500 font-bold">
                  HTTP {current.status} {current.status === 201 ? 'CREATED' : 'OK'}
                </span>
              </div>
              <pre className="p-3.5 rounded-2xl bg-black text-appleGreen-400 font-mono text-xs border border-neutral-900 overflow-x-auto max-h-[220px]">
                {current.responseBody}
              </pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-neutral-200 dark:border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white/10 hover:bg-neutral-800 dark:hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {t('modal.swagger.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
