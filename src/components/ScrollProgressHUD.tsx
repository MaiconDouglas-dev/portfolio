'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ScrollProgressHUD() {
  const { lang } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', num: '01', labelPt: 'INÍCIO', labelEn: 'HERO', targetId: 'hero' },
    { id: 'about', num: '02', labelPt: 'SOBRE', labelEn: 'ABOUT', targetId: 'about' },
    { id: 'projects', num: '03', labelPt: 'PROJETOS', labelEn: 'PROJECTS', targetId: 'projects' },
    { id: 'skills', num: '04', labelPt: 'SKILLS', labelEn: 'SKILLS', targetId: 'skills' },
    { id: 'contact', num: '05', labelPt: 'CONTATO', labelEn: 'CONTACT', targetId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(Math.round(progress * 100));
      }

      // Detect active section
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].targetId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    const handleLenisScroll = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.progress !== undefined) {
        setScrollProgress(Math.round(detail.progress * 100));
      }
    };

    window.addEventListener('lenis-scroll', handleLenisScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('lenis-scroll', handleLenisScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* 1. Lusion-style Floating Scrollbar Rail on the Right Viewport Edge */}
      <div
        className="fixed right-1 top-0 bottom-0 w-1 pointer-events-none z-50 hidden md:block py-3 select-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <div
            className="w-1 rounded-full bg-white/75 shadow-[0_0_12px_rgba(255,255,255,0.6)] will-change-transform transition-transform duration-75 ease-out"
            style={{
              height: '52px',
              transform: `translate3d(0, ${scrollProgress * 0.01 * (typeof window !== 'undefined' ? Math.max(window.innerHeight - 80, 200) : 600)}px, 0)`,
            }}
          />
        </div>
      </div>

      {/* 2. Tactical Monospace HUD Indicator */}
      <aside
        aria-label="Scroll Navigation HUD"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 pointer-events-auto select-none"
      >
      {/* Percentage Counter in Monospace */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400">
          {String(scrollProgress).padStart(2, '0')}%
        </span>
        <span className="text-[8px] font-mono text-appleRed-500 uppercase tracking-widest">
          SCROLL
        </span>
      </div>

      {/* Slim Laser Track */}
      <div className="relative w-px h-36 bg-white/[0.08] rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-appleRed-500 via-rose-500 to-appleViolet-500 transition-all duration-150 rounded-full shadow-[0_0_8px_rgba(255,45,85,0.6)]"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Section Step Dots with Tooltip */}
      <nav className="flex flex-col items-center gap-2.5">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.targetId)}
              title={`${sec.num} • ${lang === 'pt' ? sec.labelPt : sec.labelEn}`}
              aria-label={`Navegar para ${sec.labelPt}`}
              className="group relative flex items-center justify-center w-5 h-5 cursor-pointer"
            >
              {/* Dot Ring */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-appleRed-500 shadow-[0_0_10px_rgba(255,45,85,0.8)]'
                    : 'bg-white/20 group-hover:bg-white/60 group-hover:scale-125'
                }`}
              />

              {/* Hover Flyout Label (Lusion Style) */}
              <span className="absolute right-7 px-2 py-0.5 rounded-md bg-black/80 border border-white/[0.1] text-[10px] font-mono text-neutral-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-200 backdrop-blur-md">
                <span className="text-appleRed-400 font-bold mr-1">{sec.num}</span>
                {lang === 'pt' ? sec.labelPt : sec.labelEn}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
    </>
  );
}
