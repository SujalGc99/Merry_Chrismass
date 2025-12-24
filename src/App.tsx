import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SnowBackground } from './components/SnowBackground';
import { SantaCharacter } from './components/ui/SantaCharacter';
import { ChristmasTree } from './components/ui/ChristmasTree';
import { LightingEffects } from './components/ui/LightingEffects';
import { ParticleField } from './components/ui/ParticleField';
import { analyzeWish } from './ai/analyzeWish';
import { AnimatedBook } from './components/ui/AnimatedBook';
import { CustomScrollbar } from './components/ui/CustomScrollbar';
import { AnimatedTooltip } from './components/ui/AnimatedTooltip';
import { MagicalParticles } from './components/ui/MagicalParticles';
import { SceneTransition } from './components/ui/SceneTransition';
import { VoiceInput } from './components/ui/VoiceInput';
import { BackgroundMusic } from './components/ui/BackgroundMusic';
import { SantaAnimationWrapper } from './components/ui/SantaAnimationWrapper';
import { EnhancedWishInput } from './components/ui/EnhancedWishInput';
import DevelopmentJourney from './components/ui/DevelopmentJourney';
import { AudioManager } from './utils/audioManager';

function App() {
  const [currentScene, setCurrentScene] = useState<'tree' | 'book' | 'santa' | 'final' | 'development'>('tree');
  const [wish, setWish] = useState('');
  const [processedWish, setProcessedWish] = useState('');
  const [category, setCategory] = useState('');
  const [santaResponse, setSantaResponse] = useState('');
  const [santaState, setSantaState] = useState<'idle' | 'flying' | 'landing' | 'stepping_out' | 'processing' | 'celebrating' | 'returning' | 'departing' | 'listening' | 'thinking' | 'responding'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wishHistory, setWishHistory] = useState<{original: string, processed: string, category: string, response: string}[]>([]);
  const [showWishHistory, setShowWishHistory] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const [showSleighAnimation, setShowSleighAnimation] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioManager = AudioManager.getInstance();
  
  // Parallax effects for enhanced depth
  const treeY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const treeScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  
  // Handle scroll progress to control scene transitions
  useEffect(() => {
    const handleScroll = () => {
      if (autoScrolling) return; // Skip if we're auto-scrolling
      
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;
      setScrollProgress(progress);

      // Determine scene based on scroll progress
      if (progress < 0.25) {
        setCurrentScene('tree');
      } else if (progress < 0.5) {
        setCurrentScene('book');
      } else if (progress < 0.75) {
        setCurrentScene('santa');
      } else {
        setCurrentScene('final');
      }
    };

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoScrolling]);

  const handleSubmitWish = async () => {
    if (!wish.trim()) {
      alert('Please enter a wish before submitting!');
      return;
    }
    
    setIsProcessing(true);
    setSantaState('processing'); // Set Santa to processing state
    
    try {
      // Process the wish through AI
      const result = await analyzeWish(wish);
      setProcessedWish(result.polishedWish);
      setCategory(result.category);
      setSantaResponse(result.santaResponse);
      
      // Add to history
      setWishHistory(prev => [
        { 
          original: wish, 
          processed: result.polishedWish, 
          category: result.category, 
          response: result.santaResponse 
        },
        ...prev.slice(0, 4) // Keep only last 5 wishes
      ]);
      
      // Show the sleigh animation
      setShowSleighAnimation(true);
      
    } catch (error) {
      console.error('Error processing wish:', error);
      alert('There was an error processing your wish. Please try again.');
      setIsProcessing(false);
      setSantaState('idle');
    }
  };

  // Auto-scroll to next scene when processing is complete
  useEffect(() => {
    if (santaState === 'celebrating' && !autoScrolling) {
      setAutoScrolling(true);
      
      // Scroll to final scene after a delay
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight * 0.75,
          behavior: 'smooth'
        });
        
        // Reset auto-scrolling after scroll completes
        setTimeout(() => {
          setAutoScrolling(false);
        }, 1500); // Increased time to allow for smooth scrolling
      }, 18000); // Wait for sleigh animation to complete (full sequence)
    }
  }, [santaState, autoScrolling]);

  // Enable audio on user interaction
  const enableAudio = () => {
    setAudioEnabled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-green-900 overflow-x-hidden" onClick={enableAudio}>
      <SnowBackground />
      <LightingEffects />
      <ParticleField />
      <BackgroundMusic />
      

      
      {/* Audio Controls */}
      {!audioEnabled && (
        <motion.div 
          className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={enableAudio}
        >
          🔊 Enable Sounds
        </motion.div>
      )}
      
      {/* User Instructions */}
      <motion.div 
        className="fixed bottom-4 left-4 z-50 bg-black/50 text-white px-4 py-2 rounded-lg text-sm max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p>Write your Christmas wish and click "Send to Santa" to see the magic!</p>
      </motion.div>
      
      {/* Scene Indicators */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full p-2">
        {['tree', 'book', 'santa', 'final'].map((scene, index) => (
          <div 
            key={scene}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentScene === scene ? 'bg-yellow-400 scale-125' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      {/* Development Journey Link */}
      <motion.div 
        className="fixed top-4 right-20 z-50 w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center cursor-pointer text-white font-bold shadow-lg"
        onClick={() => setCurrentScene('development')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Development Journey"
      >
        D
      </motion.div>
      
      {/* Wish History Toggle */}
      <motion.button
        className="fixed top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full"
        onClick={() => setShowWishHistory(!showWishHistory)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showWishHistory ? 'Hide History' : 'Wish History'}
      </motion.button>
      
      {/* Wish History Panel */}
      <AnimatePresence>
        {showWishHistory && (
          <motion.div
            className="fixed top-16 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-h-96 overflow-y-auto shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="font-bold mb-2">Recent Wishes</h3>
            {wishHistory.length === 0 ? (
              <p className="text-gray-600">No wishes yet</p>
            ) : (
              wishHistory.map((item, index) => (
                <div key={index} className="border-b border-gray-200 py-2 last:border-b-0">
                  <p className="text-sm font-semibold">"{item.original}"</p>
                  <p className="text-xs text-gray-600">{item.category}</p>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scene 1: Christmas Tree (0-25% scroll) */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentScene === 'tree' ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{ y: treeY, scale: treeScale }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            animate={{ 
              scale: [1, 1.02, 1],
              textShadow: [
                '0 0 10px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 10px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Welcome to Santa's Workshop
          </motion.h1>
          <motion.p 
            className="text-xl text-white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to begin your Christmas journey
          </motion.p>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [-1, 1, -1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ChristmasTree size="lg" animate={true} />
        </motion.div>
      </motion.section>
      
      {/* Scene 2: Wish Book (25-50% scroll) */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentScene === 'book' ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl mx-auto p-8">
          <SceneTransition 
            isVisible={currentScene === 'book'}
            type="perspective"
            direction="up"
            duration={0.8}
          >
            <motion.div
              className="bg-gradient-to-b from-red-800 to-red-900 rounded-3xl shadow-2xl p-8 border-4 border-yellow-500"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">Write Your Christmas Wish</h2>
                <p className="text-yellow-200">Santa is waiting to hear your heartfelt wish</p>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-inner">
                <AnimatedBook 
                  content={wish}
                  className="mb-6"
                />
                
                <div className="w-full max-w-md">
                  <EnhancedWishInput
                    value={wish}
                    onChange={setWish}
                    placeholder="Write your Christmas wish here..."
                    disabled={isProcessing}
                    className="mb-4"
                  />
                  
                  <VoiceInput 
                    onTranscript={(transcript) => setWish(prev => prev + transcript)}
                    className="mb-4"
                  />
                  
                  <div className="flex justify-center space-x-4">
                    <AnimatedTooltip content="Submit your wish to Santa">
                      <motion.button
                        onClick={handleSubmitWish}
                        disabled={!wish.trim() || isProcessing}
                        className={`px-8 py-4 rounded-full text-xl font-bold text-white shadow-lg transition-all duration-200 ${
                          !wish.trim() || isProcessing 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                        }`}
                        whileHover={{ scale: !wish.trim() || isProcessing ? 1 : 1.05 }}
                        whileTap={{ scale: !wish.trim() || isProcessing ? 1 : 0.95 }}
                      >
                        {isProcessing ? 'Processing...' : 'Send to Santa!'}
                      </motion.button>
                    </AnimatedTooltip>
                    
                    <AnimatedTooltip content="Clear your wish">
                      <motion.button
                        onClick={() => setWish('')}
                        disabled={isProcessing}
                        className="px-6 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear
                      </motion.button>
                    </AnimatedTooltip>
                  </div>
                </div>
              </div>
            </motion.div>
          </SceneTransition>
        </div>
      </motion.section>
      
      {/* Scene 3: Santa Processing (50-75% scroll) */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentScene === 'santa' ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-4xl mx-auto p-8">
          <SceneTransition 
            isVisible={currentScene === 'santa'}
            type="zoom"
            duration={0.8}
          >
            <motion.div
              className="bg-gradient-to-b from-red-900 to-red-800 rounded-3xl shadow-2xl p-8 border-4 border-yellow-500"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {!showSleighAnimation ? (
                    isProcessing ? 'Santa is Thinking...' : 
                    santaState === 'celebrating' ? 'Ho Ho Ho! 🎅' :
                    'Santa is Processing Your Wish'
                  ) : 'Santa is on his way! 🛷'}
                </h2>
                {!showSleighAnimation && isProcessing && (
                  <motion.p 
                    className="text-yellow-200 text-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Magic is happening in Santa's workshop...
                  </motion.p>
                )}
              </div>
              
              <div className="flex justify-center">
                <div className="w-80 h-96 relative">
                  <SantaAnimationWrapper 
                    isActive={showSleighAnimation}
                    wish={wish}
                    santaState={santaState}
                    onAnimationComplete={() => {
                      setShowSleighAnimation(false);
                      setSantaState('celebrating');
                      audioManager.playHoHoHo();
                    }}
                  />
                  
                  {/* Processing indicators */}
                  {!showSleighAnimation && isProcessing && (
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="flex space-x-2 justify-center mb-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-4 h-4 bg-yellow-400 rounded-full"
                            animate={{ 
                              scale: [0.5, 1.5, 0.5],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-white">Analyzing your wish...</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </SceneTransition>
        </div>
        
        {/* Magical Particles Effect */}
        <MagicalParticles 
          isActive={currentScene === 'santa'}
          intensity="high"
          triggerEvent={isProcessing ? 'wish-submit' : undefined}
        />
      </motion.section>
      
      {/* Scene 4: Final Results (75-100% scroll) */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center relative pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentScene === 'final' ? 1 : currentScene === 'development' ? 0 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-4xl mx-auto p-8">
          <motion.div
            className="bg-gradient-to-b from-green-800 to-green-900 rounded-3xl shadow-2xl p-8 border-4 border-yellow-500"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Santa's Response</h2>
              <p className="text-yellow-200">Your wish has been processed by Santa's magic</p>
            </div>
                  
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-inner"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-red-800 mb-4">Your Original Wish</h3>
                <p className="text-lg text-gray-700 italic">"{wish}"</p>
              </motion.div>
                    
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-inner"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-red-800 mb-4">Polished Wish</h3>
                <p className="text-lg text-gray-700">{processedWish || 'Submit a wish to see the polished version'}</p>
              </motion.div>
                    
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-inner"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-red-800 mb-4">Category</h3>
                <p className="text-3xl text-center">{category || 'Fun 🎉'}</p>
              </motion.div>
                    
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-inner"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-red-800 mb-4">Santa's Response</h3>
                <p className="text-lg text-gray-700">"{santaResponse || 'Submit a wish to receive Santa\'s response'}"</p>
              </motion.div>
            </div>
                  
            {processedWish && (
              <div className="mt-8 text-center space-y-4">
                <motion.button
                  onClick={() => {
                    setWish('');
                    setProcessedWish('');
                    setCategory('');
                    setSantaResponse('');
                    setSantaState('idle');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold hover:from-red-700 hover:to-red-800 shadow-lg mr-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Wish
                </motion.button>
                      
                <motion.button
                  onClick={() => {
                    // Share functionality would go here
                    navigator.clipboard.writeText(`My Christmas wish: "${wish}"\nSanta's response: "${santaResponse}"`);
                    alert('Wish copied to clipboard!');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold hover:from-blue-700 hover:to-blue-800 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Wish
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>
            
      {/* Development Journey Scene */}
      {currentScene === 'development' && (
        <motion.section 
          className="min-h-screen flex flex-col items-center justify-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DevelopmentJourney />
        </motion.section>
      )}
    </div>
  );
}

export default App;