// Procedural Web Audio API sound generator for the 3D playground game.
// Zero external audio files required — loads instantly and uses zero network bandwidth!

class GameAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineActive: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.engineGain) {
      this.engineGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // ── 1. Engine Sound (Continuous pitch-modulated oscillator) ─────────────────
  public startEngine() {
    if (this.engineActive || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = "sawtooth";
      this.engineOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      // Lowpass filter to give a warm engine hum rather than a harsh buzz
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.engineActive = true;
    } catch {
      // AudioContext might require direct user gesture
    }
  }

  public updateEngineSpeed(speedRatio: number) {
    if (!this.engineActive || !this.ctx || !this.engineOsc || !this.engineGain || this.isMuted) return;
    const clamped = Math.max(0, Math.min(1, Math.abs(speedRatio)));
    // Pitch rises from 45Hz idle to 180Hz full throttle
    const freq = 45 + clamped * 140;
    this.engineOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);

    // Subtle volume modulation
    const vol = 0.03 + clamped * 0.05;
    this.engineGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
  }

  public stopEngine() {
    if (!this.engineActive) return;
    try {
      this.engineOsc?.stop();
      this.engineOsc?.disconnect();
      this.engineGain?.disconnect();
    } catch {
      // Ignore
    }
    this.engineActive = false;
  }

  // ── 2. Car Horn (Dual-tone cheerful beep) ──────────────────────────────────
  public playHorn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";
    osc1.frequency.setValueAtTime(440, t); // A4
    osc2.frequency.setValueAtTime(554.37, t); // C#5 (Major third car horn)

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.35);
    osc2.stop(t + 0.35);
  }

  // ── 3. Crash / Impact Sound (Noise burst + low thud) ───────────────────────
  public playImpact(intensity: number = 0.5) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const clamped = Math.max(0.1, Math.min(1, intensity));

    // Thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.2);

    gain.gain.setValueAtTime(0.18 * clamped, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  // ── 4. Turbo Boost Sound (Rising slide) ────────────────────────────────────
  public playBoost() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.4);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.45);
  }

  // ── 5. Bowling Strike / Victory Fanfare ────────────────────────────────────
  public playStrike() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const noteTime = t + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.12, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }
}

export const gameAudio = new GameAudioEngine();
