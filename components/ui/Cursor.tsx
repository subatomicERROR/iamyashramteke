import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const cursorPos = useRef({ x: -100, y: -100 });
    const opacity = useRef(1);
    const rafId = useRef<number | null>(null);
    
    // Only tracks if the mouse is inside the window.
    const isVisibleRef = useRef(true);

    // Linear interpolation for smooth movement
    const lerp = (start: number, end: number, t: number): number => {
        return start * (1 - t) + end * t;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        
        const handleMouseLeaveWindow = () => { isVisibleRef.current = false; };
        const handleMouseEnterWindow = () => { isVisibleRef.current = true; };

        // Simplified event listeners for core functionality
        window.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow);
        document.documentElement.addEventListener('mouseenter', handleMouseEnterWindow);
        
        const animate = () => {
            // --- Position Update ---
            // A very high interpolation factor for a near-instantaneous 1:1 feel.
            const speed = 0.9;
            cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, speed);
            cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, speed);
            
            // --- Visibility Update ---
            const targetOpacity = isVisibleRef.current ? 1 : 0;
            // A faster interpolation speed for quick fade-in/out.
            const opacitySpeed = 0.2;
            opacity.current = lerp(opacity.current, targetOpacity, opacitySpeed);

            // Apply the simplified transform and opacity to the DOM element
            if (cursorRef.current) {
                // Removed scale and rotation for a clean, professional look.
                cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
                cursorRef.current.style.opacity = `${opacity.current}`;
            }
            
            rafId.current = requestAnimationFrame(animate);
        };
        
        rafId.current = requestAnimationFrame(animate);

        // Cleanup listeners and animation frame on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnterWindow);
            if(rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div 
            ref={cursorRef} 
            className="cyan-arrow-cursor"
            style={{ 
                transform: 'translate(-100px, -100px)', // Initial off-screen position
                opacity: 1 
            }}
            aria-hidden="true" // Hide from screen readers
        >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M4.26 4.26l15.48 7.74-7.74 1.94-1.94 7.74L4.26 4.26z" 
                    fill="#00FFFF"
                    stroke="#00FFFF"
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Cursor;