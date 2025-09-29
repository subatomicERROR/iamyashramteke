import React, { useRef, useState, MouseEvent } from 'react';
import type { Project } from '../types';
import { PROJECTS } from '../constants';
import { GithubIcon, ChevronRightIcon } from './ui/Icons';
import useFadeIn from '../hooks/useFadeIn';
import { NavigationProps } from '../App';

const ProjectCard: React.FC<{ project: Project, delay: number } & NavigationProps> = ({ project, navigate, delay }) => {
    const cardRef = useRef<any>(null);
    useFadeIn(cardRef, delay);

    const [glowStyle, setGlowStyle] = useState({});

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const card = e.currentTarget;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setGlowStyle({
            background: `radial-gradient(circle at ${x}px ${y}px, var(--glow), transparent 40%)`
        });
    };

    const handleMouseLeave = () => {
        setGlowStyle({});
    };


    // FIX: Changed the event type to MouseEvent<HTMLElement> to make it compatible with both 'a' and 'div' elements.
    const handleProjectClick = (e: MouseEvent<HTMLElement>, slug?: string) => {
        if (slug) {
            e.preventDefault();
            navigate(`/project/${slug}`);
        }
    };
    
    const isClickable = !!project.slug;

    const cardInnerContent = (
        <>
            <div className="absolute inset-0 transition-all duration-300" style={glowStyle}></div>
            <div className="relative z-10 flex flex-col flex-grow h-full p-6">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)]">{project.title}</h3>
                        <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
                                <GithubIcon className="w-5 h-5" />
                            </a>
                            {project.liveUrl && !isClickable && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors text-sm font-medium">
                                    Live URL
                                </a>
                            )}
                        </div>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {isClickable && (
                        <div className="flex items-center text-sm font-medium text-[var(--accent)] group-hover:text-[var(--text-primary)] transition-colors">
                            View Case Study
                            <ChevronRightIcon className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const commonProps = {
        className: `relative bg-gradient-to-br from-[var(--surface)] to-transparent rounded-xl flex flex-col border border-[var(--border)] transition-all duration-300 ease-out hover:border-[var(--accent)]/70 hover:-translate-y-2 hover:shadow-[0_0_25px_var(--glow)] group overflow-hidden ${isClickable ? 'clickable-card-glow' : ''}`,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };
    
    const Tag = isClickable ? 'a' : 'div';
    
    return (
        <Tag
            href={isClickable ? "#" : undefined}
            ref={cardRef}
            // FIX: Removed explicit type annotation to allow TypeScript to infer the correct event type, resolving the mismatch.
            onClick={(e) => handleProjectClick(e, project.slug)}
            {...commonProps}
        >
            {cardInnerContent}
        </Tag>
    );
};

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    useFadeIn(headerRef);

    return (
        <div ref={headerRef} className="mb-16 text-center">
            <p className="text-sm tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">{subtitle}</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">{title}</h2>
        </div>
    );
};


const Projects: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <section id="constructs" className="py-24 md:py-32">
            <div className="max-w-5xl mx-auto">
                <SectionHeader title="Digital Constructs." subtitle="My Work" />
                {PROJECTS.length === 1 ? (
                    <div className="max-w-2xl mx-auto">
                         <ProjectCard project={PROJECTS[0]} navigate={navigate} delay={0} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={project.title} project={project} navigate={navigate} delay={index * 150} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;