import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Fenetre de dialogue accessible : piege de focus, fermeture par Escape
 * ou clic exterieur, restitution du focus a l'element d'origine et
 * verrouillage du scroll du document (avec compensation de largeur).
 */
export function Modal({ isOpen, onClose, title, eyebrow, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement | null;

    const { body } = document;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      previousFocus.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  const duration = reducedMotion ? 0 : 0.28;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-90 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'glass-strong border-line relative max-h-[88dvh] w-full overflow-y-auto rounded-t-3xl border shadow-2xl shadow-black/40 sm:max-w-3xl sm:rounded-3xl',
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la fenêtre"
              className="border-line bg-surface/80 text-ink-muted hover:border-brand/50 hover:text-brand absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full border transition"
            >
              <X aria-hidden className="size-4" />
            </button>
            <div className="p-6 sm:p-8">
              {eyebrow && (
                <p className="text-brand mb-2 font-mono text-xs tracking-[0.2em] uppercase">
                  {eyebrow}
                </p>
              )}
              <h3 className="text-ink pr-10 text-2xl font-semibold sm:text-3xl">{title}</h3>
            </div>
            <div className="px-6 pb-8 sm:px-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
