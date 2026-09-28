/* ==========================================================================
   Site-wide constants: identity, navigation, contact details, social links.
   ========================================================================== */

export interface NavChild {
  label: string
  href: string
  blurb: string
}

export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

export const site = {
  name: 'IUNGO Technology',
  shortName: 'IUNGO',
  tagline: 'Global AI & Software Engineering Partner',

  description:
    'IUNGO Technology is a global AI and software engineering team delivering advanced AI solutions, full-stack applications, enterprise platforms and immersive digital experiences for businesses worldwide.',

  mission:
    'To connect global technology talent and create innovative digital solutions using advanced AI, software engineering and emerging technologies.',

  /* The live origin. Drives canonical URLs and Organization structured data,
     so it must match where the site is actually served or search engines are
     told the real page lives somewhere else. No trailing slash.
     TODO(setup): update this, public/robots.txt and public/sitemap.xml
     together if a custom domain is added. */
  url: 'https://iungotech.netlify.app',

  /* No public email address by design — the contact form is the only route
     in, which keeps the address off scrapers. Submissions are delivered by
     Netlify Forms to whatever inbox is configured in the Netlify dashboard
     (Forms → contact → Form notifications), not by anything in this file. */
  headquarters: 'Nanjing, China',
  headquartersLine: 'Nanjing, Jiangsu Province, China',
  hours: 'Monday–Friday · Covering US and European business hours',

  founded: 2019,
  /* Keep in step with the roster in data/team.ts. */
  teamSize: '7 specialists',

  /* The LinkedIn slug is the percent-encoded company name in Chinese
     (南京衍构科技有限公司). Left encoded on purpose — it is the form LinkedIn
     issues, and it travels safely through every browser and crawler. */
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/%E5%8D%97%E4%BA%AC%E8%A1%8D%E6%9E%84%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8',
      icon: 'linkedin' as const,
    },
    { label: 'GitHub', href: 'https://github.com/helexdev1004', icon: 'github' as const },
  ],
}

/** Shown beside the project-enquiry form on /contact. */
export const projectExpectations = [
  'An engineer reads your message — not a sales assistant.',
  'A reply within one business day, covering US and EU hours.',
  'An honest answer if we are not the right team for it.',
]

export const nav: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Capabilities',
    children: [
      {
        label: 'Services',
        href: '/services',
        blurb: 'AI, full-stack, ecommerce, enterprise and consulting.',
      },
      {
        label: 'AI Solutions',
        href: '/ai-solutions',
        blurb: 'LLM applications, agents, RAG, computer vision and MLOps.',
      },
      {
        label: 'Technology Expertise',
        href: '/technology',
        blurb: 'The stack we build, ship and operate on every day.',
      },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
]

export const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'AI Solutions', href: '/ai-solutions' },
      { label: 'Technology', href: '/technology' },
      { label: '3D Experiences', href: '/services#immersive' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Generative AI', href: '/ai-solutions#generative' },
      { label: 'Full Stack Development', href: '/services#full-stack' },
      { label: 'Ecommerce', href: '/services#ecommerce' },
      { label: 'Enterprise Platforms', href: '/services#enterprise' },
    ],
  },
]
