import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    // Create an observer that calls a function whenever the element's visibility changes
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state with the new intersection ratio (0.0 to 1.0)
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        // We want to know the ratio, so we create many thresholds
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return [ref, intersectionRatio];
};

export default useScrollAnimation;