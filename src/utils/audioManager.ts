// Audio manager for Christmas Wish Exchange with files from utils folder
export class AudioManager {
  private static instance: AudioManager;
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private isAudioEnabled: boolean = false;
  private fallbackEnabled: boolean = true; // Enable fallback sounds if MP3s are missing

  private constructor() {
    // Try to preload audio files from utils folder, with fallback to generated sounds
    this.loadAudio('merry-christmas', '/src/utils/we-wish-you-a-merry-christmas-444573.mp3');
    this.loadAudio('ho-ho-ho', '/src/utils/hohoho.mp3');
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private loadAudio(id: string, src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'auto';
    
    // Check if the file exists by trying to load it
    audio.oncanplaythrough = () => {
      this.audioElements.set(id, audio);
      console.log(`${id} audio loaded successfully`);
    };
    
    audio.onerror = () => {
      console.warn(`${id} audio file not found, will use fallback`);
      // Don't add to the map if it fails to load
    };
    
    // Try to load the audio
    audio.load();
  }

  public initAudio = () => {
    this.isAudioEnabled = true;
  };

  public playMerryChristmas = () => {
    if (!this.isAudioEnabled) return;
    
    const audio = this.audioElements.get('merry-christmas');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {
        console.log('Merry Christmas audio play error:', e);
        // Fallback to generated sound if MP3 fails
        if (this.fallbackEnabled) {
          this.playMerryChristmasFallback();
        }
      });
    } else if (this.fallbackEnabled) {
      this.playMerryChristmasFallback();
    }
  };

  public playHoHoHo = () => {
    if (!this.isAudioEnabled) return;
    
    const audio = this.audioElements.get('ho-ho-ho');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {
        console.log('Ho Ho Ho audio play error:', e);
        // Fallback to generated sound if MP3 fails
        if (this.fallbackEnabled) {
          this.playHoHoHoFallback();
        }
      });
    } else if (this.fallbackEnabled) {
      this.playHoHoHoFallback();
    }
  };

  // Fallback sound generation
  private playMerryChristmasFallback = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      
      // Create a simple melody for "We Wish You a Merry Christmas"
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      let time = audioContext.currentTime;
      
      frequencies.forEach((freq, index) => {
        oscillator.frequency.setValueAtTime(freq, time + index * 0.2);
      });
      
      gainNode.gain.setValueAtTime(0.1, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(time + 0.8);
    } catch (e) {
      console.log('Could not play fallback audio:', e);
    }
  };

  private playHoHoHoFallback = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      
      // Create "Ho Ho Ho" sound
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.4);
      oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.5);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.6);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.8);
      oscillator.frequency.setValueAtTime(250, audioContext.currentTime + 0.9);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 1.0);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1.2);
    } catch (e) {
      console.log('Could not play fallback audio:', e);
    }
  };

  public stopAll = () => {
    this.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  public setVolume = (volume: number) => {
    this.audioElements.forEach(audio => {
      audio.volume = Math.max(0, Math.min(1, volume));
    });
  };
}