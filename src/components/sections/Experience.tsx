import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { experience } from '@/data/experience';
import { cn } from '@/utils/cn';

export function Experience() {
  return (
    <Section
      id="parcours"
      index="05"
      eyebrow="Parcours"
      title="Quatre domaines, une même méthode"
      description="De l'interface à la base de données, chaque projet est traité de bout en bout pour livrer un logiciel complet et maintenable."
    >
      <ol className="relative flex flex-col gap-8 sm:gap-12">
        <span
          aria-hidden
          className="from-brand via-line-strong absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        {experience.map((entry, index) => {
          const isRight = index % 2 === 1;

          return (
            <Reveal as="li" key={entry.id} from="bottom" className="relative sm:flex">
              <div
                className={cn('max-sm:pl-8 sm:w-1/2', isRight ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12')}
              >
                <div className="card card-hover p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-ink text-lg font-semibold">{entry.role}</h3>
                    {entry.period && (
                      <span className="bg-brand-soft text-brand rounded-md px-2 py-0.5 font-mono text-[0.65rem]">
                        {entry.period}
                      </span>
                    )}
                  </div>

                  {entry.company && (
                    <p className="text-ink-muted mt-1 text-sm font-medium">{entry.company}</p>
                  )}

                  <p className="text-ink-muted mt-3 text-sm leading-relaxed">{entry.description}</p>

                  <ul className="mt-4 flex flex-col gap-1.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-ink-subtle flex items-start gap-2 text-sm"
                      >
                        <span aria-hidden className="bg-brand mt-2 size-1 shrink-0 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {entry.stack.map((technology) => (
                      <li key={technology}>
                        <Tag>{technology}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <span
                aria-hidden
                className={cn(
                  'border-brand bg-canvas absolute top-7 size-4 rounded-full border-2 shadow-[0_0_0_4px_var(--canvas)]',
                  'left-0 -translate-x-1/2 sm:left-1/2 sm:-translate-x-1/2',
                  isRight && 'sm:left-1/2',
                )}
              />
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
