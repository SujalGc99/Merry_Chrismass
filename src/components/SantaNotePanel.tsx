import { motion } from 'framer-motion';

interface SantaNotePanelProps {
  wish?: string;
}

const SantaNotePanel: React.FC<SantaNotePanelProps> = ({ wish }) => {
  // Generate a personalized message based on the wish
  const generatePersonalizedMessage = (userWish: string | undefined): string => {
    if (!userWish) {
      return "May your Christmas be filled with warmth, hope, and new beginnings.";
    }
    
    const wishLower = userWish.toLowerCase();
    
    if (wishLower.includes('money') || wishLower.includes('cash') || wishLower.includes('rich')) {
      return "Money may not buy happiness, but it can buy Christmas presents, and that's almost the same thing! 😄";
    } else if (wishLower.includes('love') || wishLower.includes('relationship') || wishLower.includes('kiss')) {
      return "Love is the greatest gift of all! Spread it like Christmas cheer! 💕";
    } else if (wishLower.includes('health') || wishLower.includes('sick') || wishLower.includes('better')) {
      return "A healthy body and mind are the best gifts I can give you! Stay well! 🌿";
    } else if (wishLower.includes('job') || wishLower.includes('work') || wishLower.includes('career')) {
      return "Success comes to those who believe in their dreams and work for them! Ho ho ho! 🎯";
    } else if (wishLower.includes('fun') || wishLower.includes('party') || wishLower.includes('travel')) {
      return "Life is more fun when you're having fun! Remember to enjoy every moment! 🎉";
    } else {
      return "May your Christmas be filled with warmth, hope, and new beginnings.";
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-christmasGold/30 to-christmasRed/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-christmasGold shadow-2xl max-w-3xl mx-auto"
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-christmasGold font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Santa's Best Wishes 🎄
        </motion.h2>
        
        <motion.div
          className="text-xl md:text-2xl text-white leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-4">
            {generatePersonalizedMessage(wish)}
          </p>
          <p className="mb-4">
            Believe in yourself, stay kind, and keep chasing your dreams.
          </p>
          <p className="mt-6 font-bold text-christmasGold">
            Ho ho ho! 🎅
          </p>
        </motion.div>
        
        <motion.div
          className="mt-8 text-lg text-white/80 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          With love and Christmas magic,<br />
          Santa & The Elves
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SantaNotePanel;