import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  className?: string;
}

export function VoiceInput({ onTranscript, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            const currentTranscript = transcript + ' ';
            setTranscript(prev => prev + currentTranscript);
            onTranscript(transcript + ' ');
          } else {
            interimTranscript += transcript;
          }
        }
        setTranscript(prev => prev + interimTranscript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!isSupported) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        Voice input is not supported in this browser
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.button
        onClick={toggleListening}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${isListening ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        <motion.div
          animate={{
            scale: isListening ? [1, 1.2, 1] : 1,
            opacity: isListening ? [0.7, 1, 0.7] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isListening ? Infinity : 0,
            repeatType: 'loop',
          }}
        >
          {isListening ? '🎤' : '🎙️'}
        </motion.div>
      </motion.button>
      
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-600 truncate">
          {isListening ? 'Listening... Speak your wish!' : transcript || 'Click mic to speak your wish'}
        </div>
      </div>
    </div>
  );
}