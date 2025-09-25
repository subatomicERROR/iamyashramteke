import React, { useState, useEffect } from 'react';
import HeroBackground from './ui/HeroBackground';

const TypingEffect: React.FC<{ titles: string[] }> = ({ titles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === titles[index].length && !reverse) {
            setTimeout(() => setReverse(true), 2000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % titles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 120);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, titles]);

    return (
        <span className="tracking-wide text-[var(--text-primary)]">
            {`${titles[index].substring(0, subIndex)}`}
            <span className="opacity-50 animate-pulse">|</span>
        </span>
    );
};

const Hero: React.FC = () => {
    const titles = ["AI-Developer", "Mind Architect", "Quantum Thinker", "Digital Healer", "Commercial-Artist", "Lucid-Dreamer", "Polymathical Mind"];
    
    const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center items-start pt-20 overflow-hidden">
            <HeroBackground />
            <div className="relative z-10 max-w-4xl">
                <p className="text-lg text-[var(--accent)] mb-4 tracking-widest font-medium">YASH R. (subatomicERROR)</p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-primary)] mb-6">
                   Transcending Code, Elevating Consciousness.
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--text-secondary)] font-light h-10 sm:h-12 md:h-14">
                    <TypingEffect titles={titles} />
                </h2>
                <p className="mt-8 max-w-2xl text-[var(--text-secondary)] text-base sm:text-lg">
                   I craft digital tools for healing and share philosophies to elevate consciousness. Through my personal brand, I also guide men on how to master solitude, build unwavering consistency, and transmute heartbreak into strength.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                    <button 
                        onClick={scrollToContact} 
                        className="px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-lg shadow-[0_4px_14px_rgba(56,116,232,0.3)] hover:shadow-[0_6px_20px_rgba(56,116,232,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Initiate Contact
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;