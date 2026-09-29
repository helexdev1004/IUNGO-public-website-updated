import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

import { CareersForm } from '@/components/sections/CareersForm'
import { ContactForm } from '@/components/sections/ContactForm'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/GlassCard'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { careersExpectations } from '@/data/careers'
import { projectExpectations, site } from '@/data/site'
import { cn } from '@/lib/cn'

type TabId = 'project' | 'careers'

const tabs: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'project', label: 'Start a project', icon: 'rocket' },
  { id: 'careers', label: 'Join our team', icon: 'users' },
]

const asideCopy: Record<TabId, { heading: string; items: string[] }> = {
  project: { heading: 'What happens next', items: projectExpectations },
  careers: { heading: 'How we hire', items: careersExpectations },
}

export function ContactSection() {
  /* Recruitment leads the page: "Join our team" is the tab a visitor lands on. */
  const [tab, setTab] = useState<TabId>('careers')
  const reduced = useReducedMotion()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  /* Left/right arrows move between tabs, which is what a screen-reader user
     expects from a tablist. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = tabs.findIndex((t) => t.id === tab)
    let next = index

    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return

    event.preventDefault()
    setTab(tabs[next].id)
    tabRefs.current[tabs[next].id]?.focus()
  }

  const aside = asideCopy[tab]

  return (
    <section className="relative pb-24 lg:pb-28">
      <Container>
        {/* The tab switcher gets its own grid row so the form card below it
            starts level with the aside card in the next column. Aligning them
            with a top margin instead would need a magic number that breaks
            whenever the tab height changes. */}
        <div className="grid items-start gap-x-8 gap-y-6 lg:grid-cols-[1.4fr_1fr] lg:gap-x-12">
          {/* ---- Row 1 · tabs ------------------------------------------ */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <div
              role="tablist"
              aria-label="What would you like to contact us about?"
              onKeyDown={onKeyDown}
              className="glass inline-flex rounded-full p-1"
            >
              {tabs.map((item) => {
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[item.id] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={active}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      'relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.875rem] font-medium',
                      'transition-colors duration-300 sm:px-5',
                      active ? 'text-void' : 'text-mist hover:text-frost',
                    )}
                  >
                    {/* The pill slides between tabs rather than cutting. */}
                    {active ? (
                      <motion.span
                        aria-hidden="true"
                        layoutId={reduced ? undefined : 'contact-tab-pill'}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,var(--color-brand-green),var(--color-brand-blue-soft))]"
                      />
                    ) : null}
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* ---- Row 2 · active form ----------------------------------- */}
          <Reveal delay={0.06} className="lg:col-start-1 lg:row-start-2">
            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={-1}>
              {/* Keyed so switching tabs mounts a fresh form rather than
                  carrying one form's half-typed values into the other. */}
              {tab === 'project' ? <ContactForm key="project" /> : <CareersForm key="careers" />}
            </div>
          </Reveal>

          {/* ---- Row 2 · aside ------------------------------------------ */}
          <div className="space-y-5 lg:col-start-2 lg:row-start-2">
            <Reveal delay={0.1}>
              <GlassCard accent="blue" className="p-7" spotlight={false}>
                <h2 className="font-mono text-[0.7rem] tracking-[0.2em] text-brand-blue uppercase">
                  Where we are
                </h2>

                <dl className="mt-6 space-y-5 text-[0.9375rem]">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-blue">
                      <Icon name="mapPin" size={17} />
                    </span>
                    <div>
                      <dt className="text-[0.8125rem] text-mist-dim">Headquarters</dt>
                      <dd className="text-frost">{site.headquartersLine}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-green">
                      <Icon name="clock" size={17} />
                    </span>
                    <div>
                      <dt className="text-[0.8125rem] text-mist-dim">Availability</dt>
                      <dd className="text-frost">{site.hours}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-7 flex items-center gap-2.5 border-t border-white/[0.07] pt-6">
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-brand-green"
                    >
                      <Icon name={social.icon} size={16} />
                    </a>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.16}>
              <GlassCard accent="green" className="p-7" spotlight={false}>
                <h2 className="font-mono text-[0.7rem] tracking-[0.2em] text-brand-green uppercase">
                  {aside.heading}
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {aside.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-mist">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
