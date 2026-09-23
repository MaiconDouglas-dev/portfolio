'use client';

// ============================================================================
// Procedural Web Audio Engine: Sci-Fi SFX + Space Ambient Celestial Drone
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis
// Calibrated for clear audibility and maximum acoustic comfort on ALL devices
// (MacBook / Dell laptops, iPhone, iPad, Android, headphones, desktop monitors)
// ============================================================================

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  // Ambient Drone Audio Nodes
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private droneGains: GainNode[] = [];
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private lastKineticTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      this.isEnabled = saved === 'true';

      // Global user gesture listener: unlock AudioContext seamlessly on first interaction
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      };
      window.addEventListener('click', unlockAudio, { passive: true, once: false });
      window.addEventListener('keydown', unlockAudio, { passive: true, once: false });
      window.addEventListener('touchstart', unlockAudio, { passive: true, once: false });
    }
  }

  public getContext(): AudioContext | null {
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
      this.ctx.resume().catch(() => {});
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

    const ctx = this.getContext();
    if (enabled && ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          this.startAmbience();
          this.playActivateChime();
        });
      } else {
        this.startAmbience();
        this.playActivateChime();
      }
    } else {
      this.playDeactivateChime();
      this.stopAmbience();
    }

    this.listeners.forEach((fn) => fn(this.isEnabled));
  }

  // ============================================================================
  // UI Sound Effects (Tactile, High-Tech, Comfortable Sci-Fi Synthesis)
  // Designed to be clearly audible yet never harsh or fatiguing
  // ============================================================================

  /**
   * Tactile hover tick: soft futuristic frequency shimmer (45ms).
   */
  public playHover() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Bandpass filter centered at 950Hz creates a velvety tactile feel
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(1.8, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.linearRampToValueAtTime(480, now + 0.045);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {}
  }

  /**
   * Resonant magnetic click: dual-pulse tactile impulse.
   */
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
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.07);

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.linearRampToValueAtTime(0.0001, now + 0.07);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Warm sub-click thud
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(240, now);
      osc2.frequency.linearRampToValueAtTime(120, now + 0.05);

      gain2.gain.setValueAtTime(0.09, now);
      gain2.gain.linearRampToValueAtTime(0.0001, now + 0.05);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.07);
      osc2.start(now);
      osc2.stop(now + 0.05);
    } catch {}
  }

  /**
   * Tab switch / category filter: smooth sci-fi interface transition.
   */
  public playTab() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.065);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.065);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }

  /**
   * Modal Open: dimensional whoosh with ascending filter sweep.
   */
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
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.linearRampToValueAtTime(1100, now + 0.22);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.22);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.24);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {}
  }

  /**
   * Modal Close: descending smooth whoosh.
   */
  public playModalClose() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.16);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  /**
   * Copy to clipboard / confirmation success: celestial ascending major triad (A4 - C#5 - E5).
   */
  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // A major chord triad: 440Hz, 554.37Hz, 659.25Hz
      const notes = [440, 554.37, 659.25];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.05 + 0.015);
        gain.gain.linearRampToValueAtTime(0.0001, now + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.22);
      });
    } catch {}
  }

  /**
   * Sound activation boot chime (unmistakable confirmation that sound is ON).
   */
  private playActivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Ascending futuristic chime: E4 (329.6), A4 (440), C#5 (554.4)
      const pitches = [329.63, 440.0, 554.37];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
        gain.gain.linearRampToValueAtTime(0.0001, now + i * 0.08 + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.32);
      });
    } catch {}
  }

  /**
   * Sound deactivation power-down tone.
   */
  private playDeactivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const pitches = [554.37, 329.63];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.0001, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.07 + 0.015);
        gain.gain.linearRampToValueAtTime(0.0001, now + i * 0.07 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.18);
      });
    } catch {}
  }

  // ============================================================================
  // Celestial Space Ambient Drone (Warm, Immersive, Comfortable & Audibile)
  // Inspired by Interstellar / Brian Eno / Blade Runner 2049
  //
  // Chord Architecture: Ethereal A minor / Space Pad
  // - A2 (110.00 Hz): warm foundation, audible on all laptop speakers
  // - E3 (164.81 Hz): perfect fifth body, rich grounding
  // - A3 (220.00 Hz): pure center harmonic presence
  // - C4 (261.63 Hz): soft minor third mystery
  // - E4 (329.63 Hz): high shimmer warmth
  //
  // Master Filter: Gentle 650Hz lowpass modulated by ultra-slow 22s breathing LFO
  // Master Volume: 0.32 (solid, clear, luxurious, completely fatigue-free)
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Master Ambient Gain with smooth 1.8s fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.32, now + 1.8);
      masterGain.connect(ctx.destination);
      this.masterGain = masterGain;

      // 2. Warm Lowpass Resonant Filter (central cutoff 680Hz)
      // Allows warm chord harmonics through while cutting harsh frequencies
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, now);
      filter.Q.setValueAtTime(1.4, now);
      filter.connect(masterGain);
      this.ambientFilter = filter;

      // 3. Cosmic Breathing LFO (~22 second slow orbital cycle)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.045, now); // ~22s period
      lfoGain.gain.setValueAtTime(110, now);    // Modulates cutoff ±110Hz (570Hz to 790Hz)
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.lfoOsc = lfo;
      this.lfoGain = lfoGain;

      // 4. Harmonic Space Pad Voices:
      // Multi-layer warm chord with micro-detuning for lush stereo expansion
      const voices = [
        { freq: 110.00, vol: 0.38, type: 'sine' as OscillatorType, detune: -1.2 },    // A2 (Foundation)
        { freq: 110.00, vol: 0.28, type: 'triangle' as OscillatorType, detune: 1.8 }, // A2 (Warmth)
        { freq: 164.81, vol: 0.32, type: 'sine' as OscillatorType, detune: 2.1 },    // E3 (Fifth)
        { freq: 220.00, vol: 0.28, type: 'sine' as OscillatorType, detune: -1.8 },   // A3 (Octave)
        { freq: 261.63, vol: 0.20, type: 'triangle' as OscillatorType, detune: 1.0 }, // C4 (Minor Third)
        { freq: 329.63, vol: 0.16, type: 'sine' as OscillatorType, detune: 2.4 },    // E4 (Shimmer)
      ];

      this.droneOscillators = [];
      this.droneGains = [];

      voices.forEach((v) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = v.type;
        osc.frequency.setValueAtTime(v.freq, now);
        osc.detune.setValueAtTime(v.detune, now);

        // Individual voice gain
        oscGain.gain.setValueAtTime(v.vol, now);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);

        this.droneOscillators.push(osc);
        this.droneGains.push(oscGain);
      });

      // 5. Stardust Cosmic Noise Floor (gentle bandpass filtered texture)
      try {
        const sampleRate = ctx.sampleRate;
        const bufferSize = sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const data = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;

        // Pink noise filtering
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        this.noiseSource = noise;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(450, now);
        noiseFilter.Q.setValueAtTime(1.0, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.04, now);
        this.noiseGain = noiseGain;

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(now);
      } catch {}

      this.isPlayingAmbience = true;
    } catch {
      this.isPlayingAmbience = false;
    }
  }

  // ============================================================================
  // Kinetic Audio-Visual Modulation
  // Fast mouse movement or scrolling smoothly opens the filter
  // ============================================================================

  public onKineticDisturbance(speed: number) {
    if (!this.isEnabled || !this.isPlayingAmbience || !this.ctx || !this.ambientFilter) return;

    const now = this.ctx.currentTime;
    const clampedSpeed = Math.min(Math.max(speed, 0), 2.5);
    if (clampedSpeed < 0.06) return;

    if (now - this.lastKineticTime < 0.07) return;
    this.lastKineticTime = now;

    try {
      const targetFreq = 680 + clampedSpeed * 120;
      this.ambientFilter.frequency.cancelScheduledValues(now);
      this.ambientFilter.frequency.setValueAtTime(this.ambientFilter.frequency.value, now);
      this.ambientFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.09);
      this.ambientFilter.frequency.linearRampToValueAtTime(680, now + 0.85);
    } catch {}
  }

  public stopAmbience() {
    if (!this.isPlayingAmbience) return;
    try {
      if (this.masterGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

        setTimeout(() => {
          this.droneOscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.droneOscillators = [];
          this.droneGains = [];

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

          if (this.masterGain) {
            this.masterGain.disconnect();
            this.masterGain = null;
          }
          this.isPlayingAmbience = false;
        }, 550);
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
