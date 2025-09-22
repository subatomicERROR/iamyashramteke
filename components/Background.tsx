import React, { useRef, useEffect } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const parallaxFactor = 0.3; // Determines how much slower the particles scroll. 0.3 means 30% slower.

    const handleScroll = () => {
        scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      createParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        // Update the particle's "true" position
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if (!ctx) return;
        // Adjust draw position based on scroll to create parallax effect
        const yPos = this.y - scrollY.current * parallaxFactor;
        ctx.fillStyle = `rgba(99, 129, 168, 0.3)`;
        ctx.beginPath();
        ctx.arc(this.x, yPos, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 18000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.2 + 0.3;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const speedX = (Math.random() * 0.2) - 0.1;
        const speedY = (Math.random() * 0.2) - 0.1;
        particles.push(new Particle(x, y, size, speedX, speedY));
      }
    };

    const connectParticles = () => {
      const yOffset = -scrollY.current * parallaxFactor;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          // Distance calculation uses the "true" particle positions
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          );
          
          if (distance < (canvas.width / 15)) {
            const opacityValue = 1 - (distance / (canvas.width / 15));
            ctx.strokeStyle = `rgba(99, 129, 168, ${opacityValue * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            // Line drawing is adjusted for the parallax effect
            ctx.moveTo(particles[a].x, particles[a].y + yOffset);
            ctx.lineTo(particles[b].x, particles[b].y + yOffset);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const debouncedResize = () => {
        let timeout: ReturnType<typeof setTimeout>;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(resizeCanvas, 250);
        }
    }

    const resizeHandler = debouncedResize();
    window.addEventListener('resize', resizeHandler);
    
    setTimeout(() => {
        resizeCanvas();
        animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default Background;