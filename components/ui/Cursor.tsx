import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        // Directly update the cursor's position for the lowest possible latency.
        // This bypasses the requestAnimationFrame loop, tying the cursor's
        // update rate to the mouse's polling rate.
        const handleMouseMove = (e: MouseEvent) => {
            cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };
        
        const handleMouseLeaveWindow = () => {
            cursorEl.style.opacity = '0';
        };

        const handleMouseEnterWindow = () => {
            cursorEl.style.opacity = '1';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow);
        document.documentElement.addEventListener('mouseenter', handleMouseEnterWindow);
        
        // A small delay to fade in the cursor after initial render,
        // preventing it from flashing at a default position.
        const timer = setTimeout(() => {
            cursorEl.style.opacity = '1';
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnterWindow);
        };
    }, []);

    return (
        <div ref={cursorRef} className="cursor-pointer" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M4.26 4.26l15.48 7.74-7.74 1.94-1.94 7.74L4.26 4.26z" 
                    strokeWidth="1"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Cursor;