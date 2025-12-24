import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface WishCardProps {
  wish: any;
}

const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  // Format the timestamp
  const formattedDate = wish.timestamp 
    ? format(new Date(wish.timestamp), 'MMM d, yyyy h:mm a') 
    : 'Just now';

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🎅</span>
          <h3 className="font-bold text-christmasGold">Santa's Reply</h3>
        </div>
        <span className="text-xs text-white/70">{formattedDate}</span>
      </div>
      
      <div className="mb-4">
        <p className="text-white italic enhanced-typing">"{wish.polishedWish}"</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-christmasRed/50 rounded-full text-sm">
          {wish.category}
        </span>
      </div>
      
      <div className="p-4 bg-black/20 rounded-lg border border-white/10 enhanced-typing">
        <p className="text-white">
          {wish.santaResponse}
        </p>
      </div>
    </motion.div>
  );
};

export default WishCard;