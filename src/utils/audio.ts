'use client';

// ============================================================================
// Procedural Web Audio Engine: Hans Zimmer "Interstellar" Cathedral Organ & Ostinato
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis
// Composed 4-measure Interstellar theme (Am -> F -> C -> G) in 68 BPM
// Authentic Temple Church pipe organ timbre, hypnotic ticking ostinato, Gargantua bass
// ============================================================================

export interface AudioStatus {
  enabled: boolean;
  isPlaying: boolean;
  isSuspended: boolean;
}

interface MusicalChord {
  name: string;
  bassFreq: number; // Low pedal tone (Hz)
  subBassFreq: number; // Sub-octave Gargantua rumble (Hz)
  organPipes: number[]; // Cathedral pipe cluster (Hz)
  arpeggioNotes: number[]; // 8-pulse hypnotic ostinato notes (Hz)
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(status: AudioStatus) => void> = new Set();

  // Master Audio Nodes
  private masterMusicGain: GainNode | null = null;
  private musicFilter: BiquadFilterNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedbackGain: GainNode | null = null;
  private delayFilter: BiquadFilterNode | null = null;

  // Active Voices
  private currentPadOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentBassOsc: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Musical Sequencer State
  private sequencerTimer: ReturnType<typeof setInterval> | null = null;
  private nextBeatTime: number = 0;
  private currentStep: number = 0; // 32 sixteenth-subdivisions per loop (4 measures x 8 pulses)
  private lastKineticTime: number = 0;

  // Hans Zimmer Interstellar Chord Progression: Am -> F -> C -> G
  private chords: MusicalChord[] = [
    {
      name: 'Am',
      bassFreq: 55.00, // A1
      subBassFreq: 27.50, // A0 (Gargantua sub-drone)
      organPipes: [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4
      arpeggioNotes: [659.25, 440.00, 523.25, 659.25, 880.00, 659.25, 523.25, 659.25], // E5, A4, C5, E5, A5, E5, C5, E5
    },
    {
      name: 'F',
      bassFreq: 43.65, // F1
      subBassFreq: 43.65, // F1
      organPipes: [87.31, 130.81, 174.61, 220.00, 261.63], // F2, C3, F3, A3, C4
      arpeggioNotes: [698.46, 440.00, 523.25, 698.46, 880.00, 698.46, 523.25, 698.46], // F5, A4, C5, F5, A5, F5, C5, F5
    },
    {
      name: 'C',
      bassFreq: 65.41, // C2
      subBassFreq: 32.70, // C1
      organPipes: [98.00, 130.81, 164.81, 196.00, 261.63], // G2, C3, E3, G3, C4
      arpeggioNotes: [659.25, 392.00, 523.25, 659.25, 783.99, 659.25, 523.25, 659.25], // E5, G4, C5, E5, G5, E5, C5, E5
    },
    {
      name: 'G',
      bassFreq: 49.00, // G1
      subBassFreq: 41.20, // E1
      organPipes: [98.00, 146.83, 196.00, 246.94, 293.66], // G2, D3, G3, B3, D4
      arpeggioNotes: [587.33, 392.00, 493.88, 587.33, 783.99, 587.33, 493.88, 587.33], // D5, G4, B4, D5, G5, D5, B4, D5
    },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      // Sound is ENABLED by default unless user explicitly chose to mute ('false')
      this.isEnabled = saved !== 'false';

      // Setup bulletproof gesture unlock on window and document
      this.setupGestureUnlock();
    }
  }

  private setupGestureUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (!this.isEnabled) return;
      const ctx = this.getContext();
      if (!ctx) return;

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
    };

    // Use capture phase so no DOM element can cancel or stop event propagation
    const events = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click'];
    events.forEach((ev) => {
      document.addEventListener(ev, unlock, { capture: true, passive: true });
      window.addEventListener(ev, unlock, { capture: true, passive: true });
    });

    // Immediate attempt if browser permits autoplay
    try {
      if (this.isEnabled) {
        unlock();
      }
    } catch {}
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
    // CRITICAL UX FIX: If audio is enabled but waiting for user gesture (suspended after F5):
    // Clicking the sound button MUST immediately start playback! Never switch to MUDO!
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
  // UI Sound Effects (Tactile, High-Tech, Sci-Fi Synthesis)
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

      // Elegant high-tech 3-note ascending chord (E5, G#5, B5)
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
        gain.gain.linearRampToValueAtTime(0.07, now + i * 0.06 + 0.02);
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
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.06 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.17);
      });
    } catch {}
  }

  // ============================================================================
  // Procedural Hans Zimmer "Interstellar" Cathedral Organ & Ostinato Engine
  // 68 BPM Tempo, 4-Chord Journey: Am -> F -> C -> G
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Master Ambient Bus with smooth 1.8s fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.24, now + 1.8);
      masterGain.connect(ctx.destination);
      this.masterMusicGain = masterGain;

      // 2. Cathedral Lowpass Filter (warm pipe acoustic atmosphere)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1450, now);
      filter.Q.setValueAtTime(0.9, now);
      filter.connect(masterGain);
      this.musicFilter = filter;

      // 3. Cathedral Spatial Echo / Delay Network
      const delay = ctx.createDelay(1.5);
      delay.delayTime.setValueAtTime(0.35, now); // ~350ms cathedral echo
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.32, now); // 32% feedback decay
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1600, now);

      filter.connect(delay);
      delay.connect(delayFilter);
      delayFilter.connect(feedback);
      feedback.connect(delay);
      delay.connect(masterGain);

      this.delayNode = delay;
      this.delayFeedbackGain = feedback;
      this.delayFilter = delayFilter;

      this.isPlayingAmbience = true;
      this.currentStep = 0;

      // 68 BPM -> 1 beat = 0.882 seconds. 8 ostinato pulses per chord (0.441s each)
      const secondsPerPulse = (60 / 68) / 2; // 0.441s per 8th note
      this.nextBeatTime = now + 0.1;

      // Immediately trigger first chord (Am)
      this.triggerInterstellarChord(now, this.chords[0]);

      // Sequencer lookahead timer
      this.sequencerTimer = setInterval(() => {
        if (!this.isPlayingAmbience || !this.ctx) return;
        const currentCtxTime = this.ctx.currentTime;

        while (this.nextBeatTime < currentCtxTime + 0.3) {
          this.scheduleInterstellarStep(this.nextBeatTime, this.currentStep);
          this.nextBeatTime += secondsPerPulse;
          this.currentStep = (this.currentStep + 1) % 32; // 32 steps (4 chords x 8 pulses)
        }
      }, 40);

      this.notify();
    } catch {
      this.isPlayingAmbience = false;
      this.notify();
    }
  }

  /**
   * Schedules events for each 8th-note pulse of the Interstellar loop.
   */
  private scheduleInterstellarStep(time: number, step: number) {
    if (!this.ctx || !this.musicFilter) return;

    const chordIndex = Math.floor(step / 8) % this.chords.length;
    const pulseInChord = step % 8;
    const currentChord = this.chords[chordIndex];

    // Trigger full cathedral organ on the 1st pulse of each chord (downbeat)
    if (pulseInChord === 0) {
      this.triggerInterstellarChord(time, currentChord);
    }

    // Trigger hypnotic Hans Zimmer ticking arpeggio note on every pulse
    const noteFreq = currentChord.arpeggioNotes[pulseInChord];
    this.triggerOstinatoNote(time, noteFreq, pulseInChord);
  }

  /**
   * Triggers the grand Cathedral Pipe Organ voicing and Gargantua sub-bass.
   */
  private triggerInterstellarChord(time: number, chord: MusicalChord) {
    if (!this.ctx || !this.musicFilter) return;

    // Fade out previous organ voices gently over 1.4s
    const oldPads = [...this.currentPadOscs];
    const oldBass = [...this.currentBassOsc];
    this.currentPadOscs = [];
    this.currentBassOsc = [];

    oldPads.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 1.4);
        osc.stop(time + 1.45);
        setTimeout(() => osc.disconnect(), 1500);
      } catch {}
    });

    oldBass.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 1.0);
        osc.stop(time + 1.05);
        setTimeout(() => osc.disconnect(), 1100);
      } catch {}
    });

    // 1. Gargantua Deep Sub-Bass Pedal Tone (3.52s measure duration)
    try {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(chord.bassFreq, time);

      bassGain.gain.setValueAtTime(0.0001, time);
      bassGain.gain.linearRampToValueAtTime(0.22, time + 0.4);
      bassGain.gain.linearRampToValueAtTime(0.14, time + 2.5);
      bassGain.gain.linearRampToValueAtTime(0.0001, time + 3.5);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicFilter);
      bassOsc.start(time);
      bassOsc.stop(time + 3.5);

      this.currentBassOsc.push({ osc: bassOsc, gain: bassGain });

      // Sub-octave drone
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(chord.subBassFreq, time);

      subGain.gain.setValueAtTime(0.0001, time);
      subGain.gain.linearRampToValueAtTime(0.12, time + 0.6);
      subGain.gain.linearRampToValueAtTime(0.0001, time + 3.5);

      subOsc.connect(subGain);
      subGain.connect(this.musicFilter);
      subOsc.start(time);
      subOsc.stop(time + 3.5);

      this.currentBassOsc.push({ osc: subOsc, gain: subGain });
    } catch {}

    // 2. Temple Church Pipe Organ Cluster (8' Flute + 4' Principal harmonics)
    chord.organPipes.forEach((freq, idx) => {
      if (!this.ctx || !this.musicFilter) return;
      try {
        const pipeOsc = this.ctx.createOscillator();
        const pipeGain = this.ctx.createGain();

        // Alternating Sine (Flute 8') and Triangle (Principal 4')
        pipeOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        pipeOsc.frequency.setValueAtTime(freq, time);

        // Subtle pipe chorus detune (-2 cents / +2 cents)
        const detuneValue = idx === 0 ? 0 : (idx % 2 === 0 ? 2.5 : -2.5);
        pipeOsc.detune.setValueAtTime(detuneValue, time);

        const targetVol = idx === 0 ? 0.08 : 0.055;
        pipeGain.gain.setValueAtTime(0.0001, time);
        pipeGain.gain.linearRampToValueAtTime(targetVol, time + 0.7);
        pipeGain.gain.linearRampToValueAtTime(targetVol * 0.8, time + 2.6);
        pipeGain.gain.linearRampToValueAtTime(0.0001, time + 3.5);

        pipeOsc.connect(pipeGain);
        pipeGain.connect(this.musicFilter);
        pipeOsc.start(time);
        pipeOsc.stop(time + 3.5);

        this.currentPadOscs.push({ osc: pipeOsc, gain: pipeGain });
      } catch {}
    });
  }

  /**
   * Triggers a single pulse of the Hans Zimmer Interstellar arpeggio ostinato.
   */
  private triggerOstinatoNote(time: number, freq: number, pulseIndex: number) {
    if (!this.ctx || !this.musicFilter) return;
    try {
      // 1. Primary Reed / Bell Organ Note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = pulseIndex % 4 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      // Accent downbeats slightly for that driving, galloping Interstellar clockwork feel
      const isAccent = pulseIndex === 0 || pulseIndex === 4;
      const noteVol = isAccent ? 0.075 : 0.05;

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(noteVol, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.42);

      osc.connect(gain);
      gain.connect(this.musicFilter);
      osc.start(time);
      osc.stop(time + 0.43);

      // 2. High Shimmer Harmonics (octave harmonic for ethereal cathedral space)
      if (isAccent) {
        const shimmerOsc = this.ctx.createOscillator();
        const shimmerGain = this.ctx.createGain();

        shimmerOsc.type = 'sine';
        shimmerOsc.frequency.setValueAtTime(freq * 2, time);

        shimmerGain.gain.setValueAtTime(0.0001, time);
        shimmerGain.gain.linearRampToValueAtTime(0.02, time + 0.02);
        shimmerGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

        shimmerOsc.connect(shimmerGain);
        shimmerGain.connect(this.musicFilter);
        shimmerOsc.start(time);
        shimmerOsc.stop(time + 0.29);
      }
    } catch {}
  }

  /**
   * Kinetic interaction: moving the mouse or scrolling opens the cathedral filter swell.
   */
  public onKineticDisturbance(speed: number) {
    if (!this.isEnabled || !this.isPlayingAmbience || !this.ctx || !this.musicFilter) return;

    const now = this.ctx.currentTime;
    const clampedSpeed = Math.min(Math.max(speed, 0), 2.5);
    if (clampedSpeed < 0.08) return;

    if (now - this.lastKineticTime < 0.08) return;
    this.lastKineticTime = now;

    try {
      const targetFreq = 1450 + clampedSpeed * 220;
      this.musicFilter.frequency.cancelScheduledValues(now);
      this.musicFilter.frequency.setValueAtTime(this.musicFilter.frequency.value, now);
      this.musicFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.12);
      this.musicFilter.frequency.linearRampToValueAtTime(1450, now + 0.9);
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
        this.masterMusicGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);

        setTimeout(() => {
          this.currentPadOscs.forEach(({ osc }) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.currentPadOscs = [];

          this.currentBassOsc.forEach(({ osc }) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.currentBassOsc = [];

          if (this.masterMusicGain) {
            this.masterMusicGain.disconnect();
            this.masterMusicGain = null;
          }
          this.isPlayingAmbience = false;
          this.notify();
        }, 450);
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
