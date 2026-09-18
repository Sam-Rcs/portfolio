// Procedural Japanese Zen Audio Engine using Web Audio API
// 0KB external audio assets required. Instant load, pure synthesis.

class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private isPlayingAmbience: boolean = false;
  private melodyInterval: NodeJS.Timeout | null = null;

  // Traditional Japanese Hirajōshi pentatonic scale (A minor pentatonic flavor: A, B, C, E, F)
  private readonly hirajoshiScale = [
    220.00, // A3
    246.94, // B3
    261.63, // C4
    329.63, // E4
    349.23, // F4
    440.00, // A4
    493.88, // B4
    523.25, // C5
    659.25, // E5
    698.46, // F5
    880.00, // A5
  ];

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }

    if (!this.isMuted && !this.isPlayingAmbience) {
      this.startAmbience();
    } else if (this.isMuted) {
      this.stopAmbience();
    }

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // ── Traditional Koto Pluck Note Synthesis ─────────────────────────────────
  public playKotoNote(freq?: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const chosenFreq = freq || this.hirajoshiScale[Math.floor(Math.random() * this.hirajoshiScale.length)];
    const now = this.ctx.currentTime;

    // Dual oscillator for rich plucked resonance
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = "triangle";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(chosenFreq, now);
    osc2.frequency.setValueAtTime(chosenFreq * 2, now); // Harmonic overtone

    // Sharp pluck attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.06, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 2.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.9);
    osc2.stop(now + 2.9);
  }

  // ── Japanese Bamboo Wind Chime (Fūrin) ───────────────────────────────────
  public playWindChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const chimePitches = [1174.66, 1318.51, 1567.98, 1760.0, 2093.0];
    const now = this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const pitch = chimePitches[Math.floor(Math.random() * chimePitches.length)];
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(pitch, now + i * 0.12);

      chimeGain.gain.setValueAtTime(0.001, now + i * 0.12);
      chimeGain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.12 + 0.01);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 3.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chimeOsc.start(now + i * 0.12);
      chimeOsc.stop(now + i * 0.12 + 3.3);
    }
  }

  // ── Temple Bell / Gong Resonance (Singing Bowl) ───────────────────────────
  public playTempleBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = 220; // A3

    [1, 1.5, 2.01, 2.76, 3.42].forEach((ratio, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      const amp = 0.22 / (idx + 1);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(amp, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.6);
    });
  }

  // ── Soft Footstep on Gravel Path ──────────────────────────────────────────
  public playFootstep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800 + Math.random() * 250, now);
    filter.Q.setValueAtTime(1.2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  // ── Ambient Zen Wind & Gentle Melodic Loop ────────────────────────────────
  public startAmbience() {
    this.isPlayingAmbience = true;
    this.initContext();

    // Play initial temple chime
    setTimeout(() => this.playTempleBell(), 300);

    // Schedule gentle koto note every 2.5 - 5 seconds
    if (this.melodyInterval) clearInterval(this.melodyInterval);
    this.melodyInterval = setInterval(() => {
      if (!this.isMuted) {
        if (Math.random() < 0.7) {
          this.playKotoNote();
        } else {
          this.playWindChime();
        }
      }
    }, 3200);
  }

  public stopAmbience() {
    this.isPlayingAmbience = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }
}

export const zenAudio = new ZenAudioEngine();
