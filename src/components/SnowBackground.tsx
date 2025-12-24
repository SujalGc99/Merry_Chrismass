import { motion } from 'framer-motion';

interface SnowBackgroundProps {
  className?: string;
}

export function SnowBackground({ className }: SnowBackgroundProps) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Layer 1: Distant snowflakes - slow movement */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div 
          key={`distant-${i}`}
          className="absolute text-white opacity-30"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -20}vh`,
            fontSize: `${Math.random() * 6 + 4}px`,
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          ❄
        </motion.div>
      ))}
      
      {/* Layer 2: Mid-range snowflakes - medium movement */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div 
          key={`mid-${i}`}
          className="absolute text-white opacity-50"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -20}vh`,
            fontSize: `${Math.random() * 8 + 6}px`,
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            x: [0, Math.random() * 150 - 75],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          ❄
        </motion.div>
      ))}
      
      {/* Layer 3: Close snowflakes - fast movement */}
      {Array.from({ length: 70 }).map((_, i) => (
        <motion.div 
          key={`close-${i}`}
          className="absolute text-white opacity-70"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -20}vh`,
            fontSize: `${Math.random() * 10 + 8}px`,
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            x: [0, Math.random() * 200 - 100],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        >
          ❄
        </motion.div>
      ))}
      
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent"></div>
    </div>
  );
}