import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Monogram } from '@/components/ui/Monogram';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ButtonLink } from '@/components/ui/Button';
import { navigation } from '@/config/site';
import { profile, hasEmail, mailtoUrl } from '@/config/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

const sectionIds = navigation.map((item) => item.id);

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { activeId, isScrolled } = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-80 transition-all duration-500',
        isScrolled ? 'glass-strong border-line border-b' : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="container-page flex h-16 items-center justify-between gap-4 sm:h-18"
      >
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-lg"
          aria-label={`${profile.name} — retour en haut`}
        >
          <Monogram size="sm" />
          <span className="font-display text-ink hidden text-sm font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                    isActive ? 'text-brand' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="bg-brand/10 absolute inset-0 -z-10 rounded-full"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          {hasEmail && (
            <ButtonLink
              href={mailtoUrl}
              size="sm"
              className="hidden sm:inline-flex"
              variant="primary"
            >
              Me contacter
            </ButtonLink>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="border-line bg-surface-2/70 text-ink grid size-10 place-items-center rounded-full border lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="size-4" />
            ) : (
              <Menu aria-hidden className="size-4" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
            className="glass-strong border-line max-h-[calc(100dvh-4rem)] overflow-y-auto border-b lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.03 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors',
                      activeId === item.id
                        ? 'bg-brand/10 text-brand'
                        : 'text-ink-muted hover:bg-surface-2 hover:text-ink',
                    )}
                  >
                    <span className="text-ink-subtle font-mono text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
              {hasEmail && (
                <li className="pt-2">
                  <ButtonLink href={mailtoUrl} onClick={closeMenu} className="w-full" size="md">
                    Me contacter
                  </ButtonLink>
                </li>
              )}
              <li className="flex items-center justify-between px-4 pt-3">
                <span className="text-ink-muted text-sm">Thème</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
