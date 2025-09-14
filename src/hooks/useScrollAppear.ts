import { useEffect, useRef, useState } from 'react';

export function useScrollAppear<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const isInView = rect.top < windowHeight - 80 && rect.bottom > 80;

      // Detecta direção do scroll
      const goingDown = window.scrollY > lastY;
      lastY = window.scrollY;

      if (isInView && goingDown) {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [ref, isVisible] as const;
}
