import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { allCategoryLabel } from '@/data/stats';
import { projectCategories, projects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import type { Project, ProjectCategory } from '@/types';

type Filter = ProjectCategory | typeof allCategoryLabel;

const filters: Filter[] = [allCategoryLabel, ...projectCategories];

export function Projects() {
  const [filter, setFilter] = useState<Filter>(allCategoryLabel);
  const [selected, setSelected] = useState<Project | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const visibleProjects = useMemo(
    () =>
      filter === allCategoryLabel
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  return (
    <Section
      id="projets"
      index="03"
      eyebrow="Projets sélectionnés"
      title="Des applications concrètes, pas des maquettes"
      description="SchoolFlow, Majifuzo, PEGUYWAX Management, BusinessFlow, Educ-Me et EnglishPro : des projets de démonstration qui illustrent ma façon de structurer un produit, de la base de données à l'interface."
    >
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filtrer les projets par catégorie"
          className="flex flex-wrap gap-2"
        >
          {filters.map((item) => {
            const isActive = filter === item;
            const count =
              item === allCategoryLabel
                ? projects.length
                : projects.filter((project) => project.categories.includes(item)).length;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className={cn(
                  'relative rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                  isActive
                    ? 'border-brand bg-brand text-brand-contrast'
                    : 'border-line bg-surface/60 text-ink-muted hover:border-brand/40 hover:text-ink',
                )}
              >
                {item}
                <span
                  className={cn(
                    'ml-2 font-mono text-[0.65rem]',
                    isActive ? 'text-brand-contrast/70' : 'text-ink-subtle',
                  )}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-ink-subtle flex items-start gap-2 text-xs sm:max-w-xs sm:text-right">
          <AlertCircle aria-hidden className="text-brand mt-0.5 size-3.5 shrink-0" />
          Certains projets sont présentés comme démos de portfolio et non comme des Réalisations
          client.
        </p>
      </div>

      <motion.ul layout={!reducedMotion} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reducedMotion}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
