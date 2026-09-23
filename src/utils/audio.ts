'use client';

// ============================================================================
// Procedural Web Audio Engine: Ambient Space Music + Sci-Fi SFX
// 100% Royalty-Free, Zero Network Latency, Pure Mathematical Web Audio Synthesis
// Real musical progression (chords + gentle arpeggiated melodies + warm bass)
// Calibrated for acoustic comfort and clear musicality on all speakers
// ============================================================================

interface MusicalChord {
  name: string;
  bass: number; // Hz
  padNotes: number[]; // Hz
  melodyPool: number[]; // Hz
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
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
  private currentBeat: number = 0;
  private currentChordIdx: number = 0;
  private lastKineticTime: number = 0;

  // 4-Chord Cinematic Space Progression (Dm9 -> Bbmaj7 -> Fmaj7 -> C/E)
  // Peaceful, inspiring, chill space music in 64 BPM
  private chords: MusicalChord[] = [
    {
      name: 'Dm9',
      bass: 73.42, // D2
      padNotes: [146.83, 174.61, 220.00, 261.63, 329.63], // D3, F3, A3, C4, E4
      melodyPool: [220.00, 261.63, 293.66, 329.63, 440.00, 523.25], // A3, C4, D4, E4, A4, C5
    },
    {
      name: 'Bbmaj7',
      bass: 58.27, // Bb1
      padNotes: [116.54, 174.61, 220.00, 293.66, 349.23], // Bb2, F3, A3, D4, F4
      melodyPool: [220.00, 293.66, 349.23, 440.00, 523.25, 587.33], // A3, D4, F4, A4, C5, D5
    },
    {
      name: 'Fmaj7',
      bass: 87.31, // F2
      padNotes: [130.81, 174.61, 220.00, 261.63, 329.63], // C3, F3, A3, C4, E4
      melodyPool: [261.63, 329.63, 349.23, 392.00, 440.00, 523.25], // C4, E4, F4, G4, A4, C5
    },
    {
      name: 'C/E',
      bass: 65.41, // C2
      padNotes: [130.81, 164.81, 196.00, 246.94, 293.66], // C3, E3, G3, B3, D4
      melodyPool: [246.94, 293.66, 329.63, 392.00, 493.88, 523.25], // B3, D4, E4, G4, B4, C5
    },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('md_portfolio_audio');
      this.isEnabled = saved === 'true';

      // Unlock AudioContext on first user interaction seamlessly
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
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
  // Procedural Space Ambient Music Engine (Real Musical Composition)
  // Generates genuine musical movement:
  // - Atmospheric pad chords that change every 4 measures
  // - Warm round bass notes supporting the harmony
  // - Relaxing, celestial Rhodes/synth-bell melodic arpeggios
  // ============================================================================

  public startAmbience() {
    if (this.isPlayingAmbience) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Master Music Bus Gain (smooth 1.5s fade-in to comfortable ~26% volume)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.26, now + 1.5);
      masterGain.connect(ctx.destination);
      this.masterMusicGain = masterGain;

      // 2. Warm Musical Filter (1100Hz cutoff allows melodic bells through softly)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(1.0, now);
      filter.connect(masterGain);
      this.musicFilter = filter;

      this.isPlayingAmbience = true;
      this.currentBeat = 0;
      this.currentChordIdx = 0;

      // Tempo: 64 BPM -> 1 beat = 0.9375 seconds
      const secondsPerBeat = 60 / 64;
      this.nextBeatTime = now + 0.1;

      // Start by playing the first chord immediately
      this.triggerChord(now, this.chords[0]);

      // Sequencer lookahead loop (checks every 50ms, schedules ahead by 200ms)
      this.sequencerTimer = setInterval(() => {
        if (!this.isPlayingAmbience || !this.ctx) return;
        const currentCtxTime = this.ctx.currentTime;

        while (this.nextBeatTime < currentCtxTime + 0.2) {
          this.scheduleBeat(this.nextBeatTime, this.currentBeat);
          this.nextBeatTime += secondsPerBeat;
          this.currentBeat = (this.currentBeat + 1) % 16; // 4 measures of 4 beats
        }
      }, 50);

    } catch {
      this.isPlayingAmbience = false;
    }
  }

  /**
   * Schedules rhythmic musical events on each beat.
   */
  private scheduleBeat(time: number, beat: number) {
    if (!this.ctx || !this.musicFilter) return;

    // A measure has 4 beats. Chord changes every 4 beats (1 measure per chord)
    const chordIndex = Math.floor(beat / 4);
    const isNewChord = beat % 4 === 0;
    const chord = this.chords[chordIndex % this.chords.length];

    // If starting a new measure, transition to the new chord pad & bass
    if (isNewChord) {
      this.triggerChord(time, chord);
    }

    // Play gentle melodic bell notes on beats 0, 1.5, 2, 3 (rhythmic musical pattern)
    // Beat 0: root melodic note
    // Beat 1: passing note
    // Beat 2: accent note
    // Beat 3: resolution note
    const melodyIndex = (beat * 2 + Math.floor(beat / 3)) % chord.melodyPool.length;
    const freq = chord.melodyPool[melodyIndex];

    // Only play on selected rhythmic accents to feel like a real relaxing melody, not busy noise
    if (beat % 2 === 0 || beat === 3) {
      this.triggerMelodyNote(time, freq);
    }

    // Occasional gentle eighth-note syncopation on beat 1.5
    if (beat === 1) {
      const syncoTime = time + (60 / 64) * 0.5;
      const syncoFreq = chord.melodyPool[(melodyIndex + 2) % chord.melodyPool.length];
      this.triggerMelodyNote(syncoTime, syncoFreq, 0.05);
    }
  }

  /**
   * Triggers a warm sustained pad chord and supporting bass.
   */
  private triggerChord(time: number, chord: MusicalChord) {
    if (!this.ctx || !this.musicFilter) return;

    // Fade out previous pad voices gently over 1.2s
    const oldPads = [...this.currentPadOscs];
    const oldBass = [...this.currentBassOsc];
    this.currentPadOscs = [];
    this.currentBassOsc = [];

    oldPads.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 1.2);
        osc.stop(time + 1.25);
        setTimeout(() => osc.disconnect(), 1300);
      } catch {}
    });

    oldBass.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, time + 0.8);
        osc.stop(time + 0.85);
        setTimeout(() => osc.disconnect(), 900);
      } catch {}
    });

    // 1. Warm Bass Note (Sine + subtle triangle)
    try {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(chord.bass, time);

      bassGain.gain.setValueAtTime(0.0001, time);
      bassGain.gain.linearRampToValueAtTime(0.24, time + 0.35);
      bassGain.gain.linearRampToValueAtTime(0.12, time + 2.5);
      bassGain.gain.linearRampToValueAtTime(0.0001, time + 3.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicFilter);
      bassOsc.start(time);
      bassOsc.stop(time + 3.8);

      this.currentBassOsc.push({ osc: bassOsc, gain: bassGain });
    } catch {}

    // 2. Swelling Pad Chord (Soft Sine Voices with micro-detune)
    chord.padNotes.forEach((noteFreq, idx) => {
      if (!this.ctx || !this.musicFilter) return;
      try {
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();

        padOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        padOsc.frequency.setValueAtTime(noteFreq, time);
        padOsc.detune.setValueAtTime(idx === 0 ? 0 : (idx % 2 === 0 ? 1.8 : -1.8), time);

        const targetVol = idx === 0 ? 0.16 : 0.11;
        padGain.gain.setValueAtTime(0.0001, time);
        padGain.gain.linearRampToValueAtTime(targetVol, time + 1.0);
        padGain.gain.linearRampToValueAtTime(targetVol * 0.8, time + 3.0);
        padGain.gain.linearRampToValueAtTime(0.0001, time + 3.9);

        padOsc.connect(padGain);
        padGain.connect(this.musicFilter);
        padOsc.start(time);
        padOsc.stop(time + 3.9);

        this.currentPadOscs.push({ osc: padOsc, gain: padGain });
      } catch {}
    });
  }

  /**
   * Triggers a sweet, warm synth bell / Rhodes melodic note.
   */
  private triggerMelodyNote(time: number, freq: number, volume: number = 0.08) {
    if (!this.ctx || !this.musicFilter) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Sweet percussive bell envelope: quick 10ms attack, gentle 700ms decay
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.75);

      osc.connect(gain);
      gain.connect(this.musicFilter);

      osc.start(time);
      osc.stop(time + 0.75);
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
      const targetFreq = 1100 + clampedSpeed * 150;
      this.musicFilter.frequency.cancelScheduledValues(now);
      this.musicFilter.frequency.setValueAtTime(this.musicFilter.frequency.value, now);
      this.musicFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);
      this.musicFilter.frequency.linearRampToValueAtTime(1100, now + 0.9);
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
