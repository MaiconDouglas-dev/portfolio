'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const nextRippleId = useRef(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    setMounted(true);

    const ring = document.getElementById('lusion-cursor-ring');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, input, select, [role="button"], .cursor-pointer, .interactive-hover'
        );
        setIsHovered(Boolean(interactiveEl));

        const textEl = target.closest('[data-cursor-text]') as HTMLElement | null;
        const text = textEl?.getAttribute('data-cursor-text') || null;
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = ++nextRippleId.current;
      setRipples((prev) => [...prev.slice(-1), { id, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setCursorText(null);
    };

    // High-responsiveness trackpad tracking loop (0.72 factor gives instant precision)
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.72;
      ringY += (mouseY - ringY) * 0.72;

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
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Trackpad Aura Ring / Text Pill (native OS cursor remains 100% visible & sharp) */}
      <div
        id="lusion-cursor-ring"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform flex items-center justify-center transition-[width,height,border-color,background-color,border-radius,padding] duration-150 ease-out ${
          cursorText
            ? 'h-6 px-3 rounded-full border border-white/60 bg-black/85 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            : isClicking
            ? 'w-3 h-3 rounded-full border border-appleRed-500/80 bg-appleRed-500/30'
            : isHovered
            ? 'w-7 h-7 rounded-full border border-white/50 bg-white/[0.04] shadow-[0_0_12px_rgba(255,255,255,0.12)]'
            : 'w-3.5 h-3.5 rounded-full border border-white/30 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-wider text-white uppercase whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>

      {/* Subtle Click Pulse */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="fixed rounded-full border border-appleRed-500/60 pointer-events-none animate-shockwave"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            width: '32px',
            height: '32px',
          }}
          onAnimationEnd={() => {
            setRipples((prev) => prev.filter((item) => item.id !== r.id));
          }}
        />
      ))}
    </div>
  );
}
