import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting (visible), set isVisible to true
      if (entry.isIntersecting) {
        setIsVisible(true);
        // We can unobserve after it becomes visible to prevent re-triggering
        observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

export default useScrollAnimation;