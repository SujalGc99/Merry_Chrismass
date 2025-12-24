import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SoundManager } from '../utils/sound';
import { analyzeWish } from '../ai/analyzeWish';

interface SantaSceneProps {
  wish: string;
  onProcessed: (result: { polishedWish: string; category: string; santaResponse: string }) => void;
}

export function SantaScene({ wish, onProcessed }: SantaSceneProps) {
  const [santaState, setSantaState] = useState<'idle' | 'reading' | 'reacting' | 'talking'>('idle');
  const [santaDialogue, setSantaDialogue] = useState('');
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const spriteX = useSpring(mouseX, springConfig);
  const spriteY = useSpring(mouseY, springConfig);
  
  // Update mouse position for Santa tracking
  useEffect(() => {
    if (!cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      
      // Calculate eye position relative to center of face
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const relX = (x - centerX) / (rect.width / 4); // Normalize to -2 to 2 range
      const relY = (y - centerY) / (rect.height / 4); // Normalize to -2 to 2 range
      
      setEyePosition({ x: relX, y: relY });
      setHeadRotation(relX * 5); // Head rotation based on X position
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Start the process when component mounts
  useEffect(() => {
    const processWish = async () => {
      setSantaState('reading');
      setSantaDialogue('Ho ho ho! I\'m reading your wish...');
      
      // Simulate reading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSantaState('reacting');
      setSantaDialogue('Interesting! Let me think...');
      
      // Analyze the wish using AI
      const result = await analyzeWish(wish);
      onProcessed(result);
      
      setSantaState('talking');
      setSantaDialogue(result.santaResponse);
      
      // Play Santa's response
      const soundManager = SoundManager.getInstance();
      soundManager.playHoHoHo();
    };
    
    processWish();
  }, [wish, onProcessed]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div 
        ref={cardRef}
        className="w-full max-w-2xl h-96 bg-gradient-to-br from-gray-900 to-black/[0.96] relative overflow-hidden rounded-2xl shadow-2xl border-2 border-christmasGold"
      >
        {/* Santa Character */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
            style={{ rotateY: headRotation }}
          >
            {/* Santa Body */}
            <div className="relative">
              {/* Santa Hat */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-red-600 rounded-full rounded-t-full"
                animate={santaState === 'reacting' ? { rotate: [0, -10, 0, 10, 0] } : {}}
                transition={{ duration: 1, repeat: santaState === 'reacting' ? Infinity : 0 }}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute top-4 -left-2 w-6 h-6 bg-red-600 rounded-full"></div>
                <div className="absolute top-2 -left-4 w-4 h-4 bg-red-600 rounded-full"></div>
              </motion.div>
              
              {/* Santa Face */}
              <div className="w-20 h-20 bg-white rounded-full relative z-10 flex items-center justify-center">
                {/* Eyes */}
                <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full">
                  <div 
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    style={{
                      transform: `translate(${eyePosition.x * 2}px, ${eyePosition.y * 2}px)`
                    }}
                  ></div>
                </div>
                <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full">
                  <div 
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    style={{
                      transform: `translate(${eyePosition.x * 2}px, ${eyePosition.y * 2}px)`
                    }}
                  ></div>
                </div>
                
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
                  animate={santaState === 'talking' ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
                  transition={{ duration: 1, repeat: santaState === 'talking' ? Infinity : 0 }}
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
              animate={santaState === 'reacting' ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 0.8, repeat: santaState === 'reacting' ? Infinity : 0 }}
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
        
        {/* Santa's Hand Gesture */}
        {santaState === 'reacting' && (
          <motion.div
            className="absolute top-20 right-20 text-4xl"
            animate={{ 
              rotate: [0, -20, 0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity
            }}
          >
            ✋
          </motion.div>
        )}
        
        {/* Magic Effect Particles */}
        {santaState === 'reacting' && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -40],
                  opacity: [1, 0],
                  scale: [1, 1.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Santa Dialogue */}
      <motion.div 
        className="mt-8 p-6 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start">
          <span className="text-3xl mr-3">🎅</span>
          <div className="flex-1">
            <p className="text-white text-lg">
              {santaDialogue}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}