import { useState } from 'react';
import { motion } from 'framer-motion';

interface WishFormProps {
  onWishSubmit: (wish: any) => void;
}

const WishForm: React.FC<WishFormProps> = ({ onWishSubmit }) => {
  const [wishText, setWishText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wishText.trim()) {
      const newWish = {
        id: Date.now().toString(),
        originalWish: wishText,
        timestamp: new Date().toISOString(),
      };
      onWishSubmit(newWish);
      setWishText('');
    }
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="wish" className="block text-lg font-medium mb-2 text-christmasGold">
            Your Christmas Wish ✨
          </label>
          <textarea
            id="wish"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            className="w-full h-32 p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmasGold focus:border-transparent"
            placeholder="Write your Christmas wish here... 🎅"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full py-3 px-6 bg-christmasRed hover:bg-red-700 text-white font-bold rounded-xl transition duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Send to Santa 🎅
        </motion.button>
      </form>
    </motion.div>
  );
};

export default WishForm;