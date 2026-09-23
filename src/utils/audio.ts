'use client';

// ============================================================================
// Procedural Web Audio Engine: Sci-Fi SFX + Generative Cosmic Space Ambience
// 100% Royalty-Free, Zero Download Latency, Mathematically Synthesized
// ============================================================================

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  // Ambient Drone Audio Nodes
  private ambientGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private lfoOsc: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private chimeTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      // Default false so it respects browser autoplay policies until user clicks
      this.isEnabled = saved === 'true';
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isEnabled);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    const nextState = !this.isEnabled;
    this.setEnabled(nextState);
    return nextState;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('md_portfolio_audio', String(enabled));
    }

    if (enabled) {
      this.getContext();
      this.startAmbience();
      this.playActivateChime();
    } else {
      this.playDeactivateChime();
      this.stopAmbience();
    }

    this.listeners.forEach((fn) => fn(this.isEnabled));
  }

  // ============================================================================
  // UI Sound Effects (Procedural Synth)
  // ============================================================================

  // 1. Subtle High-Tech Precision Hover Tick
  public playHover() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.018, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {
      // AudioContext restricted before gesture
    }
  }

  // 2. Resonant Cybernetic Click / Button Chime
  public playClick() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Primary tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(580, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.07);

      gain1.gain.setValueAtTime(0.035, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Soft harmonic sparkle
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1160, now);
      gain2.gain.setValueAtTime(0.015, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.07);
      osc2.start(now);
      osc2.stop(now + 0.04);
    } catch {}
  }

  // 3. Tab / Stepper Shift Chirp
  public playTab() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // 4. Modal Open Aperture Whoosh
  public playModalOpen() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.22);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {}
  }

  // 5. Modal Close Sweep
  public playModalClose() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  // 6. Success / Action Confirmation (Celestial Arpeggio)
  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.025, now + idx * 0.06 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    } catch {}
  }

  // Audio Toggle Feedback Chords
  private playActivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 554.37, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.03, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.22);
      });
    } catch {}
  }

  private playDeactivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [659.25, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.02, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch {}
  }

  // ============================================================================
  // Generative Cosmic Space Ambient Music (Continuous, Ethereal, Hans Zimmer/Eno)
  // Multi-oscillator celestial pad + LFO breathing filter + stellar wind
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master Ambient Gain with 1.8s smooth fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.045, now + 1.8);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Resonant Lowpass Filter for warm atmospheric space depth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.5, now);
      filter.connect(masterGain);
      this.ambientFilter = filter;

      // LFO for slow 16-second breathing filter sweep
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, now); // 16s cycle
      lfoGain.gain.setValueAtTime(140, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.lfoOsc = lfo;

      // Multi-Oscillator Celestial Pad Chord (D Minor / A Celestial Pentatonic)
      // 55Hz (Sub Bass), 110Hz (A2), 164.81Hz (E3), 220Hz (A3), 329.63Hz (E4), 440Hz (A4 shimmer)
      const chordFrequencies = [55.0, 110.0, 164.81, 220.0, 329.63, 440.0];
      this.droneOscillators = [];

      chordFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Slight detune for rich celestial chorus
        const detuneCents = (idx % 2 === 0 ? 1 : -1) * (idx * 3.5);
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detuneCents, now);

        // Lower volume for higher harmonics to maintain deep warmth
        const vol = idx === 0 ? 0.35 : 0.15 / Math.sqrt(idx + 1);
        oscGain.gain.setValueAtTime(vol, now);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        this.droneOscillators.push(osc);
      });

      // Soft Pink Noise Solar Wind Layer (subtle interstellar texture)
      try {
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.05;
          b2 = 0.85 * b2 + white * 0.05;
          output[i] = (b0 + b1 + b2) * 0.08;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(800, now);
        noiseFilter.Q.setValueAtTime(1.2, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.008, now);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(now);
      } catch {}

      // Periodic Celestial Chimes (Random Pentatonic sparkle every 5-9 seconds)
      const celestialPitches = [659.25, 783.99, 987.77, 1174.66, 1318.51]; // E5, G5, B5, D6, E6
      this.chimeTimer = setInterval(() => {
        if (!this.isPlayingAmbience || !this.ambientGain) return;
        try {
          const chimeCtx = this.getContext();
          if (!chimeCtx) return;
          const chimeNow = chimeCtx.currentTime;
          const pitch = celestialPitches[Math.floor(Math.random() * celestialPitches.length)];

          const cOsc = chimeCtx.createOscillator();
          const cGain = chimeCtx.createGain();

          cOsc.type = 'sine';
          cOsc.frequency.setValueAtTime(pitch, chimeNow);

          cGain.gain.setValueAtTime(0, chimeNow);
          cGain.gain.linearRampToValueAtTime(0.015, chimeNow + 0.08);
          cGain.gain.exponentialRampToValueAtTime(0.0001, chimeNow + 2.8);

          cOsc.connect(cGain);
          cGain.connect(masterGain);

          cOsc.start(chimeNow);
          cOsc.stop(chimeNow + 2.8);
        } catch {}
      }, 6500);

      this.isPlayingAmbience = true;
    } catch {
      this.isPlayingAmbience = false;
    }
  }

  public stopAmbience() {
    if (!this.isPlayingAmbience) return;
    try {
      if (this.chimeTimer) {
        clearInterval(this.chimeTimer);
        this.chimeTimer = null;
      }

      if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.cancelScheduledValues(now);
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        setTimeout(() => {
          this.droneOscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.droneOscillators = [];

          if (this.lfoOsc) {
            try {
              this.lfoOsc.stop();
              this.lfoOsc.disconnect();
            } catch {}
            this.lfoOsc = null;
          }

          if (this.ambientGain) {
            this.ambientGain.disconnect();
            this.ambientGain = null;
          }
          this.isPlayingAmbience = false;
        }, 700);
      } else {
        this.isPlayingAmbience = false;
      }
    } catch {
      this.isPlayingAmbience = false;
    }
  }
}

// Singleton global instance
export const soundManager = new AudioManager();
