import { motion, AnimatePresence } from 'framer-motion';

interface SceneTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  type?: 'fade' | 'slide' | 'zoom' | 'perspective' | 'morph';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
}

export function SceneTransition({ 
  children, 
  isVisible, 
  type = 'fade', 
  direction = 'up',
  duration = 0.6,
  className
}: SceneTransitionProps) {
  const getTransitionVariants = () => {
    switch (type) {
      case 'slide':
        const slideVariants = {
          hidden: {
            opacity: 0,
            x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
            y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, ease: "easeOut" },
          },
        };
        return slideVariants;
      
      case 'zoom':
        const zoomVariants = {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration, ease: "easeOut" } },
        };
        return zoomVariants;
      
      case 'perspective':
        const perspectiveVariants = {
          hidden: { 
            opacity: 0, 
            rotateX: direction === 'up' ? -90 : 0,
            rotateY: direction === 'left' ? -90 : 0,
            scale: 0.8
          },
          visible: { 
            opacity: 1, 
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            transition: { duration, ease: "easeOut" }
          },
        };
        return perspectiveVariants;
      
      case 'morph':
        const morphVariants = {
          hidden: { 
            opacity: 0, 
            borderRadius: "50%",
            scale: 0.5
          },
          visible: { 
            opacity: 1, 
            borderRadius: "0%",
            scale: 1,
            transition: { duration, ease: "easeOut", type: "spring" }
          },
        };
        return morphVariants;
      
      case 'fade':
      default:
        const fadeVariants = {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, ease: "easeOut" } },
        };
        return fadeVariants;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          variants={getTransitionVariants()}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}