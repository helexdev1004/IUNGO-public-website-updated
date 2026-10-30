/* ==========================================================================
   Copy for the AI Community page at /ai-community.

   This is a recruiting page for an expert network, not a service pitch: the
   reader is a prospective member deciding whether to hand over their details,
   so the process is laid out step by step and the "free for experts" line is
   given its own block rather than buried in a paragraph.

   The expertise categories below do double duty — they are the cards under
   "Who we are looking for" AND the options in the form's Field of expertise
   dropdown, so the two can never drift apart.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon'

export interface ExpertiseArea {
  /** Also the value submitted by the form's dropdown. */
  id: string
  title: string
  detail: string
  icon: IconName
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'Software Engineering',
    title: 'Software Engineering',
    detail:
      'Experienced developers, full-stack and backend engineers, AI/ML engineers and programming specialists.',
    icon: 'code',
  },
  {
    id: 'Science & Research',
    title: 'Science & Research',
    detail:
      'Scientists, PhD holders, postdoctoral researchers and specialists in biology, chemistry, physics and related fields.',
    icon: 'search',
  },
  {
    id: 'Mathematics & Data Science',
    title: 'Mathematics & Data Science',
    detail: 'Mathematicians, statisticians, data scientists and quantitative researchers.',
    icon: 'chart',
  },
  {
    id: 'Finance & Business',
    title: 'Finance & Business',
    detail: 'Financial analysts, accountants, economists and financial domain experts.',
    icon: 'building',
  },
  {
    id: 'Other Specialized Fields',
    title: 'Other Specialised Fields',
    detail:
      'Professionals with advanced technical, academic or industry knowledge in any other domain.',
    icon: 'compass',
  },
]

/* The strap and the four values below come from the community banner artwork,
   so the page and the graphic say the same thing wherever it is posted. */
export const communityStrap = ['People', 'Knowledge', 'AI', 'Real-world impact']

export interface CommunityValue {
  title: string
  icon: IconName
}

export const communityValues: CommunityValue[] = [
  { title: 'Learn together', icon: 'sparkles' },
  { title: 'Collaborate across disciplines', icon: 'users' },
  { title: 'Build with AI', icon: 'brain' },
  { title: 'Solve real-world problems', icon: 'target' },
]

export interface CommunityStep {
  title: string
  body: string
}

export const communitySteps: CommunityStep[] = [
  {
    title: 'Apply to join',
    body: 'Tell us your field and background using the form on this page. Every application is read by a person.',
  },
  {
    title: 'Join our Slack community',
    body: 'Once your application is reviewed, we invite you into our Slack workspace to connect with other professionals and exchange what you are each seeing.',
  },
  {
    title: 'Discover AI training opportunities',
    body: 'We point members toward the AI training platforms and evaluation projects that match their qualifications, and support them through the technical assessments that gate them.',
  },
  {
    title: 'Connect with verified taskers',
    body: 'We maintain a network of verified, skilled taskers available to collaborate on projects once you are shortlisted.',
  },
  {
    title: 'Grow together',
    body: 'The aim is a long-term professional network where domain experts and skilled contributors build working relationships that outlast any single project.',
  },
]

/* --------------------------------------------------------------------------
   Form dropdown options.
   -------------------------------------------------------------------------- */

export const experienceLevels = [
  '1–3 years',
  '3–5 years',
  '5–10 years',
  '10+ years',
]

export const qualifications = [
  'PhD',
  'Postdoctoral research',
  "Master's degree",
  "Bachelor's degree",
  'Professional certification',
  'Self-taught / industry experience',
]
