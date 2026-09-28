import { Seo } from '@/components/Seo'
import { AiInnovation } from '@/components/sections/AiInnovation'
import { CtaBand } from '@/components/sections/CtaBand'
import { GlobalPresence } from '@/components/sections/GlobalPresence'
import { Hero } from '@/components/sections/Hero'
import { Immersive3D } from '@/components/sections/Immersive3D'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Stats } from '@/components/sections/Stats'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowOrbs } from '@/components/visuals/GlowOrbs'
import { site } from '@/data/site'

export default function Home() {
  return (
    <>
      <Seo
        description={site.description}
        path="/"
        organization
      />

      <Hero />
      <Stats />
      <TechMarquee />

      {/* ---- Services ----------------------------------------------------- */}
      <section className="relative py-24 lg:py-32">
        <GlowOrbs />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="What We Do"
            title={
              <>
                Engineering across the <span className="text-gradient">full technology stack</span>
              </>
            }
            description="Six practices, one delivery team. Most engagements draw on more than one — which is the point of keeping them under a single roof."
          />

          <div className="mt-16">
            <ServicesGrid />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Button to="/services" variant="secondary" withArrow>
                See all services in detail
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <AiInnovation />
      <Immersive3D />

      {/* ---- Projects ----------------------------------------------------- */}
      <section className="relative py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                Problems we were <span className="text-gradient">brought in to solve</span>
              </>
            }
            description="Each engagement below started with a business constraint rather than a technology preference. The stack followed from the problem."
          />

          <div className="mt-16">
            <ProjectsGrid limit={3} compact />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <Button to="/projects" variant="secondary" withArrow>
                Read the full case studies
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <GlobalPresence />

      {/* ---- Team --------------------------------------------------------- */}
      <section className="relative py-24 lg:py-32">
        <GlowOrbs />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="Our People"
            title={
              <>
                Meet Our <span className="text-gradient">Global Technology Team</span>
              </>
            }
            description="A small senior team by design. The people who scope your project are the people who build it."
          />

          <div className="mt-16">
            <TeamGrid limit={6} />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Button to="/team" variant="secondary" withArrow>
                Meet the whole team
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
