'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import TerminalCard from './TerminalCard';
import KineticText from './KineticText';
import MagneticButton from './MagneticButton';
import { ArrowDown, MessageSquare, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const { lang } = useApp();

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Subtle Apple Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-appleRed-600/10 via-appleViolet-600/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Focused Copy with Kinetic Motion */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimal Status Dot */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-appleGreen-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-400">
                {lang === 'pt' ? 'Disponível para projetos & vagas' : 'Available for roles & projects'}
              </span>
            </div>

            {/* Kinetic Name & Apple Gradient Title */}
            <div className="space-y-1.5">
              <KineticText
                text="Maicon Douglas"
                as="h1"
                staggerDelayMs={32}
                className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]"
              />
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-appleRed-500 via-rose-500 via-appleViolet-500 to-appleBlue-500 bg-clip-text text-transparent">
                {lang === 'pt' ? 'Desenvolvedor Backend & Full Stack' : 'Backend & Full Stack Engineer'}
              </p>
            </div>

            {/* Concise Bio */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              {lang === 'pt'
                ? 'Construindo APIs REST corporativas de alta confiabilidade com Java 21/25 (Spring Boot 3), .NET, modelagem relacional em Oracle DB e interfaces em React & React Native.'
                : 'Building mission-critical RESTful APIs with Java 21/25 (Spring Boot 3), .NET, relational modeling in Oracle Database, and modern React & React Native clients.'}
            </p>

            {/* Clear Magnetic CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton strength={0.25}>
                <button
                  type="button"
                  onClick={handleScrollToProjects}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-appleRed-600 to-rose-600 hover:from-appleRed-500 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-appleRed-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Ver Projetos' : 'View Projects'}</span>
                  <ArrowDown size={14} />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href="https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.1] bg-black/80 text-neutral-200 font-semibold text-xs hover:border-appleRed-500/40 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                >
                  <MessageSquare size={14} className="text-appleRed-500" />
                  <span>WhatsApp</span>
                </a>
              </MagneticButton>

              {/* Social Icons Inline with Magnetic Physics */}
              <div className="flex items-center gap-1.5 pl-2">
                <MagneticButton strength={0.35}>
                  <a
                    href="https://github.com/MaiconDouglas-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20 transition-all block"
                  >
                    <Github size={16} />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.35}>
                  <a
                    href="https://www.linkedin.com/in/maicon-douglas-b244571b5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-white/[0.08] text-neutral-400 hover:text-appleBlue-400 hover:border-appleBlue-500/30 transition-all block"
                  >
                    <Linkedin size={16} />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.35}>
                  <a
                    href="mailto:maicondouglasdev1@gmail.com"
                    className="p-2.5 rounded-lg border border-white/[0.08] text-neutral-400 hover:text-appleRed-400 hover:border-appleRed-500/30 transition-all block"
                  >
                    <Mail size={16} />
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Compact Terminal with Live Simulation */}
          <div className="lg:col-span-5">
            <TerminalCard />
          </div>

        </div>
      </div>
    </section>
  );
}
