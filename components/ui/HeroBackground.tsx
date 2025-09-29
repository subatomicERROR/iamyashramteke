import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
    const particlesRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const particlesContainer = particlesRef.current;
        const shapesContainer = shapesRef.current;
        
        if (particlesContainer) {
            // Prevent duplicating particles on hot reloads
            while (particlesContainer.firstChild) {
                particlesContainer.removeChild(particlesContainer.firstChild);
            }
            
            const particleCount = 50;
            const particleFragment = document.createDocumentFragment();

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const left = Math.random() * 100;
                const duration = 15 + Math.random() * 15;
                const delay = Math.random() * 20;
                
                particle.style.left = `${left}vw`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `-${delay}s`;
                
                particleFragment.appendChild(particle);
            }
            particlesContainer.appendChild(particleFragment);
        }

        if (shapesContainer) {
            while (shapesContainer.firstChild) {
                shapesContainer.removeChild(shapesContainer.firstChild);
            }

            const shapeCount = 7; // Increased from 5
            const shapeFragment = document.createDocumentFragment();

            for (let i = 0; i < shapeCount; i++) {
                const shape = document.createElement('div');
                shape.className = 'shape';

                const left = Math.random() * 100;
                const size = 40 + Math.random() * 110; // e.g., 40px to 150px
                const duration = 25 + Math.random() * 20; // e.g., 25s to 45s
                const delay = Math.random() * 35;

                shape.style.left = `${left}vw`;
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                shape.style.animationDuration = `${duration}s`;
                shape.style.animationDelay = `-${delay}s`;

                shapeFragment.appendChild(shape);
            }
            shapesContainer.appendChild(shapeFragment);
        }

    }, []);

    return (
        <div className="hero-live-bg absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0">
            <div className="floating-shapes" ref={shapesRef}>
                {/* Shapes are now generated dynamically */}
            </div>
            
            <div className="geometric-lines">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
                <div className="line line-4"></div>
                <div className="line line-5"></div>
            </div>
            
            <div className="particles" ref={particlesRef}></div>
        </div>
    );
};

export default HeroBackground;