'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Languages, Menu, X, ArrowUpRight, Github, Linkedin, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/85 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/[0.08] shadow-2xl shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Apple-style Monogram Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-appleRed-600 via-appleViolet-600 to-appleBlue-500 flex items-center justify-center text-white font-mono font-black shadow-md shadow-appleRed-500/20 group-hover:scale-105 transition-transform duration-200">
            MD
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-neutral-900 dark:text-white text-base group-hover:text-appleRed-500 transition-colors">
              Maicon Douglas
            </span>
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Java 21/25 • Backend Core
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 dark:bg-appleDark-900/90 p-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-appleRed-500 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-neutral-800/80 transition-all duration-150"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Control Tools */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-appleDark-900 text-neutral-700 dark:text-neutral-300 hover:border-appleRed-500/50 hover:text-appleRed-500 transition-all duration-200"
          >
            <Languages size={14} className="text-appleRed-500" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="p-2.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-appleDark-900 text-neutral-700 dark:text-neutral-300 hover:border-appleRed-500/50 hover:text-appleRed-500 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-appleViolet-600" />
            )}
          </button>

          {/* Quick Contact Button */}
          <a
            href="https://wa.me/5511937184412?text=Ol%C3%A1%20Maicon%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-appleRed-500 via-rose-600 to-appleViolet-600 hover:opacity-95 text-white font-medium text-xs tracking-wide shadow-md shadow-appleRed-500/25 hover:shadow-appleRed-500/35 hover:scale-[1.02] transition-all duration-200 select-none cursor-pointer"
          >
            <MessageSquare size={14} />
            <span>WhatsApp</span>
            <ArrowUpRight size={13} className="opacity-75" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border border-neutral-200 dark:border-white/[0.08] bg-neutral-100 dark:bg-appleDark-900 text-neutral-800 dark:text-neutral-200"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-100 dark:bg-appleDark-900 text-neutral-800 dark:text-neutral-200"
          >
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-appleViolet-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-neutral-200 dark:border-white/[0.08] bg-neutral-100 dark:bg-appleDark-900 text-neutral-800 dark:text-neutral-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-black border-b border-neutral-200 dark:border-white/[0.08] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-3 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200 dark:border-white/[0.08] flex gap-2">
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
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/maicon-douglas-b244571b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
