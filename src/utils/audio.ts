'use client';

// ============================================================================
// Procedural Web Audio Engine: "COSMOS — Relaxing Universe Ambient Soundscape"
// Inspired by deep space ambient music (432Hz tuning, floating celestial pads,
// shimmering starlight bells, and gentle sub-bass nebula drones).
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis.
// Designed specifically for calm, focus, study, and work while navigating the site.
// ============================================================================

export interface AudioStatus {
  enabled: boolean;
  isPlaying: boolean;
  isSuspended: boolean;
}

interface CelestialChord {
  name: string;
  bassFreq: number; // Deep planetary root (Hz)
  subDroneFreq: number; // Sub-bass nebula rumble (Hz)
  padFrequencies: number[]; // Lush suspended space pad cluster (Hz)
  shimmerNotes: number[]; // High twinkling diamond star bells (Hz)
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(status: AudioStatus) => void> = new Set();
  private hasInitialized: boolean = false;

  // Master Audio Nodes
  private masterMusicGain: GainNode | null = null;
  private spaceFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedbackGain: GainNode | null = null;
  private delayFilter: BiquadFilterNode | null = null;

  // Active Voices for Crossfading
  private currentPadOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentBassOscs: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Musical Sequencer State
  private sequencerTimer: ReturnType<typeof setInterval> | null = null;
  private nextChordTime: number = 0;
  private chordIndex: number = 0;
  private lastKineticTime: number = 0;

  // 4-Chord Cosmic Journey: Cmaj9 -> Am9 -> Fmaj7#11 -> Gsus2
  // Floating, peaceful, zero-gravity harmony (A = 432Hz reference feel)
  private celestialChords: CelestialChord[] = [
    {
      name: 'Cmaj9 — Celestial Home',
      bassFreq: 65.41, // C2
      subDroneFreq: 32.70, // C1
      padFrequencies: [196.00, 246.94, 293.66, 329.63, 392.00], // G3, B3, D4, E4, G4
      shimmerNotes: [783.99, 987.77, 1174.66, 1318.51, 1567.98], // G5, B5, D6, E6, G6
    },
    {
      name: 'Am9 — Deep Nebula',
      bassFreq: 55.00, // A1
      subDroneFreq: 41.20, // E1
      padFrequencies: [164.81, 196.00, 246.94, 261.63, 329.63], // E3, G3, B3, C4, E4
      shimmerNotes: [659.25, 880.00, 987.77, 1046.50, 1318.51], // E5, A5, B5, C6, E6
    },
    {
      name: 'Fmaj7#11 — Galaxy Lydian Wonder',
      bassFreq: 43.65, // F1
      subDroneFreq: 65.41, // C2
      padFrequencies: [130.81, 164.81, 196.00, 246.94, 329.63], // C3, E3, G3, B3, E4
      shimmerNotes: [698.46, 880.00, 987.77, 1318.51, 1396.91], // F5, A5, B5, E6, F6
    },
    {
      name: 'Gsus2 — Infinite Horizon',
      bassFreq: 49.00, // G1
      subDroneFreq: 73.42, // D2
      padFrequencies: [146.83, 196.00, 220.00, 246.94, 293.66], // D3, G3, A3, B3, D4
      shimmerNotes: [587.33, 783.99, 880.00, 987.77, 1174.66], // D5, G5, A5, B5, D6
    },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      // Audio is ENABLED by default unless the user explicitly muted it previously
      this.isEnabled = saved !== 'false';
    }
  }

  /**
   * Initializes audio on client mount.
   * Attempts immediate autoplay, and attaches micro-interaction listeners.
   */
  public initAutoPlay() {
    if (typeof window === 'undefined' || this.hasInitialized) return;
    this.hasInitialized = true;

    const saved = localStorage.getItem('md_portfolio_audio');
    this.isEnabled = saved !== 'false';
    if (!this.isEnabled) return;

    // 1. Immediate unlock attempt
    const ctx = this.getContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (this.isEnabled && !this.isPlayingAmbience) {
            this.startAmbience();
          }
          this.notify();
        }).catch(() => {});
      } else if (!this.isPlayingAmbience) {
        this.startAmbience();
        this.notify();
      }
    }

    // 2. Comprehensive gesture unlock on ANY user action (mouse move, wheel, touch, click, scroll)
    const events = [
      'pointermove', 'mousemove', 'wheel', 'scroll', 'pointerdown',
      'mousedown', 'touchstart', 'touchend', 'keydown', 'click', 'focus'
    ];

    const cleanupUnlockListeners = () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, unlock, { capture: true } as any);
        document.removeEventListener(ev, unlock, { capture: true } as any);
      });
    };

    const unlock = () => {
      if (!this.isEnabled) return;
      const c = this.getContext();
      if (!c) return;

      if (c.state === 'suspended') {
        c.resume().then(() => {
          if (this.isEnabled && !this.isPlayingAmbience) {
            this.startAmbience();
          }
          this.notify();
          cleanupUnlockListeners();
        }).catch(() => {});
      } else if (!this.isPlayingAmbience) {
        this.startAmbience();
        this.notify();
        cleanupUnlockListeners();
      } else {
        cleanupUnlockListeners();
      }
    };

    events.forEach((ev) => {
      window.addEventListener(ev, unlock, { capture: true, passive: true });
      document.addEventListener(ev, unlock, { capture: true, passive: true });
    });
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

  public getStatus(): AudioStatus {
    const isPlaying = Boolean(
      this.isEnabled && this.isPlayingAmbience && this.ctx && this.ctx.state === 'running'
    );
    const isSuspended = Boolean(
      this.isEnabled && (!this.ctx || this.ctx.state === 'suspended' || !this.isPlayingAmbience)
    );
    return {
      enabled: this.isEnabled,
      isPlaying,
      isSuspended,
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((fn) => fn(status));
  }

  public subscribe(listener: (status: AudioStatus) => void): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    // If sound is enabled in preferences but suspended by the browser (waiting for user gesture):
    // Start it immediately on this click! Never switch to MUDO!
    if (this.isEnabled && (!this.isPlayingAmbience || this.ctx?.state !== 'running')) {
      const ctx = this.getContext();
      if (ctx) {
        ctx.resume().then(() => {
          this.startAmbience();
          this.playActivateChime();
          this.notify();
        }).catch(() => {
          this.startAmbience();
          this.notify();
        });
      }
      return true;
    }

    // Normal toggle when playing or explicitly muted
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
          this.notify();
        }).catch(() => {});
      } else {
        this.startAmbience();
        this.playActivateChime();
        this.notify();
      }
    } else {
      this.playDeactivateChime();
      this.stopAmbience();
      this.notify();
    }
  }

  // ============================================================================
  // UI Sound Effects (Tactile, High-Tech, Cybernetic Synthesis)
  // ============================================================================

  public playHover() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2.0, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  public playClick() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;

      // 1. Thump layer
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);

      // 2. High glass transient
      const pingOsc = ctx.createOscillator();
      const pingGain = ctx.createGain();
      pingOsc.type = 'sine';
      pingOsc.frequency.setValueAtTime(1760, now);
      pingOsc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      pingGain.gain.setValueAtTime(0.0001, now);
      pingGain.gain.linearRampToValueAtTime(0.06, now + 0.003);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      pingOsc.connect(pingGain);
      pingGain.connect(ctx.destination);
      pingOsc.start(now);
      pingOsc.stop(now + 0.05);
    } catch {}
  }

  public playTab() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04); // A5

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.055, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const pitches = [659.25, 830.61, 987.77];
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.045);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.045);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.045 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.29);
      });
    } catch {}
  }

  public playTerminalBeep() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1244.5, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playModalOpen() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const notes = [440, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.04 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.23);
      });
    } catch {}
  }

  public playModalClose() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const notes = [659.25, 440];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.035);
        gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.035 + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.17);
      });
    } catch {}
  }

  public playLanguageSwitch() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state !== 'running') return;
      const now = ctx.currentTime;

      const pitches = [587.33, 880];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.0001, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.05 + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.17);
      });
    } catch {}
  }

  private playActivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const pitches = [440.0, 554.37, 659.25, 880.0];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.0001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.29);
      });
    } catch {}
  }

  private playDeactivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const pitches = [659.25, 440.0];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.0001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.05, now + i * 0.06 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.17);
      });
    } catch {}
  }

  // ============================================================================
  // Procedural Deep Space Ambient Engine: "COSMOS — Relaxing Universe Images"
  // Calm, Meditative, Continuous Floating Pads with Twinkling Starlight Shimmer
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Master Ambient Bus with gentle 2.4s cinematic fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.22, now + 2.4);
      masterGain.connect(ctx.destination);
      this.masterMusicGain = masterGain;

      // 2. Cosmic Space Filter (smooth analog warmth at 1250Hz cutoff)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1250, now);
      filter.Q.setValueAtTime(0.75, now);
      filter.connect(masterGain);
      this.spaceFilter = filter;

      // 3. Ethereal Space Echo & Reverb Delay
      const delay = ctx.createDelay(2.0);
      delay.delayTime.setValueAtTime(0.45, now); // 450ms space delay
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.38, now); // 38% feedback
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1500, now);

      filter.connect(delay);
      delay.connect(delayFilter);
      delayFilter.connect(feedback);
      feedback.connect(delay);
      delay.connect(masterGain);

      this.delayNode = delay;
      this.delayFeedbackGain = feedback;
      this.delayFilter = delayFilter;

      this.isPlayingAmbience = true;
      this.chordIndex = 0;

      // Slow, meditative cycle: 8.5 seconds per chord with 3.2s crossfade
      const chordDuration = 8.5;
      this.nextChordTime = now + 0.1;

      // Start measure 0 immediately
      this.triggerCelestialChord(now, this.celestialChords[0], chordDuration);

      // Sequencer lookahead timer
      this.sequencerTimer = setInterval(() => {
        if (!this.isPlayingAmbience || !this.ctx) return;
        const currentCtxTime = this.ctx.currentTime;

        if (this.nextChordTime < currentCtxTime + 1.2) {
          this.chordIndex = (this.chordIndex + 1) % this.celestialChords.length;
          const nextChord = this.celestialChords[this.chordIndex];
          this.triggerCelestialChord(this.nextChordTime, nextChord, chordDuration);
          this.nextChordTime += chordDuration;
        }
      }, 300);

      this.notify();
    } catch {
      this.isPlayingAmbience = false;
      this.notify();
    }
  }

  /**
   * Triggers a continuous, warm floating celestial chord and schedules twinkling stars.
   */
  private triggerCelestialChord(time: number, chord: CelestialChord, duration: number) {
    if (!this.ctx || !this.spaceFilter) return;

    // Fade out previous pad voices gently over 3.2s
    const oldPads = [...this.currentPadOscs];
    const oldBass = [...this.currentBassOscs];
    this.currentPadOscs = [];
    this.currentBassOscs = [];

    oldPads.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 3.2);
        osc.stop(time + 3.3);
        setTimeout(() => osc.disconnect(), 3400);
      } catch {}
    });

    oldBass.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 2.8);
        osc.stop(time + 2.9);
        setTimeout(() => osc.disconnect(), 3000);
      } catch {}
    });

    // 1. Deep Nebula Sub-Bass Drone (Warm, round, vibration-free)
    try {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(chord.bassFreq, time);

      bassGain.gain.setValueAtTime(0.0001, time);
      bassGain.gain.linearRampToValueAtTime(0.18, time + 2.0);
      bassGain.gain.linearRampToValueAtTime(0.14, time + duration - 2.0);
      bassGain.gain.linearRampToValueAtTime(0.0001, time + duration + 3.0);

      bassOsc.connect(bassGain);
      bassGain.connect(this.spaceFilter);
      bassOsc.start(time);
      bassOsc.stop(time + duration + 3.0);

      this.currentBassOscs.push({ osc: bassOsc, gain: bassGain });

      // Sub-octave drone
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(chord.subDroneFreq, time);

      subGain.gain.setValueAtTime(0.0001, time);
      subGain.gain.linearRampToValueAtTime(0.10, time + 2.5);
      subGain.gain.linearRampToValueAtTime(0.0001, time + duration + 3.0);

      subOsc.connect(subGain);
      subGain.connect(this.spaceFilter);
      subOsc.start(time);
      subOsc.stop(time + duration + 3.0);

      this.currentBassOscs.push({ osc: subOsc, gain: subGain });
    } catch {}

    // 2. Lush Floating Celestial Space Pads (Roland Juno / CS-80 analog feel)
    chord.padFrequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.spaceFilter) return;
      try {
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();

        padOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        padOsc.frequency.setValueAtTime(freq, time);

        // Micro-chorus detuning (±2.8 cents) for widescreen analog space width
        const detuneValue = idx === 0 ? 0 : (idx % 2 === 0 ? 2.8 : -2.8);
        padOsc.detune.setValueAtTime(detuneValue, time);

        const targetVol = idx === 0 ? 0.07 : 0.048;
        padGain.gain.setValueAtTime(0.0001, time);
        padGain.gain.linearRampToValueAtTime(targetVol, time + 2.4);
        padGain.gain.linearRampToValueAtTime(targetVol * 0.85, time + duration - 1.5);
        padGain.gain.linearRampToValueAtTime(0.0001, time + duration + 3.2);

        padOsc.connect(padGain);
        padGain.connect(this.spaceFilter);
        padOsc.start(time);
        padOsc.stop(time + duration + 3.2);

        this.currentPadOscs.push({ osc: padOsc, gain: padGain });
      } catch {}
    });

    // 3. Twinkling Diamond Star Shimmer (Gentle celestial bells echoing in space)
    const shimmerOffsets = [1.2, 3.4, 5.2, 6.8];
    shimmerOffsets.forEach((offset, idx) => {
      const noteFreq = chord.shimmerNotes[idx % chord.shimmerNotes.length];
      this.triggerStarlightShimmer(time + offset, noteFreq);
    });
  }

  /**
   * Triggers a delicate crystalline starlight note echoing into the space delay.
   */
  private triggerStarlightShimmer(time: number, freq: number) {
    if (!this.ctx || !this.spaceFilter) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Very soft celestial starlight bell
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.025, time + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

      osc.connect(gain);
      gain.connect(this.spaceFilter);
      osc.start(time);
      osc.stop(time + 1.85);
    } catch {}
  }

  /**
   * Kinetic interaction: moving the mouse or scrolling smoothly opens the space filter.
   */
  public onKineticDisturbance(speed: number) {
    if (!this.isEnabled || !this.isPlayingAmbience || !this.ctx || !this.spaceFilter) return;

    const now = this.ctx.currentTime;
    const clampedSpeed = Math.min(Math.max(speed, 0), 2.5);
    if (clampedSpeed < 0.08) return;

    if (now - this.lastKineticTime < 0.08) return;
    this.lastKineticTime = now;

    try {
      const targetFreq = 1250 + clampedSpeed * 200;
      this.spaceFilter.frequency.cancelScheduledValues(now);
      this.spaceFilter.frequency.setValueAtTime(this.spaceFilter.frequency.value, now);
      this.spaceFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.15);
      this.spaceFilter.frequency.linearRampToValueAtTime(1250, now + 1.2);
    } catch {}
  }

  public stopAmbience() {
    if (!this.isPlayingAmbience) return;
    try {
      if (this.sequencerTimer) {
        clearInterval(this.sequencerTimer);
        this.sequencerTimer = null;
      }

      if (this.masterMusicGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.masterMusicGain.gain.cancelScheduledValues(now);
        this.masterMusicGain.gain.setValueAtTime(this.masterMusicGain.gain.value, now);
        this.masterMusicGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);

        setTimeout(() => {
          this.currentPadOscs.forEach(({ osc }) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.currentPadOscs = [];

          this.currentBassOscs.forEach(({ osc }) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.currentBassOscs = [];

          if (this.masterMusicGain) {
            this.masterMusicGain.disconnect();
            this.masterMusicGain = null;
          }
          this.isPlayingAmbience = false;
          this.notify();
        }, 650);
      } else {
        this.isPlayingAmbience = false;
        this.notify();
      }
    } catch {
      this.isPlayingAmbience = false;
      this.notify();
    }
  }
}

// Singleton global instance
export const soundManager = new AudioManager();
