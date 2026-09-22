'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Mail, Phone, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';

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
    <section id="contact" className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-appleRed-500 uppercase tracking-widest">
            {lang === 'pt' ? 'CONTATO' : 'CONTACT'}
          </span>
          <KineticText
            text={lang === 'pt' ? 'Vamos conversar sobre novas oportunidades?' : "Let's connect for new opportunities."}
            as="h2"
            staggerDelayMs={18}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          />
          <p className="text-sm text-neutral-400">
            {lang === 'pt'
              ? 'Aberto a oportunidades em Backend Java e novos desafios técnicos.'
              : 'Open to Java Backend opportunities and new technical challenges.'}
          </p>
        </div>

        {/* 4 Clean Action Pills with Magnetic Touch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {channels.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedKey === c.key;
            return (
              <div
                key={c.key}
                className="p-5 rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-2xl text-left space-y-3 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon size={18} className={c.color} />
                    <button
                      onClick={() => handleCopy(c.copy, c.key)}
                      title="Copiar"
                      className="text-neutral-400 hover:text-white cursor-pointer p-1 transition-colors"
                    >
                      {isCopied ? <Check size={14} className="text-appleGreen-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 mt-2">{c.label}</p>
                  <p className="text-xs font-semibold text-white truncate">{c.val}</p>
                </div>

                <MagneticButton strength={0.25} className="w-full">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-neutral-300 group-hover:text-appleRed-400 transition-colors pt-2"
                  >
                    <span>{lang === 'pt' ? 'Acessar canal' : 'Open link'}</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </MagneticButton>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
