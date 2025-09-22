import type { Project, SkillCategory } from './types';
import { PythonIcon, ReactIcon, TypeScriptIcon, NodeIcon, DockerIcon, GitIcon, TailwindIcon, TensorFlowIcon, PyTorchIcon, LangChainIcon, NextJsIcon, FastApiIcon, GCPIcon, VercelIcon } from './components/ui/Icons';
import { InstagramIcon, BrainCircuitIcon, LineChartIcon } from './components/ui/Icons';


export const EXPLORATIONS = [
  {
    title: 'Esoteric Intelligence',
    description: 'A direct transmission of my thoughts, decoding reality through a quantum spiritual lens. I share my explorations into the interwoven secrets of spirit, mind, and energy. If you seek to be part of this journey, follow my account to tap into the stream.',
    url: 'https://www.instagram.com/esotericintelligence',
    icon: BrainCircuitIcon
  },
];


export const PROJECTS: Project[] = [
  {
    title: 'AgentBash',
    slug: 'agentbash',
    description: "An expert AI development partner that automates entire workflows with a single command. AgentBash uses a multi-agent architecture to generate complete, executable scripts for Windows (PowerShell) and Linux (Bash). Simply provide a high-level goal, approve the AI's intelligent plan, and run the generated script to build full applications, refactor existing code, or automate complex tasks. It's a sophisticated platform that bridges natural language requests and ready-to-run development automation, powered by Gemini Flash.",
    tags: ['Work in Progress'],
    repoUrl: 'https://github.com/subatomicERROR',
    liveUrl: 'https://agentbash.vercel.app/',
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI/ML',
    skills: [
      { name: 'Python', icon: PythonIcon },
      { name: 'TensorFlow', icon: TensorFlowIcon },
      { name: 'PyTorch', icon: PyTorchIcon },
      { name: 'LangChain', icon: LangChainIcon },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: ReactIcon },
      { name: 'TypeScript', icon: TypeScriptIcon },
      { name: 'Next.js', icon: NextJsIcon },
      { name: 'Tailwind CSS', icon: TailwindIcon },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: NodeIcon },
      { name: 'Python', icon: PythonIcon },
      { name: 'FastAPI', icon: FastApiIcon },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: GitIcon },
      { name: 'Docker', icon: DockerIcon },
      { name: 'GCP', icon: GCPIcon },
      { name: 'Vercel', icon: VercelIcon },
    ],
  },
];