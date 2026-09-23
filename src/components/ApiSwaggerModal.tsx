'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Code2, Send, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { clyvoMockEndpoints } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import { soundManager } from '@/utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiSwaggerModal({ isOpen, onClose }: Props) {
  const { lang, t } = useApp();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      soundManager.playModalOpen();
    }
  }, [isOpen]);

  const handleClose = () => {
    soundManager.playModalClose();
    onClose();
  };

  if (!isOpen) return null;

  const current = clyvoMockEndpoints[selectedIdx];

  const handleExecute = () => {
    setIsExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
      soundManager.playSuccess();
    }, 280);
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-appleBlue-500/10 text-appleBlue-400 border-appleBlue-500/30';
      case 'POST':
        return 'bg-appleGreen-500/10 text-appleGreen-400 border-appleGreen-500/30';
      case 'PUT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'DELETE':
        return 'bg-appleRed-500/10 text-appleRed-400 border-appleRed-500/30';
      default:
        return 'bg-white/10 text-neutral-300 border-white/20';
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0c0c11] border border-white/[0.12] rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-appleRed-500 uppercase tracking-wider mb-1">
              <Code2 size={15} />
              <span>{t('modal.swagger.title')}</span>
            </div>
            <p className="text-sm text-neutral-400">
              {t('modal.swagger.desc')}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl border border-white/[0.08] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
                  soundManager.playTab();
                  setSelectedIdx(idx);
                  setHasExecuted(false);
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-150 flex flex-col gap-1 cursor-pointer ${
                  selectedIdx === idx
                    ? 'border-appleRed-500 bg-appleRed-500/10 shadow-sm'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadgeClass(ep.method)}`}>
                    {ep.method}
                  </span>
                  <span className="text-xs font-mono font-medium text-neutral-300 truncate">
                    {ep.path}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 line-clamp-1">
                  {lang === 'pt' ? ep.summaryPt : ep.summaryEn}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Endpoint Inspector & Execution Console */}
          <div className="lg:col-span-8 space-y-4">
            {/* Endpoint Summary Card */}
            <div className="p-4 rounded-2xl border border-white/[0.08] bg-black space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getMethodBadgeClass(current.method)}`}>
                    {current.method}
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    {current.path}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  {current.role}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {lang === 'pt' ? current.summaryPt : current.summaryEn}
              </p>
            </div>

            {/* Request Body (if any) */}
            {current.requestBody && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-neutral-400">
                  Payload de Requisição (JSON Request Body):
                </span>
                <pre className="p-3.5 rounded-2xl bg-neutral-950 font-mono text-xs border border-white/[0.06] text-neutral-300 overflow-x-auto">
                  {current.requestBody}
                </pre>
              </div>
            )}

            {/* Simulate Execution Trigger */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-appleRed-600 hover:bg-appleRed-500 text-white text-xs font-semibold shadow-lg shadow-appleRed-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                <Play size={13} fill="currentColor" />
                <span>{isExecuting ? 'Processando...' : t('modal.swagger.try')}</span>
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-appleGreen-500" />
                  Stateless JWT
                </span>
                <span className="flex items-center gap-1">
                  <Database size={14} className="text-appleBlue-400" />
                  Oracle 19c
                </span>
              </div>
            </div>

            {/* Server Response Display */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  {t('modal.swagger.response')}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-appleGreen-500/10 text-appleGreen-400 border border-appleGreen-500/20">
                  HTTP {current.status} {current.status === 200 ? 'OK' : 'CREATED'}
                </span>
              </div>
              <pre className="p-3.5 rounded-2xl bg-black text-appleGreen-400 font-mono text-xs border border-neutral-900 overflow-x-auto max-h-[220px]">
                {current.responseBody}
              </pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {t('modal.swagger.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
