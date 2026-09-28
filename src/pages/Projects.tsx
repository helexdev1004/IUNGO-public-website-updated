import { Seo } from '@/components/Seo'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { Container } from '@/components/ui/Container'

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects & Case Studies"
        description="Selected engagements across AI platforms, enterprise software, ecommerce, 3D interactive experiences and business automation — the challenge, the solution, the stack and the result."
        path="/projects"
      />

      <PageHero
        eyebrow="Projects & Case Studies"
        title={
          <>
            Problems we were <span className="text-gradient">brought in to solve</span>
          </>
        }
        description="Every engagement below started with a business constraint rather than a technology preference. Client names are withheld where we do not have permission to publish them."
      />

      <section className="relative pb-24 lg:pb-28">
        <Container>
          <ProjectsGrid />
        </Container>
      </section>

      <CtaBand
        title="Your problem probably rhymes with one of these"
        description="Tell us where the system is straining. We will tell you what we would do about it, and roughly what that takes."
      />
    </>
  )
}
