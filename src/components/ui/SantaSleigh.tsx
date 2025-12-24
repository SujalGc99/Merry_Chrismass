import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AudioManager } from '../../utils/audioManager';

interface SantaSleighProps {
  isActive: boolean;
  wish: string;
  onComplete: () => void;
}

export function SantaSleigh({ isActive, wish, onComplete }: SantaSleighProps) {
  const [santaState, setSantaState] = useState<'idle' | 'flying' | 'landing' | 'stepping_out' | 'processing' | 'celebrating' | 'returning' | 'departing'>('idle');
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [santaMouthOpen, setSantaMouthOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const audioManager = AudioManager.getInstance();
  
  // Control the animation sequence
  useEffect(() => {
    if (!isActive) {
      setSantaState('idle');
      return;
    }
    
    // Start the sequence
    setSantaState('flying');
    
    // Play sleigh bells during flight
    audioManager.playMerryChristmas();
    
    // After flying animation (4 seconds)
    const flyingTimer = setTimeout(() => {
      setSantaState('landing');
      
      // After landing animation (1 second)
      const landingTimer = setTimeout(() => {
        setSantaState('stepping_out');
        
        // After stepping out (1 second)
        const steppingTimer = setTimeout(() => {
          setSantaState('processing');
          
          // After processing (10 seconds)
          const processingTimer = setTimeout(() => {
            setSantaState('celebrating');
            audioManager.playHoHoHo();
            
            // After celebrating (2 seconds)
            const celebratingTimer = setTimeout(() => {
              setSantaState('returning');
              
              // After returning to sleigh (1 second)
              const returningTimer = setTimeout(() => {
                setSantaState('departing');
                
                // After departing (2 seconds)
                const departingTimer = setTimeout(() => {
                  setSantaState('idle');
                  onComplete();
                }, 2000);
                
                return () => clearTimeout(departingTimer);
              }, 1000);
              
              return () => clearTimeout(returningTimer);
            }, 2000);
            
            return () => clearTimeout(celebratingTimer);
          }, 10000);
          
          return () => clearTimeout(processingTimer);
        }, 1000);
        
        return () => clearTimeout(steppingTimer);
      }, 1000);
      
      return () => clearTimeout(landingTimer);
    }, 4000);
    
    return () => {
      clearTimeout(flyingTimer);
    };
  }, [isActive, onComplete, audioManager]);

  // Mouse tracking for Santa when in processing position
  useEffect(() => {
    if (!containerRef.current || (santaState !== 'processing' && santaState !== 'celebrating')) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      // Calculate eye position relative to center of face
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const relX = (x - centerX) / (rect.width / 4);
      const relY = (y - centerY) / (rect.height / 4);

      setEyePosition({ x: relX, y: relY });
      setHeadRotation(relX * 3);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, santaState]);

  // Mouth animation when celebrating
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (santaState === 'celebrating') {
      interval = setInterval(() => {
        setSantaMouthOpen(prev => !prev);
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [santaState]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
    >
      {/* Sleigh animation sequence - only show during flying, landing, stepping_out, returning, departing */}
      {(santaState === 'flying' || santaState === 'landing' || santaState === 'stepping_out' || santaState === 'returning' || santaState === 'departing') && (
        <motion.div
          className="relative"
          initial={{ x: '-50vw', y: '-50vh', scale: 0.1, opacity: 0 }}
          animate={{ 
            x: 
              santaState === 'flying' ? ['0vw', '25vw', '50vw', '75vw'] :
              santaState === 'landing' ? '50vw' :
              santaState === 'returning' ? '50vw' : 
              '100vw', // departing
            y: 
              santaState === 'flying' ? ['0vh', '-20vh', '-10vh', '0vh'] :
              santaState === 'landing' ? '10vh' : 
              santaState === 'returning' ? '10vh' : 
              '-50vh', // departing
            scale: 
              santaState === 'flying' ? [0.1, 0.3, 0.6, 0.8] :
              santaState === 'landing' ? [0.8, 1] : 
              santaState === 'returning' ? [1, 0.8] : 
              [0.8, 0.1], // departing
            opacity: 
              santaState === 'flying' ? [0, 0.5, 0.8, 1] :
              [1, 1, 0], // landing, returning, departing
            rotate: santaState === 'flying' ? [0, -5, 5, 0] : 0
          }}
          transition={{ 
            duration: 
              santaState === 'flying' ? 4 : 
              santaState === 'landing' ? 1 : 
              santaState === 'returning' ? 1 : 
              2, // departing
            ease: "easeInOut"
          }}
        >
          {/* Light path effect during flight */}
          {(santaState === 'flying' || santaState === 'returning') && (
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="text-5xl text-yellow-300 opacity-70">✨</div>
            </motion.div>
          )}
          
          {/* Sleigh */}
          <div className="w-48 h-24 relative">
            {/* Sleigh body */}
            <div className="absolute top-8 left-4 w-40 h-8 bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-full shadow-lg">
              <div className="absolute top-1 left-2 w-36 h-4 bg-gradient-to-r from-yellow-700 to-yellow-800 rounded-full"></div>
            </div>
            
            {/* Sleigh runners */}
            <div className="absolute top-16 left-2 w-44 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
            
            {/* Santa in sleigh */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-20">
              {/* Santa's Hat */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-red-600 rounded-t-full">
                <div className="absolute -right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
              
              {/* Santa's Body */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-600 rounded-b-full"></div>
              
              {/* Santa's Face */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                {/* Eyes */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
                
                {/* Mouth */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-500 rounded-b-full"></div>
              </div>
            </div>
          </div>
          
          {/* Reindeer 1 (left) */}
          <motion.div
            className="absolute -left-16 -top-8 w-16 h-12"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-12 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full relative">
              <div className="absolute -top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute -top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-amber-200 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-amber-200 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-amber-800 rounded-full"></div>
          </motion.div>
          
          {/* Reindeer 2 (right) */}
          <motion.div
            className="absolute -right-16 -top-8 w-16 h-12"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          >
            <div className="w-12 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full relative">
              <div className="absolute -top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute -top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-amber-200 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-amber-200 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-amber-800 rounded-full"></div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Processing/celebrating state - Santa in final position */}
      {(santaState === 'processing' || santaState === 'celebrating' || santaState === 'stepping_out') && (
        <motion.div
          className="absolute"
          style={{ left: '50vw', top: '70vh', transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1.2, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced Santa character when in final position */}
          <div className="relative w-64 h-80">
            {/* Hat */}
            <motion.div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-red-600 rounded-t-full"
              animate={santaState === 'celebrating' ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, repeat: santaState === 'celebrating' ? Infinity : 0 }}
            >
              <div className="absolute -right-2 top-2 w-6 h-6 bg-white rounded-full"></div>
            </motion.div>
            
            {/* Face with eye tracking */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center z-10">
              <div className="flex justify-center space-x-6 mb-2">
                {/* Left eye with tracking */}
                <div className="w-4 h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"
                    animate={{
                      x: [eyePosition.x * 2, eyePosition.x * 2],
                      y: [eyePosition.y * 2, eyePosition.y * 2]
                    }}
                    transition={{ type: "tween", duration: 0.1 }}
                  ></motion.div>
                </div>
                {/* Right eye with tracking */}
                <div className="w-4 h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"
                    animate={{
                      x: [eyePosition.x * 2, eyePosition.x * 2],
                      y: [eyePosition.y * 2, eyePosition.y * 2]
                    }}
                    transition={{ type: "tween", duration: 0.1 }}
                  ></motion.div>
                </div>
              </div>
              {/* Mouth with animation */}
              <div className="text-2xl">
                {santaMouthOpen ? 'O' : '[]'}
              </div>
            </div>
            
            {/* Body */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-red-600 rounded-b-full"></div>
            
            {/* Belt */}
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black"></div>
            
            {/* Face glow effect */}
            <motion.div 
              className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-yellow-300 opacity-30 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Ho Ho Ho text */}
            {santaState === 'celebrating' && (
              <motion.div
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-red-600"
                animate={{ 
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                Ho Ho Ho! 🎅
              </motion.div>
            )}
            
            {/* Processing indicator */}
            {santaState === 'processing' && (
              <motion.div
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-xl text-white font-bold bg-black/50 px-4 py-2 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Processing your wish...
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}