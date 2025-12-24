import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SantaDialogueProps {
  wish: string;
}

const SantaDialogue: React.FC<SantaDialogueProps> = ({ wish }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  // Generate a humorous or serious response based on the wish
  const generateSantaResponse = (userWish: string): string => {
    const wishLower = userWish.toLowerCase();
    
    // Check for keywords to determine response type
    if (wishLower.includes('money') || wishLower.includes('cash') || wishLower.includes('rich')) {
      return "Ho ho ho! A money wish, eh? Well, I've got some coal for you... just kidding! 😄";
    } else if (wishLower.includes('love') || wishLower.includes('relationship') || wishLower.includes('kiss')) {
      return "Ho ho ho! Love wishes are my favorite! I'll wrap it up with some extra care! 💕";
    } else if (wishLower.includes('health') || wishLower.includes('sick') || wishLower.includes('better')) {
      return "Ho ho ho! Health wishes are very important! I'll have my elves prepare some special Christmas medicine! 🌿";
    } else if (wishLower.includes('job') || wishLower.includes('work') || wishLower.includes('career')) {
      return "Ho ho ho! A career wish! I'll make sure my reindeer deliver your resume to the right people! 🦌";
    } else if (wishLower.includes('gift') || wishLower.includes('present')) {
      return "Ho ho ho! Another gift wish! Don't worry, I've been taking notes since December 25th last year! 🎁";
    } else if (wishLower.includes('fun') || wishLower.includes('party') || wishLower.includes('travel')) {
      return "Ho ho ho! A fun wish! My elves are already planning your itinerary! 🎉";
    } else {
      // Random humorous or serious response
      const responses = [
        "Ho ho ho! That's a unique wish! I'll put it at the top of my list! 🎄",
        "Ho ho ho! Interesting! My elves are taking notes faster than you can say 'Merry Christmas'! 📝",
        "Ho ho ho! That wish made my beard tingle! The magic is strong with this one! ✨",
        "Ho ho ho! I've heard many wishes, but yours is special! Keep the Christmas spirit alive! 🌟",
        "Ho ho ho! Your wish made the North Pole feel a little warmer! Thanks for the holiday cheer! 🔥",
        "Ho ho ho! I'll need to check my special wish database for this one! 🗂️",
        "Ho ho ho! This wish is so good, even the reindeer are impressed! 🦌",
        "Ho ho ho! Your wish is as bright as the star on my Christmas tree! ⭐"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };
  
  const fullText = `Ho ho ho! I heard your wish 🎄\n${generateSantaResponse(wish)}`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Typing speed: 100ms per character

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, fullText]);

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl mb-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-start">
        <div className="text-5xl mr-4">🎅</div>
        <div className="flex-1">
          <div className="text-xl md:text-2xl font-medium text-white mb-2">
            {currentText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="ml-1"
              >
                |
              </motion.span>
            )}
          </div>
          {!isTyping && (
            <motion.div
              className="mt-4 text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I've listened carefully, and your wish truly warmed my heart.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SantaDialogue;