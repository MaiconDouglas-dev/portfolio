'use client';

import { useEffect } from 'react';
import { soundManager } from '@/utils/audio';

export default function SoundFXListener() {
  useEffect(() => {
    // Initialize auto-play immediately on client load
    soundManager.initAutoPlay();

    let lastHoverTime = 0;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-no-sound]')) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, select, .cursor-pointer, .interactive-hover'
      );
      if (interactiveEl) {
        const now = performance.now();
        // Debounce hovers to avoid rapid triggering on nested DOM elements
        if (now - lastHoverTime > 80) {
          lastHoverTime = now;
          soundManager.playHover();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-no-sound]')) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], .cursor-pointer, .interactive-hover'
      );
      if (interactiveEl) {
        soundManager.playClick();
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-no-sound]')) return;

      const interactiveEl = target.closest('a, button, input, [role="button"]');
      if (interactiveEl) {
        soundManager.playHover();
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('focusin', handleFocusIn, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return null;
}
