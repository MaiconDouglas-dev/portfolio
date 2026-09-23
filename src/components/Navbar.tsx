'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Languages, Menu, X, ArrowUpRight, Github, Linkedin, MessageSquare } from 'lucide-react';
import AudioEqualizer from './AudioEqualizer';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const { lang, toggleLang, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Lusion-style Brand Monogram */}
        <MagneticButton strength={0.2}>
          <a
            href="#"
            className="group flex items-center gap-3 select-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-appleRed-600 via-appleViolet-600 to-appleBlue-500 flex items-center justify-center text-white font-mono font-black shadow-lg shadow-appleRed-500/25 group-hover:scale-105 transition-transform duration-300">
              MD
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-base group-hover:text-appleRed-500 transition-colors">
                Maicon Douglas
              </span>
              <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-appleGreen-500 inline-block animate-pulse" />
                Java 21 • Spring Boot 3
              </span>
            </div>
          </a>
        </MagneticButton>

        {/* Floating Pill Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-xl">
          {navLinks.map((link) => (
            <MagneticButton key={link.href} strength={0.25}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </button>
            </MagneticButton>
          ))}
        </nav>

        {/* Right Controls: Audio + Lang + Theme + Talk */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Lusion Live Sound Visualizer */}
          <MagneticButton strength={0.3}>
            <AudioEqualizer />
          </MagneticButton>

          {/* Language Switcher */}
          <MagneticButton strength={0.25}>
            <button
              onClick={toggleLang}
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold border border-white/[0.08] bg-white/[0.03] text-neutral-300 hover:border-appleRed-500/50 hover:text-appleRed-400 hover:bg-white/[0.06] transition-all duration-200"
            >
              <Languages size={14} className="text-appleRed-500" />
              <span>{lang.toUpperCase()}</span>
            </button>
          </MagneticButton>

          {/* Magnetic Let's Talk CTA */}
          <MagneticButton strength={0.35}>
            <a
              href="https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-appleRed-600 via-rose-600 to-appleViolet-600 hover:from-appleRed-500 hover:to-appleViolet-500 text-white font-medium text-xs tracking-wide shadow-lg shadow-appleRed-500/25 transition-all duration-300 select-none cursor-pointer"
            >
              <MessageSquare size={13} className="text-white group-hover:rotate-12 transition-transform" />
              <span>{lang === 'pt' ? 'Conversar' : "Let's Talk"}</span>
              <ArrowUpRight size={13} className="opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <AudioEqualizer />
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border border-white/[0.08] bg-white/[0.04] text-neutral-200"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-200 hover:bg-white/[0.06] rounded-lg"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex gap-2">
            <a
              href="https://wa.me/5511937184412"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg bg-appleRed-600 text-white font-medium text-xs"
            >
              WhatsApp Direct
            </a>
            <a
              href="https://github.com/MaiconDouglas-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] text-neutral-300 hover:text-white"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/maicon-douglas-b244571b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] text-neutral-300 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
