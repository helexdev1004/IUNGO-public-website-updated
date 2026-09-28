import { Seo } from '@/components/Seo'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageHero } from '@/components/sections/PageHero'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Start a conversation with IUNGO Technology about an AI, software, ecommerce or enterprise project — or apply to join our global engineering team."
        path="/contact"
      />

      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Tell us what you are <span className="text-gradient">trying to build</span>
          </>
        }
        description="Have a project in mind, or want to join the team? Pick whichever applies below. The more concrete you are, the more useful our first reply will be."
      />

      <ContactSection />
    </>
  )
}
