import { motion } from 'framer-motion';
import WishCard from './WishCard';

interface WishFeedProps {
  wishes: any[];
}

const WishFeed: React.FC<WishFeedProps> = ({ wishes }) => {
  if (wishes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-white/80">No wishes yet. Be the first to share your Christmas wish! 🎄</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {wishes.map((wish, index) => (
        <motion.div
          key={wish.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <WishCard wish={wish} />
        </motion.div>
      ))}
    </div>
  );
};

export default WishFeed;