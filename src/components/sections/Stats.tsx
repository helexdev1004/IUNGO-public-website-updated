import { Container } from '@/components/ui/Container'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { stats } from '@/data/stats'
import { cn } from '@/lib/cn'

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-surface/40 py-16 lg:py-20">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-fine opacity-40" />

      <Container className="relative">
        {/* The 1px gaps show the container background, which is what draws the
            dividers between cells — so every row must be completely filled or
            the leftover space reads as a grey block. */}
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => {
            /* An odd count leaves the final cell alone on the last two-column
               row; span it across both so the row stays full. */
            const orphan = stats.length % 2 === 1 && index === stats.length - 1

            return (
              <Reveal
                key={stat.label}
                delay={index * 0.08}
                className={cn('bg-void/70 p-6 xl:p-8', orphan && 'sm:col-span-2 lg:col-span-1')}
              >
                <dd className="font-display text-[2rem] font-bold tracking-tight xl:text-5xl">
                  <span className="text-gradient">
                    {stat.value !== undefined ? (
                      <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    ) : (
                      stat.display
                    )}
                  </span>
                </dd>
                <dt className="mt-3 text-[0.9375rem] font-semibold text-frost">{stat.label}</dt>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mist-dim">
                  {stat.detail}
                </p>
              </Reveal>
            )
          })}
        </dl>
      </Container>
    </section>
  )
}
