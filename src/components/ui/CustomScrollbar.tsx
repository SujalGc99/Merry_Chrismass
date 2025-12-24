import { motion } from 'framer-motion';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomScrollbar({ children, className }: CustomScrollbarProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #dc2626, #b91c1c);
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 10px;
          border: 2px solid #dc2626;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        
        /* Custom scrollbar for Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #fbbf24 #dc2626;
        }
      `}</style>
    </div>
  );
}