import { ArrowUpRight, Github, Info } from 'lucide-react';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const disclosureLabel: Record<Project['disclosure'], string> = {
  'portfolio-demo': 'Démo portfolio',
  personal: 'Projet personnel',
  client: 'Projet client',
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ProjectCover
          name={project.name}
          accent={project.accent}
          label={`Visuel du projet ${project.name}`}
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-md bg-black/45 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-white uppercase backdrop-blur-sm"
            >
              {category}
            </span>
          ))}
        </div>
        {project.disclosure === 'portfolio-demo' && (
          <p className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2.5 py-1 font-mono text-[0.62rem] text-white/90 backdrop-blur-sm">
            <Info aria-hidden className="size-3" />
            {disclosureLabel[project.disclosure]}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-ink text-xl font-semibold">{project.name}</h3>
          {project.year && (
            <span className="text-ink-subtle font-mono text-xs">{project.year}</span>
          )}
        </div>
        <p className="text-ink-muted mt-2 text-sm leading-relaxed">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li>
              <Tag tone="outline">+{project.technologies.length - 4}</Tag>
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
          <Button
            size="sm"
            onClick={() => onOpen(project)}
            iconEnd={
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            }
          >
            Voir le projet
          </Button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Code source du projet ${project.name} sur GitHub`}
              className="border-line text-ink-subtle hover:border-brand/50 hover:text-brand inline-flex size-9 items-center justify-center rounded-full border transition"
            >
              <Github aria-hidden className="size-4" />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Démonstration en ligne du projet ${project.name}`}
              className="border-line text-ink-subtle hover:border-brand/50 hover:text-brand inline-flex size-9 items-center justify-center rounded-full border transition"
            >
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
