import React, { useRef } from 'react';
import { GithubIcon, MailIcon, InstagramIcon } from './ui/Icons';
import useFadeIn from '../hooks/useFadeIn';
import { EXPLORATIONS } from '../constants';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center mb-8">
        <p className="text-sm tracking-widest text-[var(--accent)] uppercase font-semibold mb-2">{subtitle}</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">{title}</h2>
    </div>
);


const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    const email = "iamyash.creator@gmail.com";

    // Sort Instagram links for consistent, professional ordering
    const getOrderScore = (title: string): number => {
        if (title.includes('Official')) return 1;
        if (title.includes('Personal')) return 2;
        if (title.includes('Esoteric')) return 3;
        return 4;
    };

    const instagramLinks = EXPLORATIONS.filter(item => item.url.includes('instagram.com'))
        .sort((a, b) => getOrderScore(a.title) - getOrderScore(b.title));

    return (
        <section id="contact" ref={sectionRef} className="py-24 md:py-32 text-center opacity-0">
            <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-gradient-to-br from-[var(--surface)] to-transparent rounded-2xl border border-[var(--border)] shadow-2xl shadow-black/20">
                <SectionHeader title="Let's Synchronize." subtitle="Connect" />
                <p className="max-w-2xl mx-auto text-base md:text-lg text-[var(--text-secondary)] mb-12">
                    I am always open to new frequencies of thought and opportunities for collaboration. If my work resonates, or if you have a project that seeks to challenge convention, I invite you to open a channel.
                </p>
                <a
                    href={`mailto:${email}`}
                    className="group relative inline-flex items-center justify-center px-10 py-4 bg-black text-[var(--accent)] font-semibold rounded-lg shadow-[0_4px_14px_var(--shadow-color)] hover:shadow-[0_6px_20px_var(--shadow-color-hover)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                    <span className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100 rounded-full"></span>
                    <span className="relative">iamyash.creator@gmail.com</span>
                </a>

                <div className="mt-16 flex justify-center gap-6">
                    <a href={`mailto:${email}`} aria-label="Email" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200">
                        <MailIcon className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/subatomicERROR" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200">
                        <GithubIcon className="w-6 h-6" />
                    </a>
                    
                    {/* Unified Instagram Icon with Popover */}
                    <div className="relative group flex items-center">
                        <button 
                            aria-label="Instagram Profiles" 
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200"
                        >
                            <InstagramIcon className="w-6 h-6" />
                        </button>

                        <div 
                            className="absolute bottom-full left-1/2 mb-3 w-max -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out pointer-events-none group-hover:pointer-events-auto origin-bottom z-10"
                            role="menu"
                        >
                            <div className="bg-black/60 backdrop-blur-lg border border-[var(--border)] rounded-xl shadow-2xl shadow-black/40 p-2 space-y-1">
                                {instagramLinks.map(link => {
                                    const handle = link.url.split('/').pop();
                                    const title = link.title.split('(')[0].trim();
                                    return (
                                        <a 
                                            key={link.title}
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            role="menuitem"
                                            className="flex items-center gap-3 text-left w-full px-3 py-2 rounded-md text-sm text-[var(--text-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            <div>
                                                <p className="font-semibold text-[var(--text-primary)]">{title}</p>
                                                <p className="text-xs text-[var(--text-secondary)]/80">@{handle}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;