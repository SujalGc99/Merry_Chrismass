import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
}

interface MagicalParticlesProps {
  isActive?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  triggerEvent?: string; // 'wish-submit', 'santa-response', etc.
}

export function MagicalParticles({ isActive = true, intensity = 'medium', className, triggerEvent }: MagicalParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Initialize particles based on intensity
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle count based on intensity
    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100;
    
    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
          life: 1
        });
      }
      particlesRef.current = particles;
    };
    
    initParticles();
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    if (isActive) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, intensity, triggerEvent]);
  
  // Special effect for trigger events
  useEffect(() => {
    if (triggerEvent && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Create burst effect
      const burstParticles: Particle[] = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < 50; i++) {
        burstParticles.push({
          id: i,
          x: centerX,
          y: centerY,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 5,
          speedY: (Math.random() - 0.5) * 5,
          color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
          life: 1
        });
      }
      
      // Animate burst
      let burstLife = 60; // 60 frames = 1 second at 60fps
      const burstAnimate = () => {
        if (!ctx) return;
        
        burstParticles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.life -= 0.01;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${parseInt(particle.color.split('(')[1].split(',')[0])}, 100%, 70%, ${particle.life})`;
          ctx.fill();
        });
        
        burstLife--;
        if (burstLife > 0) {
          requestAnimationFrame(burstAnimate);
        }
      };
      
      burstAnimate();
    }
  }, [triggerEvent]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-5 ${className}`}
    />
  );
}