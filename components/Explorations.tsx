import React, { useRef } from 'react';
import { EXPLORATIONS } from '../constants';
import useFadeIn from '../hooks/useFadeIn';
import type { Exploration } from '../types';
import type { NavigationProps } from '../App';

type ExplorationCardProps = {
    item: Exploration;
    delay: number;
} & NavigationProps;

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

const ExplorationCard: React.FC<ExplorationCardProps> = ({ item, delay, navigate }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    useFadeIn(cardRef, delay);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.slug) {
            e.preventDefault();
            navigate(`/exploration/${item.slug}`);
        }
    };

    return (
        <a 
            ref={cardRef}
            href={item.url || '#'} 
            onClick={handleClick}
            target={item.url ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="block bg-gradient-to-br from-[var(--surface)] to-transparent rounded-xl p-6 border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:-translate-y-1 group opacity-0"
        >
            <div className="flex items-start gap-5">
                <div className="mt-1 bg-gradient-to-br from-[var(--surface-inset)] to-transparent p-2 rounded-md border border-[var(--border)]">
                    <item.icon className="w-7 h-7 text-[var(--accent)] transition-colors duration-300 group-hover:text-[var(--text-primary)]" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.description}</p>
                </div>
            </div>
        </a>
    );
};

const Explorations: React.FC<NavigationProps> = ({ navigate }) => {
    const gridContainerClass = EXPLORATIONS.length > 1
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        : "max-w-3xl mx-auto";

    return (
        <section id="explorations" className="py-24 md:py-32">
            <SectionHeader title="Further Explorations." subtitle="Beyond the Code" />
            <div className={gridContainerClass}>
                {EXPLORATIONS.map((item, index) => (
                    <ExplorationCard key={item.title} item={item} delay={index * 150} navigate={navigate} />
                ))}
            </div>
        </section>
    );
};

export default Explorations;