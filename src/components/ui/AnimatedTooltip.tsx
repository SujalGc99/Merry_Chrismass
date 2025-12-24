import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function AnimatedTooltip({ children, content, position = 'top', className }: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipStyle: React.CSSProperties = {};
      
      switch (position) {
        case 'top':
          tooltipStyle.bottom = `${rect.height + 8}px`;
          tooltipStyle.left = '50%';
          tooltipStyle.transform = 'translateX(-50%)';
          break;
        case 'bottom':
          tooltipStyle.top = `${rect.height + 8}px`;
          tooltipStyle.left = '50%';
          tooltipStyle.transform = 'translateX(-50%)';
          break;
        case 'left':
          tooltipStyle.right = `${rect.width + 8}px`;
          tooltipStyle.top = '50%';
          tooltipStyle.transform = 'translateY(-50%)';
          break;
        case 'right':
          tooltipStyle.left = `${rect.width + 8}px`;
          tooltipStyle.top = '50%';
          tooltipStyle.transform = 'translateY(-50%)';
          break;
      }
      
      setPositionStyle(tooltipStyle);
    }
    
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-lg ${className}`}
            style={positionStyle}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div className="absolute w-3 h-3 bg-red-600 rotate-45 -z-10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}