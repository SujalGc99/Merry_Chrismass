import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SantaSceneProps {
  className?: string;
}

export function SantaScene({ className }: SantaSceneProps) {
  const [santaState, setSantaState] = useState<'idle' | 'waving' | 'talking'>('idle');
  
  useEffect(() => {
    // Randomly change Santa's state
    const interval = setInterval(() => {
      const states: Array<'idle' | 'waving' | 'talking'> = ['idle', 'waving', 'talking'];
      setSantaState(states[Math.floor(Math.random() * states.length)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <motion.div
        className="relative"
        animate={{ 
          y: [-5, 0, -5],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Santa Body */}
        <div className="relative">
          {/* Santa Hat */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-red-600 rounded-full rounded-t-full"
            animate={santaState === 'waving' ? { rotate: [0, -15, 0, 15, 0] } : {}}
            transition={{ duration: 1, repeat: santaState === 'waving' ? Infinity : 0 }}
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute top-4 -left-2 w-6 h-6 bg-red-600 rounded-full"></div>
            <div className="absolute top-2 -left-4 w-4 h-4 bg-red-600 rounded-full"></div>
          </motion.div>
          
          {/* Santa Face */}
          <div className="w-20 h-20 bg-white rounded-full relative z-10 flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full"></div>
            
            {/* Smile */}
            {santaState === 'talking' ? (
              <div className="absolute bottom-4 w-10 h-6 border-b-4 border-black rounded-b-full"></div>
            ) : (
              <div className="absolute bottom-4 w-8 h-4 border-b-2 border-black rounded-b-full"></div>
            )}
            
            {/* Rosy cheeks */}
            <div className="absolute top-8 left-1 w-4 h-4 bg-red-300 rounded-full"></div>
            <div className="absolute top-8 right-1 w-4 h-4 bg-red-300 rounded-full"></div>
          </div>
          
          {/* Santa Body */}
          <div className="w-24 h-28 bg-red-600 rounded-t-full relative -mt-4">
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-full"></div>
            
            {/* Arms */}
            <motion.div
              className="absolute -left-4 top-8 w-12 h-4 bg-red-600 rounded-full origin-right"
              animate={santaState === 'waving' ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
              transition={{ duration: 1, repeat: santaState === 'waving' ? Infinity : 0 }}
            ></motion.div>
            
            <div className="absolute -right-4 top-8 w-12 h-4 bg-red-600 rounded-full"></div>
            
            {/* Belt */}
            <div className="absolute bottom-8 left-0 right-0 h-4 bg-black flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Legs/Feet */}
          <div className="flex justify-between px-4 mt-1">
            <div className="w-8 h-6 bg-black rounded-b-full"></div>
            <div className="w-8 h-6 bg-black rounded-b-full"></div>
          </div>
        </div>
        
        {/* Santa's Sack */}
        <motion.div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-amber-900 rounded-b-full"
          animate={santaState === 'talking' ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 0.8, repeat: santaState === 'talking' ? Infinity : 0 }}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-amber-800 rounded-t-full"></div>
        </motion.div>
        
        {/* Talking Animation */}
        {santaState === 'talking' && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="text-2xl">💬</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}