import React from 'react';

type IconProps = {
    className?: string;
};

export const GithubIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
);

export const MailIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a4 4 0 0 0-4 4v2.4a6.6 6.6 0 0 1-1.2.3L4.2 9.5a2.5 2.5 0 0 0-2.7 3.9l.3.4a2.5 2.5 0 0 1 0 3.2l-.3.4a2.5 2.5 0 0 0 2.7 3.9l2.6-.8a6.6 6.6 0 0 1 1.2.3V20a4 4 0 0 0 8 0v-2.4a6.6 6.6 0 0 1 1.2-.3l2.6.8a2.5 2.5 0 0 0 2.7-3.9l-.3-.4a2.5 2.5 0 0 1 0-3.2l.3-.4a2.5 2.5 0 0 0-2.7-3.9l-2.6.8a6.6 6.6 0 0 1-1.2-.3V6a4 4 0 0 0-4-4Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);


export const LineChartIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);


export const PythonIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14.4,11.43c-1.48-1.48-2.62-2.62-3.46-3.46a3.29,3.29,0,0,1-1-2.48A3.2,3.2,0,0,1,13.2,2.22a3.2,3.2,0,0,1,3.27,3.27,3.29,3.29,0,0,1-2.48,1H14.4v2.54h-2.9v-2.9h2.54a3.29,3.29,0,0,1,1-2.48,3.2,3.2,0,0,1,3.27-3.27,3.2,3.2,0,0,1,3.27,3.27v6.86A3.2,3.2,0,0,1,18.4,15.6a3.2,3.2,0,0,1-3.27-3.27,3.29,3.29,0,0,1,2.48-1v-2.54h-2.54Z"/>
        <path d="M9.6,12.57c1.48,1.48,2.62,2.62,3.46,3.46a3.29,3.29,0,0,1,1,2.48,3.2,3.2,0,0,1-3.27,3.27,3.2,3.2,0,0,1-3.27-3.27,3.29,3.29,0,0,1,2.48-1h-2.54V14.4h2.9v2.9H9.6a3.29,3.29,0,0,1-1,2.48A3.2,3.2,0,0,1,5.33,21.78a3.2,3.2,0,0,1-3.27-3.27V11.65A3.2,3.2,0,0,1,5.33,8.4a3.2,3.2,0,0,1,3.27,3.27,3.29,3.29,0,0,1-2.48,1v2.54h2.54Z"/>
    </svg>
);
export const ReactIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><circle cx="12" cy="12" r="2"/><path d="M12,2A10,10,0,0,0,5.1,4.45l.9.52a8,8,0,1,1,0,14.06l-.9.52A10,10,0,1,0,12,2Z" transform="rotate(60 12 12)"/><path d="M12,2A10,10,0,0,0,5.1,4.45l.9.52a8,8,0,1,1,0,14.06l-.9.52A10,10,0,1,0,12,2Z" transform="rotate(120 12 12)"/><path d="M12,2A10,10,0,0,0,5.1,4.45l.9.52a8,8,0,1,1,0,14.06l-.9.52A10,10,0,1,0,12,2Z"/></svg>);
export const TypeScriptIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M1.5 1.5v21h21v-21h-21zM11.9 16.4h-2.3v-5.6h2.2c1.7 0 2.4.8 2.4 2.3v1c0 1.5-.7 2.3-2.3 2.3zM19.3 16.4h-2.4l-2.6-4.5v4.5h-2.1v-8.8h2.1l2.5 4.4v-4.4h2.4v8.8zM10.8 12.3v1c0 .7-.3 1.1-1.1 1.1h-1.1v-3.2h1.1c.8 0 1.1.4 1.1 1.1z"/></svg>);
export const NodeIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.36 12.2a.57.57 0 0 1-.56.57H6.2a.57.57 0 0 1-.57-.57v-4.4a.57.57 0 0 1 .57-.57h1.59v5.54h1.06v-6.7h1.58v6.7h1.07v-5.54h1.58v5.54h1.07v-4.4h1.6a.57.57 0 0 1 .56.57z"/></svg>);
export const DockerIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21.17 9.43c-1.25-.33-2.06-1.55-2.06-2.83 0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1c0 1.28-.82 2.5-2.06 2.83L22.25 18H2.75v-8.57L21.17 9.43zM5.75 11v-1.57h1.5v1.57h-1.5zm3 0v-1.57h1.5v1.57h-1.5zm3 0v-1.57h1.5v1.57h-1.5zm3 0v-1.57h1.5v1.57h-1.5zm3 0v-1.57h1.5v1.57h-1.5z"/></svg>);
export const GitIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.2 9.6c-.3-.2-.7-.1-1 .1L13 15.6V5.5c0-.8-.7-1.5-1.5-1.5h-1C9.7 4 9 4.7 9 5.5v10.1l-8.2-5.9c-.3-.2-.7-.3-1-.1s-.5.5-.5.9v10.9c0 .4.2.7.5.9.3.2.7.1 1-.1L9 16.5v2c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5v-2l8.2 5.9c.3.2.7.3 1 .1s.5-.5.5-.9V10.5c0-.4-.2-.7-.5-.9z"/></svg>);
export const TailwindIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm-4.5-8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm9 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/></svg>);
export const TensorFlowIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L3 7.5V16.5L12 22L21 16.5V7.5L12 2ZM11.5 10.5H8V13.5H11.5V20.5H13.5V13.5H17V10.5H13.5V3.5H11.5V10.5Z"/></svg>);
export const PyTorchIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5-6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>);
export const LangChainIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>);
export const NextJsIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.1 14.29V7.71h2.2v8.58h-2.2zm4.7-8.58L12 16.29 8.4 7.71h2.2l1.4 4.89 1.4-4.89h2.2z"/></svg>);
export const FastApiIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 13h-2v-2h2v2zm0-4h-2V9h2v2zm-4 4H8v-2h4v2zm0-4H8V9h4v2z"/></svg>);
export const GCPIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>);
export const VercelIcon: React.FC<IconProps> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L2 7l10 5 10-5-10-5zm0 11.5L2 19l10 5 10-5-10-5z"/></svg>);