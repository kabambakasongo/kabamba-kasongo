import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/toastContext';
import { copyText } from '@/utils/seo';
import { cn } from '@/utils/cn';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  /** Affiche le texte copie a cote de l'icone. */
  withLabel?: boolean;
}

export function CopyButton({
  value,
  label = 'Copier',
  className,
  withLabel = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { notify } = useToast();

  const handleCopy = async () => {
    const success = await copyText(value);
    if (success) {
      setCopied(true);
      notify('Adresse e-mail copiÃ©e dans le presse-papiers.', 'success');
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      notify('Copie impossible. SÃ©lectionnez lâ€™adresse manuellement.', 'error');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Adresse copiÃ©e' : label}
      className={cn(
        'border-line text-ink-subtle hover:border-brand/50 hover:text-brand inline-flex items-center gap-2 rounded-lg border p-2 transition',
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-emerald-400" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      {withLabel && <span className="text-xs font-medium">{copied ? 'CopiÃ©' : label}</span>}
    </button>
  );
}
