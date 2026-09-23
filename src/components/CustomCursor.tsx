'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setMounted(true);

    const dot = document.getElementById('lusion-cursor-dot');
    const ring = document.getElementById('lusion-cursor-ring');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over interactive elements or elements with custom cursor text
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, [role="button"], .cursor-pointer, .interactive-hover')
        );
        setIsHovered(isInteractive);

        const textEl = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textEl) {
          setCursorText(textEl.getAttribute('data-cursor-text') || '');
        } else {
          setCursorText('');
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth inertia render loop for the outer ring
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    renderLoop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        id="lusion-cursor-dot"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white pointer-events-none mix-blend-difference will-change-transform"
      />

      {/* Fluid Trailing Aura Ring */}
      <div
        id="lusion-cursor-ring"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none mix-blend-difference will-change-transform flex items-center justify-center transition-[width,height,border-color,background-color] duration-200 ease-out ${
          isClicking
            ? 'w-7 h-7 border-white/80 bg-white/40'
            : cursorText
            ? 'w-20 h-20 border-white/70 bg-white/15 backdrop-blur-[2px]'
            : isHovered
            ? 'w-14 h-14 border-white/60 bg-white/10'
            : 'w-8 h-8 border-white/40 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase text-center block pointer-events-none select-none px-1">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
