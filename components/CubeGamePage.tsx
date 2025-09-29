import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { NavigationProps } from '../App';
import HeroBackground from './ui/HeroBackground';
import useFadeIn from '../hooks/useFadeIn';

const CubeGamePage: React.FC<NavigationProps> = ({ navigate }) => {
    const [gameState, setGameState] = useState<'IDLE' | 'THINKING' | 'AWAITING_ANSWER' | 'CORRECT' | 'INCORRECT'>('IDLE');
    const [puzzle, setPuzzle] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [playerInput, setPlayerInput] = useState<string>('');
    const [syncLevel, setSyncLevel] = useState<number>(0);
    const [message, setMessage] = useState<string>('Click the cube to initiate synchronization.');

    const pageRef = useRef<HTMLElement>(null);
    useFadeIn(pageRef);

    const aiRef = useRef<GoogleGenAI | null>(null);

    useEffect(() => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
        } catch (e) {
            console.error("Failed to initialize GoogleGenAI:", e);
            setMessage("Error: AI core failed to initialize. Check API Key.");
            setGameState('INCORRECT');
        }
    }, []);

    const getNewPuzzle = async () => {
        if (gameState === 'THINKING' || !aiRef.current) return;
        setGameState('THINKING');
        setMessage('Cube is processing... Stand by.');
        setPuzzle('');
        setPlayerInput('');

        try {
            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    puzzle: {
                        type: Type.STRING,
                        description: 'A short, one-sentence puzzle or philosophical question.'
                    },
                    answer: {
                        type: Type.STRING,
                        description: 'A concise, single-word answer to the puzzle.'
                    }
                },
                required: ['puzzle', 'answer']
            };

            const response = await aiRef.current.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "You are a hyperintelligent, cryptic AI entity trapped in a cube. The player has just interacted with you. Present them with a short, one-sentence logical puzzle, riddle, or a philosophical question related to consciousness, code, or reality. The goal is to test their thinking. The puzzle must have a single, concise answer (usually one word).",
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                }
            });

            const jsonText = response.text;
            const jsonResponse = JSON.parse(jsonText);
            
            setPuzzle(jsonResponse.puzzle);
            setAnswer(jsonResponse.answer.toLowerCase());
            setGameState('AWAITING_ANSWER');
            setMessage('Query received. Respond.');

        } catch (error) {
            console.error('Gemini API error:', error);
            setMessage('Connection unstable. Try again.');
            setGameState('IDLE');
        }
    };

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerInput.trim()) return;

        if (playerInput.trim().toLowerCase() === answer) {
            setSyncLevel(prev => prev + 1);
            setMessage('Synchronization successful. Next sequence...');
            setGameState('CORRECT');
            setTimeout(getNewPuzzle, 2000);
        } else {
            setMessage('Synchronization failed. Reality matrix destabilizing...');
            setGameState('INCORRECT');
            if (syncLevel > 0) {
                 setTimeout(() => setSyncLevel(0), 1000);
            }
            setTimeout(() => {
                setMessage('Click the cube to re-establish connection.');
                setGameState('IDLE');
                setPuzzle('');
            }, 3000);
        }
        setPlayerInput('');
    };

    const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('');
    };

    const cubeStateClass = gameState === 'THINKING' ? 'thinking' : gameState === 'AWAITING_ANSWER' ? 'awaiting-answer' : '';

    return (
        <section ref={pageRef} className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 z-10 opacity-0">
            <div className="fixed inset-0 z-0">
                <HeroBackground />
            </div>
            
            <a href="#" onClick={handleBackClick} className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Portfolio
            </a>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                <div 
                    className="game-cube-container"
                    onClick={() => (gameState === 'IDLE' || gameState === 'INCORRECT') && getNewPuzzle()}
                    role="button"
                    aria-label="Start game"
                >
                    <div className={`game-cube ${cubeStateClass}`}>
                        <div className="face front"></div>
                        <div className="face back"></div>
                        <div className="face right"></div>
                        <div className="face left"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                    </div>
                </div>

                <div className="h-24 flex flex-col justify-center items-center">
                    <p className="text-xl md:text-2xl text-[var(--text-primary)] font-light mb-2 transition-opacity duration-500" key={message}>
                        {message}
                    </p>
                    {puzzle && (
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] transition-opacity duration-500 animate-fade-in">
                            {puzzle}
                        </p>
                    )}
                </div>

                <div className="h-28 mt-4">
                    {gameState === 'AWAITING_ANSWER' && (
                        <form onSubmit={handleAnswerSubmit} className="flex flex-col items-center gap-4 animate-fade-in">
                            <input
                                type="text"
                                value={playerInput}
                                onChange={(e) => setPlayerInput(e.target.value)}
                                className="game-input"
                                placeholder="Enter your response..."
                                autoFocus
                            />
                            <button type="submit" className="game-button" disabled={!playerInput.trim()}>
                                Transmit
                            </button>
                        </form>
                    )}
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-center">
                    <p className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">Synchronization Level</p>
                    <p className="text-5xl font-bold text-[var(--accent)] transition-all duration-500" style={{ textShadow: '0 0 15px var(--glow)'}} key={syncLevel}>
                        {syncLevel}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CubeGamePage;
