import React, { useState, useEffect } from 'react';

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'Principle' },
        { href: '#projects', label: 'Constructs' },
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

    // Effect to lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset overflow if the component unmounts while menu is open
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };
    
    const Logo = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#EAECEF] hover:text-[#6381A8] transition-colors">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050509]/50 backdrop-blur-lg border-b border-[#6381A8]/10' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex justify-between items-center h-16">
                    <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="z-50">
                       <Logo />
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(({ href, label }) => (
                            <a key={label} href={href} onClick={(e) => scrollToSection(e, href)}
                                className={`text-sm tracking-wide transition-colors duration-300 relative ${activeSection === href.substring(1) ? 'text-[#EAECEF]' : 'text-[#A9B3C1] hover:text-[#EAECEF]'}`}>
                                {label}
                                {activeSection === href.substring(1) && (
                                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1.5 h-1.5 bg-[#6381A8] rounded-full" />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden z-50 text-[#EAECEF]" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={isOpen ? "M18 6L6 18" : "M4 6H20"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}/>
                            <path d={isOpen ? "M6 6L18 18" : "M4 18H20"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Nav */}
            <div className={`md:hidden fixed inset-0 bg-[#050509]/95 backdrop-blur-xl z-40 transform transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-10">
                    {navLinks.map(({ href, label }) => (
                        <a key={label} href={href} onClick={(e) => scrollToSection(e, href)} className="text-3xl font-light text-[#A9B3C1] hover:text-[#EAECEF] transition-colors">
                            {label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Header;