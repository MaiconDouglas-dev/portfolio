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
  const [lang, setLang] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);
  const theme: Theme = 'dark';

  useEffect(() => {
    // Clear any legacy theme preference to ensure pure Dark OLED experience
    localStorage.removeItem('md_portfolio_theme');

    const savedLang = localStorage.getItem('md_portfolio_lang') as Language | null;

    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLang('en');
      } else {
        setLang('pt');
      }
    }

    // Enforce dark mode on root
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('md_portfolio_lang', lang);
  }, [lang, mounted]);

  const toggleTheme = () => {
    // Portfolio is permanently optimized for Apple Pro Dark OLED
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
      <div className="dark">
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
