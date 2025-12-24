import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AudioManager } from '../../utils/audioManager';

interface SantaCharacterProps {
  state?: 'idle' | 'flying' | 'landing' | 'stepping_out' | 'processing' | 'celebrating' | 'returning' | 'departing' | 'listening' | 'thinking' | 'responding';
  wish?: string;
}

export function SantaCharacter({ state = 'idle', wish }: SantaCharacterProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [beardSway, setBeardSway] = useState(0);
  const [browLift, setBrowLift] = useState(0);
  const [handPosition, setHandPosition] = useState({ left: 0, right: 0 });
  const [jawMovement, setJawMovement] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const spriteX = useSpring(mouseX, springConfig);
  const spriteY = useSpring(mouseY, springConfig);
  const audioManager = AudioManager.getInstance();
  
  // Update mouse position for Santa tracking
  useEffect(() => {
    if (!containerRef.current) return;
    
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
  }, [mouseX, mouseY]);
  
  // Handle different states with enhanced animations
  useEffect(() => {
    if (state === 'flying' || state === 'landing' || state === 'stepping_out' || state === 'returning' || state === 'departing') {
      // For animation states, keep minimal animation
      setMouthOpen(false);
      setBrowLift(0);
      setHandPosition({ left: 0, right: 0 });
      setJawMovement(0);
    } else if (state === 'processing') {
      setMouthOpen(true);
      setBrowLift(5);
      setJawMovement(3);
      // Play ho ho ho sound during processing
      const interval = setInterval(() => {
        audioManager.playHoHoHo();
        setMouthOpen(prev => !prev);
        setJawMovement(prev => prev === 3 ? 0 : 3);
      }, 1500);
      return () => clearInterval(interval);
    } else if (state === 'listening') {
      setMouthOpen(false);
      setBrowLift(5);
      setHandPosition({ left: 0, right: 0 });
    } else if (state === 'thinking') {
      setMouthOpen(false);
      setBrowLift(8);
      setHandPosition({ left: -10, right: 10 });
      // Thinking animation
      const interval = setInterval(() => {
        setBrowLift(prev => prev === 8 ? 12 : 8);
      }, 1200);
      return () => clearInterval(interval);
    } else if (state === 'responding') {
      setMouthOpen(true);
      setBrowLift(3);
      setJawMovement(2);
      // Speaking animation
      const interval = setInterval(() => {
        setMouthOpen(prev => !prev);
        setJawMovement(prev => prev === 2 ? 0 : 2);
      }, 200);
      return () => clearInterval(interval);
    } else if (state === 'celebrating') {
      setMouthOpen(true);
      setBrowLift(10);
      setHandPosition({ left: 15, right: -15 });
      // Play ho ho ho sound
      audioManager.playHoHoHo();
      
      // Celebration animation
      const interval = setInterval(() => {
        setBrowLift(prev => prev === 10 ? 15 : 10);
        setJawMovement(prev => prev === 0 ? 3 : 0);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setMouthOpen(false);
      setBrowLift(0);
      setHandPosition({ left: 0, right: 0 });
      setJawMovement(0);
    }
  }, [state, audioManager]);
  
  // Idle animations
  useEffect(() => {
    if (state === 'idle') {
      const interval = setInterval(() => {
        setBeardSway(Math.sin(Date.now() / 2000) * 2);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <motion.div
        className="relative"
        style={{ 
          rotateY: headRotation,
          rotateX: eyePosition.y * 1
        }}
        animate={{ 
          y: [-2, 0, -2],
        }}
        transition={{ 
          duration: 4,
          repeat: state === 'idle' ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Santa's Hat with enhanced details */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-gradient-to-b from-red-600 to-red-800 rounded-full rounded-t-full shadow-lg"
          animate={state === 'celebrating' ? { 
            rotate: [0, -5, 0, 5, 0],
            y: [0, -3, 0],
            scale: [1, 1.05, 1]
          } : { rotate: 0, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            repeat: state === 'celebrating' ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-md"></div>
          <div className="absolute top-6 -left-4 w-8 h-8 bg-red-600 rounded-full"></div>
          <div className="absolute top-3 -left-6 w-6 h-6 bg-red-600 rounded-full"></div>
        </motion.div>
        
        {/* Santa's Face with enhanced details */}
        <div className="w-32 h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full relative z-10 flex items-center justify-center shadow-lg">
          {/* Eyes with enhanced tracking */}
          <div className="absolute top-8 left-6 w-6 h-6 bg-gradient-to-b from-gray-800 to-black rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="w-3 h-3 bg-gradient-to-b from-white to-gray-200 rounded-full absolute top-1.5 left-1.5 shadow-sm"
              animate={{
                x: [eyePosition.x * 2, eyePosition.x * 2],
                y: [eyePosition.y * 2, eyePosition.y * 2]
              }}
              transition={{ type: "tween", duration: 0.1 }}
            ></motion.div>
          </div>
          <div className="absolute top-8 right-6 w-6 h-6 bg-gradient-to-b from-gray-800 to-black rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="w-3 h-3 bg-gradient-to-b from-white to-gray-200 rounded-full absolute top-1.5 left-1.5 shadow-sm"
              animate={{
                x: [eyePosition.x * 2, eyePosition.x * 2],
                y: [eyePosition.y * 2, eyePosition.y * 2]
              }}
              transition={{ type: "tween", duration: 0.1 }}
            ></motion.div>
          </div>
          
          {/* Enhanced Eyebrows */}
          <motion.div 
            className="absolute top-6 left-5 w-7 h-2 bg-gradient-to-r from-gray-800 to-black rounded-full origin-left shadow-sm"
            animate={{ 
              rotate: [0, browLift, 0],
              y: [0, -browLift * 0.1, 0]
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          <motion.div 
            className="absolute top-6 right-5 w-7 h-2 bg-gradient-to-r from-gray-800 to-black rounded-full origin-right shadow-sm"
            animate={{ 
              rotate: [0, -browLift, 0],
              y: [0, -browLift * 0.1, 0]
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          
          {/* Nose */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full shadow-md"></div>
          
          {/* Enhanced Mouth */}
          {mouthOpen ? (
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-10 h-6 border-b-4 border-black rounded-b-full overflow-hidden"
              animate={{ y: jawMovement }}
            >
              <div className="w-full h-full bg-red-500 rounded-b-full"></div>
            </motion.div>
          ) : (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-3 border-b-2 border-black rounded-b-full"></div>
          )}
          
          {/* Rosy cheeks */}
          <motion.div
            className="absolute top-16 left-2 w-6 h-6 bg-gradient-to-b from-red-300 to-red-400 rounded-full opacity-70"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute top-16 right-2 w-6 h-6 bg-gradient-to-b from-red-300 to-red-400 rounded-full opacity-70"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          ></motion.div>
        </div>
        
        {/* Santa's Body with enhanced details */}
        <div className="w-40 h-52 bg-gradient-to-b from-red-600 to-red-800 rounded-t-full relative -mt-8 shadow-xl">
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-gray-100 rounded-t-full"></div>
          
          {/* Enhanced Arms */}
          <motion.div
            className="absolute -left-6 top-12 w-16 h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full origin-right shadow-md"
            animate={{ 
              rotate: [-30 + handPosition.left, 30 + handPosition.left, -30 + handPosition.left],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 0.8,
              repeat: state === 'responding' || state === 'celebrating' ? Infinity : 0,
              repeatType: "reverse"
            }}
          ></motion.div>
          
          <motion.div
            className="absolute -right-6 top-12 w-16 h-6 bg-gradient-to-r from-red-600 to-red-700 rounded-full origin-left shadow-md"
            animate={{ 
              rotate: [30 + handPosition.right, -30 + handPosition.right, 30 + handPosition.right],
              x: [0, -5, 0]
            }}
            transition={{ 
              duration: 0.8,
              repeat: state === 'responding' || state === 'celebrating' ? Infinity : 0,
              repeatType: "reverse"
            }}
          ></motion.div>
          
          {/* Belt with buckle details */}
          <div className="absolute bottom-12 left-0 right-0 h-6 bg-gradient-to-r from-gray-800 to-black flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Santa's Belly */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-36 h-24 bg-gradient-to-b from-red-700 to-red-900 rounded-full shadow-lg"
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: state === 'idle' ? Infinity : 0,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        {/* Enhanced Santa's Beard */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-44 h-16 bg-gradient-to-b from-white to-gray-100 rounded-b-full shadow-md"
          animate={{ 
            x: [-beardSway, beardSway, -beardSway],
            y: [0, Math.sin(Date.now() / 1000) * 1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: state === 'idle' ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-sm"></div>
        </motion.div>
        
        {/* Legs/Feet */}
        <div className="flex justify-between px-8 mt-2">
          <div className="w-12 h-8 bg-gradient-to-b from-black to-gray-900 rounded-b-full shadow-md"></div>
          <div className="w-12 h-8 bg-gradient-to-b from-black to-gray-900 rounded-b-full shadow-md"></div>
        </div>
      </motion.div>
      
      {/* Enhanced Sack */}
      <motion.div 
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-full shadow-lg"
        animate={state === 'thinking' || state === 'celebrating' ? { 
          y: [0, -8, 0],
          rotate: [0, -5, 0, 5, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ 
          duration: 1.5,
          repeat: (state === 'thinking' || state === 'celebrating') ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-14 h-6 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-full shadow-md"></div>
      </motion.div>
      
      {/* State-specific enhanced animations */}
      {state === 'listening' && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <div className="text-3xl">👂</div>
        </motion.div>
      )}
      
      {state === 'thinking' && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          animate={{ 
            rotate: [0, -10, 0, 10, 0],
            y: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <div className="text-3xl">💭✨</div>
        </motion.div>
      )}
      
      {state === 'responding' && (
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity
          }}
        >
          <div className="text-4xl">💬🗣️</div>
        </motion.div>
      )}
      
      {state === 'celebrating' && (
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex space-x-2"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 0.8,
            repeat: Infinity
          }}
        >
          <div className="text-3xl">🎉</div>
          <div className="text-3xl">🎊</div>
          <div className="text-3xl">🎁</div>
        </motion.div>
      )}
    </div>
  );
}