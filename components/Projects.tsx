
import React, { useRef, useState, MouseEvent } from 'react';
import type { Project } from '../types';
import { PROJECTS } from '../constants';
import { GithubIcon } from './ui/Icons';
import useFadeIn from '../hooks/useFadeIn';
import { NavigationProps } from '../App';

const ProjectCard: React.FC<{ project: Project } & NavigationProps> = ({ project, navigate }) => {
    // FIX: Removed useRef and switched to using event.currentTarget in handleMouseMove.
    // This resolves TypeScript errors caused by applying a generic HTMLElement ref to specific
    // HTMLAnchorElement and HTMLDivElement elements, which have incompatible ref types.
    const [glowStyle, setGlowStyle] = useState({});

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        const card = e.currentTarget;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setGlowStyle({
            background: `radial-gradient(circle at ${x}px ${y}px, rgba(99, 129, 168, 0.15), transparent 40%)`
        });
    };

    const handleMouseLeave = () => {
        setGlowStyle({});
    };

    const handleProjectClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault();
        navigate(`/project/${slug}`);
    };

    const cardInnerContent = (
        <>
            <div className="absolute inset-0 transition-all duration-300" style={glowStyle}></div>
            <div className="relative z-10 flex flex-col flex-grow h-full">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#EAECEF]">{project.title}</h3>
                        {!project.slug && (
                            <div className="flex items-center gap-4 text-[#A9B3C1]">
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#EAECEF] transition-colors">
                                    <GithubIcon className="w-5 h-5" />
                                </a>
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#EAECEF] transition-colors text-sm font-medium">
                                        Live URL
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="text-[#A9B3C1] mb-6 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-[#6381A8]/10 text-[#6381A8] text-xs font-medium px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );

    const commonProps = {
        className: "relative bg-[#101018]/50 backdrop-blur-lg rounded-xl p-6 flex flex-col border border-[#6381A8]/20 transition-all duration-300 hover:border-[#6381A8]/40 hover:-translate-y-1 group overflow-hidden",
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };

    if (project.slug) {
        return (
            <a href="#" onClick={(e) => handleProjectClick(e, project.slug!)} {...commonProps}>
                {cardInnerContent}
            </a>
        );
    }
    
    return (
        <div {...commonProps}>
            {cardInnerContent}
        </div>
    );
};

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-12">
        <p className="text-sm tracking-widest text-[#6381A8] uppercase mb-2">{subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAECEF]">{title}</h2>
    </div>
);


const Projects: React.FC<NavigationProps> = ({ navigate }) => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    return (
        <section id="projects" ref={sectionRef} className="py-24 md:py-32 opacity-0">
            <SectionHeader title="Digital Constructs." subtitle="My Work" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map(project => (
                    <ProjectCard key={project.title} project={project} navigate={navigate} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
