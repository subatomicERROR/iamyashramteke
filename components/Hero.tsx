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
            <span className="opacity-50 animate-pulse font-bold">|</span>
        </span>
    );
};

const Hero: React.FC = () => {
    const titles = ["Founder of .ERROR", "AI Architect", "Software Developer", "Web Developer", "Web Designer", "Machine Learning", "Quantum Thinker", "Lucid Dreamer", "Commercial Artist", "Digital Healer"];
    
    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
        e.preventDefault();
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center text-left pt-20">
            <HeroBackground />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                
                {/* Left Side: Text Content */}
                <div className="md:max-w-3xl">
                    <div className="animate-fade-in mb-4" style={{ animationDelay: '100ms' }}>
                        <p className="text-sm md:text-base text-[var(--accent)] tracking-wider font-medium">
                            <span className="uppercase">YASH R .</span> (subatomicERROR)
                        </p>
                    </div>
                    <h1 
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-primary)] mb-6 hero-heading-effect animate-fade-in"
                        style={{ animationDelay: '200ms' }}
                    >
                       Transcending Code, Elevating Consciousness.
                    </h1>
                    <h2 
                        className="text-2xl sm:text-3xl md:text-4xl text-[var(--text-secondary)] font-light h-10 sm:h-12 md:h-14 mb-2 animate-fade-in"
                        style={{ animationDelay: '300ms' }}
                    >
                        <TypingEffect titles={titles} />
                    </h2>
                    <p 
                        className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8 animate-fade-in"
                        style={{ animationDelay: '400ms' }}
                    >
                        I craft digital tools for healing and share philosophies to elevate consciousness. Through my personal brand, I also guide men on how to master solitude, build unwavering consistency, and transmute heartbreak into strength.
                    </p>
                </div>
                
                {/* Right Side: Buttons */}
                <div 
                    className="flex flex-col items-stretch md:items-end gap-6 w-full md:w-auto animate-fade-in"
                    style={{ animationDelay: '500ms' }}
                >
                    <a 
                        href="#contact"
                        onClick={(e) => scrollTo(e, '#contact')} 
                        className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-[var(--accent)] font-semibold rounded-lg shadow-[0_4px_14px_var(--shadow-color)] hover:shadow-[0_6px_20px_var(--shadow-color-hover)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100 rounded-full"></span>
                        <span className="relative">Get In Touch</span>
                    </a>
                     <a 
                        href="#constructs"
                        onClick={(e) => scrollTo(e, '#constructs')}
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                    >
                        Explore Constructs
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;