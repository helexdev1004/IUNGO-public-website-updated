import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'
import { aiCapabilities } from '@/data/technology'

export function AiInnovation() {
  return (
    <section id="ai-innovation" className="relative overflow-hidden py-24 lg:py-32">
      {/* Perspective floor grid — reads as "laboratory" without a single image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[32rem] opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(41 182 246 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(41 182 246 / 0.12) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          transform: 'perspective(340px) rotateX(58deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, #000, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(to top, #000, transparent 72%)',
        }}
      />
      <GlowOrbs />

      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="AI Innovation"
          title={
            <>
              Exploring The Future of <span className="text-gradient">Artificial Intelligence</span>
            </>
          }
          description="We work at the edge of applied AI — and we ship the parts that are ready. Each capability below is something we have taken into production, with evaluation and guardrails attached."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiCapabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 0.06} className="h-full">
              <GlassCard
                accent={index % 2 === 0 ? 'green' : 'blue'}
                className="h-full p-6"
                as="article"
              >
                {/* Scanline that sweeps the card on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(142_214_43/0.7),transparent)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                />

                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-blue transition-colors duration-400 group-hover/card:text-brand-green">
                  <Icon name={capability.icon} size={20} />
                </span>

                <h3 className="font-display text-[1.0625rem] leading-snug font-semibold text-white">
                  {capability.title}
                </h3>

                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mist">
                  {capability.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {capability.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[0.68rem] text-mist-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
