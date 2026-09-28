/* ==========================================================================
   Service catalogue. Drives the Services page, the homepage preview grid
   and the "Project type" options on the contact form.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon'

export interface ServiceGroup {
  /** Sub-heading inside a service, e.g. "Frontend" within Full Stack. */
  title?: string
  items: string[]
}

export interface Service {
  id: string
  title: string
  summary: string
  /** Longer copy shown on the Services page. */
  detail: string
  icon: IconName
  accent: 'green' | 'blue'
  groups: ServiceGroup[]
}

export const services: Service[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence Solutions',
    summary:
      'Production AI systems — from model evaluation and data annotation through to LLM applications, agents and retrieval pipelines.',
    detail:
      'We work across the full AI lifecycle: preparing and annotating training data, evaluating and fine-tuning models, then engineering the application layer that makes them genuinely useful. Every system we ship is measured against defined quality gates before it reaches your users.',
    icon: 'brain',
    accent: 'green',
    groups: [
      {
        title: 'Models & Data',
        items: ['AI Training', 'Data Annotation', 'AI Model Evaluation', 'Machine Learning Solutions'],
      },
      {
        title: 'Applied AI',
        items: ['LLM Applications', 'Generative AI', 'AI Agents', 'RAG Systems', 'Prompt Engineering'],
      },
      {
        title: 'Perception & Automation',
        items: ['Computer Vision', 'NLP Solutions', 'AI Automation'],
      },
    ],
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    summary:
      'End-to-end product engineering — typed frontends, resilient APIs, well-modelled data and the cloud infrastructure underneath.',
    detail:
      'We build applications the way a long-lived product needs them built: typed end to end, tested where it counts, instrumented in production and documented so your own team can take the wheel. No hand-off cliff at the end of an engagement.',
    icon: 'layers',
    accent: 'blue',
    groups: [
      { title: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript'] },
      { title: 'Backend', items: ['Node.js', 'Python', 'Django', 'FastAPI', 'Java', '.NET'] },
      { title: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Cloud databases'] },
      { title: 'Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
    ],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Solutions',
    summary:
      'Storefronts that convert — platform builds, payment and inventory integration, and the analytics loop that keeps improving them.',
    detail:
      'Whether you are launching on Shopify, extending WooCommerce or building a bespoke commerce platform, we treat revenue as the metric. That means fast pages, frictionless checkout, and clean data flowing between your store, your warehouse and your finance stack.',
    icon: 'cart',
    accent: 'green',
    groups: [
      {
        items: [
          'Shopify Development',
          'WooCommerce',
          'Custom Ecommerce Platforms',
          'Payment Integration',
          'Inventory Systems',
          'Customer Analytics',
          'Conversion Optimization',
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    summary:
      'Business-critical systems — CRM, ERP integration, workflow automation and the internal tools your operation actually runs on.',
    detail:
      'Enterprise work rewards discipline over novelty. We integrate with the systems you already have, migrate carefully, and automate the workflows that quietly consume your team’s week — with audit trails and role-based access built in from the start.',
    icon: 'building',
    accent: 'blue',
    groups: [
      {
        items: [
          'Business Applications',
          'CRM Systems',
          'ERP Integration',
          'Workflow Automation',
          'Data Platforms',
          'Internal Tools',
        ],
      },
    ],
  },
  {
    id: 'consulting',
    title: 'IT Consulting',
    summary:
      'Architecture, cloud and modernisation strategy — pragmatic advice from engineers who still ship the systems they design.',
    detail:
      'We are brought in when a decision is expensive to reverse: choosing an architecture, planning a migration, or deciding whether to modernise or replace. You get a clear recommendation with the trade-offs stated plainly, and a roadmap your team can execute.',
    icon: 'compass',
    accent: 'green',
    groups: [
      {
        items: [
          'Digital Transformation',
          'Architecture Consulting',
          'Cloud Consulting',
          'Technology Strategy',
          'Software Modernization',
        ],
      },
    ],
  },
  {
    id: 'immersive',
    title: '3D Interactive Web Experiences',
    summary:
      'High-performance WebGL — product visualisation, immersive commerce and real-time 3D that holds 60fps on a mid-range phone.',
    detail:
      'Creating high performance 3D digital experiences. Most 3D on the web fails on performance, not artistry — so we budget draw calls, textures and geometry from the first sketch, and profile on real devices throughout.',
    icon: 'cube',
    accent: 'blue',
    groups: [
      {
        items: [
          'Three.js',
          'WebGL',
          'Interactive Product Visualization',
          '3D Ecommerce Experiences',
          'Virtual Worlds',
          'Performance Optimization',
          'Real-time Rendering',
        ],
      },
    ],
  },
]

/** Options for the contact form's "Project type" select. */
export const projectTypes = [
  'AI / Machine Learning',
  'Full Stack Application',
  'Ecommerce Platform',
  'Enterprise System',
  'IT Consulting',
  '3D / Interactive Experience',
  'Something else',
]

export const budgetRanges = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
]
