import { Seo } from '@/components/Seo'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { techStack } from '@/data/technology'
import { cn } from '@/lib/cn'

export default function Technology() {
  return (
    <>
      <Seo
        title="Technology Expertise"
        description="The stack IUNGO Technology builds, ships and operates on: React, TypeScript, Node.js, Python, PostgreSQL, AWS, Kubernetes, PyTorch, Three.js and more."
        path="/technology"
      />

      <PageHero
        eyebrow="Technology Expertise"
        title={
          <>
            The stack we <span className="text-gradient">build, ship and operate</span>
          </>
        }
        description="We are not tied to a single framework — we are tied to choosing the one that fits the problem and that your team can maintain after we leave. These are the tools we know well enough to recommend honestly."
      />

      <section className="relative pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {techStack.map((category, index) => (
              <Reveal key={category.title} delay={index * 0.06} className="h-full">
                <GlassCard accent={category.accent} className="h-full p-7" as="article">
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-400',
                        category.accent === 'green'
                          ? 'border-brand-green/25 bg-brand-green/10 text-brand-green group-hover/card:shadow-glow-green'
                          : 'border-brand-blue/25 bg-brand-blue/10 text-brand-blue group-hover/card:shadow-glow-blue',
                      )}
                    >
                      <Icon name={category.icon} size={22} />
                    </span>

                    <div>
                      <h2 className="font-display text-lg font-semibold text-white">
                        {category.title}
                      </h2>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-mist">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <TechMarquee />

      <CtaBand
        title="Need a second opinion on an architecture?"
        description="Architecture decisions are expensive to reverse. We are happy to pressure-test yours before you commit."
        primaryLabel="Talk to an engineer"
      />
    </>
  )
}
