'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme } from '@/types';
import { translations } from '@/data/translations';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  toggleLang: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved preferences
    const savedTheme = localStorage.getItem('md_portfolio_theme') as Theme | null;
    const savedLang = localStorage.getItem('md_portfolio_lang') as Language | null;

    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    } else {
      // Default to dark mode for developer vibe
      setTheme('dark');
    }

    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLang(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLang('en');
      } else {
        setLang('pt');
      }
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    localStorage.setItem('md_portfolio_theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('md_portfolio_lang', lang);
  }, [lang, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const t = (key: string): string => {
    const dict = translations[lang] as Record<string, string>;
    return dict[key] ?? key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        toggleLang,
        setLanguage,
        t,
      }}
    >
      {/* Avoid flash of unstyled content during SSR hydration */}
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
