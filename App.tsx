import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Explorations from './components/Explorations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/ui/Cursor';
import AgentBashPage from './components/AgentBashPage';

export interface NavigationProps {
  navigate: (path: string) => void;
}

const App: React.FC = () => {
  const [route, setRoute] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkForTouch = () => {
      // A reliable way to check for touch devices
      return ( 'ontouchstart' in window ) ||
             ( navigator.maxTouchPoints > 0 );
    };
    setIsTouchDevice(checkForTouch());
  }, []);
  
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const root = document.getElementById('root');

    if (preloader && root) {
      // A small delay to ensure the app has had a moment to render,
      // preventing a jarring flash if it loads too quickly.
      setTimeout(() => {
          root.classList.add('loaded');
          preloader.classList.add('hidden');
          preloader.addEventListener('transitionend', () => {
              try {
                if (preloader.parentNode) {
                  preloader.parentNode.removeChild(preloader);
                }
              } catch (e) {
                console.error("Error removing preloader:", e);
              }
          }, { once: true });
      }, 200);
    }
  }, []);

  const navigate = (path: string) => {
    window.scrollTo(0, 0);
    setRoute(path);
  };

  const MainPortfolio: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-40% 0px -60% 0px' }
      );

      const sections = ['home', 'principle', 'constructs', 'explorations', 'contact'];
      const observedElements: HTMLElement[] = [];
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          sectionsRef.current[id] = element;
          observer.observe(element);
          observedElements.push(element);
        }
      });

      return () => {
        observedElements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }, []);
    
    return (
      <>
        <Header activeSection={activeSection} />
        <main className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <Hero />
          <About />
          <Projects navigate={navigate} />
          <Explorations navigate={navigate} />
          <Contact />
        </main>
        <Footer />
      </>
    );
  };
  
  const renderContent = () => {
    if (route.startsWith('/project/agentbash')) {
      return <AgentBashPage navigate={navigate} />;
    }
    return <MainPortfolio />;
  };

  return (
    <div className="bg-transparent text-[#A9B3C1] min-h-screen overflow-x-hidden antialiased">
      {!isTouchDevice && <Cursor />}
      {renderContent()}
    </div>
  );
};

export default App;