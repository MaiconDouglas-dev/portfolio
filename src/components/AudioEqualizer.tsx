'use client';

import React, { useEffect, useRef, useState } from 'react';
import { soundManager, AudioStatus } from '@/utils/audio';
import { useApp } from '@/context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioEqualizer() {
  const { lang } = useApp();
  const [status, setStatus] = useState<AudioStatus>({
    enabled: true,
    isPlaying: false,
    isSuspended: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Sync initial state and subscribe to changes
    setStatus(soundManager.getStatus());
    const unsubscribe = soundManager.subscribe((newStatus) => {
      setStatus(newStatus);
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
      // Advance time only if audio is actively playing sound
      time += status.isPlaying ? 0.14 : 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalWidth = barCount * barWidth + (barCount - 1) * gap;
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let height = 2.5;

        if (status.isPlaying) {
          // Dynamic harmonic motion matching Interstellar church organ & ostinato
          const wave1 = Math.sin(time * 2.4 + i * 1.6);
          const wave2 = Math.cos(time * 3.6 + i * 1.2);
          height = 3.5 + Math.abs(wave1 * 0.6 + wave2 * 0.4) * 8.5;
        } else if (status.enabled && status.isSuspended) {
          // Waiting for first interaction: calm subtle breathing
          height = 3 + Math.sin(time * 0.8 + i * 0.5) * 1.2;
        } else {
          // Flat muted indicator
          height = 2;
        }

        const x = startX + i * (barWidth + gap);
        const y = canvas.height - height;

        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        if (status.isPlaying) {
          grad.addColorStop(0, '#ff2d55');
          grad.addColorStop(1, '#a855f7');
        } else if (status.enabled && status.isSuspended) {
          grad.addColorStop(0, 'rgba(255, 45, 85, 0.7)');
          grad.addColorStop(1, 'rgba(168, 85, 247, 0.4)');
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
  }, [status.isPlaying, status.enabled, status.isSuspended]);

  const buttonTitle = status.isPlaying
    ? (lang === 'pt' ? 'Música Interestelar tocando (clique para silenciar)' : 'Interstellar audio playing (click to mute)')
    : status.enabled && status.isSuspended
    ? (lang === 'pt' ? 'Clique para iniciar a trilha Interestelar' : 'Click to start Interstellar audio')
    : (lang === 'pt' ? 'Som silenciado (clique para ativar)' : 'Sound muted (click to enable)');

  const cursorBadge = status.isPlaying
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
        status.isPlaying
          ? 'border-appleRed-500/40 bg-appleRed-500/10 text-white shadow-[0_0_16px_rgba(255,45,85,0.22)] hover:border-appleRed-500/70 hover:bg-appleRed-500/15'
          : status.enabled && status.isSuspended
          ? 'border-appleRed-500/30 bg-appleRed-500/5 text-neutral-200 hover:border-appleRed-500/60 hover:text-white hover:bg-appleRed-500/10'
          : 'border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {status.isPlaying ? (
        <Volume2 size={14} className="text-appleRed-500 shrink-0 group-hover:scale-110 transition-transform" />
      ) : status.enabled && status.isSuspended ? (
        <Volume2 size={14} className="text-appleRed-400 shrink-0 animate-pulse" />
      ) : (
        <VolumeX size={14} className="text-neutral-400 shrink-0 group-hover:scale-110 transition-transform" />
      )}

      <span className="tracking-wider">
        {status.enabled
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
