import { useEffect, RefObject } from 'react';

const useFadeIn = (ref: RefObject<HTMLElement>, delay: number = 0) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.remove('opacity-0', 'translate-y-4');
          target.classList.add('translate-y-0');
          observer.unobserve(target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.style.transitionDelay = `${delay}ms`;
      currentRef.classList.add('opacity-0', 'transform', 'transition-all', 'duration-1000', 'ease-out', 'translate-y-4');
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