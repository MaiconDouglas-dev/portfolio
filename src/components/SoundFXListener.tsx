'use client';

import { useEffect } from 'react';
import { soundManager } from '@/utils/audio';

export default function SoundFXListener() {
  useEffect(() => {
    let lastHoverTime = 0;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('a, button, [role="button"], .cursor-pointer, .interactive-hover');
      if (interactiveEl) {
        const now = performance.now();
        // Debounce hovers to avoid rapid triggering on nested elements
        if (now - lastHoverTime > 70) {
          lastHoverTime = now;
          soundManager.playHover();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('a, button, [role="button"], .cursor-pointer, .interactive-hover');
      if (interactiveEl) {
        soundManager.playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
