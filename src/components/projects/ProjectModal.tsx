import { Check, Github, Globe } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const disclosureLabel: Record<Project['disclosure'], { label: string; hint: string }> = {
  'portfolio-demo': {
    label: 'Projet de démonstration',
    hint: "Réalisé dans le cadre de ce portfolio pour illustrer mes compétences techniques. Il ne s'agit pas d'un projet client.",
  },
  personal: { label: 'Projet personnel', hint: 'Développement réalisé pour mon usage personnel.' },
  client: { label: 'Projet client', hint: 'Développement réalisé pour une organisation.' },
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const disclosure = project ? disclosureLabel[project.disclosure] : null;

  return (
    <Modal
      isOpen={Boolean(project)}
      onClose={onClose}
      title={project?.name ?? ''}
      eyebrow={project?.categories.join(' · ')}
    >
      {project && disclosure && (
        <div className="flex flex-col gap-6">
          <ProjectCover
            name={project.name}
            accent={project.accent}
            className="rounded-2xl"
            label={`Visuel du projet ${project.name}`}
          />

          <p className="text-ink-muted text-base leading-relaxed">{project.description}</p>

          <div className="border-line bg-surface-2/50 rounded-xl border p-4">
            <p className="text-brand font-mono text-[0.68rem] tracking-[0.18em] uppercase">
              {disclosure.label}
            </p>
            <p className="text-ink-subtle mt-1.5 text-sm leading-relaxed">{disclosure.hint}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight.label}
                  className="border-line bg-surface rounded-xl border px-4 py-3 text-center"
                >
                  <p className="font-display text-brand text-xl font-bold">{highlight.value}</p>
                  <p className="text-ink-subtle mt-0.5 text-xs">{highlight.label}</p>
                </li>
              ))}
            </ul>
          )}

          <div>
            <h4 className="text-ink-subtle font-mono text-[0.68rem] tracking-[0.18em] uppercase">
              Fonctionnalités
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="text-ink-muted flex items-start gap-2.5 text-sm">
                  <Check aria-hidden className="text-brand mt-0.5 size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink-subtle font-mono text-[0.68rem] tracking-[0.18em] uppercase">
              Technologies
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Tag tone="brand">{technology}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-line flex flex-wrap gap-2 border-t pt-5">
            {project.github && (
              <ButtonLink
                href={project.github}
                variant="secondary"
                iconStart={<Github aria-hidden className="size-4" />}
              >
                Code source
              </ButtonLink>
            )}
            {project.demo && (
              <ButtonLink href={project.demo} iconStart={<Globe aria-hidden className="size-4" />}>
                Live demo
              </ButtonLink>
            )}
            {!project.github && !project.demo && (
              <p className="text-ink-subtle text-sm">
                Le code source de ce projet n’est pas encore public. Contactez-moi pour en discuter.
              </p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
