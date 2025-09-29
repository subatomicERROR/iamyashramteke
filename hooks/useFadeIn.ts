import { useEffect, RefObject } from 'react';

const useFadeIn = (ref: RefObject<HTMLElement>, delay: number = 0) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0px)';
          target.style.willChange = 'auto'; // Reset after animation
          observer.unobserve(target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      // Set initial state and transition properties for a smoother animation
      currentRef.style.opacity = '0';
      currentRef.style.transform = 'translateY(20px)';
      currentRef.style.transitionProperty = 'opacity, transform';
      currentRef.style.transitionDuration = '800ms';
      currentRef.style.transitionTimingFunction = 'cubic-bezier(0.17, 0.55, 0.55, 1)'; // ease-out-cubic
      currentRef.style.transitionDelay = `${delay}ms`;
      currentRef.style.willChange = 'transform, opacity';
      
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, delay]);
};

export default useFadeIn;