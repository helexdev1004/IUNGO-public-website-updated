import { Seo } from '@/components/Seo'
import { CtaBand } from '@/components/sections/CtaBand'
import { GlobalPresence } from '@/components/sections/GlobalPresence'
import { PageHero } from '@/components/sections/PageHero'
import { Stats } from '@/components/sections/Stats'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'
import { site } from '@/data/site'

/* Computed once at module load so the copy stays accurate as years pass
   without making the component's render impure. */
const YEARS_ACTIVE = new Date().getFullYear() - site.founded

const values: { title: string; body: string; icon: IconName; accent: 'green' | 'blue' }[] = [
  {
    title: 'Senior engineers only',
    body: 'The person who scopes your project is the person who builds it. No handoff to a junior bench once the contract is signed.',
    icon: 'users',
    accent: 'green',
  },
  {
    title: 'Evidence over assertion',
    body: 'Performance budgets, evaluation harnesses and measured results. We would rather show you a number than tell you it is fast.',
    icon: 'target',
    accent: 'blue',
  },
  {
    title: 'Built to be handed over',
    body: 'Typed, tested and documented so your own team can take ownership. An engagement that ends in dependency has failed.',
    icon: 'shield',
    accent: 'green',
  },
  {
    title: 'Close to your timezone',
    body: 'A distributed team is not an excuse for slow replies. We cover US and European hours and answer within one business day.',
    icon: 'globe',
    accent: 'blue',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description={`${site.name} is a global technology company headquartered in ${site.headquarters}, with a distributed team of engineers, AI specialists, designers and IT consultants serving clients across the US and Europe.`}
        path="/about"
      />

      <PageHero
        eyebrow="About Us"
        title={
          <>
            A global team built to <span className="text-gradient">connect technology talent</span>
          </>
        }
        description={`${site.name} is a global technology company based in ${site.headquarters}, with a distributed international team of ${site.teamSize} — experienced engineers, AI specialists and IT consultants.`}
      />

      {/* ---- Mission ------------------------------------------------------ */}
      <section className="relative pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Reveal>
              <div className="space-y-6 text-[1.0625rem] leading-relaxed text-mist">
                <p>
                  We have spent {YEARS_ACTIVE}+ years delivering modern
                  technology solutions for customers worldwide — with a particular focus on clients
                  in the United States and Europe. In that time we have shipped more than 50
                  business solutions and worked on over 10 AI technology projects.
                </p>
                <p>
                  The name is Latin: <em className="text-frost not-italic">iungo</em> — to join, to
                  connect. That is the whole idea. We connect global technology talent with the
                  organisations that need it, and we connect systems that were never designed to
                  talk to each other.
                </p>
                <p>
                  We stay deliberately small. A team of {site.teamSize} means no layers between you
                  and the people writing the code, and no incentive to staff a project with more
                  people than it needs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard accent="green" className="ring-gradient h-full p-8" spotlight={false}>
                <p className="font-mono text-[0.68rem] tracking-[0.22em] text-brand-green uppercase">
                  Our Mission
                </p>
                <p className="mt-5 font-display text-xl leading-snug font-medium text-balance text-white">
                  {site.mission}
                </p>

                <dl className="mt-8 space-y-4 border-t border-white/[0.07] pt-6 text-[0.9375rem]">
                  <div className="flex items-center gap-3">
                    <Icon name="mapPin" size={16} className="shrink-0 text-brand-blue" />
                    <dt className="sr-only">Headquarters</dt>
                    <dd className="text-mist">{site.headquartersLine}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="users" size={16} className="shrink-0 text-brand-blue" />
                    <dt className="sr-only">Team size</dt>
                    <dd className="text-mist">{site.teamSize}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="clock" size={16} className="shrink-0 text-brand-blue" />
                    <dt className="sr-only">Founded</dt>
                    <dd className="text-mist">Operating since {site.founded}</dd>
                  </div>
                </dl>
              </GlassCard>
            </Reveal>
          </div>
        </Container>
      </section>

      <Stats />

      {/* ---- Values -------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32">
        <GlowOrbs />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="How We Work"
            title={
              <>
                Four commitments we <span className="text-gradient">hold ourselves to</span>
              </>
            }
            description="Every agency says it is different. These are the specific, checkable things we do differently."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.07} className="h-full">
                <GlassCard accent={value.accent} className="h-full p-7" as="article">
                  <span
                    className={
                      value.accent === 'green'
                        ? 'mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-green/25 bg-brand-green/10 text-brand-green'
                        : 'mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-blue/25 bg-brand-blue/10 text-brand-blue'
                    }
                  >
                    <Icon name={value.icon} size={22} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{value.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <GlobalPresence />
      <CtaBand
        title="Work with a team that stays small on purpose"
        description="Tell us what you are building. We will tell you honestly whether we are the right people for it."
      />
    </>
  )
}
