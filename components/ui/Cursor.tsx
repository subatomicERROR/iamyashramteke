import React, { useState, useEffect } from 'react';

const Cursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            if (target instanceof HTMLElement) {
                const isInteractive = 
                    target.tagName.toLowerCase() === 'a' ||
                    target.tagName.toLowerCase() === 'button' ||
                    window.getComputedStyle(target).cursor === 'pointer';
                setIsHovering(isInteractive);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const auraStyle: React.CSSProperties = {
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))`,
        width: isHovering ? '48px' : '24px',
        height: isHovering ? '48px' : '24px',
        opacity: isHovering ? 0.15 : 0.3,
    };

    return (
        <div className="aura" style={auraStyle} />
    );
};

export default Cursor;
