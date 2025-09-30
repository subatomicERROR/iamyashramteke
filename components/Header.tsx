import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './ui/Icons';

type Theme = 'light' | 'dark';

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const initialTheme = document.documentElement.getAttribute('data-theme');
            if (initialTheme === 'light' || initialTheme === 'dark') {
                return initialTheme;
            }
        }
        return 'dark'; // Fallback
    });

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#principle', label: 'Principle' },
        { href: '#constructs', label: 'Constructs' },
        { href: '#explorations', label: 'Explorations' },
        { href: '#contact', label: 'Connect' },
    ];
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            window.localStorage.setItem('theme', theme);
        } catch (e) {
            console.error("Failed to set theme in localStorage", e);
        }
    }, [theme]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, [isOpen]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };
    
    const Logo = () => (
        <div className="logo-container p-2">
            <svg aria-label="Seed of Life Logo" role="img" width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="sol_clip_path">
                        <circle cx="50" cy="50" r="50" />
                    </clipPath>
                </defs>
                <g clip-path="url(#sol_clip_path)">
                    {/* The 7 circles of the Seed of Life */}
                    <circle cx="50" cy="50" r="24" />
                    <circle cx="50" cy="26" r="24" />
                    {/* The coordinates for the outer circles are calculated based on a hexagon */}
                    <circle cx="70.78" cy="40" r="24" />
                    <circle cx="70.78" cy="60" r="24" />
                    <circle cx="50" cy="74" r="24" />
                    <circle cx="29.21" cy="60" r="24" />
                    <circle cx="29.21" cy="40" r="24" />
                </g>
            </svg>
        </div>
    );

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]">
                <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center h-20">
                    <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="z-50">
                       <Logo />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4">
                        <nav className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-1">
                            {navLinks.map(({ href, label }) => (
                                <a key={label} href={href} onClick={(e) => scrollToSection(e, href)}
                                    className={`text-sm tracking-wide transition-colors duration-300 px-4 py-2 rounded-lg ${activeSection === href.substring(1) ? 'text-[var(--text-primary)] bg-[var(--accent)]/20' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                                    {label}
                                </a>
                            ))}
                        </nav>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/80 transition-all"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                    </div>


                    {/* Mobile Menu Button */}
                    <button className="md:hidden z-50 text-[var(--text-primary)]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={isOpen ? "M18 6L6 18" : "M4 6H20"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}/>
                            <path d={isOpen ? "M6 6L18 18" : "M4 18H20"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Nav */}
            <div className={`md:hidden fixed inset-0 bg-[var(--background)]/95 backdrop-blur-xl z-40 transform transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-10">
                    {navLinks.map(({ href, label }) => (
                        <a key={label} href={href} onClick={(e) => scrollToSection(e, href)} className="text-3xl font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            {label}
                        </a>
                    ))}
                </nav>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                         {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;