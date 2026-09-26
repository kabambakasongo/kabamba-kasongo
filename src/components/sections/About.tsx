import { ArrowUpRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { stats } from '@/data/stats';
import { highlights, profile } from '@/config/profile';

const visibleStats = stats.filter((stat) => stat.value !== null);

export function About() {
  return (
    <Section
      id="apropos"
      index="01"
      eyebrow="À propos"
      title={
        <>
          Un développeur <span className="text-gradient">Full-Stack</span> au service du besoin
          métier
        </>
      }
      description="Voici ce qui guide ma façon de concevoir et de développer des logiciels."
    >
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <div className="flex flex-col gap-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-ink-muted text-base leading-relaxed">
                {paragraph}
              </p>
            ))}

            <figure className="border-brand bg-surface/60 mt-2 rounded-2xl border-l-2 p-5">
              <Quote aria-hidden className="text-brand size-4" />
              <blockquote className="font-display text-ink mt-2 text-base italic">
                {profile.philosophy}
              </blockquote>
            </figure>

            <div className="mt-2">
              <ButtonLink
                href="#contact"
                variant="outline"
                size="sm"
                iconEnd={<ArrowUpRight aria-hidden className="size-4" />}
              >
                Parlons de votre projet
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            {visibleStats.map((stat) => (
              <div
                key={stat.id}
                className="card card-hover p-5"
                aria-label={`${stat.label} : ${stat.value}`}
              >
                <span aria-hidden className="bg-brand mb-3 block h-0.5 w-8 rounded-full" />
                <p className="font-display text-ink text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="text-ink mt-1 text-sm font-medium">{stat.label}</p>
                <p className="text-ink-subtle mt-1 text-xs leading-relaxed">{stat.hint}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.18} from="right" as="ul" className="flex flex-col gap-3">
            {highlights.map((highlight) => (
              <li key={highlight.id} className="card card-hover flex items-start gap-4 p-4 sm:p-5">
                <span className="bg-brand-soft text-brand mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg font-mono text-[0.65rem] font-semibold tracking-wider uppercase">
                  {highlight.label}
                </span>
                <div>
                  <p className="text-ink text-sm font-semibold">{highlight.value}</p>
                  <p className="text-ink-subtle mt-0.5 text-xs leading-relaxed">
                    {highlight.detail}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
