import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/toastContext';
import { sharePortfolio } from '@/utils/seo';
import { cn } from '@/utils/cn';

interface ShareButtonProps {
  className?: string;
  label?: string;
  withLabel?: boolean;
}

/** Partage du portfolio : Web Share API avec repli presse-papiers. */
export function ShareButton({
  className,
  label = 'Partager',
  withLabel = false,
}: ShareButtonProps) {
  const { notify } = useToast();

  const handleShare = async () => {
    const result = await sharePortfolio();
    if (result === 'failed') {
      notify('Partage indisponible sur ce navigateur.', 'error');
    } else if (result === 'clipboard') {
      notify('Lien du portfolio copiÃ© dans le presse-papiers.', 'success');
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={label}
      className={cn(
        'border-line text-ink-subtle hover:border-brand/50 hover:text-brand inline-flex items-center gap-2 rounded-lg border p-2 transition',
        className,
      )}
    >
      <Share2 aria-hidden className="size-4" />
      {withLabel && <span className="text-xs font-medium">{label}</span>}
    </button>
  );
}
