import { useCallback, useEffect, useState } from 'react';
import { contactForm, isContactFormConfigured } from '@/config/site';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Champ piegeanti : doit rester vide. */
  [honeypot: string]: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

declare global {
  interface Window {
    emailjs?: {
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>,
        publicKey: string,
      ) => Promise<unknown>;
    };
  }
}

const EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4';

/**
 * Envoi du formulaire de contact.
 *
 * Trois providers compatibles avec un hebergement statique :
 *  - Web3Forms  : une cle publique `access_key`
 *  - Formspree  : l'URL du formulaire
 *  - EmailJS    : serviceId / templateId / publicKey
 *
 * Aucun d'entre eux n'exige de backend ni de secret cote serveur :
 * les cles utilisees sont des cles publiques, cote navigateur.
 */
export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadEmailJs = useCallback(async () => {
    if (window.emailjs) return;
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMAILJS_SRC}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('EmailJS indisponible')));
        return;
      }
      const script = document.createElement('script');
      script.src = EMAILJS_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('EmailJS indisponible'));
      document.head.appendChild(script);
    });
  }, []);

  const submit = useCallback(
    async (payload: ContactPayload) => {
      setStatus('submitting');
      setErrorMessage(null);

      const { name, email, subject, message } = payload;

      try {
        if (contactForm.provider === 'web3forms') {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              access_key: contactForm.web3formsAccessKey,
              name,
              email,
              subject: subject || 'Nouveau message depuis le portfolio',
              message,
              from_name: 'Portfolio KABAMBA KASONGO',
              replyto: email,
              botcheck: '',
            }),
          });
          if (!response.ok) throw new Error(`Web3Forms ${response.status}`);
          const data = (await response.json()) as { success?: boolean; message?: string };
          if (data.success === false) throw new Error(data.message ?? 'Envoi refusé');
        } else if (contactForm.provider === 'formspree') {
          const body = new FormData();
          body.set('name', name);
          body.set('email', email);
          body.set('subject', subject || 'Nouveau message depuis le portfolio');
          body.set('message', message);
          const response = await fetch(contactForm.formspreeEndpoint, {
            method: 'POST',
            body,
            headers: { Accept: 'application/json' },
          });
          if (!response.ok) throw new Error(`Formspree ${response.status}`);
        } else if (contactForm.provider === 'emailjs') {
          await loadEmailJs();
          if (!window.emailjs) throw new Error('EmailJS non chargé');
          await window.emailjs.send(
            contactForm.emailjs.serviceId,
            contactForm.emailjs.templateId,
            { from_name: name, replyto: email, subject, message },
            contactForm.emailjs.publicKey,
          );
        } else {
          throw new Error('Aucun provider configuré');
        }

        setStatus('success');
        return true;
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error && error.message ? error.message : contactForm.errorMessage,
        );
        return false;
      }
    },
    [loadEmailJs],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => setStatus('idle'), 9000);
    return () => window.clearTimeout(timer);
  }, [status]);

  return {
    submit,
    reset,
    status,
    errorMessage,
    isConfigured: isContactFormConfigured,
    provider: contactForm.provider,
  };
}
