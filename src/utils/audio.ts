'use client';

// ============================================================================
// Procedural Web Audio Engine: Sci-Fi SFX + NASA Black Hole Gravitational Soundscape
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis
// Inspired by NASA Chandra X-Ray Perseus Cluster Sonification & Interstellar
// ============================================================================

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  // Black Hole Ambient Nodes
  private ambientGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private lfoOsc: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private lastKineticTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      // Default false to respect browser autoplay policies until user gesture
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
  // UI Sound Effects (Procedural High-Tech Synth)
  // ============================================================================

  // 1. Subtle High-Tech Precision Hover Tick (warm, non-piercing)
  public playHover() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {}
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
      osc1.frequency.setValueAtTime(480, now);
      osc1.frequency.exponentialRampToValueAtTime(720, now + 0.06);

      gain1.gain.setValueAtTime(0.03, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Soft harmonic warmth
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(960, now);
      gain2.gain.setValueAtTime(0.012, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.06);
      osc2.start(now);
      osc2.stop(now + 0.035);
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
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.05);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
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
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(980, now + 0.2);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
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
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  // 6. Action / Swagger Confirmation Chord
  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [440, 554.37, 659.25]; // A4, C#5, E5
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.16);
      });
    } catch {}
  }

  // Audio Toggle Feedback Chimes
  private playActivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [330, 440, 550].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.025, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } catch {}
  }

  private playDeactivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [550, 330].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.02, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.14);
      });
    } catch {}
  }

  // ============================================================================
  // NASA Black Hole Gravitational Sonification (Deep, Organic, Soothing Sub-Bass)
  // Continuous Event Horizon Rumble & Sub-Harmonic Resonance (Zero Harsh Chimes)
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master Ambient Gain with 2.2s gentle logarithmic fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.05, now + 2.2);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Resonant Lowpass Filter tuned to gravitational sub-frequencies (cutoff 140Hz)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(2.2, now);
      filter.connect(masterGain);
      this.ambientFilter = filter;

      // Very slow 24-second ultra-smooth breathing cycle (gravitational expansion)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.042, now); // ~24s period
      lfoGain.gain.setValueAtTime(35, now);     // Modulate filter by +/- 35Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.lfoOsc = lfo;

      // Deep Gravitational Sub-Bass Oscillators (39.5Hz fundamental, 59.25Hz perfect fifth, 79Hz octave)
      // Pure sine waves only — warm, soothing, zero dissonant high frequencies
      const blackHolePitches = [39.5, 59.25, 79.0];
      this.droneOscillators = [];

      blackHolePitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        // Subtle micro-detune for organic spacetime warmth
        const detune = idx === 0 ? 0 : (idx === 1 ? 1.5 : -2.0);
        osc.detune.setValueAtTime(detune, now);

        const vol = idx === 0 ? 0.38 : (idx === 1 ? 0.22 : 0.12);
        oscGain.gain.setValueAtTime(vol, now);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        this.droneOscillators.push(osc);
      });

      // Accretion Disk Matter Rumble: Pure Brownian (Red) Noise
      // Integrated random walk produces rich, deep, velvety rumble without harsh hiss
      try {
        const sampleRate = ctx.sampleRate;
        const bufferSize = sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Leaky integrator filter for authentic Brownian rumble
          output[i] = (lastOut + 0.022 * white) / 1.022;
          lastOut = output[i];
          output[i] *= 3.2;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        this.noiseSource = noise;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(110, now);
        noiseFilter.Q.setValueAtTime(1.4, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.02, now);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(filter);
        noise.start(now);
      } catch {}

      this.isPlayingAmbience = true;
    } catch {
      this.isPlayingAmbience = false;
    }
  }

  // ============================================================================
  // Kinetic Audio-Visual Modulation (Interactive Gravitational Disturbance)
  // Reacts smoothly to mouse velocity, touch swipe, and 3D terrain perturbation
  // ============================================================================

  public onKineticDisturbance(speed: number) {
    if (!this.isEnabled || !this.isPlayingAmbience || !this.ctx || !this.ambientFilter) return;

    const now = this.ctx.currentTime;
    const clampedSpeed = Math.min(Math.max(speed, 0), 2.0);
    if (clampedSpeed < 0.08) return;

    // Throttle to 75ms to avoid redundant audio graph re-schedules
    if (now - this.lastKineticTime < 0.075) return;
    this.lastKineticTime = now;

    try {
      // Modulate the lowpass cutoff slightly upward (140Hz up to 230Hz max)
      const targetFreq = 140 + clampedSpeed * 50;
      this.ambientFilter.frequency.cancelScheduledValues(now);
      this.ambientFilter.frequency.setValueAtTime(this.ambientFilter.frequency.value, now);
      this.ambientFilter.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.08);
      this.ambientFilter.frequency.exponentialRampToValueAtTime(140, now + 0.75);
    } catch {}
  }

  public stopAmbience() {
    if (!this.isPlayingAmbience) return;
    try {
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

          if (this.noiseSource) {
            try {
              this.noiseSource.stop();
              this.noiseSource.disconnect();
            } catch {}
            this.noiseSource = null;
          }

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
