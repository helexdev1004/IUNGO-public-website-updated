import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { Seo } from '@/components/Seo'
import { ApplyForm } from '@/components/sections/ApplyForm'
import { PageHero } from '@/components/sections/PageHero'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { getPosting } from '@/data/apply'
import NotFound from '@/pages/NotFound'

/* A single job posting plus its application form. The posting is chosen by
   the code in the URL (/apply/<code>); an unknown code renders the 404 page,
   so a retired posting stops existing the moment it leaves data/apply.ts. */

/** A titled block of posting copy. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-white sm:text-[1.375rem]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

/** Prose paragraphs, as used for the company and role copy. */
function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-mist">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default function Apply() {
  const { code } = useParams()
  const posting = getPosting(code)

  if (!posting) return <NotFound />

  return (
    <>
      <Seo
        title={posting.title}
        description={posting.summary}
        path={`/apply/${posting.code}`}
        noindex
      />

      <PageHero eyebrow={posting.eyebrow} title={posting.title} description={posting.summary}>
        <Reveal delay={0.18}>
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {posting.facts.map((fact) => (
              <div
                key={fact.label}
                className="glass flex items-start gap-3 rounded-xl px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-green">
                  <Icon name={fact.icon} size={16} />
                </span>
                <div>
                  <dt className="text-[0.75rem] text-mist-dim">{fact.label}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-frost">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The form sits below the posting on narrow screens, so the hero
            offers a way straight to it. */}
        <Reveal delay={0.24}>
          <div className="mt-9 lg:hidden">
            <Button href="#apply" size="lg" withArrow>
              Apply now
            </Button>
          </div>
        </Reveal>
      </PageHero>

      <section className="relative pb-24 lg:pb-28">
        <Container>
          <div className="grid items-start gap-x-8 gap-y-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-12">
            {/* ---- The posting ------------------------------------------ */}
            <div className="space-y-11">
              <Reveal>
                <Block title="About IUNGO Technology">
                  <Prose paragraphs={posting.about} />
                </Block>
              </Reveal>

              <Reveal>
                <Block title="What you would be working on">
                  <Prose paragraphs={posting.role} />
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {posting.platforms.map((platform) => (
                      <li key={platform} className="chip">
                        {platform}
                      </li>
                    ))}
                  </ul>
                </Block>
              </Reveal>

              <Reveal>
                <Block title="Requirements">
                  <GlassCard accent="green" className="p-6 sm:p-7" spotlight={false} lift={false}>
                    <ul className="space-y-3.5">
                      {posting.requirements.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-mist"
                        >
                          <Icon
                            name="check"
                            size={16}
                            className="mt-1 shrink-0 text-brand-green"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Block>
              </Reveal>

              <Reveal>
                <Block title="What we offer">
                  <GlassCard accent="blue" className="p-6 sm:p-7" spotlight={false} lift={false}>
                    <ul className="space-y-3.5">
                      {posting.benefits.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-mist"
                        >
                          <Icon
                            name="sparkles"
                            size={16}
                            className="mt-1 shrink-0 text-brand-blue"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Block>
              </Reveal>
            </div>

            {/* ---- The form ---------------------------------------------
                Sticky on wide screens so it stays reachable while the
                posting is being read. */}
            <div id="apply" className="scroll-mt-28 lg:sticky lg:top-28">
              <Reveal delay={0.08}>
                <ApplyForm postingCode={posting.code} postingTitle={posting.title} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
