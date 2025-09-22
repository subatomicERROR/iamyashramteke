
import React, { useRef } from 'react';
import useFadeIn from '../hooks/useFadeIn';
import { GithubIcon, LinkIcon } from './ui/Icons';
import { PROJECTS } from '../constants';
import { NavigationProps } from '../App';

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
                <a href="#" onClick={handleBackClick} className="ml-4 text-[#6381A8] hover:underline">Go back home</a>
            </div>
        );
    }

    return (
        <section ref={sectionRef} className="min-h-screen pt-24 md:pt-32 pb-16 opacity-0">
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <a href="#" onClick={handleBackClick} className="group inline-flex items-center gap-2 text-sm text-[#A9B3C1] hover:text-[#EAECEF] transition-colors mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Portfolio
                    </a>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#EAECEF] mb-4">{project.title}</h1>
                    
                    <div className="flex items-center gap-6 mb-8">
                        {project.liveUrl && (
                             <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A9B3C1] hover:text-[#EAECEF] transition-colors">
                                <LinkIcon className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A9B3C1] hover:text-[#EAECEF] transition-colors">
                            <GithubIcon className="w-4 h-4" /> View Source
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-[#6381A8]/10 text-[#6381A8] text-xs font-medium px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="text-[#A9B3C1] text-base md:text-lg space-y-6">
                        <p className="text-base sm:text-lg md:text-xl text-[#EAECEF] leading-relaxed">
                            AgentBash is a sophisticated AI-powered platform designed to automate development tasks by generating complete, executable scripts for Windows (PowerShell) and Linux (Bash).
                        </p>
                        <p>
                            It acts as an expert AI development partner that bridges the gap between a natural language request and a ready-to-run, automated development workflow.
                        </p>
                        
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#EAECEF] pt-6 border-t border-[#6381A8]/10 !mt-12">Core Features</h2>
                        
                        <ul className="list-disc pl-5 space-y-4">
                            <li>
                                <strong className="font-bold text-[#EAECEF]">Multi-Agent Architecture:</strong> Instead of a single general AI, AgentBash uses a suite of specialized "agents" like a React Automator, Docker-GPT, CI/CD Automator, and even a Game GPT C++. Each agent is an expert in its domain.
                            </li>
                            <li>
                                <strong className="font-bold text-[#EAECEF]">Complete Application Generation:</strong> Its primary goal is not just to give you code snippets. You give it a high-level goal (e.g., "create a React todo app with Tailwind CSS"), and it generates a single, complete script that, when run, will create the entire project structure, install dependencies, and write all the necessary code to produce a fully functional application.
                            </li>
                            <li>
                                <strong className="font-bold text-[#EAECEF]">Intelligent & Interactive Process:</strong> The AI doesn't just generate code blindly. It follows a professional workflow:
                                <ul className="list-[circle] pl-5 mt-2 space-y-2 text-sm md:text-base">
                                    <li>It analyzes your request.</li>
                                    <li>It presents a clear, step-by-step plan for your approval.</li>
                                    <li>Once you approve the plan, it generates the final script.</li>
                                    <li>It can also help you debug if you run into errors.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="font-bold text-[#EAECEF]">Cross-Platform:</strong> It intelligently generates the correct script type and syntax for the operating system you select at the beginning of a session.
                            </li>
                            <li>
                                <strong className="font-bold text-[#EAECEF]">Developer-Focused Features:</strong> It includes a "Script Book" to save and reuse your favorite scripts and the ability to upload a .zip of an existing project for the AI to analyze, refactor, or add features to.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgentBashPage;
