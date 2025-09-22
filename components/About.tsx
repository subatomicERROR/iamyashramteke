import React, { useRef } from 'react';
import useFadeIn from '../hooks/useFadeIn';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-12">
        <p className="text-sm tracking-widest text-[#6381A8] uppercase mb-2">{subtitle}</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EAECEF]">{title}</h2>
    </div>
);

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    return (
        <section id="about" ref={sectionRef} className="py-24 md:py-32 opacity-0">
            <div className="max-w-4xl mx-auto">
                <SectionHeader title="The Subatomic Principle." subtitle="About Me" />
                <div className="text-base md:text-lg text-[#A9B3C1] space-y-6">
                    <p>
                        I operate from the perspective of a quantum mind in a digital world. As a self-taught architect, I dedicate my entire focus to a solitary, 24/7 cycle of learning and building—transforming complex ideas into tangible tools for mental and spiritual growth.
                    </p>
                    <p>
                        This portfolio is a direct manifestation of that ethos, engineered from the ground up by me alone. It stands as a testament to a relentless pursuit of mastery and self-reliance, achieved without external support or guidance.
                    </p>
                    <p>
                        My communication is my work; I prioritize execution over explanation. My mission is to build powerful digital instruments that aid in healing, elevate consciousness, and empower individuals on their journey of self-realization.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;