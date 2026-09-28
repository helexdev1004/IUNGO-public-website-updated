import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlobeNetwork } from '@/components/visuals/GlobeNetwork'
import { site } from '@/data/site'
import { mapNodes } from '@/data/team'

export function GlobalPresence() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-surface/40 py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-fine opacity-30" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <GlobeNetwork className="mx-auto max-w-lg" />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Global Collaboration"
              title={
                <>
                  One team, <span className="text-gradient">many time zones</span>
                </>
              }
              description={`Headquartered in ${site.headquarters}, with colleagues in the United States and Brazil. That spread is deliberate: it means your project moves while you sleep, and there is always someone awake in a timezone close to yours.`}
            />

            {/* Location roster — the globe is decorative, this is the record */}
            <Reveal delay={0.16}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {mapNodes.map((node) => (
                  <li key={node.label} className="flex items-center gap-2.5 text-[0.9375rem]">
                    <span
                      className={
                        node.hub
                          ? 'h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green shadow-glow-green'
                          : 'h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue'
                      }
                    />
                    <span className={node.hub ? 'font-medium text-frost' : 'text-mist'}>
                      {node.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.07] pt-7 text-[0.875rem] text-mist">
                <span className="flex items-center gap-2">
                  <Icon name="clock" size={16} className="text-brand-green" />
                  US &amp; EU business hours covered
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="globe" size={16} className="text-brand-blue" />
                  English-speaking delivery team
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
