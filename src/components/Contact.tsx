'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';
import FuturisticCard from './FuturisticCard';
import SpaceExplorerCanvas from './SpaceExplorerCanvas';
import { soundManager } from '@/utils/audio';

export default function Contact() {
  const { lang } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      soundManager.playSuccess();
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const channels = [
    {
      key: 'phone',
      label: 'WhatsApp / Telefone',
      val: '(11) 93718-4412',
      copy: '11937184412',
      href: 'https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
      color: 'text-appleGreen-500',
      icon: Phone
    },
    {
      key: 'email',
      label: 'E-mail Direto',
      val: 'maicondouglasdev1@gmail.com',
      copy: 'maicondouglasdev1@gmail.com',
      href: 'mailto:maicondouglasdev1@gmail.com',
      color: 'text-appleRed-500',
      icon: Mail
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      val: 'in/maicon-douglas',
      copy: 'https://www.linkedin.com/in/maicon-douglas-b244571b5/',
      href: 'https://www.linkedin.com/in/maicon-douglas-b244571b5/',
      color: 'text-appleBlue-500',
      icon: Linkedin
    },
    {
      key: 'github',
      label: 'GitHub',
      val: 'MaiconDouglas-dev',
      copy: 'https://github.com/MaiconDouglas-dev',
      href: 'https://github.com/MaiconDouglas-dev',
      color: 'text-appleViolet-400',
      icon: Github
    }
  ];

  const techBadges = [
    { label: 'Java 21', color: 'border-orange-500/30 bg-orange-500/10 text-orange-400' },
    { label: 'Spring Boot 3', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
    { label: 'Oracle SQL', color: 'border-red-500/30 bg-red-500/10 text-red-400' },
    { label: 'Docker Compose', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' },
    { label: 'REST APIs & Clean Arch', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400' },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        
        {/* 3D Zero-G Space Explorer Canvas (Lusion Finale Feature) */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-[10px] font-mono tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{lang === 'pt' ? 'EXPLORADOR ESPACIAL 3D // INTERATIVO' : '3D ZERO-G EXPLORER // INTERACTIVE'}</span>
          </div>

          <SpaceExplorerCanvas />

          {/* Floating Technology Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mt-2">
            {techBadges.map((badge) => (
              <span
                key={badge.label}
                className={`text-[11px] font-mono px-3 py-1 rounded-full border backdrop-blur-md ${badge.color} transition-transform hover:scale-105 select-none`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Grand Finale Typography (Lusion "Let's Work Together" Aesthetic) */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'CONTATO & PARCERIAS' : 'GET IN TOUCH & CONNECT'}
          </span>
          <KineticText
            text={lang === 'pt' ? 'Vamos construir algo incrível juntos!' : "Let's build something extraordinary together!"}
            as="h2"
            staggerDelayMs={16}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          />
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {lang === 'pt'
              ? 'Aberto a novas oportunidades em Backend Java, microsserviços e desafios de alta escala. Escolha seu canal preferido:'
              : 'Open to new opportunities in Java Backend, microservices, and high-scale challenges. Choose your preferred channel:'}
          </p>
        </div>

        {/* 4 Clean Action Pills with Magnetic Touch & Cursor Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {channels.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedKey === c.key;
            const glow =
              c.key === 'phone'
                ? 'rgba(16, 185, 129, 0.25)'
                : c.key === 'email'
                ? 'rgba(255, 45, 85, 0.25)'
                : c.key === 'linkedin'
                ? 'rgba(59, 130, 246, 0.25)'
                : 'rgba(168, 85, 247, 0.25)';
            return (
              <FuturisticCard
                key={c.key}
                glowColor={glow}
                withTilt={true}
                withCorners={true}
                data-cursor-text={c.key.toUpperCase()}
                className="!rounded-2xl border-white/[0.08] hover:border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.6)] group h-full"
                contentClassName="p-5 text-left flex flex-col justify-between h-full space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between relative">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                      <Icon size={18} className={c.color} />
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => handleCopy(c.copy, c.key)}
                        title={lang === 'pt' ? 'Copiar para a área de transferência' : 'Copy to clipboard'}
                        data-cursor-text={isCopied ? (lang === 'pt' ? 'COPIADO' : 'COPIED') : (lang === 'pt' ? 'COPIAR' : 'COPY')}
                        className="text-neutral-400 hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors"
                      >
                        {isCopied ? <Check size={14} className="text-appleGreen-500 animate-scale" /> : <Copy size={14} />}
                      </button>

                      {isCopied && (
                        <span className="absolute -top-7 right-0 px-2 py-0.5 rounded-md bg-appleGreen-500/20 border border-appleGreen-500/40 text-[10px] font-mono font-bold text-appleGreen-400 whitespace-nowrap animate-fadeIn">
                          {lang === 'pt' ? 'Copiado!' : 'Copied!'}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 mt-3">{c.label}</p>
                  <p className="text-xs font-semibold text-white truncate">{c.val}</p>
                </div>

                <MagneticButton strength={0.25} className="w-full">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text={c.key.toUpperCase()}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors pt-2 border-t border-white/[0.06]"
                  >
                    <span>{lang === 'pt' ? 'Acessar canal' : 'Open link'}</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-neutral-400 group-hover:text-white" />
                  </a>
                </MagneticButton>
              </FuturisticCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
