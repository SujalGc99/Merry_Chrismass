// Sound utility for Christmas Wish Exchange
export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private isAudioEnabled: boolean = false;
  
  private constructor() {
    // Audio context will be initialized on user interaction
  }
  
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }
  
  // Initialize audio context on user interaction
  public initAudio = () => {
    if (!this.audioContext && typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext)();
      this.isAudioEnabled = true;
    } else if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      this.isAudioEnabled = true;
    }
  };
  
  // Play sleigh bells sound
  public playSleighBells = () => {
    if (!this.isAudioEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    // Create a bell-like sound with harmonics
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.5);
  };
  
  // Play "Ho Ho Ho" sound
  public playHoHoHo = () => {
    if (!this.isAudioEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    // Create a jolly sound
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.4);
  };
  
  // Play Christmas jingle sound
  public playJingle = () => {
    if (!this.isAudioEnabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    // Create a short jingle
    oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
    oscillator.frequency.setValueAtTime(1046.50, this.audioContext.currentTime + 0.3); // C6
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.5);
  };
}