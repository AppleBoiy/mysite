import { useEffect, useRef } from 'react';
import { useLiteMode } from "@/contexts/LiteModeContext";

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const { liteMode } = useLiteMode();

  useEffect(() => {
    // Don't render in lite mode
    if (liteMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];
    let lastTime = 0;
    const fps = 30; // Limit to 30fps instead of 60
    const fpsInterval = 1000 / fps;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 250);
    };
    window.addEventListener('resize', debouncedResize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; // Black particles
        ctx.fill();
      }
    }

    // Reduce particle count based on screen size
    const particleCount = Math.min(100, Math.max(80, Math.floor((canvas.width * canvas.height) / 15000))); // 80-100 particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      const maxDistance = 120; // Reduced from 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5; // Black lines
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 1.5; // Increased from 1 to 1.5
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Throttle to 30fps
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [liteMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }} // Increased from 0.3 to 0.5
      aria-hidden="true"
    />
  );
}
