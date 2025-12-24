import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedWishInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function EnhancedWishInput({ 
  value, 
  onChange, 
  placeholder = "Write your Christmas wish here...", 
  disabled = false,
  className = ""
}: EnhancedWishInputProps) {
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const maxLength = 500;
  
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);
  
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      onChange(inputValue);
    }
  };
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Decorative border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-600 rounded-xl p-0.5">
          <div className="w-full h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl"></div>
        </div>
        
        {/* Textarea with decorative elements */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full min-h-[120px] max-h-[200px] p-4 pl-12 pr-24 bg-gradient-to-b from-amber-50 to-amber-100 
            border-0 rounded-xl shadow-inner resize-none focus:outline-none text-lg
            placeholder:text-amber-400 text-gray-800 z-10 relative
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
          style={{ 
            fontFamily: "'Courier New', monospace",
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-3 left-3 z-20 text-amber-600">
          ✨
        </div>
        
        {/* Character counter */}
        <div className="absolute top-3 right-3 z-20 text-xs font-semibold">
          <span className={charCount > maxLength * 0.9 ? 'text-red-600' : 'text-amber-700'}>
            {charCount}/{maxLength}
          </span>
        </div>
        
        {/* Decorative corner elements */}
        <div className="absolute top-2 right-10 z-20 text-amber-600 text-lg">
          🎄
        </div>
        <div className="absolute bottom-2 left-10 z-20 text-amber-600 text-lg">
          🎁
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            charCount > maxLength * 0.9 
              ? 'bg-red-500' 
              : charCount > maxLength * 0.7 
                ? 'bg-yellow-500' 
                : 'bg-green-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${(charCount / maxLength) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Focus glow effect */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl blur opacity-30 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}