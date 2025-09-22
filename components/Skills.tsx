import React, { useRef } from 'react';
import type { SkillCategory, Skill } from '../types';
import { SKILL_CATEGORIES } from '../constants';
import useFadeIn from '../hooks/useFadeIn';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="mb-12">
        <p className="text-sm tracking-widest text-[#6381A8] uppercase mb-2">{subtitle}</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#EAECEF]">{title}</h2>
    </div>
);


const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="flex items-center gap-4 bg-[#101018]/50 p-4 rounded-lg border border-[#6381A8]/20 hover:border-[#6381A8]/40 hover:bg-[#101018]/80 transition-all duration-200">
        <skill.icon className="w-7 h-7 text-[#6381A8]" />
        <span className="text-base text-[#A9B3C1]">{skill.name}</span>
    </div>
);

const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useFadeIn(sectionRef);

    return (
        <section id="skills" ref={sectionRef} className="py-24 md:py-32 opacity-0">
            <SectionHeader title="Core Technologies." subtitle="My Arsenal" />
            <div className="space-y-12">
                {SKILL_CATEGORIES.map((category: SkillCategory) => (
                    <div key={category.title}>
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#EAECEF] mb-6">{category.title}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                            {category.skills.map((skill: Skill) => (
                                <SkillItem key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;