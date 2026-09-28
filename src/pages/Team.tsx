import { Seo } from '@/components/Seo'
import { CtaBand } from '@/components/sections/CtaBand'
import { GlobalPresence } from '@/components/sections/GlobalPresence'
import { PageHero } from '@/components/sections/PageHero'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team"
        description={`Meet the ${site.teamSize} behind IUNGO Technology — engineers, technical leads and consultants working from China, the United States and Brazil.`}
        path="/team"
      />

      <PageHero
        eyebrow="Our Team"
        title={
          <>
            Meet Our <span className="text-gradient">Global Technology Team</span>
          </>
        }
        description={`${site.teamSize} working from China, the United States and Brazil. Small by design: the people who scope your project are the people who build it, and there is no bench of juniors waiting to be substituted in.`}
      />

      <section className="relative pb-24 lg:pb-28">
        <Container>
          <TeamGrid />
        </Container>
      </section>

      <GlobalPresence />

      <CtaBand
        title="Want to work with this team?"
        description="Whether you have a project in mind or you are an engineer who would like to join us, we would like to hear from you."
      />
    </>
  )
}
