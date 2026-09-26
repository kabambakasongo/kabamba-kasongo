import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Rotation d'un mot anime dans la Hero ("Django", "React"...).
 * Retourne un mot au hasard apres chaque affichage complet.
 */
export function useRotatingWord(words: readonly string[], interval = 2600) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reducedMotion, words.length, interval]);

  return { word: words[index] ?? words[0] ?? '', reducedMotion };
}
