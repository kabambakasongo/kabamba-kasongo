import { Blocks, Globe, Layers, PenTool, Server, SquareArrowOutUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';
import { profile, hasEmail, mailtoUrl } from '@/config/profile';
import { ButtonLink } from '@/components/ui/Button';
import type { ServiceIcon } from '@/types';

const ICONS: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  appWindow: SquareArrowOutUpRight,
  server: Server,
  penTool: PenTool,
  blocks: Blocks,
};

export function Services() {
  return (
    <Section
      id="services"
      index="04"
      eyebrow="Services"
      title="Ce que je peux construire pour vous"
      description="Du premier croquis jusqu'à la mise en ligne : une collaboration directe, sans intermédiaire."
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon];
          return (
            <Reveal as="li" key={service.id} delay={index * 0.05} className="h-full">
              <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-6">
                <span
                  aria-hidden
                  className="bg-brand/10 pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <div className="flex items-center gap-3">
                  <span className="bg-brand text-brand-contrast shadow-brand/20 grid size-10 place-items-center rounded-lg shadow-lg">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="text-ink text-lg font-semibold">{service.title}</h3>
                </div>

                <p className="text-ink-muted mt-4 text-sm leading-relaxed">{service.description}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="border-line bg-surface-2/60 text-ink-subtle rounded-md border px-2.5 py-1 font-mono text-[0.68rem]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>

      {hasEmail && (
        <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-ink-muted text-sm">
            Une idée précise en tête ? {profile.specialty} fait partie de mes domaines
            d’intervention.
          </p>
          <ButtonLink href={mailtoUrl} variant="primary">
            Demander un devis
          </ButtonLink>
        </Reveal>
      )}
    </Section>
  );
}
