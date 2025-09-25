
import React, { useRef } from 'react';
import useFadeIn from '../hooks/useFadeIn';
// FIX: The `CodeIcon` is not an exported member of './ui/Icons'. Replaced it with the available `CpuChipIcon` which is semantically appropriate.
import { GithubIcon, LinkIcon, BrainCircuitIcon, CpuChipIcon, LayersIcon } from './ui/Icons';
import { PROJECTS } from '../constants';
import { NavigationProps } from '../App';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gradient-to-br from-[var(--surface)] to-transparent p-6 rounded-xl border border-[var(--border)]">
        <div className="flex items-center gap-4 mb-3">
            {icon}
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{children}</p>
    </div>
);

const AgentBashPage: React.FC<NavigationProps> = ({ navigate }) => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    const project = PROJECTS.find(p => p.slug === 'agentbash');

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('');
    };

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Project not found.</p>
                <a href="#" onClick={handleBackClick} className="ml-4 text-[var(--accent)] hover:underline">Go back home</a>
            </div>
        );
    }

    return (
        <div className="relative z-10">
            <section ref={sectionRef} className="min-h-screen pt-24 md:pt-32 pb-16 opacity-0">
                <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl mx-auto">
                        <a href="#" onClick={handleBackClick} className="group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to Portfolio
                        </a>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--text-primary)] mb-4">{project.title}</h1>
                        
                        <div className="flex items-center gap-6 mb-8">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    <LinkIcon className="w-4 h-4" /> Live Demo
                                </a>
                            )}
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <GithubIcon className="w-4 h-4" /> View Source
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-12">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="text-[var(--text-secondary)] text-base md:text-lg space-y-6">
                            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed">
                                {project.description}
                            </p>
                            
                            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] pt-8 border-t border-[var(--border)] !mt-12">Core Features</h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <FeatureCard icon={<LayersIcon className="w-6 h-6 text-[var(--accent)]" />} title="Multi-Agent Architecture">
                                    Uses a suite of specialized agents, each an expert in its domain (e.g., React, Docker, CI/CD), to handle complex, multi-faceted development tasks with precision.
                                </FeatureCard>
                                <FeatureCard icon={<CpuChipIcon className="w-6 h-6 text-[var(--accent)]" />} title="Full Application Generation">
                                   Generates a single, complete script that builds an entire project structure, installs dependencies, and writes all necessary code for a fully functional application from a high-level goal.
                                </FeatureCard>
                                <FeatureCard icon={<BrainCircuitIcon className="w-6 h-6 text-[var(--accent)]" />} title="Intelligent & Interactive Process">
                                    The AI analyzes your request, presents a clear, step-by-step plan for approval, generates the script, and can even assist with debugging.
                                </FeatureCard>
                                <FeatureCard icon={<GithubIcon className="w-6 h-6 text-[var(--accent)]" />} title="Developer-Focused Tools">
                                    Includes a "Script Book" to save and reuse scripts, and the ability to upload existing projects for AI-powered analysis, refactoring, or feature additions.
                                </FeatureCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AgentBashPage;
