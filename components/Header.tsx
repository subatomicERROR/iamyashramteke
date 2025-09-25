import React, { useState, useEffect } from 'react';

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#principle', label: 'Principle' },
        { href: '#constructs', label: 'Constructs' },
        { href: '#explorations', label: 'Explorations' },
        { href: '#contact', label: 'Connect' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };
    
    const Logo = () => (
        <div className="flex items-center justify-center w-8 h-8 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        </div>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-lg border-[var(--border)]' : 'bg-transparent border-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center h-20">
                    <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="z-50">
                       <Logo />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-full p-1">
                        {navLinks.map(({ href, label }) => (
                            <a key={label} href={href} onClick={(e) => scrollToSection(e, href)}
                                className={`text-sm tracking-wide transition-colors duration-300 px-4 py-2 rounded-full ${activeSection === href.substring(1) ? 'text-[var(--text-primary)] bg-[var(--accent)]/20' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                                {label}
                            </a>
                        ))}
                    </nav>

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
            </div>
        </>
    );
};

export default Header;