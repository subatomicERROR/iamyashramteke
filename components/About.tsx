import React, { useRef } from 'react';
import useFadeIn from '../hooks/useFadeIn';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    useFadeIn(headerRef);
    
    return (
        <div ref={headerRef} className="mb-12 text-center opacity-0">
            <p className="text-sm tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">{subtitle}</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">{title}</h2>
        </div>
    );
};

const About: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    useFadeIn(contentRef, 150);

    return (
        <section id="principle" className="py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-4">
                <SectionHeader title="The Subatomic Principle." subtitle="My Philosophy" />
                <div 
                    ref={contentRef}
                    className="space-y-10 text-center text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed opacity-0"
                >
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">Quantum Mind</h3>
                        <p>
                            I operate from the perspective of a quantum mind in a digital world. As a self-taught architect, I dedicate my entire focus to a solitary, 24/7 cycle of learning and building—transforming complex ideas into tangible tools for mental and spiritual growth.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">Solo Architect</h3>
                        <p>
                           This portfolio is a direct manifestation of that ethos, engineered from the ground up by me alone. It stands as a testament to a relentless pursuit of mastery and self-reliance, achieved without external support or guidance.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">Execution Focus</h3>
                        <p>
                            My communication is my work. I build powerful digital instruments that aid in healing and elevate consciousness, while also sharing direct strategies for men to build resilience, master self-reliance, and navigate personal hardship.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;