'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Mail, Phone, Linkedin, Github, Copy, Check, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { lang, t } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato de ${formName} via Portfólio`);
    const body = encodeURIComponent(`Nome: ${formName}
Email: ${formEmail}

Mensagem:
${formMsg}`);
    window.open(`mailto:maicondouglasdev1@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setFormSent(true);
  };

  // Harmonious use of user's favorite colors: Green (WhatsApp), Red (Email), Blue (LinkedIn), Violet/Black (GitHub)
  const contactChannels = [
    {
      key: 'phone',
      label: t('contact.phoneLabel'),
      value: '(11) 93718-4412',
      copyValue: '11937184412',
      href: 'https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!',
      actionLabel: t('contact.whatsappBtn'),
      icon: Phone,
      accentText: 'text-appleGreen-500',
      accentBg: 'bg-appleGreen-500/10'
    },
    {
      key: 'email',
      label: t('contact.emailLabel'),
      value: 'maicondouglasdev1@gmail.com',
      copyValue: 'maicondouglasdev1@gmail.com',
      href: 'mailto:maicondouglasdev1@gmail.com',
      actionLabel: t('contact.emailBtn'),
      icon: Mail,
      accentText: 'text-appleRed-500',
      accentBg: 'bg-appleRed-500/10'
    },
    {
      key: 'linkedin',
      label: t('contact.linkedinLabel'),
      value: 'in/maicon-douglas-b244571b5',
      copyValue: 'https://www.linkedin.com/in/maicon-douglas-b244571b5/',
      href: 'https://www.linkedin.com/in/maicon-douglas-b244571b5/',
      actionLabel: 'LinkedIn Profile',
      icon: Linkedin,
      accentText: 'text-appleBlue-500',
      accentBg: 'bg-appleBlue-500/10'
    },
    {
      key: 'github',
      label: t('contact.githubLabel'),
      value: 'github.com/MaiconDouglas-dev',
      copyValue: 'https://github.com/MaiconDouglas-dev',
      href: 'https://github.com/MaiconDouglas-dev',
      actionLabel: 'GitHub Repos',
      icon: Github,
      accentText: 'text-appleViolet-400',
      accentBg: 'bg-appleViolet-500/10'
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-mono font-bold text-appleRed-600 dark:text-appleRed-500 uppercase tracking-[0.2em] mb-3">
            {t('contact.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* 4 Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactChannels.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedKey === c.key;
            return (
              <div
                key={c.key}
                className="group p-6 rounded-3xl border border-neutral-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0c11] hover:border-appleRed-500/40 hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${c.accentBg} flex items-center justify-center ${c.accentText} mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    {c.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white truncate">
                    {c.value}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.08]">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 dark:bg-white/[0.07] hover:bg-appleRed-600 dark:hover:bg-appleRed-600 text-white text-xs font-semibold transition-colors"
                  >
                    <span>{c.actionLabel}</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(c.copyValue, c.key)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} className="text-appleGreen-500" />
                        <span className="text-appleGreen-500 font-semibold">{t('contact.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{t('contact.copy')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Message Form */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50/50 dark:bg-[#0c0c11] backdrop-blur-sm">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-appleRed-500" />
            <span>{t('contact.form.title')}</span>
          </h3>

          {formSent ? (
            <div className="p-4 rounded-xl bg-appleGreen-500/10 border border-appleGreen-500/20 text-appleGreen-500 text-sm flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>{t('contact.form.success')}</span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/[0.1] bg-white dark:bg-black text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-appleRed-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="seu.email@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/[0.1] bg-white dark:bg-black text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-appleRed-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                  {t('contact.form.msg')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Descreva seu projeto, oportunidade ou dúvida técnica..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/[0.1] bg-white dark:bg-black text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-appleRed-500 custom-scrollbar"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs shadow-xl shadow-appleRed-500/25 transition-all duration-200 cursor-pointer"
              >
                <Send size={14} />
                <span>{t('contact.form.send')}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
