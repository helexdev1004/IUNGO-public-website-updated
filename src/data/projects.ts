/* ==========================================================================
   Case studies.

   TODO(content): these entries are placeholders that set the shape of a good
   case study — challenge, solution, stack, result. Replace each with a
   delivered engagement, swap the "Example" metrics for figures you can
   evidence, and confirm client permission before naming anyone.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon'

export interface Project {
  id: string
  title: string
  category: string
  /** Sector or client type — keep anonymous until you have sign-off. */
  client: string
  year: string
  icon: IconName
  accent: 'green' | 'blue'
  challenge: string
  solution: string
  stack: string[]
  result: string
  metrics: { value: string; label: string }[]
}

export const projects: Project[] = [
  {
    id: 'ai-platform',
    title: 'AI Platform Development',
    category: 'Artificial Intelligence',
    client: 'B2B SaaS · United States',
    year: '2025',
    icon: 'brain',
    accent: 'green',
    challenge:
      'A support organisation was answering the same technical questions hundreds of times a week. Their documentation held the answers, but agents could not find them fast enough, and generic chatbots produced confident, wrong replies that damaged trust.',
    solution:
      'We built a retrieval-augmented assistant grounded strictly in the client’s own documentation, with citations on every answer and a refusal path when confidence fell below threshold. An evaluation harness scored each release against a labelled question set before it shipped.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'React', 'TypeScript', 'AWS'],
    result:
      'Agents resolved common queries without leaving the support console, and every answer carried a source link a human could verify.',
    metrics: [
      { value: 'Example', label: 'Replace with a measured result' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
  {
    id: 'enterprise-platform',
    title: 'Enterprise Software Solutions',
    category: 'Enterprise',
    client: 'Manufacturing group · Europe',
    year: '2024',
    icon: 'building',
    accent: 'blue',
    challenge:
      'Operations ran across three disconnected systems and a large collection of spreadsheets. Month-end reporting took a week of manual reconciliation, and no one could answer basic questions about current stock with confidence.',
    solution:
      'We designed a single data platform that integrated the existing ERP and CRM rather than replacing them, then layered role-based internal tools on top. Migration ran in phases with both systems live in parallel until each cut-over was proven.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    result:
      'Reconciliation moved from a manual week to an automated daily pipeline, with an audit trail on every record.',
    metrics: [
      { value: 'Example', label: 'Replace with a measured result' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Platform Rebuild',
    category: 'Ecommerce',
    client: 'D2C retail brand · United States',
    year: '2025',
    icon: 'cart',
    accent: 'green',
    challenge:
      'A growing storefront was losing mobile customers at checkout. Pages were slow on mid-range devices, inventory drifted out of sync with the warehouse, and the team had no reliable view of where buyers dropped off.',
    solution:
      'We rebuilt the storefront around a performance budget enforced in CI, wired inventory to the warehouse system in real time, and instrumented the funnel end to end so merchandising decisions could be based on evidence.',
    stack: ['Next.js', 'TypeScript', 'Shopify', 'Stripe', 'Vercel Edge', 'BigQuery'],
    result:
      'Checkout became measurably faster on the devices customers actually use, and stock levels stopped diverging from reality.',
    metrics: [
      { value: 'Example', label: 'Replace with a measured result' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
  {
    id: 'immersive',
    title: '3D Interactive Product Experience',
    category: 'Immersive Web',
    client: 'Industrial equipment maker · Europe',
    year: '2024',
    icon: 'cube',
    accent: 'blue',
    challenge:
      'Buyers needed to understand a highly configurable physical product before committing to a quote. Static photography could not show the configurations, and an earlier 3D attempt was too heavy to load on anything but a desktop workstation.',
    solution:
      'We rebuilt the viewer in Three.js against a strict polygon and texture budget, with level-of-detail switching, compressed assets and a static image fallback for low-power devices. Every configuration change updates in real time.',
    stack: ['Three.js', 'WebGL', 'React', 'TypeScript', 'Draco', 'KTX2'],
    result:
      'The configurator holds a smooth frame rate on mid-range mobile hardware, where the previous version had been unusable.',
    metrics: [
      { value: '60fps', label: 'Target frame rate on mid-range mobile' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
  {
    id: 'automation',
    title: 'Business Automation System',
    category: 'Automation',
    client: 'Professional services firm · Europe',
    year: '2025',
    icon: 'workflow',
    accent: 'green',
    challenge:
      'Client onboarding involved a long chain of manual handoffs across email, spreadsheets and a document system. Work stalled invisibly between steps, and nobody could say where a given client was in the process.',
    solution:
      'We mapped the real workflow, automated the mechanical steps, and built an exception queue so humans only handle what genuinely needs judgement. Every stage emits an event, making the pipeline observable end to end.',
    stack: ['Python', 'Django', 'Celery', 'PostgreSQL', 'AWS Lambda'],
    result:
      'Onboarding progress became visible to the whole team, and routine steps stopped waiting on someone to remember them.',
    metrics: [
      { value: 'Example', label: 'Replace with a measured result' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision Quality Inspection',
    category: 'Artificial Intelligence',
    client: 'Production line operator · Asia',
    year: '2024',
    icon: 'eye',
    accent: 'blue',
    challenge:
      'Visual defect inspection was manual, inconsistent between shifts, and could not keep pace with line speed. Defects escaping to customers were expensive and reputationally costly.',
    solution:
      'We built an annotated dataset from production footage, trained and evaluated a detection model against it, then deployed inference at the edge so classification happens without a round trip to the cloud.',
    stack: ['Python', 'PyTorch', 'OpenCV', 'ONNX Runtime', 'Docker'],
    result:
      'Inspection runs consistently at line speed, with borderline cases routed to a human reviewer rather than guessed at.',
    metrics: [
      { value: 'Example', label: 'Replace with a measured result' },
      { value: 'Example', label: 'Replace with a measured result' },
    ],
  },
]
