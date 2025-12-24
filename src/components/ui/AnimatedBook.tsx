import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedBookProps {
  title?: string;
  content?: string;
  isOpen?: boolean;
  onFlip?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedBook({ title = "Santa's Wish Book", content, isOpen = false, onFlip, children, className }: AnimatedBookProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookOpen, setBookOpen] = useState(isOpen);
  const [pageCurl, setPageCurl] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  
  const handleFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    if (onFlip) onFlip();
    
    setTimeout(() => {
      setCurrentPage(prev => (prev + 1) % 2);
      setIsFlipping(false);
    }, 500);
  };

  // Page curl effect based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookRef.current) return;
    
    const rect = bookRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relativeX = x / rect.width;
    
    // Only apply curl effect when near the right edge
    if (relativeX > 0.8) {
      setPageCurl(Math.min(1, (relativeX - 0.8) * 5));
    } else {
      setPageCurl(0);
    }
  };

  const handleMouseLeave = () => {
    setPageCurl(0);
  };

  return (
    <div 
      ref={bookRef}
      className={`relative w-80 h-96 perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Book Cover */}
      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-red-800 to-red-900 rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-yellow-600"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: bookOpen ? 'rotateY(-30deg)' : 'rotateY(0deg)',
          zIndex: bookOpen ? 20 : 30
        }}
        animate={{
          rotateY: bookOpen ? -30 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">{title}</h2>
          <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mb-4"></div>
          <p className="text-yellow-200 text-sm">Write your Christmas wish here</p>
        </div>
        
        {/* Embossed decoration */}
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-yellow-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
        </div>
      </motion.div>

      {/* Book Pages */}
      <motion.div
        className="absolute w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: bookOpen ? -180 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Left Page */}
        <motion.div
          className="absolute left-0 w-1/2 h-full bg-amber-50 rounded-r-lg shadow-inner border-r-2 border-amber-200 p-4 overflow-y-auto"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            rotateY: currentPage === 1 ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full flex flex-col">
            <h3 className="font-bold text-red-800 mb-2">Your Wish</h3>
            <div className="flex-grow bg-amber-100 rounded p-3 border border-amber-300">
              {content ? (
                <p className="text-gray-700 italic">"{content}"</p>
              ) : (
                <p className="text-gray-400 italic">Your wish will appear here...</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Page with curl effect */}
        <motion.div
          className="absolute right-0 w-1/2 h-full bg-amber-50 rounded-l-lg shadow-inner border-l-2 border-amber-200 p-4 overflow-y-auto"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateY(180deg) rotateZ(${pageCurl * 10}deg)`,
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            rotateY: currentPage === 1 ? 0 : 180,
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full flex flex-col">
            <h3 className="font-bold text-red-800 mb-2">Santa's Response</h3>
            <div className="flex-grow bg-amber-100 rounded p-3 border border-amber-300">
              <p className="text-gray-700">Santa's response will appear here...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Book Spine */}
      <motion.div
        className="absolute left-1/2 top-0 w-4 h-full bg-gradient-to-b from-red-900 to-red-950 rounded-sm shadow-lg"
        style={{
          transform: 'translateX(-50%) rotateY(90deg)',
          transformOrigin: 'center',
        }}
        animate={{
          rotateY: bookOpen ? 90 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-full bg-yellow-600 rounded-full"></div>
        </div>
      </motion.div>

      {/* Book Interaction Button */}
      <motion.button
        className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => {
          setBookOpen(!bookOpen);
          if (bookOpen) handleFlip();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: bookOpen ? 180 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-xl">📖</div>
      </motion.button>

      {/* Animated Bookmark */}
      <AnimatePresence>
        {bookOpen && (
          <motion.div
            className="absolute left-1/2 top-8 transform -translate-x-1/2 z-30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-2 h-12 bg-gradient-to-b from-red-500 to-red-700 rounded-t-full shadow-lg">
              <div className="w-4 h-4 bg-red-400 rounded-full -ml-1 -mt-1"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}