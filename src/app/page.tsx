import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LusionBackground from '@/components/LusionBackground';
import ScrollProgressHUD from '@/components/ScrollProgressHUD';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-black text-[#f5f5f7] overflow-x-clip selection:bg-appleRed-600 selection:text-white">
      {/* 3D WebGL Universe Background (Three.js with fluid mouse disturbance & depth camera) */}
      <LusionBackground />

      {/* Lusion-style Vertical Scroll Progress HUD */}
      <ScrollProgressHUD />

      {/* Layered UI Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
}
