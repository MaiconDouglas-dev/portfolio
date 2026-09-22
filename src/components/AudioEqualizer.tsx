'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AudioEqualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle high-tech acoustic blip
  const playInteractionSound = (freq = 440, duration = 0.08) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before first gesture
    }
  };

  const toggleSound = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      playInteractionSound(520, 0.12);
    } else {
      playInteractionSound(280, 0.09);
    }
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
          // Dynamic harmonic motion
          const wave1 = Math.sin(time * 1.5 + i * 1.2);
          const wave2 = Math.cos(time * 2.2 + i * 0.8);
          height = 4 + Math.abs(wave1 * 0.6 + wave2 * 0.4) * 14;
        } else {
          // Subtle idle pulse
          height = 3.5 + Math.sin(time + i * 0.8) * 1.5;
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        // Gradient bar color matching Apple Crimson -> Violet
        const grad = ctx.createLinearGradient(0, y, 0, y + height);
        if (isPlaying) {
          grad.addColorStop(0, '#ff2d55');
          grad.addColorStop(1, '#0a84ff');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
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
      title={isPlaying ? 'Silenciar áudio ambiental' : 'Ativar áudio sintetizado'}
      aria-label="Controle de áudio"
      className={`group relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 cursor-pointer ${
        isPlaying
          ? 'border-appleRed-500/50 bg-appleRed-500/10 shadow-[0_0_15px_rgba(255,45,85,0.25)]'
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
