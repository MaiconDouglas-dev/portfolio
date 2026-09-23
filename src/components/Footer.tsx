'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-appleGreen-500 animate-pulse" />
          <span>Maicon Douglas © {currentYear} • {t('footer.rights')}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Java 21 • Spring Boot 3 • Oracle Database • Docker</span>
        </div>
      </div>
    </footer>
  );
}
