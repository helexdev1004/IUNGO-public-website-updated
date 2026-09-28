/* ==========================================================================
   AI capabilities (the "Exploring The Future of AI" section) and the wider
   technology stack shown on the Technology Expertise page.
   ========================================================================== */

import type { IconName } from '@/components/ui/Icon'

export interface AiCapability {
  title: string
  description: string
  icon: IconName
  tags: string[]
}

export const aiCapabilities: AiCapability[] = [
  {
    title: 'Large Language Models',
    description:
      'Selecting, adapting and operating language models against your data — with evaluation harnesses that catch regressions before your users do.',
    icon: 'brain',
    tags: ['Fine-tuning', 'Evaluation', 'Serving'],
  },
  {
    title: 'Generative AI',
    description:
      'Text, image and structured-content generation built into real products, with guardrails, review steps and a human in the loop where it matters.',
    icon: 'sparkles',
    tags: ['Multimodal', 'Guardrails', 'Content'],
  },
  {
    title: 'AI Agents',
    description:
      'Systems that plan, call tools and complete multi-step work — scoped carefully, observable at every step, and safe to let near production.',
    icon: 'bot',
    tags: ['Tool use', 'Planning', 'Observability'],
  },
  {
    title: 'Retrieval Augmented Generation',
    description:
      'Answers grounded in your own knowledge base, with citations attached and an honest refusal when the source material does not support a reply.',
    icon: 'search',
    tags: ['Vector search', 'Citations', 'Grounding'],
  },
  {
    title: 'Computer Vision',
    description:
      'Detection, classification and inspection pipelines that run at production speed — at the edge or in the cloud, whichever the problem demands.',
    icon: 'eye',
    tags: ['Detection', 'Edge inference', 'OCR'],
  },
  {
    title: 'Machine Learning',
    description:
      'Forecasting, ranking and classification models, engineered as maintainable services rather than notebooks nobody can redeploy.',
    icon: 'chart',
    tags: ['Forecasting', 'Ranking', 'MLOps'],
  },
  {
    title: 'AI Automation',
    description:
      'Applying AI to the workflows that quietly consume your team’s week, with an exception queue so people handle only what needs judgement.',
    icon: 'workflow',
    tags: ['Workflows', 'Document AI', 'Routing'],
  },
  {
    title: 'Intelligent Data Processing',
    description:
      'Extraction, enrichment and validation at volume — turning messy documents and feeds into structured data you can actually query.',
    icon: 'database',
    tags: ['Extraction', 'Enrichment', 'Validation'],
  },
]

export interface TechCategory {
  title: string
  description: string
  icon: IconName
  accent: 'green' | 'blue'
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    title: 'Frontend',
    description: 'Typed, accessible interfaces that stay fast as they grow.',
    icon: 'monitor',
    accent: 'blue',
    items: ['React', 'Next.js', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    description: 'APIs and services built for load, observability and change.',
    icon: 'server',
    accent: 'green',
    items: ['Node.js', 'Python', 'Django', 'FastAPI', 'Java', '.NET', 'GraphQL', 'REST'],
  },
  {
    title: 'Data',
    description: 'Well-modelled storage, from relational cores to vector search.',
    icon: 'database',
    accent: 'blue',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'pgvector', 'Elasticsearch', 'Cloud databases'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Reproducible infrastructure and deployments that are boring on purpose.',
    icon: 'cloud',
    accent: 'green',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Observability'],
  },
  {
    title: 'AI & Machine Learning',
    description: 'The toolchain behind our model and application work.',
    icon: 'brain',
    accent: 'blue',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'OpenCV', 'ONNX Runtime'],
  },
  {
    title: '3D & Immersive',
    description: 'Real-time graphics on the web, held to a performance budget.',
    icon: 'cube',
    accent: 'green',
    items: ['Three.js', 'WebGL', 'React Three Fiber', 'GLSL', 'Draco', 'KTX2'],
  },
  {
    title: 'Ecommerce',
    description: 'Commerce platforms and the integrations around them.',
    icon: 'cart',
    accent: 'blue',
    items: ['Shopify', 'WooCommerce', 'Stripe', 'Headless commerce', 'Analytics'],
  },
  {
    title: 'Quality & Security',
    description: 'The practices that keep delivered systems trustworthy.',
    icon: 'shield',
    accent: 'green',
    items: ['Automated testing', 'Code review', 'Accessibility (WCAG)', 'Dependency auditing'],
  },
]

/* Logos strip on the homepage — rendered as monospace wordmarks so the site
   ships no third-party trademarks it lacks permission to use. */
export const technologyMarquee = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Python',
  'FastAPI',
  'PyTorch',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'Three.js',
  'WebGL',
  'Shopify',
  'Django',
  '.NET',
]
