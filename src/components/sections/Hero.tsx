import { motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork'
import { trustPoints } from '@/data/stats'
import { EASE } from '@/lib/motion'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  const reduced = useReducedMotion()

  /* With reduced motion the content renders in place — nothing important is
     ever hidden behind an animation that will not run. */
  const stagger = reduced
    ? {}
    : { initial: 'hidden', animate: 'show', variants: { show: { transition: { staggerChildren: 0.11 } } } }

  const item = reduced ? {} : { variants: rise, transition: { duration: 0.75, ease: EASE } }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      {/* ---- Background layers ------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-void" />
      <div aria-hidden="true" className="mask-radial absolute inset-0 -z-20 bg-grid opacity-70" />
      <GlowOrbs variant="hero" />
      <ParticleNetwork className="-z-10" opacity={0.85} />

      {/* Fade the canvas into whatever section follows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_bottom,transparent,var(--color-void))]"
      />

      <Container className="relative">
        <motion.div className="mx-auto max-w-4xl text-center" {...stagger}>
          {/* ---- Status pill --------------------------------------------- */}
          <motion.div {...item} className="flex justify-center">
            <span className="glass ring-gradient inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.8125rem] font-medium text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>
              Global AI &amp; Software Engineering Partner
            </span>
          </motion.div>

          {/* ---- Headline ------------------------------------------------ */}
          <motion.h1
            {...item}
            className="mt-8 font-display text-[2.6rem] leading-[1.04] font-bold text-balance text-white sm:text-6xl lg:text-[4.25rem]"
          >
            Building{' '}
            <span className="text-gradient">Intelligent Digital Solutions</span>{' '}
            With Global Technology Experts
          </motion.h1>

          {/* ---- Subtitle ------------------------------------------------ */}
          <motion.p
            {...item}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
          >
            IUNGO Technology is a global AI and software engineering team delivering advanced AI
            solutions, full-stack applications, enterprise platforms and immersive digital
            experiences for businesses worldwide.
          </motion.p>

          {/* ---- Actions ------------------------------------------------- */}
          <motion.div {...item} className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button to="/services" size="lg" withArrow className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
            <Button to="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">
              Contact Our Team
            </Button>
          </motion.div>

          {/* ---- Trust row ----------------------------------------------- */}
          <motion.ul
            {...item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.8125rem] text-mist-dim"
          >
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Icon name="check" size={15} className="text-brand-green" />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      {/* ---- Scroll cue --------------------------------------------------- */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <motion.span
              className="h-1.5 w-1 rounded-full bg-brand-green"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
