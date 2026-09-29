/* ==========================================================================
   Job postings served at /apply/<code>.

   The code in the URL is a posting's only address: nothing on the site links
   to it and it is left out of public/sitemap.xml, so a posting reaches only
   the people it was sent to. Retire one by deleting its entry here — the URL
   then falls through to the 404 page.

   Applications post to the Netlify form named "apply", mirrored by a hidden
   static form in index.html. Keep the two in step.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon'

export interface PostingFact {
  label: string
  value: string
  icon: IconName
}

export interface Posting {
  /** The path segment: /apply/<code>. */
  code: string
  eyebrow: string
  title: string
  /** One paragraph — also the page's meta description. */
  summary: string
  /** The handful of facts an applicant scans for before reading anything. */
  facts: PostingFact[]
  /** Who we are. One paragraph per entry. */
  about: string[]
  /** What the work actually is. One paragraph per entry. */
  role: string[]
  /** Platforms the work runs on, shown as chips. */
  platforms: string[]
  requirements: string[]
  benefits: string[]
}

/* The chat apps offered on the application form. The handle people give us is
   how we open the conversation, so each option carries its own placeholder —
   a Telegram username and a WhatsApp number are not typed the same way. */
export interface ChatApp {
  id: string
  label: string
  placeholder: string
  /** Shown beside the handle label once this app is chosen. */
  hint: string
}

export const chatApps: ChatApp[] = [
  {
    id: 'Telegram',
    label: 'Telegram',
    placeholder: '@janedoe',
    hint: 'Your @username',
  },
  {
    id: 'WhatsApp',
    label: 'WhatsApp',
    placeholder: '+1 555 123 4567',
    hint: 'Include your country code',
  },
  {
    id: 'Discord',
    label: 'Discord',
    placeholder: 'janedoe',
    hint: 'Your username, not your nickname',
  },
]

export const postings: Posting[] = [
  {
    code: '1e32jsdnn23',
    eyebrow: 'Now hiring · Part-time · US & EU',
    title: 'Part-Time Independent Collaborator based in US & EU',
    summary:
      'IUNGO Technology is expanding into AI training and data annotation, and we are looking for dedicated part-time freelancers based in the United States and Europe. Around an hour a day, fully remote, and no professional technical experience required.',

    facts: [
      { label: 'Compensation', value: '$2,000–$3,000 / month', icon: 'chart' },
      { label: 'Commitment', value: 'About 1 hour a day', icon: 'clock' },
      { label: 'Location', value: 'Remote — US or EU', icon: 'globe' },
      { label: 'Experience', value: 'No technical background needed', icon: 'users' },
    ],

    about: [
      'IUNGO Technology is a global technology company based in Nanjing, China, bringing together a distributed team of engineers, AI specialists, designers and IT consultants with 6+ years of experience delivering modern digital solutions for clients worldwide.',
      'Our work spans AI training and data annotation, generative AI and intelligent automation, full-stack software development, eCommerce, enterprise systems, cloud technologies, IT consulting and high-performance Three.js/WebGL experiences. With 50+ business solutions delivered and participation in 10+ AI-focused projects, we combine technical depth, practical execution and global collaboration.',
    ],

    role: [
      'We are currently expanding into AI training and data annotation. One of the main platforms we work with is AfterQuery (AQ), where our team generates more than $30k per month through ongoing projects. We are also exploring opportunities on other AI training and freelance platforms.',
      'Many of the opportunities on these platforms are open specifically to people living in the United States and Europe — which is why this role is too. The work is part-time and flexible: roughly an hour of focused attention a day, scheduled around whatever else you have on.',
    ],

    platforms: [
      'AfterQuery (AQ)',
      'Snorkel AI',
      'DataAnnotation',
      'Handshake AI',
      'Outlier',
      'AlignerAI',
    ],

    requirements: [
      'Currently residing in the United States or Europe',
      'Legally eligible to perform freelance work in your location',
      'A reliable computer and internet connection',
      'Approximately 1 hour of daily availability',
      'Good written communication skills',
      'Reliable, responsive and able to work independently',
      'Dedicated to this opportunity',
    ],

    benefits: [
      'Estimated compensation of approximately $2,000–$3,000 per month, depending on workload, qualifications and availability',
      'Flexible part-time remote work — about 1 hour a day for applicable assignments',
      'Work from anywhere in the United States or Europe',
      'No advanced technical experience required',
      'Practical experience with modern AI workflows',
      'Flexible scheduling around your existing work or studies',
      'The opportunity to grow with an international, fast-growing AI team',
    ],
  },
]

export function getPosting(code: string | undefined) {
  return code ? postings.find((posting) => posting.code === code) : undefined
}
