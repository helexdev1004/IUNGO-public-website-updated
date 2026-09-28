import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for does not exist." path="/404" />

      <section className="relative flex min-h-[80vh] items-center overflow-hidden py-32">
        <div aria-hidden="true" className="mask-radial absolute inset-0 -z-20 bg-grid opacity-60" />
        <GlowOrbs variant="hero" />

        <Container className="relative text-center">
          <p className="font-display text-[5rem] leading-none font-bold text-gradient sm:text-[7rem]">
            404
          </p>

          <h1 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
            This page does not exist
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-mist">
            The link may be out of date, or the page may have moved. Everything else is still where
            you left it.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button to="/" size="lg" withArrow>
              Back to home
            </Button>
            <Button to="/contact" size="lg" variant="secondary">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
