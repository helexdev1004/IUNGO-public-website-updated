import type { ReactNode } from 'react'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  /** Extra content below the heading — stats, chips, a CTA row. */
  children?: ReactNode
  /** Adds the particle canvas. Off by default to keep inner pages light. */
  particles?: boolean
}

export function PageHero({ eyebrow, title, description, children, particles = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div aria-hidden="true" className="mask-fade-b absolute inset-0 -z-20 bg-grid opacity-50" />
      <GlowOrbs variant="corner" />
      {particles ? <ParticleNetwork className="-z-10" density={0.00006} opacity={0.5} /> : null}

      <Container className="relative">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children}
      </Container>
    </section>
  )
}
