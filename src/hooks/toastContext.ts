import { createContext, useContext } from 'react';

export type ToastTone = 'success' | 'info' | 'error';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

export interface ToastContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

/** Accede au systeme de notifications (provider defini dans main.tsx). */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit etre utilise a l'interieur de <ToastProvider>.");
  }
  return context;
}
