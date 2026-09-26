import { Database, GitBranch, LayoutGrid, Monitor, Palette, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { DotMeter } from '@/components/ui/DotMeter';
import { skillCategories } from '@/data/skills';
import type { SkillIcon } from '@/types';

const ICONS: Record<SkillIcon, LucideIcon> = {
  layout: LayoutGrid,
  server: Server,
  monitor: Monitor,
  database: Database,
  git: GitBranch,
  palette: Palette,
};

export function Skills() {
  return (
    <Section
      id="competences"
      index="02"
      eyebrow="Compétences"
      title="Les technologies que je maîtrise au quotidien"
      description="Un stack équilibré entre interfaces web, backends robustes, applications de bureau et outillage de développement."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = ICONS[category.icon];
          return (
            <Reveal
              as="li"
              key={category.id}
              delay={categoryIndex * 0.06}
              className="h-full"
              from="bottom"
            >
              <article className="card card-hover group flex h-full flex-col p-6">
                <div className="flex items-start gap-4">
                  <span className="border-line bg-brand-soft text-brand group-hover:bg-brand group-hover:text-brand-contrast grid size-11 shrink-0 place-items-center rounded-xl border transition-colors duration-300">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-ink text-lg font-semibold">{category.label}</h3>
                    <p className="text-ink-subtle mt-1 text-sm leading-relaxed">{category.blurb}</p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-col gap-3.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="border-line/70 flex items-center justify-between gap-3 border-b pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-ink text-sm">{skill.name}</span>
                      <DotMeter level={skill.level} label={skill.name} size="sm" />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
