import { motion } from 'framer-motion';

interface Agent {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  isCompleted: boolean;
  output: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, isCompleted, output }) => {
  return (
    <motion.div 
      className={`p-4 rounded-xl border transition-all duration-300 ${
        isCompleted 
          ? 'bg-green-500/20 border-green-400/50' 
          : isActive 
            ? 'bg-christmasGold/20 border-christmasGold/50' 
            : 'bg-white/10 border-white/20'
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-3">{agent.icon}</span>
        <h3 className="font-bold text-lg">{agent.name}</h3>
        <div className="ml-auto flex items-center">
          {isActive && (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-christmasGold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-christmasGold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 bg-christmasGold rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          )}
          {isCompleted && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-400 text-xl"
            >
              ✓
            </motion.span>
          )}
        </div>
      </div>
      
      <p className="text-sm text-white/80 mb-2">{agent.description}</p>
      
      {output && (
        <motion.div 
          className="mt-2 p-3 bg-black/20 rounded-lg border border-white/10 enhanced-typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-white">
            {isActive ? (
              <span className="typing-animation">{output}</span>
            ) : (
              output
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AgentCard;