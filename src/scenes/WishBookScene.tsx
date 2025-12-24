import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WishBookSceneProps {
  onSubmit: (wish: string) => void;
}

export function WishBookScene({ onSubmit }: WishBookSceneProps) {
  const [wish, setWish] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      setIsClosing(true);
      setTimeout(() => {
        onSubmit(wish);
      }, 800);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-96 h-80 bg-gradient-to-r from-red-700 to-red-900 rounded-lg shadow-2xl p-6 relative overflow-hidden"
        animate={{ 
          rotateY: isClosing ? [0, -90] : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        {/* Book cover design */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-800 to-red-950 opacity-50"></div>
        
        {/* Christmas decoration */}
        <div className="absolute top-4 left-4 text-2xl">🎄</div>
        <div className="absolute top-4 right-4 text-2xl">🎅</div>
        <div className="absolute bottom-4 left-4 text-2xl">🎁</div>
        <div className="absolute bottom-4 right-4 text-2xl">❄️</div>
        
        {/* Book spine */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-amber-800 to-amber-900"></div>
        
        {/* Book content */}
        <div className="relative z-10 h-full flex flex-col">
          <h2 className="text-xl font-bold text-white text-center mb-4">Christmas Wish Book</h2>
          
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              className="flex-1 w-full p-4 bg-white/20 text-white rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-christmasGold resize-none"
              placeholder="Write your Christmas wish here..."
              required
            />
            
            <motion.button
              type="submit"
              className="mt-4 py-2 px-4 bg-christmasGold text-christmasRed font-bold rounded hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              This is my wish ✨
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}