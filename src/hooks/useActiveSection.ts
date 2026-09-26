import { useEffect, useState } from 'react';

interface SectionState {
  activeId: string;
  isScrolled: boolean;
}

/**
 * Suit la section visible pour mettre en surbrillance le lien de
 * navigation correspondant, et detecte le defilement de la page.
 */
export function useActiveSection(sectionIds: readonly string[], offset = 120) {
  const [state, setState] = useState<SectionState>({ activeId: '', isScrolled: false });

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const scrollY = window.scrollY;
      let activeId = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) activeId = id;
      }

      // Derniere section : active des que le bas de page est atteint.
      const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
      if (atBottom) activeId = sectionIds[sectionIds.length - 1] ?? activeId;

      setState((previous) => {
        if (previous.activeId === activeId && previous.isScrolled === scrollY > 24) {
          return previous;
        }
        return { activeId, isScrolled: scrollY > 24 };
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset]);

  return state;
}
