import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChristmasTreeProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function ChristmasTree({ size = 'lg', animate = true }: ChristmasTreeProps) {
  const [lights, setLights] = useState<boolean[]>([]);
  const [ornaments, setOrnaments] = useState<boolean[]>([]);
  
  // Initialize lights and ornaments
  useEffect(() => {
    // Create random lights
    const newLights = Array.from({ length: 30 }, () => Math.random() > 0.5);
    setLights(newLights);
    
    // Create random ornaments
    const newOrnaments = Array.from({ length: 20 }, () => Math.random() > 0.5);
    setOrnaments(newOrnaments);
  }, []);
  
  // Animate lights
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setLights(prev => prev.map(() => Math.random() > 0.5));
    }, 1500);
    
    return () => clearInterval(interval);
  }, [animate]);
  
  // Animate ornaments
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setOrnaments(prev => prev.map(() => Math.random() > 0.7));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [animate]);

  // Size classes
  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-64 h-80',
    lg: 'w-80 h-96'
  };

  return (
    <div className={`relative flex flex-col items-center ${sizeClasses[size]}`}>
      {/* Tree Topper */}
      <motion.div
        className="absolute -top-8 z-20"
        animate={animate ? { 
          rotate: [0, 5, 0, -5, 0],
          y: [0, -5, 0]
        } : {}}
        transition={{ 
          duration: 2,
          repeat: animate ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <div className="text-4xl">⭐</div>
      </motion.div>
      
      {/* Tree Layers */}
      <div className="relative w-full h-full">
        {/* Tree Layers - 3 levels */}
        <div className="absolute bottom-0 w-full flex justify-center">
          {/* Bottom Layer */}
          <motion.div
            className="w-64 h-32 bg-green-700 rounded-t-full"
            animate={animate ? { 
              scale: [1, 1.02, 1],
              y: [0, -2, 0]
            } : {}}
            transition={{ 
              duration: 4,
              repeat: animate ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            {/* Bottom Layer Lights */}
            {lights.slice(0, 10).map((isOn, index) => (
              <motion.div
                key={`bottom-${index}`}
                className={`absolute w-2 h-2 rounded-full ${isOn ? 'bg-yellow-300' : 'bg-gray-400'}`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + Math.sin(index) * 5}%`
                }}
                animate={animate ? {
                  scale: isOn ? [1, 1.5, 1] : 1,
                  opacity: isOn ? [0.7, 1, 0.7] : 0.5
                } : {}}
                transition={{ 
                  duration: 1,
                  repeat: isOn && animate ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </div>
        
        <div className="absolute bottom-16 w-full flex justify-center">
          {/* Middle Layer */}
          <motion.div
            className="w-52 h-28 bg-green-600 rounded-t-full"
            animate={animate ? { 
              scale: [1, 1.02, 1],
              y: [0, -2, 0]
            } : {}}
            transition={{ 
              duration: 3.5,
              repeat: animate ? Infinity : 0,
              repeatType: "reverse",
              delay: 0.2
            }}
          >
            {/* Middle Layer Lights */}
            {lights.slice(10, 20).map((isOn, index) => (
              <motion.div
                key={`middle-${index}`}
                className={`absolute w-2 h-2 rounded-full ${isOn ? 'bg-red-500' : 'bg-gray-400'}`}
                style={{
                  left: `${25 + index * 12}%`,
                  top: `${30 + Math.cos(index) * 5}%`
                }}
                animate={animate ? {
                  scale: isOn ? [1, 1.5, 1] : 1,
                  opacity: isOn ? [0.7, 1, 0.7] : 0.5
                } : {}}
                transition={{ 
                  duration: 1.2,
                  repeat: isOn && animate ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </div>
        
        <div className="absolute bottom-32 w-full flex justify-center">
          {/* Top Layer */}
          <motion.div
            className="w-40 h-24 bg-green-500 rounded-t-full"
            animate={animate ? { 
              scale: [1, 1.02, 1],
              y: [0, -2, 0]
            } : {}}
            transition={{ 
              duration: 3,
              repeat: animate ? Infinity : 0,
              repeatType: "reverse",
              delay: 0.4
            }}
          >
            {/* Top Layer Lights */}
            {lights.slice(20, 30).map((isOn, index) => (
              <motion.div
                key={`top-${index}`}
                className={`absolute w-2 h-2 rounded-full ${isOn ? 'bg-blue-400' : 'bg-gray-400'}`}
                style={{
                  left: `${30 + index * 10}%`,
                  top: `${30 + Math.sin(index * 2) * 5}%`
                }}
                animate={animate ? {
                  scale: isOn ? [1, 1.5, 1] : 1,
                  opacity: isOn ? [0.7, 1, 0.7] : 0.5
                } : {}}
                transition={{ 
                  duration: 1.4,
                  repeat: isOn && animate ? Infinity : 0,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Tree Trunk */}
      <div className="absolute bottom-0 w-8 h-16 bg-amber-800 rounded-t-md z-10"></div>
      
      {/* Ornaments */}
      {ornaments.map((isOn, index) => {
        const layer = index % 3;
        const top = layer === 0 ? 'bottom-8' : layer === 1 ? 'bottom-24' : 'bottom-40';
        const left = `${30 + (index % 7) * 10}%`;
        
        return (
          <motion.div
            key={`ornament-${index}`}
            className={`absolute w-4 h-4 rounded-full ${isOn ? 'bg-red-500' : 'bg-gray-400'}`}
            style={{
              bottom: layer === 0 ? '2rem' : layer === 1 ? '6rem' : '10rem',
              left: left
            }}
            animate={animate ? {
              y: [0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            } : {}}
            transition={{ 
              duration: 2.5,
              repeat: animate ? Infinity : 0,
              repeatType: "reverse",
              delay: index * 0.1
            }}
          >
            <div className="absolute -top-1 -left-1 w-6 h-6 border border-yellow-300 rounded-full opacity-50"></div>
          </motion.div>
        );
      })}
      
      {/* Gift Boxes */}
      <div className="absolute -bottom-12 flex space-x-4">
        <motion.div
          className="w-10 h-10 bg-red-500 relative"
          animate={animate ? { 
            rotate: [0, -5, 0, 5, 0],
            y: [0, -3, 0]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: animate ? Infinity : 0,
            repeatType: "reverse",
            delay: 0.5
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-yellow-400"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-yellow-400"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="w-12 h-12 bg-blue-500 relative"
          animate={animate ? { 
            rotate: [0, 5, 0, -5, 0],
            y: [0, -2, 0]
          } : {}}
          transition={{ 
            duration: 2.2,
            repeat: animate ? Infinity : 0,
            repeatType: "reverse",
            delay: 0.8
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-yellow-400"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-yellow-400"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        </motion.div>
      </div>
      
      {/* Snow around base */}
      <div className="absolute -bottom-8 flex space-x-2">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={animate ? {
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{ 
              duration: 1.5,
              repeat: animate ? Infinity : 0,
              repeatType: "reverse",
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    </div>
  );
}