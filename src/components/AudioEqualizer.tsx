'use client';

import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '@/utils/audio';
import { useApp } from '@/context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioEqualizer() {
  const { lang } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Sync initial state and subscribe to changes
    setIsPlaying(soundManager.getEnabled());
    const unsubscribe = soundManager.subscribe((enabled) => {
      setIsPlaying(enabled);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    soundManager.toggle();
  };

  // Mini spectrum visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const barCount = 3;
    const barWidth = 2;
    const gap = 2;

    const render = () => {
      time += isPlaying ? 0.12 : 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalWidth = barCount * barWidth + (barCount - 1) * gap;
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let height = 3;
        if (isPlaying) {
          // Dynamic harmonic motion
          const wave1 = Math.sin(time * 2.2 + i * 1.5);
          const wave2 = Math.cos(time * 3.1 + i * 1.1);
          height = 4 + Math.abs(wave1 * 0.55 + wave2 * 0.45) * 8;
        } else {
          // Flat muted indicator
          height = 2.5;
        }

        const x = startX + i * (barWidth + gap);
        const y = canvas.height - height;

        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        if (isPlaying) {
          grad.addColorStop(0, '#ff2d55');
          grad.addColorStop(1, '#a855f7');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 1);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const buttonTitle = isPlaying
    ? (lang === 'pt' ? 'Som ativado (clique para silenciar)' : 'Sound enabled (click to mute)')
    : (lang === 'pt' ? 'Som silenciado (clique para ativar)' : 'Sound muted (click to enable)');

  const cursorBadge = isPlaying
    ? (lang === 'pt' ? 'MUDO' : 'MUTE')
    : (lang === 'pt' ? 'SOM' : 'SOUND');

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={buttonTitle}
      aria-label={buttonTitle}
      data-cursor-text={cursorBadge}
      className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all duration-200 cursor-pointer select-none ${
        isPlaying
          ? 'border-appleRed-500/40 bg-appleRed-500/10 text-white shadow-[0_0_16px_rgba(255,45,85,0.22)] hover:border-appleRed-500/70 hover:bg-appleRed-500/15'
          : 'border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {isPlaying ? (
        <Volume2 size={14} className="text-appleRed-500 shrink-0 group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX size={14} className="text-neutral-400 shrink-0 group-hover:scale-110 transition-transform" />
      )}

      <span className="tracking-wider">
        {isPlaying
          ? (lang === 'pt' ? 'SOM' : 'SOUND')
          : (lang === 'pt' ? 'MUDO' : 'MUTED')}
      </span>

      {/* Mini equalizer canvas indicator */}
      <canvas
        ref={canvasRef}
        width={16}
        height={12}
        className="w-4 h-3 pointer-events-none shrink-0"
      />
    </button>
  );
}
