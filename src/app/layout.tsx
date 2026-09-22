import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://maicondouglas-dev.vercel.app'),
  title: 'Maicon Douglas — Desenvolvedor Backend Java | Spring Boot, Oracle, Docker, Azure',
  description: 'Portfólio de Maicon Douglas, desenvolvedor backend Java em formação (Análise e Desenvolvimento de Sistemas), focado no ecossistema Java, Spring Boot, Oracle Database (PL/SQL), Docker e Microsoft Azure.',
  keywords: [
    'Maicon Douglas',
    'Backend Developer',
    'Java',
    'Spring Boot',
    '.NET',
    'Oracle Database',
    'PL/SQL',
    'Flyway',
    'Docker',
    'Azure',
    'React',
    'React Native',
    'Clyvo M-Vet',
    'OAuth 2.0',
    'REST APIs'
  ],
  authors: [{ name: 'Maicon Douglas' }],
  openGraph: {
    title: 'Maicon Douglas — Backend & Full Stack Developer',
    description: 'Especialista em ecossistemas corporativos Java, Spring Boot, .NET, Oracle e React. Conheça o ecossistema Clyvo M-Vet.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Maicon Douglas Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Maicon Douglas — Backend & Full Stack Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maicon Douglas — Backend & Full Stack Developer',
    description: 'Especialista em Java (Spring Boot), .NET, Oracle e React Native.',
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
