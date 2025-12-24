import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SantaDialogue from './SantaDialogue';
import SantaNotePanel from './SantaNotePanel';
import { SoundManager } from '../utils/sound';

interface SantaEntranceProps {
  wish: string;
}

const SantaEntrance: React.FC<SantaEntranceProps> = ({ wish }) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const [showNotePanel, setShowNotePanel] = useState(false);

  useEffect(() => {
    // Play Santa's entrance after a delay
    const entranceTimer = setTimeout(() => {
      const soundManager = SoundManager.getInstance();
      soundManager.playHoHoHo();
    }, 1000);

    // Show dialogue after entrance
    const dialogueTimer = setTimeout(() => {
      setShowDialogue(true);
    }, 2000);

    // Show note panel after dialogue
    const noteTimer = setTimeout(() => {
      setShowNotePanel(true);
    }, 6000);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(dialogueTimer);
      clearTimeout(noteTimer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Santa Entrance Animation */}
      <motion.div 
        className="flex justify-center items-center my-12"
        initial={{ x: -1000, scale: 0.5 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ 
          duration: 3, 
          ease: "easeInOut",
          scale: {
            duration: 2,
            ease: "easeOut"
          }
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-9xl"
        >
          🎅
        </motion.div>
      </motion.div>

      {/* Santa Dialogue */}
      {showDialogue && (
        <SantaDialogue wish={wish} />
      )}

      {/* Santa Note Panel */}
      {showNotePanel && (
        <SantaNotePanel wish={wish} />
      )}
    </div>
  );
};

export default SantaEntrance;