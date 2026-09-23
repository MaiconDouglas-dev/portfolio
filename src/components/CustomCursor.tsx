'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const nextRippleId = useRef(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    setMounted(true);
    document.body.classList.add('has-custom-cursor');

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
        // Look for data-cursor-text on the element or any ancestor up to 4 levels
        const textEl = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textEl) {
          setCursorText(textEl.getAttribute('data-cursor-text') || '');
        } else {
          setCursorText('');
        }

        const interactiveEl = target.closest(
          'a, button, input, [role="button"], .cursor-pointer, .interactive-hover'
        );
        setIsInteractive(Boolean(interactiveEl));
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = ++nextRippleId.current;
      setRipples((prev) => [...prev.slice(-2), { id, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth inertia render loop for the outer ring (always centered on mouseX, mouseY)
    const renderLoop = () => {
      // Direct smooth spring-follow without disjointed magnetic offset
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

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
      document.body.classList.remove('has-custom-cursor');
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
      {/* Precision Center Dot (fades when expanding with text to avoid overlapping letters) */}
      <div
        id="lusion-cursor-dot"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none mix-blend-difference will-change-transform shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-200 ${
          cursorText ? 'w-1 h-1 opacity-0' : isClicking ? 'w-2 h-2 opacity-80' : 'w-2 h-2 opacity-100'
        }`}
      />

      {/* Sleek Outer Ring: small and unobtrusive by default, ONLY expands when cursorText is present */}
      <div
        id="lusion-cursor-ring"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-difference will-change-transform flex items-center justify-center transition-all duration-200 ease-out ${
          isClicking
            ? 'w-4 h-4 border-2 border-white bg-white/60'
            : cursorText
            ? 'w-20 h-20 border border-white/80 bg-white/15 backdrop-blur-sm shadow-[0_0_24px_rgba(255,255,255,0.2)]'
            : isInteractive
            ? 'w-4 h-4 border border-white/60 bg-transparent' // Discrete 16px when hovering links without text
            : 'w-3 h-3 border border-white/35 bg-transparent' // Subtle 12px resting ring
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-black tracking-widest text-white uppercase text-center block pointer-events-none select-none px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-fadeIn">
            {cursorText}
          </span>
        )}
      </div>

      {/* Click Shockwave Pulses */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="fixed rounded-full border border-white/60 pointer-events-none animate-shockwave mix-blend-difference"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            width: '40px',
            height: '40px',
          }}
          onAnimationEnd={() => {
            setRipples((prev) => prev.filter((item) => item.id !== r.id));
          }}
        />
      ))}
    </div>
  );
}
