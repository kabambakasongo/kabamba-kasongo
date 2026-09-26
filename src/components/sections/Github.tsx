import { ArrowUpRight, Github, Loader2, RefreshCw, Star, Users, Wrench } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { useGithubStats } from '@/hooks/useGithubStats';
import { coreTechnologies } from '@/data/skills';
import { projects } from '@/data/projects';
import { githubUrl, hasGithub, profile } from '@/config/profile';

const openSourceReady = projects.filter((project) => project.github || project.demo);

export function GithubSection() {
  const { status, stats } = useGithubStats();

  return (
    <Section
      id="github"
      index="07"
      eyebrow="Open Source"
      title="Mon activité GitHub"
      description="Je publie et documente mon code, et je construis des projets portfolio ouverts à la réutilisation."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="h-full">
          <div className="card relative flex h-full flex-col overflow-hidden p-7">
            <div
              aria-hidden
              className="bg-brand/10 absolute -top-16 -right-16 size-48 rounded-full blur-3xl"
            />
            <div className="flex items-center gap-3">
              <span className="bg-ink text-canvas grid size-11 place-items-center rounded-xl">
                <Github aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-ink text-lg font-semibold">
                  {stats?.login ?? (hasGithub ? `@${profile.github}` : 'Profil GitHub')}
                </h3>
                <p className="text-ink-subtle text-xs">
                  {status === 'loading' && 'Chargement des données publiques…'}
                  {status === 'success' && 'Données publiques de l’API GitHub'}
                  {status === 'error' && 'Données statiques (API indisponible)'}
                  {status === 'idle' && 'Configuration en attente'}
                </p>
              </div>
            </div>

            {status === 'loading' && (
              <p className="text-ink-muted mt-6 flex items-center gap-2 text-sm">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Analyse du profil…
              </p>
            )}

            {hasGithub ? (
              <>
                <dl className="mt-6 grid grid-cols-3 gap-3">
                  <div className="border-line bg-surface-2/50 rounded-xl border p-3 text-center">
                    <dt className="text-ink-subtle text-[0.65rem] tracking-wider uppercase">
                      Repos
                    </dt>
                    <dd className="font-display text-ink text-2xl font-bold">
                      {stats?.publicRepos ?? '—'}
                    </dd>
                  </div>
                  <div className="border-line bg-surface-2/50 rounded-xl border p-3 text-center">
                    <dt className="text-ink-subtle text-[0.65rem] tracking-wider uppercase">
                      Followers
                    </dt>
                    <dd className="font-display text-ink text-2xl font-bold">
                      {stats?.followers ?? '—'}
                    </dd>
                  </div>
                  <div className="border-line bg-surface-2/50 rounded-xl border p-3 text-center">
                    <dt className="text-ink-subtle flex items-center justify-center gap-1 text-[0.65rem] tracking-wider uppercase">
                      <Star aria-hidden className="size-3" /> Stars
                    </dt>
                    <dd className="font-display text-ink text-2xl font-bold">
                      {stats?.totalStars ?? '—'}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  <ButtonLink
                    href={githubUrl}
                    iconStart={<Github aria-hidden className="size-4" />}
                    iconEnd={<ArrowUpRight aria-hidden className="size-4" />}
                  >
                    Voir mon profil
                  </ButtonLink>
                </div>
              </>
            ) : (
              <div className="border-line-strong bg-surface-2/40 mt-6 rounded-xl border border-dashed p-5">
                <p className="text-ink flex items-center gap-2 text-sm font-medium">
                  <Wrench aria-hidden className="text-brand size-4" />
                  Lien à configurer
                </p>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  Renseignez votre identifiant GitHub dans{' '}
                  <code className="bg-surface-2 text-brand rounded px-1.5 py-0.5 font-mono text-xs">
                    src/config/profile.ts
                  </code>{' '}
                  (champ <code className="text-brand font-mono text-xs">github</code>) ou via la
                  variable{' '}
                  <code className="text-brand font-mono text-xs">VITE_GITHUB_USERNAME</code>. Les
                  statistiques publiques s'afficheront alors automatiquement, sans aucun backend.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.08} className="h-full">
            <div className="card h-full p-7">
              <h3 className="text-ink flex items-center gap-2 text-base font-semibold">
                <Users aria-hidden className="text-brand size-4" />
                Technologies principales
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coreTechnologies.map((technology) => (
                  <li key={technology}>
                    <Tag tone="brand">{technology}</Tag>
                  </li>
                ))}
              </ul>
              <p className="text-ink-subtle mt-5 text-sm leading-relaxed">
                Ces technologies couvrent l’ensemble de mes projets : interfaces web (React,
                TypeScript, Tailwind), backends (Python, Django, PostgreSQL), logiciels de bureau
                (PyQt6, PySide6) et outillage (Docker, GitHub Actions).
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="h-full">
            <div className="card h-full p-7">
              <h3 className="text-ink flex items-center gap-2 text-base font-semibold">
                <RefreshCw aria-hidden className="text-brand size-4" />
                Projets publiés
              </h3>
              {openSourceReady.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {openSourceReady.map((project) => (
                    <li key={project.slug} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-ink text-sm font-medium">{project.name}</p>
                        <p className="text-ink-subtle text-xs">{project.tagline}</p>
                      </div>
                      <a
                        href={project.github ?? project.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Ouvrir le dépôt de ${project.name}`}
                        className="border-line text-ink-subtle hover:border-brand/50 hover:text-brand grid size-8 shrink-0 place-items-center rounded-full border transition"
                      >
                        <ArrowUpRight aria-hidden className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-ink-subtle mt-4 text-sm leading-relaxed">
                  Aucun dépôt public n’est encore associé à un projet de ce portfolio. Ajoutez un
                  champ <code className="text-brand font-mono text-xs">github</code> dans{' '}
                  <code className="text-brand font-mono text-xs">src/data/projects.ts</code> pour
                  publier automatiquement vos dépôts ici.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
