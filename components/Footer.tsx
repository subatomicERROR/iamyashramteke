import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 py-8 text-center border-t border-[#6381A8]/10">
            <p className="text-sm text-[#A9B3C1]/50">
                Designed & Built by Yash R (subatomicERROR) &copy; {new Date().getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;