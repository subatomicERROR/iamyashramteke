import { useEffect, RefObject } from 'react';

const useFadeIn = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          entry.target.classList.add('translate-y-0');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.classList.add('opacity-0', 'transform', 'transition-all', 'duration-1000', 'ease-out', 'translate-y-4');
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
};

export default useFadeIn;
