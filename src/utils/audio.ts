'use client';

// ============================================================================
// Procedural Web Audio Engine: Ambient Space Piano & Cinematic Neo-Classical
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis
// Composed 4-measure lyrical theme (Fmaj7 -> Am7 -> Cmaj7 -> Em7) in 58 BPM
// Warm felt-piano timbre with soft acoustic delay tails, zero ear fatigue
// ============================================================================

interface MusicalChord {
  name: string;
  bass: number; // Hz
  padNotes: number[]; // Hz
}

interface MelodicNote {
  beat: number; // 0 to 15.75
  freq: number; // Hz
  vol: number;
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private isPlayingAmbience: boolean = false;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  // Master Audio Nodes
  private masterMusicGain: GainNode | null = null;
  private musicFilter: BiquadFilterNode | null = null;
  private currentPadOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentBassOsc: { osc: OscillatorNode; gain: GainNode }[] = [];

  // Musical Sequencer State
  private sequencerTimer: ReturnType<typeof setInterval> | null = null;
  private nextBeatTime: number = 0;
  private currentStep: number = 0; // 16 beats loop
  private lastKineticTime: number = 0;

  // Lyrical 4-Chord Progression (Fmaj7 -> Am7 -> Cmaj7 -> Em7)
  private chords: MusicalChord[] = [
    {
      name: 'Fmaj7',
      bass: 87.31, // F2
      padNotes: [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4
    },
    {
      name: 'Am7',
      bass: 55.00, // A1
      padNotes: [164.81, 220.00, 261.63, 329.63], // E3, A3, C4, E4
    },
    {
      name: 'Cmaj7',
      bass: 65.41, // C2
      padNotes: [196.00, 246.94, 261.63, 329.63], // G3, B3, C4, E4
    },
    {
      name: 'Em7',
      bass: 82.41, // E2
      padNotes: [164.81, 196.00, 246.94, 293.66], // E3, G3, B3, D4
    },
  ];

  // Composed 16-beat Piano Melody Theme (emotional, cinematic, relaxing)
  private melodyTheme: MelodicNote[] = [
    // Measure 1: Fmaj7 — soulful opening
    { beat: 0.0, freq: 440.00, vol: 0.08 }, // A4
    { beat: 1.5, freq: 523.25, vol: 0.06 }, // C5
    { beat: 2.0, freq: 392.00, vol: 0.07 }, // G4
    { beat: 3.0, freq: 329.63, vol: 0.06 }, // E4

    // Measure 2: Am7 — introspective peak
    { beat: 4.0, freq: 659.25, vol: 0.08 }, // E5
    { beat: 5.5, freq: 587.33, vol: 0.06 }, // D5
    { beat: 6.0, freq: 523.25, vol: 0.07 }, // C5
    { beat: 7.0, freq: 440.00, vol: 0.06 }, // A4

    // Measure 3: Cmaj7 — uplifting soaring hope
    { beat: 8.0, freq: 392.00, vol: 0.08 }, // G4
    { beat: 9.5, freq: 493.88, vol: 0.06 }, // B4
    { beat: 10.0, freq: 587.33, vol: 0.07 }, // D5
    { beat: 11.0, freq: 659.25, vol: 0.07 }, // E5

    // Measure 4: Em7 — cascading resolution
    { beat: 12.0, freq: 493.88, vol: 0.08 }, // B4
    { beat: 13.0, freq: 392.00, vol: 0.07 }, // G4
    { beat: 14.0, freq: 329.63, vol: 0.06 }, // E4
    { beat: 15.0, freq: 293.66, vol: 0.05 }, // D4
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      // Audio is ENABLED by default unless the user explicitly muted it previously
      this.isEnabled = saved !== 'false';

      const unlockAudio = () => {
        if (!this.isEnabled) return;
        const ctx = this.getContext();
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume().then(() => {
              if (this.isEnabled && !this.isPlayingAmbience) {
                this.startAmbience();
              }
            }).catch(() => {});
          } else if (!this.isPlayingAmbience) {
            this.startAmbience();
          }
        }
      };

      // Attempt immediate unlock in case browser policy allows autoplay
      try {
        if (this.isEnabled) {
          unlockAudio();
        }
      } catch {}

      // Attach user gesture listeners to unlock and start playback seamlessly
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('scroll', unlockAudio, { passive: true });
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
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
  // UI Sound Effects (Tactile, High-Tech, Pleasant Sci-Fi Synthesis)
  // ============================================================================

  public playHover() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

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

  public playClick() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.07);

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.linearRampToValueAtTime(0.0001, now + 0.07);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

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

  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

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

  private playActivateChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

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
  // Procedural Cinematic Space Piano Engine (58 BPM Relaxing Track)
  // Composed theme with soft felt piano notes, space echo tails, and warm pads
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Master Music Bus (smooth 1.6s fade-in)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.28, now + 1.6);
      masterGain.connect(ctx.destination);
      this.masterMusicGain = masterGain;

      // 2. Warm Piano / Felt Filter (1350Hz cutoff)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1350, now);
      filter.Q.setValueAtTime(0.85, now);
      filter.connect(masterGain);
      this.musicFilter = filter;

      this.isPlayingAmbience = true;
      this.currentStep = 0;

      // Tempo: 58 BPM -> 1 beat = 1.0345 seconds
      const secondsPerBeat = 60 / 58;
      this.nextBeatTime = now + 0.1;

      // Start measure 0 immediately
      this.triggerChord(now, this.chords[0]);

      // Sequencer lookahead loop
      this.sequencerTimer = setInterval(() => {
        if (!this.isPlayingAmbience || !this.ctx) return;
        const currentCtxTime = this.ctx.currentTime;

        while (this.nextBeatTime < currentCtxTime + 0.25) {
          this.scheduleMeasureEvents(this.nextBeatTime, this.currentStep);
          this.nextBeatTime += secondsPerBeat;
          this.currentStep = (this.currentStep + 1) % 16;
        }
      }, 45);

    } catch {
      this.isPlayingAmbience = false;
    }
  }

  /**
   * Schedules events for each beat of the 16-beat cycle.
   */
  private scheduleMeasureEvents(time: number, step: number) {
    if (!this.ctx || !this.musicFilter) return;

    // Chord changes every 4 beats
    if (step % 4 === 0) {
      const chordIndex = Math.floor(step / 4) % this.chords.length;
      this.triggerChord(time, this.chords[chordIndex]);
    }

    // Check for melodic notes in the theme at this step
    this.melodyTheme.forEach((note) => {
      if (Math.abs(note.beat - step) < 0.25) {
        this.triggerPianoNote(time, note.freq, note.vol);
      }
    });
  }

  /**
   * Triggers a warm sustained pad chord and supporting acoustic bass.
   */
  private triggerChord(time: number, chord: MusicalChord) {
    if (!this.ctx || !this.musicFilter) return;

    // Fade out previous pad voices gently over 1.4s
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

    // 1. Deep Round Acoustic Bass
    try {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(chord.bass, time);

      bassGain.gain.setValueAtTime(0.0001, time);
      bassGain.gain.linearRampToValueAtTime(0.24, time + 0.35);
      bassGain.gain.linearRampToValueAtTime(0.12, time + 2.8);
      bassGain.gain.linearRampToValueAtTime(0.0001, time + 4.1);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicFilter);
      bassOsc.start(time);
      bassOsc.stop(time + 4.1);

      this.currentBassOsc.push({ osc: bassOsc, gain: bassGain });
    } catch {}

    // 2. Ethereal Pad Chord
    chord.padNotes.forEach((freq, idx) => {
      if (!this.ctx || !this.musicFilter) return;
      try {
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();

        padOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        padOsc.frequency.setValueAtTime(freq, time);
        padOsc.detune.setValueAtTime(idx === 0 ? 0 : (idx % 2 === 0 ? 1.5 : -1.5), time);

        const targetVol = idx === 0 ? 0.14 : 0.09;
        padGain.gain.setValueAtTime(0.0001, time);
        padGain.gain.linearRampToValueAtTime(targetVol, time + 1.2);
        padGain.gain.linearRampToValueAtTime(targetVol * 0.75, time + 3.2);
        padGain.gain.linearRampToValueAtTime(0.0001, time + 4.1);

        padOsc.connect(padGain);
        padGain.connect(this.musicFilter);
        padOsc.start(time);
        padOsc.stop(time + 4.1);

        this.currentPadOscs.push({ osc: padOsc, gain: padGain });
      } catch {}
    });
  }

  /**
   * Triggers a warm felt-piano note with acoustic hammer overtone and dreamy space echo.
   */
  private triggerPianoNote(time: number, freq: number, volume: number = 0.08) {
    if (!this.ctx || !this.musicFilter) return;
    try {
      // Primary felt-piano tone (Sine fundamental)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Acoustic piano felt envelope: 25ms soft hammer attack, smooth 1.8s decay
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

      osc.connect(gain);
      gain.connect(this.musicFilter);
      osc.start(time);
      osc.stop(time + 1.8);

      // Subtle hammer overtone (triangle 1 octave up, quick 180ms decay)
      const overtoneOsc = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();

      overtoneOsc.type = 'triangle';
      overtoneOsc.frequency.setValueAtTime(freq * 2, time);

      overtoneGain.gain.setValueAtTime(0.0001, time);
      overtoneGain.gain.linearRampToValueAtTime(volume * 0.18, time + 0.015);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(this.musicFilter);
      overtoneOsc.start(time);
      overtoneOsc.stop(time + 0.22);

      // Dreamy space echo repeat (+380ms delay at 30% volume)
      const echoOsc = this.ctx.createOscillator();
      const echoGain = this.ctx.createGain();

      echoOsc.type = 'sine';
      echoOsc.frequency.setValueAtTime(freq, time + 0.38);

      echoGain.gain.setValueAtTime(0.0001, time + 0.38);
      echoGain.gain.linearRampToValueAtTime(volume * 0.28, time + 0.40);
      echoGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

      echoOsc.connect(echoGain);
      echoGain.connect(this.musicFilter);
      echoOsc.start(time + 0.38);
      echoOsc.stop(time + 1.6);

    } catch {}
  }

  /**
   * Kinetic interaction: moving the mouse or scrolling smoothly opens the music filter.
   */
  public onKineticDisturbance(speed: number) {
    if (!this.isEnabled || !this.isPlayingAmbience || !this.ctx || !this.musicFilter) return;

    const now = this.ctx.currentTime;
    const clampedSpeed = Math.min(Math.max(speed, 0), 2.5);
    if (clampedSpeed < 0.08) return;

    if (now - this.lastKineticTime < 0.08) return;
    this.lastKineticTime = now;

    try {
      const targetFreq = 1350 + clampedSpeed * 180;
      this.musicFilter.frequency.cancelScheduledValues(now);
      this.musicFilter.frequency.setValueAtTime(this.musicFilter.frequency.value, now);
      this.musicFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);
      this.musicFilter.frequency.linearRampToValueAtTime(1350, now + 0.9);
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
        this.masterMusicGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

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
