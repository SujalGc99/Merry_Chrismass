import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function LightingEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create dynamic lighting effect
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add lighting based on mouse position with smoother effect
      const handleMouseMove = (e: MouseEvent) => {
        const gradient = ctx.createRadialGradient(
          e.clientX, e.clientY, 0,
          e.clientX, e.clientY, 150  // Reduced radius for more subtle effect
        );
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.15)');  // Reduced opacity
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 150, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resizeCanvas);
      };
    };
    
    render();
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10 opacity-20"  // Reduced opacity
    />
  );
}