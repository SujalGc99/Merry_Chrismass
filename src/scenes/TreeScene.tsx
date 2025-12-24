import { motion } from 'framer-motion';
import { useState } from 'react';

interface TreeSceneProps {
  onStart: () => void;
}

export function TreeScene({ onStart }: TreeSceneProps) {
  const [treeClicked, setTreeClicked] = useState(false);
  
  const handleClick = () => {
    setTreeClicked(true);
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: treeClicked ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Christmas Tree */}
        <div className="relative">
          {/* Tree layers */}
          <div className="w-48 h-16 bg-green-700 rounded-t-full mb-[-8px] ml-12"></div>
          <div className="w-56 h-20 bg-green-800 rounded-t-full mb-[-10px] ml-8"></div>
          <div className="w-64 h-24 bg-green-900 rounded-t-full ml-4"></div>
          
          {/* Tree trunk */}
          <div className="w-8 h-12 bg-amber-800 mx-auto -mt-4"></div>
          
          {/* Tree topper */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center z-10">
            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
          </div>
          
          {/* Lights */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${30 + Math.random() * 40}%`,
                backgroundColor: i % 3 === 0 ? 'red' : i % 3 === 1 ? 'blue' : 'yellow'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        {/* Gifts */}
        <div className="flex justify-center mt-8 space-x-6">
          <div className="w-12 h-12 bg-red-600 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-800 rounded-full"></div>
          </div>
          <div className="w-12 h-12 bg-blue-600 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-800 rounded-full"></div>
          </div>
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-3xl font-bold text-white mt-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Welcome! Tap the tree to make a Christmas wish 🎄
      </motion.h2>
    </motion.div>
  );
}