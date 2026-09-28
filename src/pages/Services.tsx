import { Seo } from '@/components/Seo'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { services } from '@/data/services'
import { cn } from '@/lib/cn'

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="AI solutions, full-stack development, ecommerce platforms, enterprise systems, IT consulting and high-performance 3D web experiences — delivered by a senior global engineering team."
        path="/services"
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Six practices, <span className="text-gradient">one delivery team</span>
          </>
        }
        description="Most engagements draw on more than one of these — which is exactly why we keep them under a single roof rather than subcontracting the parts we do not do."
      >
        {/* Quick jump links */}
        <Reveal delay={0.18}>
          <nav aria-label="Services" className="mt-10 flex flex-wrap gap-2">
            {services.map((service) => (
              <a key={service.id} href={`#${service.id}`} className="chip hover:border-brand-green/40">
                {service.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </PageHero>

      {/* ---- Detailed sections -------------------------------------------- */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={cn(
            'relative scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-24',
            index % 2 === 1 && 'bg-surface/40',
          )}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* ---- Intro ------------------------------------------------ */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <span
                    className={cn(
                      'mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border',
                      service.accent === 'green'
                        ? 'border-brand-green/25 bg-brand-green/10 text-brand-green shadow-glow-green'
                        : 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue shadow-glow-blue',
                    )}
                  >
                    <Icon name={service.icon} size={26} />
                  </span>

                  <p className="font-mono text-[0.68rem] tracking-[0.22em] text-mist-dim uppercase">
                    {String(index + 1).padStart(2, '0')} — Service
                  </p>

                  <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-white lg:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-mist">{service.summary}</p>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8">
                    <Button to="/contact" variant="secondary" size="sm" withArrow>
                      Discuss this service
                    </Button>
                  </div>
                </Reveal>
              </div>

              {/* ---- Detail + capability groups ---------------------------- */}
              <div>
                <Reveal delay={0.08}>
                  <GlassCard accent={service.accent} className="p-7 lg:p-8" spotlight={false}>
                    <p className="text-[0.9375rem] leading-relaxed text-mist">{service.detail}</p>
                  </GlassCard>
                </Reveal>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {service.groups.map((group, groupIndex) => (
                    <Reveal
                      key={group.title ?? groupIndex}
                      delay={0.12 + groupIndex * 0.06}
                      className={cn('h-full', service.groups.length === 1 && 'sm:col-span-2')}
                    >
                      <GlassCard accent={service.accent} className="h-full p-6" lift={false}>
                        {group.title ? (
                          <h3 className="mb-4 font-mono text-[0.7rem] tracking-[0.2em] text-brand-green uppercase">
                            {group.title}
                          </h3>
                        ) : null}

                        <ul
                          className={cn(
                            'grid gap-x-5 gap-y-2.5',
                            service.groups.length === 1 && 'sm:grid-cols-2',
                          )}
                        >
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-mist">
                              <Icon
                                name="check"
                                size={15}
                                className={cn(
                                  'mt-1 shrink-0',
                                  service.accent === 'green' ? 'text-brand-green' : 'text-brand-blue',
                                )}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        title="Not sure which of these you need?"
        description="That is a normal place to start. Describe the problem and we will tell you which practice fits — or that you do not need us at all."
      />
    </>
  )
}
