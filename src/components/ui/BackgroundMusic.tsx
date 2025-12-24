import { useEffect, useState } from 'react';
import { AudioManager } from '../../utils/audioManager';

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioManager = AudioManager.getInstance();

  const togglePlayback = () => {
    if (isPlaying) {
      audioManager.stopAll();
      setIsPlaying(false);
    } else {
      audioManager.playMerryChristmas();
      setIsPlaying(true);
    }
  };

  // Initialize audio on user interaction
  useEffect(() => {
    // Only start music after user interaction
    const handleFirstInteraction = () => {
      audioManager.initAudio();
      audioManager.setVolume(0.3); // Set to 30% volume
      // Play the music automatically after initialization
      audioManager.playMerryChristmas();
      setIsPlaying(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audioManager]);

  return (
    <div className="fixed top-4 right-16 z-50">
      <button
        onClick={togglePlayback}
        className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
        aria-label={isPlaying ? "Pause Christmas music" : "Play Christmas music"}
      >
        {isPlaying ? '🎵' : '🔇'}
      </button>
    </div>
  );
}