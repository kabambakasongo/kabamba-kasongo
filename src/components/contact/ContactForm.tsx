import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useContactForm } from '@/hooks/useContactForm';
import { contactForm } from '@/config/site';
import { profile, hasEmail, hasWhatsapp, mailtoUrl, whatsappUrl } from '@/config/profile';
import { ButtonLink } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { cn } from '@/utils/cn';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' };

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Adresse e-mail invalide.';
  if (values.message.trim().length < 20)
    errors.message = 'Décrivez votre besoin en 20 caractères minimum.';

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState('');
  const { submit, status, errorMessage, isConfigured, provider } = useContactForm();

  const isSubmitting = status === 'submitting';

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      if (firstField) document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    const success = await submit({ ...values, honeypot });
    if (success) setValues(initialValues);
  };

  if (!isConfigured) {
    return (
      <div className="card p-7">
        <h3 className="text-ink text-lg font-semibold">Contactez-moi directement</h3>
        <p className="text-ink-muted mt-2 text-sm leading-relaxed">
          Le formulaire nécessite un service d’envoi tiers (Web3Forms, Formspree ou EmailJS) —
          compatible avec un hébergement 100 % statique. Sa configuration est détaillée dans le
          README du projet. En attendant, utilisez un des canaux ci-dessous.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {hasEmail && (
            <li>
              <ButtonLink
                href={mailtoUrl}
                variant="secondary"
                className="w-full"
                iconStart={<Send aria-hidden className="size-4" />}
              >
                Écrire un e-mail
              </ButtonLink>
            </li>
          )}
          {hasWhatsapp && (
            <li>
              <ButtonLink href={whatsappUrl} variant="outline" className="w-full">
                Écrire sur WhatsApp
              </ButtonLink>
            </li>
          )}
        </ul>

        {hasEmail && (
          <div className="border-line bg-surface-2/50 mt-5 flex items-center gap-2 rounded-xl border px-4 py-3">
            <span className="text-ink flex-1 truncate font-mono text-sm">{profile.email}</span>
            <CopyButton value={profile.email} />
          </div>
        )}

        <p className="text-ink-subtle mt-5 font-mono text-[0.65rem]">
          provider actuel : {provider} — documentation dans README.md
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-7">
      <h3 className="text-ink text-lg font-semibold">Envoyez-moi un message</h3>
      <p className="text-ink-subtle mt-1.5 text-sm">Réponse habituelle sous 48 h ouvrées.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Nom" error={errors.name} className="sm:col-span-1">
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="Jean Mukendi"
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="contact-email" label="E-mail" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="jean@entreprise.cd"
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id="contact-subject" label="Sujet" className="sm:col-span-2">
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            placeholder="Plateforme de gestion scolaire"
            className={inputClass(false)}
          />
        </Field>

        <Field
          id="contact-message"
          label="Message"
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="Décrivez votre besoin, votre contexte et vos délais."
            className={cn(inputClass(Boolean(errors.message)), 'resize-y')}
          />
        </Field>
      </div>

      {/* Champ piegeanti invisible : bloque les robots spam */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-subtle text-xs leading-relaxed">
          Vos informations servent uniquement à traiter cette demande.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          iconStart={
            isSubmitting ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden className="size-4" />
            )
          }
        >
          {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
        </Button>
      </div>

      <p aria-live="polite" className="mt-4 min-h-5">
        {status === 'success' && (
          <span className="flex items-center gap-2 text-sm text-emerald-500">
            <CheckCircle2 aria-hidden className="size-4" />
            {contactForm.successMessage}
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-2 text-sm text-rose-500">
            <AlertCircle aria-hidden className="size-4" />
            {errorMessage ?? contactForm.errorMessage}
          </span>
        )}
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-surface-2/40 px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-subtle/70',
    'focus:border-brand focus:outline-none',
    hasError ? 'border-rose-500/70' : 'border-line',
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-ink text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}
