import { Github, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Monogram } from '@/components/ui/Monogram';
import { ShareButton } from '@/components/ui/ShareButton';
import { navigation } from '@/config/site';
import {
  profile,
  githubUrl,
  hasEmail,
  hasGithub,
  hasLinkedin,
  hasWhatsapp,
  linkedinUrl,
  mailtoUrl,
  whatsappUrl,
} from '@/config/profile';

const year = new Date().getFullYear();

const socialLinks = [
  { id: 'github', label: 'GitHub', href: githubUrl, icon: Github, enabled: hasGithub },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: linkedinUrl,
    icon: Linkedin,
    enabled: hasLinkedin,
  },
  { id: 'email', label: 'Email', href: mailtoUrl, icon: Mail, enabled: hasEmail },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: whatsappUrl,
    icon: MessageCircle,
    enabled: hasWhatsapp,
  },
].filter((link) => link.enabled);

export function Footer() {
  return (
    <footer className="border-line bg-canvas-alt/60 relative mt-8 border-t">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram size="md" />
              <div>
                <p className="font-display text-ink text-base font-semibold">{profile.name}</p>
                <p className="text-brand font-mono text-xs tracking-[0.18em] uppercase">
                  {profile.role}
                </p>
              </div>
            </div>
            <p className="text-ink-muted mt-4 max-w-sm text-sm leading-relaxed">
              {profile.heroIntro}
            </p>
            <p className="text-ink-muted mt-4 flex items-center gap-2 text-sm">
              <MapPin aria-hidden className="text-brand size-4" />
              {profile.location}
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className="text-ink-subtle font-mono text-xs tracking-[0.2em] uppercase">
              Navigation
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-ink-muted hover:text-brand text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-ink-subtle font-mono text-xs tracking-[0.2em] uppercase">
              Réseaux
            </h2>
            {socialLinks.length > 0 ? (
              <ul className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map(({ id, label, href, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="border-line text-ink-muted hover:border-brand/50 hover:text-brand grid size-10 place-items-center rounded-full border transition hover:-translate-y-0.5"
                      aria-label={label}
                      title={label}
                    >
                      <Icon aria-hidden className="size-4" />
                    </a>
                  </li>
                ))}
                <li>
                  <ShareButton withLabel={false} label="Partager le portfolio" />
                </li>
              </ul>
            ) : (
              <p className="text-ink-subtle mt-4 text-sm">
                Liens sociaux à renseigner dans{' '}
                <code className="text-brand font-mono text-xs">src/config/profile.ts</code>
              </p>
            )}
            <p className="text-ink-subtle mt-5 text-sm">
              Conçu et développé avec React, TypeScript et Tailwind CSS.
            </p>
          </div>
        </div>

        <div className="divider-glow mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-ink-subtle text-xs">
            © {year} {profile.name}. Tous droits réservés.
          </p>
          <p className="text-ink-subtle font-mono text-xs">
            Kolwezi · République Démocratique du Congo
          </p>
        </div>
      </div>
    </footer>
  );
}
