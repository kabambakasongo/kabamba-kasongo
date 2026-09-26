import { Github, Linkedin, Mail, MapPin, MessageCircle, Share2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CopyButton } from '@/components/ui/CopyButton';
import { ShareButton } from '@/components/ui/ShareButton';
import { ContactForm } from '@/components/contact/ContactForm';
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

const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: mailtoUrl,
    icon: Mail,
    enabled: hasEmail,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: hasWhatsapp ? `+${profile.whatsapp.replace(/\D/g, '')}` : '',
    href: whatsappUrl,
    icon: MessageCircle,
    enabled: hasWhatsapp,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: hasGithub ? `@${profile.github}` : '',
    href: githubUrl,
    icon: Github,
    enabled: hasGithub,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: hasLinkedin ? 'Profil LinkedIn' : '',
    href: linkedinUrl,
    icon: Linkedin,
    enabled: hasLinkedin,
  },
].filter((link) => link.enabled);

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title={
        <>
          Travaillons <span className="text-gradient">ensemble</span>
        </>
      }
      description="Vous avez une idée, un projet ou un besoin digital ? Discutons-en et transformons votre idée en une solution moderne."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <Reveal from="left" className="flex flex-col gap-6">
          <div className="card p-7">
            <h3 className="text-ink text-base font-semibold">Coordonnées</h3>

            {contactLinks.length > 0 ? (
              <ul className="mt-5 flex flex-col gap-2">
                {contactLinks.map(({ id, label, value, href, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="group border-line hover:border-brand/50 hover:bg-surface-2/40 flex items-center gap-3 rounded-xl border px-4 py-3 transition"
                    >
                      <span className="bg-brand-soft text-brand grid size-9 shrink-0 place-items-center rounded-lg">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-ink-subtle block text-xs">{label}</span>
                        <span className="text-ink block truncate text-sm">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-muted mt-4 text-sm leading-relaxed">
                Aucune coordonnée n’est encore renseignée. Ajoutez votre e-mail, WhatsApp, GitHub et
                LinkedIn dans{' '}
                <code className="bg-surface-2 text-brand rounded px-1.5 py-0.5 font-mono text-xs">
                  src/config/profile.ts
                </code>
                .
              </p>
            )}

            <p className="text-ink-muted mt-5 flex items-start gap-2 text-sm">
              <MapPin aria-hidden className="text-brand mt-0.5 size-4 shrink-0" />
              {profile.location}
            </p>
          </div>

          <div className="card flex items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <span className="bg-surface-2 text-ink-muted grid size-9 place-items-center rounded-lg">
                <Share2 aria-hidden className="size-4" />
              </span>
              <div>
                <p className="text-ink text-sm font-medium">Partager mon portfolio</p>
                <p className="text-ink-subtle text-xs">Idéal pour transmettre à un recruteur</p>
              </div>
            </div>
            <ShareButton label="Partager le portfolio" withLabel />
          </div>

          {hasEmail && (
            <div className="card flex items-center justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="text-ink text-sm font-medium">Copier mon e-mail</p>
                <p className="text-ink-subtle truncate font-mono text-xs">{profile.email}</p>
              </div>
              <CopyButton value={profile.email} withLabel label="Copier" />
            </div>
          )}
        </Reveal>

        <Reveal from="right" delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
