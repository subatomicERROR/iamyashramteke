
import React, { useState, useEffect } from 'react';
import { GithubIcon } from './ui/Icons';

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
        <span className="tracking-wide">
            {`${titles[index].substring(0, subIndex)}`}
            <span className="opacity-50 animate-pulse">|</span>
        </span>
    );
};

const Hero: React.FC = () => {
    const titles = ["Mind Architect", "Digital Healer", "Quantum Thinker", "AI-Developer", "Commercial-Artist"];
    
    const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-start pt-20">
            <div className="max-w-4xl">
                <p className="text-lg text-[#6381A8] mb-4 tracking-widest">YASH R. (subatomicERROR)</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#EAECEF] mb-6">
                   Transcending Code, Elevating Consciousness.
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-[#A9B3C1] font-light h-8 sm:h-10 md:h-12">
                    <TypingEffect titles={titles} />
                </h2>
                <p className="mt-8 max-w-2xl text-[#A9B3C1] text-base sm:text-lg">
                   I craft digital experiences at the nexus of technology and spirituality, designed to serve as a catalyst for self-improvement, healing, and the elevation of consciousness—helping you break free from your own matrix.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                    <button 
                        onClick={scrollToContact} 
                        className="px-8 py-3 bg-[#050509] text-[#EAECEF] font-medium rounded-lg shadow-[inset_0_0_0_1px_rgba(99,129,168,0.2),_0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(99,129,168,0.5),_0_4px_8px_rgba(0,0,0,0.3)] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Initiate Contact
                    </button>
                    <div className="flex gap-6">
                        <a href="https://github.com/subatomicERROR" target="_blank" rel="noopener noreferrer" className="text-[#A9B3C1] hover:text-[#EAECEF] transition-colors duration-200">
                            <GithubIcon className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
