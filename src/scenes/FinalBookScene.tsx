import { motion } from 'framer-motion';

interface FinalBookSceneProps {
  result: {
    polishedWish: string;
    category: string;
    santaResponse: string;
  };
}

export function FinalBookScene({ result }: FinalBookSceneProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-96 h-[500px] bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg shadow-2xl p-6 relative overflow-hidden"
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Book cover design */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-amber-100 opacity-50"></div>
        
        {/* Old book texture */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-amber-800 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Book spine */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-amber-800 to-amber-900"></div>
        
        {/* Book content */}
        <div className="relative z-10 h-full flex flex-col p-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-christmasRed">
            Santa's Special Note 🎅📜
          </h2>
          
          <div className="flex-1 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-christmasGreen">Your Polished Wish:</h3>
              <p className="text-gray-800 italic border-l-4 border-christmasGold pl-4 py-2">
                "{result.polishedWish}"
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-christmasGreen">Category:</h3>
              <div className="px-4 py-2 bg-christmasRed/20 rounded-full inline-block">
                <span className="font-medium">{result.category}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-christmasGreen">Santa's Response:</h3>
              <p className="text-gray-800">{result.santaResponse}</p>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-4xl mb-4">🎅</div>
              <p className="text-sm text-gray-600 italic">
                "Your wish has been recorded in my special book!"
              </p>
              <p className="text-sm text-gray-600 italic mt-2">
                Ho ho ho! Merry Christmas! 🎄
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-xl">🎄</div>
        <div className="absolute top-4 right-4 text-xl">🎁</div>
        <div className="absolute bottom-4 left-4 text-xl">❄️</div>
        <div className="absolute bottom-4 right-4 text-xl">✨</div>
      </motion.div>
    </motion.div>
  );
}