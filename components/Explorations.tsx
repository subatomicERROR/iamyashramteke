import React, { useRef } from 'react';
import { EXPLORATIONS } from '../constants';
import useFadeIn from '../hooks/useFadeIn';

type ExplorationCardProps = {
    item: {
        title: string;
        description: string;
        url: string;
        icon: React.ComponentType<{ className?: string }>;
    };
};

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-12">
        <p className="text-sm tracking-widest text-[#6381A8] uppercase mb-2">{subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAECEF]">{title}</h2>
    </div>
);

const ExplorationCard: React.FC<ExplorationCardProps> = ({ item }) => {
    return (
        <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-[#101018]/50 backdrop-blur-lg rounded-xl p-6 border border-[#6381A8]/20 transition-all duration-300 hover:border-[#6381A8]/40 hover:-translate-y-1 group"
        >
            <div className="flex items-start gap-4">
                <div className="mt-1">
                    <item.icon className="w-6 h-6 text-[#6381A8] transition-colors duration-300 group-hover:text-[#EAECEF]" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-[#EAECEF] mb-1">{item.title}</h3>
                    <p className="text-[#A9B3C1] text-sm leading-relaxed">{item.description}</p>
                </div>
            </div>
        </a>
    );
};

const Explorations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    const gridContainerClass = EXPLORATIONS.length > 1
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "max-w-2xl mx-auto";

    return (
        <section id="explorations" ref={sectionRef} className="py-24 md:py-32 opacity-0">
            <SectionHeader title="Further Explorations." subtitle="Beyond the Code" />
            <div className={gridContainerClass}>
                {EXPLORATIONS.map(item => (
                    <ExplorationCard key={item.title} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Explorations;
