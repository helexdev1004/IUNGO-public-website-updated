import { motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

const immersive = services.find((service) => service.id === 'immersive')!
const capabilities = immersive.groups[0].items

/** Six faces of a wireframe cube, positioned in 3D space. */
const faces = [
  { transform: 'rotateY(0deg) translateZ(7rem)' },
  { transform: 'rotateY(90deg) translateZ(7rem)' },
  { transform: 'rotateY(180deg) translateZ(7rem)' },
  { transform: 'rotateY(-90deg) translateZ(7rem)' },
  { transform: 'rotateX(90deg) translateZ(7rem)' },
  { transform: 'rotateX(-90deg) translateZ(7rem)' },
]

export function Immersive3D() {
  const reduced = useReducedMotion()

  return (
    <section id="immersive" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-surface/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_50%,rgb(41_182_246/0.14),transparent_62%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ---- Copy --------------------------------------------------- */}
          <div>
            <SectionHeading
              eyebrow="Immersive Web"
              title={
                <>
                  Creating High Performance{' '}
                  <span className="text-gradient">3D Digital Experiences</span>
                </>
              }
              description={immersive.detail}
            />

            <Reveal delay={0.16}>
              <ul className="mt-9 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-mist">
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-brand-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10">
                <Button to="/contact" variant="secondary" withArrow>
                  Discuss a 3D project
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- Wireframe cube ----------------------------------------- */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
              {/* Glow bed */}
              <div
                aria-hidden="true"
                className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.22),transparent_64%)] blur-2xl"
              />

              {/* Orbit rings */}
              <div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-full border border-white/[0.07]"
                style={{ transform: 'rotateX(72deg)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-[18%] rounded-full border border-brand-green/15"
                style={{ transform: 'rotateX(72deg) rotateZ(38deg)' }}
              />

              <div
                className="relative h-56 w-56"
                style={{ perspective: '900px' }}
                aria-hidden="true"
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={reduced ? { rotateX: -22, rotateY: 32 } : { rotateX: [-22, -22], rotateY: [0, 360] }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 26, repeat: Infinity, ease: 'linear' }
                  }
                >
                  {faces.map((face, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 border border-brand-blue/35 bg-[linear-gradient(135deg,rgb(41_182_246/0.07),rgb(142_214_43/0.04))]"
                      style={{
                        transform: face.transform,
                        backfaceVisibility: 'visible',
                        boxShadow: 'inset 0 0 40px rgb(41 182 246 / 0.12)',
                      }}
                    >
                      {/* Face grid — the "wireframe" reading */}
                      <div
                        className="h-full w-full opacity-50"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, rgb(142 214 43 / 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgb(142 214 43 / 0.16) 1px, transparent 1px)',
                          backgroundSize: '28px 28px',
                        }}
                      />
                      {/* Corner nodes */}
                      <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-brand-green shadow-glow-green" />
                      <span className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-brand-blue shadow-glow-blue" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Performance callout — the real differentiator, so it is stated */}
              <div className="glass ring-gradient absolute bottom-2 left-1/2 -translate-x-1/2 rounded-xl px-4 py-2.5 text-center">
                <p className="font-mono text-[0.7rem] tracking-wide text-brand-green">60 FPS TARGET</p>
                <p className="mt-0.5 text-[0.7rem] text-mist-dim">Profiled on mid-range mobile</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
