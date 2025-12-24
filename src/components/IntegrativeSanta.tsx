'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SantaScene } from './ui/SantaScene';
import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { SoundManager } from '../utils/sound';
import { polishWish } from '../agents/polishWish';
import { categorizeWish } from '../agents/categorizeWish';

export function IntegrativeSanta() {
  const [wish, setWish] = useState('');
  const [processedWish, setProcessedWish] = useState('');
  const [category, setCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [santaPosition, setSantaPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [santaSpeaking, setSantaSpeaking] = useState(false);
  const [santaBlessing, setSantaBlessing] = useState('');
  const [showSantaNote, setShowSantaNote] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const spriteX = useSpring(mouseX, springConfig);
  const spriteY = useSpring(mouseY, springConfig);
  
  // Update mouse position for Santa tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Update Santa position based on spring values
  useEffect(() => {
    const updateSantaPosition = () => {
      setSantaPosition({
        x: spriteX.get(),
        y: spriteY.get()
      });
    };
    
    const unsubscribeX = spriteX.on("change", updateSantaPosition);
    const unsubscribeY = spriteY.on("change", updateSantaPosition);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [spriteX, spriteY]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    
    setIsProcessing(true);
    setSantaSpeaking(true);
    
    try {
      // Process through Wish Polisher Agent
      const polished = await polishWish(wish);
      // Process through Wish Categorizer Agent
      const categorized = await categorizeWish(wish);
      
      setProcessedWish(polished);
      setCategory(categorized);
      
      // Play Santa's response
      const soundManager = SoundManager.getInstance();
      soundManager.playHoHoHo();
      
      // Generate Santa's blessing
      setSantaBlessing(`Ho ho ho! Your wish for ${categorized} is special. May your Christmas be filled with joy and wonder!`);
      
      // Show Santa's note after a delay
      setTimeout(() => {
        setShowSantaNote(true);
      }, 2000);
      
    } catch (error) {
      console.error('Error processing wish:', error);
      setSantaBlessing("Ho ho ho! Something went wrong, but I still heard your wish. Merry Christmas!");
      setShowSantaNote(true);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-christmasGreen to-christmasRed text-white relative overflow-hidden">
      {/* Snow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-christmasGold font-serif">
            Integrative Santa 🎄
          </h1>
          <p className="text-xl text-white/90">
            Share your Christmas wish and watch Santa respond interactively!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wish Input Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="wish" className="block text-lg font-medium mb-2 text-christmasGold">
                  Your Christmas Wish ✨
                </label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full h-32 p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-christmasGold focus:border-transparent transition-all duration-300"
                  placeholder="Write your Christmas wish here... 🎅"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 bg-gradient-to-r from-christmasRed to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span> Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">🎅</span> Send to Santa
                  </span>
                )}
              </button>
            </form>

            {/* Processed Wish Display */}
            {processedWish && (
              <motion.div 
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2 text-christmasGold flex items-center">
                  <span className="mr-2">✨</span> Polished Wish
                </h3>
                <p className="text-white italic mb-3">"{processedWish}"</p>
                <div className="flex items-center">
                  <span className="mr-2">🏷️</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-christmasRed to-red-800 rounded-full text-sm">
                    {category}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Santa's Blessing */}
            {santaBlessing && (
              <motion.div 
                className="bg-gradient-to-br from-christmasGold/30 to-christmasRed/40 backdrop-blur-lg rounded-2xl p-6 border-2 border-christmasGold shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-3">🎅</span>
                  <div>
                    <h3 className="font-bold text-christmasGold mb-2">Santa's Blessing</h3>
                    <p className="text-white">{santaBlessing}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Santa Interaction Section */}
          <div className="flex flex-col">
            <Card 
              ref={cardRef}
              className="w-full h-[500px] bg-gradient-to-br from-gray-900 to-black/[0.96] relative overflow-hidden shadow-2xl border-2 border-christmasGold"
            >
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />
              
              <div className="flex h-full">
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Meet Santa
                  </motion.h1>
                  <motion.p 
                    className="text-neutral-300 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Share your Christmas wish and let Santa hear it.
                  </motion.p>
                  
                  {/* Santa Speaking Indicator */}
                  {santaSpeaking && (
                    <motion.div 
                      className="mt-6 p-4 bg-gradient-to-r from-red-500/30 to-red-700/30 rounded-xl border border-red-400/50 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-yellow-300 font-bold flex items-center">
                        <span className="mr-2 animate-pulse">🎤</span>
                        Santa is listening... Ho ho ho! 🎅
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <SantaScene 
                    className="w-full h-full"
                  />
                  
                  {/* Santa Mouse Follower */}
                  <motion.div
                    className="absolute w-16 h-16 pointer-events-none z-20"
                    style={{
                      left: santaPosition.x - 32,
                      top: santaPosition.y - 32,
                      x: spriteX,
                      y: spriteY
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="text-4xl">🎅</div>
                  </motion.div>
                </div>
              </div>
            </Card>
            
            {/* Santa's Note Panel */}
            {showSantaNote && (
              <motion.div 
                className="mt-6 bg-gradient-to-br from-christmasGold/20 to-christmasRed/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-christmasGold shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-3 text-christmasGold flex justify-center items-center">
                    <span className="mr-2">📜</span> Santa's Special Note
                  </h2>
                  <p className="text-white">
                    Your wish has been recorded in my special book! 
                    Remember to be good and spread Christmas cheer! 
                    Ho ho ho! 🎅
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}