
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 py-8 text-center border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-secondary)]/60">
                Designed & Built by Yash R (subatomicERROR) &copy; {new Date().getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;