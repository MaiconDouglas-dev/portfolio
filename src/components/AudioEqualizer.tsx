'use client';

import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '@/utils/audio';

export default function AudioEqualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Subscribe to global audio manager state
    const unsubscribe = soundManager.subscribe((enabled) => {
      setIsPlaying(enabled);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    soundManager.toggle();
  };

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const barCount = 4;
    const barWidth = 2.5;
    const gap = 3;

    const render = () => {
      time += isPlaying ? 0.12 : 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalWidth = barCount * barWidth + (barCount - 1) * gap;
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let height = 4;
        if (isPlaying) {
          // Dynamic harmonic motion responsive to cosmic drone
          const wave1 = Math.sin(time * 1.6 + i * 1.3);
          const wave2 = Math.cos(time * 2.3 + i * 0.9);
          height = 5 + Math.abs(wave1 * 0.65 + wave2 * 0.35) * 14;
        } else {
          // Subtle idle pulse
          height = 3.5 + Math.sin(time + i * 0.8) * 1.5;
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + height);
        if (isPlaying) {
          grad.addColorStop(0, '#ff2d55');
          grad.addColorStop(1, '#0a84ff');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? 'Silenciar áudio e música espacial' : 'Ativar música espacial e efeitos sonoros'}
      aria-label={isPlaying ? 'Silenciar áudio' : 'Ativar áudio'}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer ${
        isPlaying
          ? 'border-appleRed-500/60 bg-appleRed-500/15 shadow-[0_0_18px_rgba(255,45,85,0.35)] ring-1 ring-appleRed-500/30'
          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20'
      }`}
    >
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        className="w-8 h-8 pointer-events-none"
      />
    </button>
  );
}
