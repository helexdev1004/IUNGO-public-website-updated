import { Seo } from '@/components/Seo'
import { CommunityForm } from '@/components/sections/CommunityForm'
import { PageHero } from '@/components/sections/PageHero'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  communityStrap,
  communitySteps,
  communityValues,
  expertiseAreas,
} from '@/data/community'
import { site } from '@/data/site'

/* The AI Community page: an open call for domain experts to join the network,
   and the form they join through. Copy lives in data/community.ts. */

export default function AiCommunity() {
  return (
    <>
      <Seo
        title="AI Community"
        description="A professional community connecting scientists, software developers, researchers, engineers and financial experts with AI training and evaluation opportunities. Free to join for domain experts."
        path="/ai-community"
        /* The community banner doubles as this page's share card. Absolute,
           because link scrapers do not resolve root-relative paths. */
        image={`${site.url}/ai-community-banner.jpg`}
      />

      <PageHero
        particles
        eyebrow="AI Community"
        title={
          <>
            Connecting human expertise with <span className="text-gradient">AI opportunities</span>
          </>
        }
        description="We are building a professional community that connects scientists, experienced developers, researchers, engineers, financial professionals and other domain experts with work in AI training and evaluation."
      >
        {/* Strap from the community banner artwork — People × Knowledge × AI
            × Real-world impact — so page and graphic read alike. */}
        <Reveal delay={0.15}>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] tracking-[0.2em] text-mist-dim uppercase">
            {communityStrap.map((word, index) => (
              <span key={word} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-brand-green/50">
                    ×
                  </span>
                ) : null}
                {word}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#join" size="lg" withArrow>
              Apply to join
            </Button>

            <span className="glass inline-flex h-13 items-center gap-2.5 rounded-full px-6 text-[0.9375rem] text-frost">
              <Icon name="check" size={16} className="text-brand-green" />
              Free for domain experts
            </span>
          </div>
        </Reveal>

        {/* Community banner. Served as WebP with a JPEG fallback — the source
            PNG was 2.1MB, which is larger than the entire JS bundle. The
            width/height attributes reserve the box so the hero does not jump
            when it loads, and the alt text carries what the artwork says,
            since its lettering is unreadable at phone width. */}
        <Reveal delay={0.24}>
          <figure className="ring-gradient relative mt-12 overflow-hidden rounded-2xl">
            <picture>
              <source srcSet="/ai-community-banner.webp" type="image/webp" />
              <img
                src="/ai-community-banner.jpg"
                alt="IUNGO Technology AI Training & Expert Collaboration Community — scientists, software developers, researchers, engineers and finance specialists working together around a globe of connected data."
                width={1672}
                height={941}
                decoding="async"
                className="block w-full"
              />
            </picture>
          </figure>
        </Reveal>
      </PageHero>

      {/* ---- Why this exists ------------------------------------------------ */}
      <section className="relative pb-20 lg:pb-24">
        <Container width="narrow">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-mist sm:text-lg">
              <p>
                As AI systems become more advanced, they increasingly rely on human expertise in
                specialised fields — from software engineering and mathematics through to biology,
                physics, finance and scientific research.
              </p>
              <p>
                We help qualified professionals find the active projects on AI training platforms,
                with opportunities announced daily and guidance on the assessments that gate them.
                Once you are shortlisted for a project, we connect you with verified, skilled
                taskers already working in that area.
              </p>
            </div>
          </Reveal>
        </Container>

        {/* The four values along the foot of the community banner. */}
        <Container className="mt-14">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {communityValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.07} as="li">
                <div className="glass flex h-full items-center gap-3 rounded-xl px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-blue/25 bg-brand-blue/10 text-brand-blue">
                    <Icon name={value.icon} size={16} />
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-frost">{value.title}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- Who we are looking for ----------------------------------------- */}
      <section className="relative border-t border-white/[0.06] bg-surface/40 py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Who We Are Looking For"
            title={
              <>
                Professionals with <span className="text-gradient">deep domain knowledge</span>
              </>
            }
            description="If your expertise is genuine and specific, there is likely work that needs it. These are the areas we are actively building out."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseAreas.map((area, index) => (
              <Reveal key={area.id} delay={index * 0.07} className="h-full">
                <GlassCard
                  accent={index % 2 === 0 ? 'green' : 'blue'}
                  className="h-full p-7"
                >
                  <span
                    className={
                      index % 2 === 0
                        ? 'flex h-11 w-11 items-center justify-center rounded-xl border border-brand-green/25 bg-brand-green/10 text-brand-green'
                        : 'flex h-11 w-11 items-center justify-center rounded-xl border border-brand-blue/25 bg-brand-blue/10 text-brand-blue'
                    }
                  >
                    <Icon name={area.icon} size={19} />
                  </span>

                  <h3 className="mt-5 font-display text-[1.0625rem] leading-snug font-semibold text-white">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist">{area.detail}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- How it works --------------------------------------------------- */}
      <section className="relative py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="How Our Community Works"
            title={
              <>
                Five steps, <span className="text-gradient">start to collaboration</span>
              </>
            }
            description="No part of this costs a domain expert anything. The process exists so that the people we put forward are genuinely suited to the work."
          />

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communitySteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.07} as="li" className="h-full">
                <GlassCard
                  accent={index % 2 === 0 ? 'green' : 'blue'}
                  className="h-full p-7"
                  spotlight={false}
                >
                  <span className="font-display text-3xl font-bold text-gradient">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mt-4 font-display text-[1.0625rem] leading-snug font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist">{step.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- Free membership ------------------------------------------------ */}
      <section className="relative pb-24 lg:pb-28">
        <Container>
          <Reveal>
            <div className="ring-gradient relative overflow-hidden rounded-3xl px-7 py-14 text-center sm:px-12">
              <div aria-hidden="true" className="absolute inset-0 -z-20 bg-surface-2" />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_0%,rgb(142_214_43/0.2),transparent_58%),radial-gradient(ellipse_at_75%_100%,rgb(41_182_246/0.2),transparent_58%)]"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-fine opacity-50" />

              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-green/30 bg-brand-green/10 text-brand-green shadow-glow-green">
                <Icon name="users" size={26} />
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl font-display text-2xl leading-tight font-semibold text-balance text-white sm:text-3xl">
                Membership is free for domain experts
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mist">
                We do not charge registration fees or take commission from specialists. Whether you
                are an experienced developer, a research scientist, a PhD candidate, a financial
                specialist or another qualified professional, we would like to hear from you.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---- The form -------------------------------------------------------- */}
      <section id="join" className="relative scroll-mt-28 border-t border-white/[0.06] bg-surface/40 py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Apply To Join"
            title={
              <>
                Tell us <span className="text-gradient">what you know</span>
              </>
            }
            description="The more specific you are about your field, the better we can match you to projects that actually need it. Every application is read by a person."
          />

          <div className="mt-12 grid items-start gap-x-8 gap-y-6 lg:grid-cols-[1.4fr_1fr] lg:gap-x-12">
            <Reveal>
              <CommunityForm />
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard accent="blue" className="p-7" spotlight={false}>
                <h3 className="font-mono text-[0.7rem] tracking-[0.2em] text-brand-blue uppercase">
                  What happens next
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {[
                    'A member of the team reads your application — it is not filtered by a keyword bot.',
                    'We check your LinkedIn profile against what you have told us. That is what keeps the network verified.',
                    'If your background fits, you receive an invitation to our Slack workspace.',
                    'We point you toward the platforms and projects that match your field.',
                    'We reply either way, including when the answer is no.',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-mist"
                    >
                      <Icon name="check" size={16} className="mt-1 shrink-0 text-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
