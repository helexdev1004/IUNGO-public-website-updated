import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

interface CtaBandProps {
  title?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
}

export function CtaBand({
  title = 'Let us build something worth shipping',
  description = 'Tell us what you are trying to solve. You will hear back from an engineer — not a sales sequence — within one business day.',
  primaryLabel = 'Start a conversation',
  primaryTo = '/contact',
}: CtaBandProps) {
  return (
    <section className="relative py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="ring-gradient relative overflow-hidden rounded-3xl px-7 py-16 text-center sm:px-12 lg:py-20">
            {/* Layered background: deep field, brand wash, fine grid */}
            <div aria-hidden="true" className="absolute inset-0 -z-20 bg-surface-2" />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_0%,rgb(142_214_43/0.2),transparent_58%),radial-gradient(ellipse_at_75%_100%,rgb(41_182_246/0.2),transparent_58%)]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-fine opacity-50" />

            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              {description}
            </p>

            {/* Single action: the contact form is the only route in. */}
            <div className="mt-10 flex justify-center">
              <Button to={primaryTo} size="lg" withArrow className="w-full sm:w-auto">
                {primaryLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
