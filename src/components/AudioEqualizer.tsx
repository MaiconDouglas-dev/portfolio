'use client';

import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '@/utils/audio';
import { useApp } from '@/context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioEqualizer() {
  const { lang } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if user has already dismissed the audio hint
    const dismissed = localStorage.getItem('md_audio_hint_dismissed');
    if (!dismissed && !soundManager.getEnabled()) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Subscribe to global audio manager state
    const unsubscribe = soundManager.subscribe((enabled) => {
      setIsPlaying(enabled);
      if (enabled) {
        setShowTooltip(false);
        localStorage.setItem('md_audio_hint_dismissed', 'true');
      }
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    setShowTooltip(false);
    localStorage.setItem('md_audio_hint_dismissed', 'true');
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
      time += isPlaying ? 0.14 : 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const totalWidth = barCount * barWidth + (barCount - 1) * gap;
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        let height = 4;
        if (isPlaying) {
          // Dynamic harmonic motion responsive to cosmic space chord
          const wave1 = Math.sin(time * 1.8 + i * 1.35);
          const wave2 = Math.cos(time * 2.6 + i * 0.95);
          const wave3 = Math.sin(time * 0.9 + i * 2.1);
          height = 6 + Math.abs(wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * 16;
        } else {
          // Subtle idle pulse
          height = 3.5 + Math.sin(time + i * 0.8) * 1.5;
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + height);
        if (isPlaying) {
          grad.addColorStop(0, '#ff2d55');
          grad.addColorStop(0.5, '#a855f7');
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

  const buttonTitle = isPlaying
    ? (lang === 'pt' ? 'Silenciar áudio e música espacial' : 'Mute spatial ambient audio')
    : (lang === 'pt' ? 'Ativar música espacial e efeitos sonoros' : 'Enable spatial audio & sound effects');

  const cursorBadge = isPlaying
    ? (lang === 'pt' ? 'MUDO' : 'MUTE')
    : (lang === 'pt' ? 'ÁUDIO' : 'AUDIO');

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggleSound}
        title={buttonTitle}
        aria-label={buttonTitle}
        data-cursor-text={cursorBadge}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'border-appleRed-500/60 bg-appleRed-500/15 shadow-[0_0_22px_rgba(255,45,85,0.45)] ring-1 ring-appleRed-500/40'
            : 'border-white/[0.12] bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]'
        }`}
      >
        <canvas
          ref={canvasRef}
          width={32}
          height={32}
          className="w-8 h-8 pointer-events-none"
        />

        {/* Subtle active halo */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-appleRed-500/20 animate-ping pointer-events-none opacity-40" />
        )}
      </button>

      {/* Floating Invitation Tooltip on First Visit */}
      {showTooltip && (
        <div
          role="status"
          className="absolute top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3 py-1.5 rounded-full bg-black/95 border border-appleRed-500/50 shadow-[0_10px_25px_rgba(255,45,85,0.3)] backdrop-blur-xl animate-bounce flex items-center gap-1.5 pointer-events-none select-none"
        >
          <Volume2 size={12} className="text-appleRed-400 shrink-0" />
          <span className="text-[11px] font-medium text-white tracking-tight">
            {lang === 'pt' ? 'Clique para ativar o som' : 'Click to enable audio'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-appleRed-500 animate-pulse" />
        </div>
      )}
    </div>
  );
}
