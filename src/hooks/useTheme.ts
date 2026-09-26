import { useCallback, useEffect, useRef, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'kk-theme';

function readInitialTheme(): Theme {
  // Le portfolio est sombre par defaut : le mode clair n'est applique
  // que si l'utilisateur l'a explicitement choisi.
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (meta) meta.content = theme === 'dark' ? '#0A0B0D' : '#F6F6F3';
}

/**
 * Theme du portfolio : sombre par defaut, bascule light/dark persistee
 * dans localStorage. Le theme initial est deja pose par le script inline
 * de index.html afin d'eviter tout flash de couleur.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const isFirstRender = useRef(true);

  useEffect(() => {
    applyTheme(theme);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* stockage indisponible : le theme reste actif pour la session */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
