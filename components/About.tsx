import React, { useRef } from 'react';
import useFadeIn from '../hooks/useFadeIn';
import { AtomIcon, CpuChipIcon, LayersIcon } from './ui/Icons';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    useFadeIn(headerRef);
    
    return (
        <div ref={headerRef} className="mb-16 text-center opacity-0">
            <p className="text-sm tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">{subtitle}</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">{title}</h2>
        </div>
    );
};

const principles = [
    {
        icon: <AtomIcon className="w-7 h-7 text-[var(--accent)]" />,
        title: "Quantum Mind",
        content: "I operate from the perspective of a quantum mind in a digital world. As a self-taught architect, I dedicate my entire focus to a solitary, 24/7 cycle of learning and building—transforming complex ideas into tangible tools for mental and spiritual growth."
    },
    {
        icon: <LayersIcon className="w-7 h-7 text-[var(--accent)]" />,
        title: "Solo Architect",
        content: "This portfolio is a direct manifestation of that ethos, engineered from the ground up by me alone. It stands as a testament to a relentless pursuit of mastery and self-reliance, achieved without external support or guidance."
    },
    {
        icon: <CpuChipIcon className="w-7 h-7 text-[var(--accent)]" />,
        title: "Execution Focus",
        content: "My communication is my work. I build powerful digital instruments that aid in healing and elevate consciousness, while also sharing direct strategies for men to build resilience, master self-reliance, and navigate personal hardship."
    }
];

const PrincipleCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }> = ({ icon, title, children, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    useFadeIn(cardRef, delay);

    return (
        <div ref={cardRef} className="bg-gradient-to-b from-[var(--surface)] to-transparent p-6 rounded-xl border border-[var(--border)] opacity-0 h-full">
            <div className="flex items-center gap-4 mb-4">
                {icon}
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">{children}</p>
        </div>
    );
};

const About: React.FC = () => {
    return (
        <section id="principle" className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto">
                <SectionHeader title="The Subatomic Principle." subtitle="My Philosophy" />
                <div className="grid md:grid-cols-3 gap-8">
                    {principles.map((p, index) => (
                        <PrincipleCard
                            key={p.title}
                            icon={p.icon}
                            title={p.title}
                            delay={index * 150}
                        >
                            {p.content}
                        </PrincipleCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;