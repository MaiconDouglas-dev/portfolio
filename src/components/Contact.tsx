'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Mail, Phone, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { lang } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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

  return (
    <section id="contact" className="py-20 border-t border-neutral-200/60 dark:border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'CONTATO' : 'CONTACT'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            {lang === 'pt' ? 'Vamos conversar sobre o próximo projeto?' : "Let's talk about your next project"}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {lang === 'pt'
              ? 'Disponível para contratação, projetos corporativos e consultoria de backend.'
              : 'Available for full-time opportunities, consulting, and backend architecture.'}
          </p>
        </div>

        {/* 4 Clean Action Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {channels.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedKey === c.key;
            return (
              <div
                key={c.key}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0c0c11] text-left space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon size={18} className={c.color} />
                    <button
                      onClick={() => handleCopy(c.copy, c.key)}
                      title="Copiar"
                      className="text-neutral-400 hover:text-white cursor-pointer p-1"
                    >
                      {isCopied ? <Check size={14} className="text-appleGreen-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 mt-2">{c.label}</p>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{c.val}</p>
                </div>

                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 px-3 rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-appleRed-600 dark:hover:bg-appleRed-600 text-neutral-800 dark:text-neutral-200 hover:text-white text-xs font-semibold transition-all inline-flex items-center justify-center gap-1"
                >
                  <span>Abrir</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
