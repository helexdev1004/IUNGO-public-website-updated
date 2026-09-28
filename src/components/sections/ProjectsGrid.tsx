import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/data/projects'
import { cn } from '@/lib/cn'

interface ProjectsGridProps {
  limit?: number
  /** Compact cards omit the challenge/solution narrative. */
  compact?: boolean
}

export function ProjectsGrid({ limit, compact = false }: ProjectsGridProps) {
  const shown = limit ? projects.slice(0, limit) : projects

  return (
    <div className={cn('grid gap-5', compact ? 'md:grid-cols-3' : 'lg:grid-cols-2')}>
      {shown.map((project, index) => (
        <Reveal key={project.id} delay={index * 0.07} className="h-full">
          <GlassCard accent={project.accent} className="flex h-full flex-col p-7" as="article">
            {/* ---- Header ------------------------------------------------ */}
            <div className="flex items-start justify-between gap-4">
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-xl border',
                  project.accent === 'green'
                    ? 'border-brand-green/25 bg-brand-green/10 text-brand-green'
                    : 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue',
                )}
              >
                <Icon name={project.icon} size={21} />
              </span>

              <span className="font-mono text-[0.68rem] tracking-wider text-mist-dim uppercase">
                {project.category} · {project.year}
              </span>
            </div>

            <h3 className="mt-6 font-display text-xl font-semibold text-white">{project.title}</h3>
            <p className="mt-1.5 text-[0.8125rem] text-mist-dim">{project.client}</p>

            {/* ---- Narrative --------------------------------------------- */}
            {compact ? (
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{project.result}</p>
            ) : (
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-green uppercase">
                    Challenge
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">
                    {project.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-blue uppercase">
                    Solution
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">
                    {project.solution}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-green uppercase">
                    Result
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">
                    {project.result}
                  </dd>
                </div>
              </dl>
            )}

            {/* ---- Stack -------------------------------------------------- */}
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {project.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  )
}
