import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

export function Process() {
  return (
    <Section
      id="process"
      index="06"
      eyebrow="Méthode"
      title="Comment je travaille"
      description="Un processus simple et transparent, du premier échange jusqu'à la maintenance de votre solution."
    >
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 0.05} className="h-full">
            <article className="card card-hover relative h-full overflow-hidden p-6">
              <span
                aria-hidden
                className="font-display text-ink/5 absolute -top-3 -right-1 text-6xl font-bold select-none"
              >
                {item.step}
              </span>

              <div className="flex items-center gap-3">
                <span className="bg-brand-soft text-brand grid size-9 place-items-center rounded-lg font-mono text-xs font-semibold">
                  {item.step}
                </span>
                <h3 className="text-ink text-lg font-semibold">{item.title}</h3>
              </div>

              <p className="text-ink-muted mt-3 text-sm leading-relaxed">{item.description}</p>

              <ul className="mt-4 flex flex-col gap-1.5">
                {item.details.map((detail) => (
                  <li key={detail} className="text-ink-subtle flex items-center gap-2 text-xs">
                    <span aria-hidden className="bg-accent size-1 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
