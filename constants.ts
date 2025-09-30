import type { Project, Exploration } from './types';
import { InstagramIcon, AtomIcon, BrainCircuitIcon } from './components/ui/Icons';


export const EXPLORATIONS: Exploration[] = [
  {
    title: '@esotericintelligence',
    description: 'A platform dedicated to elevating the mind and healing. Here, I decode the principles of consciousness, energy, and spiritual growth, offering tools and insights to help you reprogram your reality.',
    url: 'https://www.instagram.com/esotericintelligence',
    icon: AtomIcon
  },
  {
    title: '@subatomicerror',
    description: 'The official hub for my work in AI development. Follow for project showcases, technical insights, and explorations into building intelligent, automated systems with cutting-edge AI.',
    url: 'https://www.instagram.com/subatomicerror',
    icon: InstagramIcon
  },
  {
    title: '@iamyash.io',
    description: 'My personal platform where I teach men how to master solitude, build unwavering consistency, and transmute heartbreak into personal power. A direct look into the philosophies that forge resilience.',
    url: 'https://www.instagram.com/iamyash.io',
    icon: InstagramIcon
  },
];


export const PROJECTS: Project[] = [
  {
    title: 'AgentBash',
    slug: 'agentbash',
    description: "An expert AI development partner that automates entire workflows with a single command. AgentBash uses a multi-agent architecture to generate complete, executable scripts for Windows (PowerShell) and Linux (Bash). Simply provide a high-level goal, approve the AI's intelligent plan, and run the generated script to build full applications, refactor existing code, or automate complex tasks. It's a sophisticated platform that bridges natural language requests and ready-to-run development automation.",
    tags: ['Work in Progress'],
    repoUrl: 'https://github.com/subatomicERROR/agentbash.io',
    liveUrl: 'https://agentbash.vercel.app/',
  }
];