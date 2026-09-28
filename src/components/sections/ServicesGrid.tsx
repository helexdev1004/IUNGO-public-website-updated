import { Link } from 'react-router-dom'

import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { services } from '@/data/services'
import { cn } from '@/lib/cn'

interface ServicesGridProps {
  /** Show only the first N services — used for the homepage preview. */
  limit?: number
  /** Links each card through to its anchor on the Services page. */
  linkToDetail?: boolean
}

export function ServicesGrid({ limit, linkToDetail = true }: ServicesGridProps) {
  const shown = limit ? services.slice(0, limit) : services

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {shown.map((service, index) => {
        const chips = service.groups.flatMap((group) => group.items).slice(0, 5)
        const remaining = service.groups.flatMap((group) => group.items).length - chips.length

        const body = (
          <GlassCard
            accent={service.accent}
            className="flex h-full flex-col p-7"
            as="article"
          >
            {/* Icon plate */}
            <span
              className={cn(
                'mb-6 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-400',
                service.accent === 'green'
                  ? 'border-brand-green/25 bg-brand-green/10 text-brand-green group-hover/card:shadow-glow-green'
                  : 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue group-hover/card:shadow-glow-blue',
              )}
            >
              <Icon name={service.icon} size={22} />
            </span>

            <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>

            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{service.summary}</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
              {remaining > 0 ? (
                <li className="chip border-dashed text-mist-dim">+{remaining} more</li>
              ) : null}
            </ul>

            {linkToDetail ? (
              <span
                className={cn(
                  'mt-7 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300',
                  service.accent === 'green'
                    ? 'text-brand-green'
                    : 'text-brand-blue',
                )}
              >
                Explore this service
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform duration-300 group-hover/card:translate-x-1"
                />
              </span>
            ) : null}
          </GlassCard>
        )

        return (
          <Reveal key={service.id} delay={index * 0.07} className="h-full">
            {linkToDetail ? (
              <Link
                to={`/services#${service.id}`}
                className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4"
                aria-label={`${service.title} — read more`}
              >
                {body}
              </Link>
            ) : (
              body
            )}
          </Reveal>
        )
      })}
    </div>
  )
}
