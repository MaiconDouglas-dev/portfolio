'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
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
    let targetMagneticX = 0;
    let targetMagneticY = 0;
    let hasMagneticTarget = false;
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
        const interactiveEl = target.closest(
          'a, button, input, [role="button"], .cursor-pointer, .interactive-hover'
        ) as HTMLElement | null;

        const isInteractive = Boolean(interactiveEl);
        setIsHovered(isInteractive);

        // Check for subtle magnetic pull on small buttons / icons
        if (interactiveEl && (interactiveEl.tagName === 'BUTTON' || interactiveEl.tagName === 'A' || interactiveEl.classList.contains('magnetic-pull'))) {
          const rect = interactiveEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

          if (dist < 60) {
            hasMagneticTarget = true;
            targetMagneticX = centerX;
            targetMagneticY = centerY;
          } else {
            hasMagneticTarget = false;
          }
        } else {
          hasMagneticTarget = false;
        }

        const textEl = target.closest('[data-cursor-text]') as HTMLElement | null;
        if (textEl) {
          setCursorText(textEl.getAttribute('data-cursor-text') || '');
        } else {
          setCursorText('');
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn a ripple animation at click point
      const id = ++nextRippleId.current;
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    // Spring physics render loop for the outer ring
    const renderLoop = () => {
      const targetX = hasMagneticTarget ? targetMagneticX : mouseX;
      const targetY = hasMagneticTarget ? targetMagneticY : mouseY;

      const factor = hasMagneticTarget ? 0.28 : 0.20;
      ringX += (targetX - ringX) * factor;
      ringY += (targetY - ringY) * factor;

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
      {/* Precision Center Dot */}
      <div
        id="lusion-cursor-dot"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white pointer-events-none mix-blend-difference will-change-transform shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />

      {/* Fluid Trailing Aura Ring with Dynamic Morphs */}
      <div
        id="lusion-cursor-ring"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-difference will-change-transform flex items-center justify-center transition-[width,height,border-color,background-color] duration-250 ease-out ${
          isClicking
            ? 'w-6 h-6 border-2 border-white bg-white/50'
            : cursorText
            ? 'w-24 h-24 border border-white/80 bg-white/20 backdrop-blur-sm'
            : isHovered
            ? 'w-16 h-16 border border-white/70 bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.15)]'
            : 'w-8 h-8 border border-white/45 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase text-center block pointer-events-none select-none px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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
            width: '60px',
            height: '60px',
          }}
          onAnimationEnd={() => {
            setRipples((prev) => prev.filter((item) => item.id !== r.id));
          }}
        />
      ))}
    </div>
  );
}
