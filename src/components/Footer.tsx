'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { soundManager } from '@/utils/audio';

export default function Footer() {
  const { lang, t } = useApp();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    soundManager.playTab();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-appleGreen-500 animate-pulse" />
          <span>Maicon Douglas © {currentYear} • {t('footer.rights')}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Java 21 • Spring Boot 3 • PostgreSQL / Oracle • Docker</span>

          <MagneticButton strength={0.3}>
            <button
              type="button"
              onClick={handleScrollToTop}
              title={lang === 'pt' ? 'Voltar ao topo' : 'Back to top'}
              aria-label={lang === 'pt' ? 'Voltar ao topo' : 'Back to top'}
              data-cursor-text={lang === 'pt' ? 'TOPO' : 'TOP'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-neutral-300 hover:text-white hover:border-appleRed-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group"
            >
              <span>{lang === 'pt' ? 'Topo' : 'Top'}</span>
              <ArrowUp size={13} className="text-appleRed-400 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
