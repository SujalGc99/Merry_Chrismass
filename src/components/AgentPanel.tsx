import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AgentCard from './AgentCard';
import { polishWish } from '../agents/polishWish';
import { categorizeWish } from '../agents/categorizeWish';
import { santaReply } from '../agents/santaReply';
import { SoundManager } from '../utils/sound';

interface AgentPanelProps {
  wish: any;
  onComplete: (processedWish: any) => void;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ wish, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [polishedWish, setPolishedWish] = useState('');
  const [category, setCategory] = useState('');
  const [santaResponse, setSantaResponse] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSantaAnimation, setShowSantaAnimation] = useState(false);
  const [showSantaNote, setShowSantaNote] = useState(false);

  // Agent steps
  const agents = [
    { id: 1, name: 'Wish Polisher Agent', icon: '✨', description: 'Polishing your wish with Christmas magic...' },
    { id: 2, name: 'Category Agent', icon: '🏷️', description: 'Categorizing your wish...' },
    { id: 3, name: 'Santa Reply Agent', icon: '🎅', description: 'Preparing Santa\'s response...' }
  ];

  useEffect(() => {
    if (currentStep === 0) {
      // Start processing the wish
      processWish();
    } else if (currentStep === 1 && completedSteps.includes(0)) {
      // Add a 10 second delay for categorization to simulate processing
      setTimeout(() => {
        processWish();
      }, 10000); // 10 seconds delay
    } else if (currentStep === 2 && completedSteps.includes(1)) {
      processWish();
    }
  }, [currentStep, completedSteps]);

  useEffect(() => {
    // Play sound effects when Santa animation is shown
    if (showSantaAnimation) {
      const soundManager = SoundManager.getInstance();
      soundManager.playSleighBells();
      
      // Play additional sounds periodically during the animation
      const soundInterval = setInterval(() => {
        soundManager.playJingle();
      }, 1000);
      
      // Clean up interval after animation completes
      setTimeout(() => {
        clearInterval(soundInterval);
      }, 4000); // 4 seconds for animation
    }
  }, [showSantaAnimation]);

  const processWish = async () => {
    if (currentStep === 0) {
      // Process with Wish Polisher Agent
      const result = await polishWish(wish.originalWish);
      setPolishedWish(result);
      setCompletedSteps(prev => [...prev, 0]);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Process with Category Agent
      const result = await categorizeWish(wish.originalWish);
      setCategory(result);
      setCompletedSteps(prev => [...prev, 1]);
      
      // Show Santa animation after categorization
      setShowSantaAnimation(true);
      
      // Continue to next step after Santa animation
      setTimeout(() => {
        setShowSantaAnimation(false);
        setShowSantaNote(true);
        setCurrentStep(2);
      }, 5000); // Allow 5 seconds for Santa animation
    } else if (currentStep === 2) {
      // Process with Santa Reply Agent
      const result = await santaReply(polishedWish);
      setSantaResponse(result);
      setCompletedSteps(prev => [...prev, 2]);
      // Complete the process
      setTimeout(() => {
        const processedWish = {
          ...wish,
          polishedWish,
          category,
          santaResponse
        };
        onComplete(processedWish);
        setShowSantaNote(false); // Hide note after completion
      }, 1000);
    }
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-christmasGold">
        Processing Your Wish with Christmas Magic ✨
      </h2>
      
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isActive={currentStep === index}
            isCompleted={completedSteps.includes(index)}
            output={
              index === 0 ? polishedWish :
              index === 1 ? category :
              santaResponse
            }
          />
        ))}
      </div>
      
      {/* Santa Animation */}
      {showSantaAnimation && (
        <motion.div 
          className="mt-8 relative h-32 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Santa's sleigh with reindeer */}
            <motion.div 
              className="flex items-center"
              initial={{ x: -200 }}
              animate={{ x: 200 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              <div className="text-4xl mr-2">🦌🦌</div>
              <div className="text-5xl">🛷</div>
              <div className="text-4xl ml-2">🎅</div>
            </motion.div>
          </div>
          
          {/* Snow effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white text-lg"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ 
                  y: [0, -50, 0],
                  x: [0, 10, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                ❄
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Santa's Note */}
      {showSantaNote && (
        <motion.div 
          className="mt-6 p-4 bg-white/20 rounded-xl border border-christmasGold/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">📜</span>
            <h3 className="font-bold text-christmasGold">Santa's Note</h3>
          </div>
          <p className="text-white">
            Ho ho ho! Your wish has been categorized as <span className="font-bold text-christmasGold">{category}</span>. 
            I'll make sure to put extra special care into making it come true! 
            Remember to be good and spread Christmas cheer! 🎅
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AgentPanel;