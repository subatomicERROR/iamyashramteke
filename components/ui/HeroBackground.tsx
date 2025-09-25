import React, { useRef, useEffect } from 'react';

const HeroBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000, radius: 150 };

        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        
        // Utility to parse hex and return RGB
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        const color = hexToRgb(accentColor) || { r: 56, g: 116, b: 232 };


        const setupCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        class Particle {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            baseColor: string;
            
            constructor(x: number, y: number, radius: number) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.baseColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5 + 0.2})`;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor;
                ctx.fill();
            }

            update() {
                // Mouse interaction
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = forceDirectionX * force * 0.5;
                    const directionY = forceDirectionY * force * 0.5;
                    this.x += directionX;
                    this.y += directionY;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                }

                // Wall collision
                if (this.x < 0 || this.x > canvas.width / (window.devicePixelRatio || 1)) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height / (window.devicePixelRatio || 1)) this.vy *= -1;
            }
        }
        
        const init = () => {
            particles = [];
            const numberOfParticles = Math.floor(window.innerWidth / 15);
            for (let i = 0; i < numberOfParticles; i++) {
                const radius = Math.random() * 1.5 + 0.5;
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                particles.push(new Particle(x, y, radius));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityValue * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            setupCanvas();
            init();
            animate();
        };

        setupCanvas();
        init();
        animate();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0" 
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
        }}
      />
    );
};

export default HeroBackground;