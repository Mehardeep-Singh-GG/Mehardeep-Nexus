class NexusAudio {
  private ctx: AudioContext | null = null;

  private init() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn('AudioContext failed to initialize', e);
    }
  }

  playPing(freq = 440, type: OscillatorType = 'sine', duration = 0.1) {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Silent fail for audio
    }
  }

  playWarp() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 1.5);
      
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch (e) {
      // Silent fail
    }
  }

  playGlitch() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(Math.random() * 1000 + 500, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.setValueAtTime(0, this.ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Silent fail
    }
  }
}

export const nexusAudio = new NexusAudio();
