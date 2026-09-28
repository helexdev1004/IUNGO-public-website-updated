import { Seo } from '@/components/Seo'
import { AiInnovation } from '@/components/sections/AiInnovation'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

const aiService = services.find((service) => service.id === 'ai')!

const process = [
  {
    step: 'Frame',
    title: 'Define what "working" means',
    body: 'Before any model is chosen we agree the evaluation criteria — what a good answer looks like, what an unacceptable one looks like, and how we will measure the difference.',
  },
  {
    step: 'Ground',
    title: 'Prepare the data',
    body: 'Annotation, cleaning and structuring. Most AI projects that fail, fail here: the model was fine, the data it was pointed at was not.',
  },
  {
    step: 'Build',
    title: 'Engineer the system around the model',
    body: 'Retrieval, tool access, prompt architecture, fallbacks and guardrails. The model is one component; the reliability comes from everything around it.',
  },
  {
    step: 'Prove',
    title: 'Evaluate before, and after, release',
    body: 'Every release is scored against a labelled test set, and production behaviour is monitored. Regressions get caught by the harness, not by your customers.',
  },
]

export default function AiSolutions() {
  return (
    <>
      <Seo
        title="AI Solutions"
        description="LLM applications, AI agents, retrieval augmented generation, computer vision, machine learning and AI automation — engineered with evaluation and guardrails, and taken into production."
        path="/ai-solutions"
      />

      <PageHero
        particles
        eyebrow="AI Solutions"
        title={
          <>
            Artificial intelligence, <span className="text-gradient">engineered to hold up</span>
          </>
        }
        description="A demo is easy. A system that stays correct under real inputs, at real volume, with real consequences for being wrong — that is the work. We have taken 10+ AI projects into production and this is how we do it."
      />

      {/* ---- Capability groups --------------------------------------------- */}
      <section className="relative pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {aiService.groups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.08} className="h-full">
                <GlassCard accent={index === 1 ? 'blue' : 'green'} className="h-full p-7">
                  <h2 className="font-mono text-[0.7rem] tracking-[0.2em] text-brand-green uppercase">
                    {group.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-mist">
                        <Icon name="check" size={15} className="mt-1 shrink-0 text-brand-blue" />
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

      <AiInnovation />

      {/* ---- Delivery process ---------------------------------------------- */}
      <section id="generative" className="relative scroll-mt-28 border-t border-white/[0.06] bg-surface/40 py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="How We Deliver AI"
            title={
              <>
                Four stages, and a <span className="text-gradient">refusal to skip the boring one</span>
              </>
            }
            description="The third stage is where most of the engineering lives. The second is where most projects are won or lost."
          />

          <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((phase, index) => (
              <Reveal key={phase.step} delay={index * 0.08} as="li" className="h-full">
                <GlassCard accent={index % 2 === 0 ? 'green' : 'blue'} className="h-full p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-bold text-gradient">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-mist-dim uppercase">
                      {phase.step}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.0625rem] leading-snug font-semibold text-white">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist">{phase.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Have an AI problem worth solving properly?"
        description="Bring us the constraint, not the buzzword. We will tell you whether AI is the right tool — including when it is not."
      />
    </>
  )
}
