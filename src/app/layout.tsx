import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://maicondouglas-dev.vercel.app'),
  title: 'Maicon Douglas — Desenvolvedor Backend Java em Formação',
  description: 'Portfólio de Maicon Douglas, desenvolvedor backend Java em formação (Análise e Desenvolvimento de Sistemas). Foco em Java, Spring Boot, APIs REST, Oracle Database (PL/SQL), Docker e Microsoft Azure.',
  keywords: [
    'Maicon Douglas',
    'Desenvolvedor Backend Java',
    'Java Backend Developer',
    'Java 21',
    'Spring Boot',
    'Spring Security',
    'Spring Data JPA',
    'Oracle Database',
    'PL/SQL',
    'Docker',
    'Azure',
    'REST APIs',
    'Clyvo'
  ],
  authors: [{ name: 'Maicon Douglas' }],
  openGraph: {
    title: 'Maicon Douglas — Desenvolvedor Backend Java em Formação',
    description: 'Foco no ecossistema Java, Spring Boot, APIs REST, Oracle Database (PL/SQL), Docker e Microsoft Azure.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Maicon Douglas Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Maicon Douglas — Desenvolvedor Backend Java em Formação'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maicon Douglas — Desenvolvedor Backend Java em Formação',
    description: 'Foco no ecossistema Java, Spring Boot, APIs REST, Oracle Database (PL/SQL), Docker e Microsoft Azure.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-[#f5f5f7] overflow-x-hidden selection:bg-appleRed-600 selection:text-white">
        <AppProvider>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
