import React, { useRef } from 'react';
import { GithubIcon, MailIcon } from './ui/Icons';
import useFadeIn from '../hooks/useFadeIn';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="text-center mb-8">
        <p className="text-sm tracking-widest text-[#6381A8] uppercase mb-2">{subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAECEF]">{title}</h2>
    </div>
);


const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    const email = "iamyash.creator@gmail.com";

    return (
        <section id="contact" ref={sectionRef} className="py-24 md:py-32 text-center opacity-0">
            <SectionHeader title="Let's Synchronize." subtitle="Connect" />
            <p className="max-w-2xl mx-auto text-base md:text-lg text-[#A9B3C1] mb-12">
                I am always open to new frequencies of thought and opportunities for collaboration. If my work resonates, or if you have a project that seeks to challenge convention, I invite you to open a channel.
            </p>
            <a
                href={`mailto:${email}`}
                className="inline-block px-10 py-4 bg-[#050509] text-[#EAECEF] font-medium rounded-lg shadow-[inset_0_0_0_1px_rgba(99,129,168,0.2),_0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(99,129,168,0.5),_0_4px_8px_rgba(0,0,0,0.3)] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
                iamyash.creator@gmail.com
            </a>

            <div className="mt-20 flex justify-center gap-8">
                <a href={`mailto:${email}`} className="text-[#A9B3C1] hover:text-[#EAECEF] transition-colors duration-200">
                    <MailIcon className="w-6 h-6" />
                </a>
                <a href="https://github.com/subatomicERROR" target="_blank" rel="noopener noreferrer" className="text-[#A9B3C1] hover:text-[#EAECEF] transition-colors duration-200">
                    <GithubIcon className="w-6 h-6" />
                </a>
            </div>
        </section>
    );
};

export default Contact;