import { technologyMarquee } from '@/data/technology'

/**
 * Continuously scrolling band of technology names.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * loop is seamless. Wordmarks are set in monospace rather than reproduced as
 * logos — the site should not ship trademarks it has no licence to display.
 */
export function TechMarquee() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] py-10" aria-label="Technologies we work with">
      <p className="mb-7 text-center font-mono text-[0.68rem] tracking-[0.24em] text-mist-dim uppercase">
        The stack we build on
      </p>

      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee pause-on-hover items-center gap-4">
          {[...technologyMarquee, ...technologyMarquee].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              aria-hidden={index >= technologyMarquee.length}
              className="chip px-4 py-2 text-[0.8125rem] whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
