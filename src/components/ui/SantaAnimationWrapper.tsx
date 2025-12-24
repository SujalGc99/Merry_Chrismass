import React, { useState, useEffect } from 'react';
import { SantaSleigh } from './SantaSleigh';
import { SantaCharacter } from './SantaCharacter';

interface SantaAnimationWrapperProps {
  isActive: boolean;
  wish: string;
  onAnimationComplete: () => void;
  santaState: 'idle' | 'flying' | 'landing' | 'stepping_out' | 'processing' | 'celebrating' | 'returning' | 'departing' | 'listening' | 'thinking' | 'responding';
}

export function SantaAnimationWrapper({ 
  isActive, 
  wish, 
  onAnimationComplete,
  santaState
}: SantaAnimationWrapperProps) {
  const [showSleigh, setShowSleigh] = useState(false);
  
  // When animation is active, show the sleigh animation
  useEffect(() => {
    if (isActive) {
      setShowSleigh(true);
    } else {
      setShowSleigh(false);
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Show sleigh animation when active */}
      {showSleigh && (
        <SantaSleigh 
          isActive={isActive}
          wish={wish}
          onComplete={() => {
            setShowSleigh(false);
            onAnimationComplete();
          }}
        />
      )}
      
      {/* Show static Santa character when not in animation states */}
      {!showSleigh && (
        <div className="relative">
          <SantaCharacter 
            state={santaState}
            wish={wish}
          />
          {/* Add visual indicator during processing */}
          {santaState === 'processing' && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xl font-bold text-red-600 animate-bounce">
              Processing your wish...
            </div>
          )}
        </div>
      )}
    </div>
  );
}