/* ==========================================================================
   Headline figures. `value` drives the animated counter; `suffix` is appended
   once counting finishes. Use `display` instead for non-numeric figures.
   ========================================================================== */

export interface Stat {
  value?: number
  /** Rendered before the number, e.g. a currency symbol. */
  prefix?: string
  suffix?: string
  display?: string
  label: string
  detail: string
}

export const stats: Stat[] = [
  {
    value: 6,
    suffix: '+',
    label: 'Years Experience',
    detail: 'Building and operating production systems since 2019.',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Business Solutions Delivered',
    detail: 'Shipped across AI, commerce, enterprise and web platforms.',
  },
  {
    value: 10,
    suffix: '+',
    label: 'AI Technology Projects',
    detail: 'From data annotation and evaluation to applied LLM systems.',
  },
  {
    /* TODO(content): confirm the currency and the figure. "$" is assumed
       because the contact form's budget ranges are in USD — change `prefix`
       if it should be euros or another currency. */
    value: 5,
    prefix: '$',
    suffix: 'M+',
    label: 'Revenue Earned',
    detail: 'Delivered across client engagements since 2019.',
  },
  {
    display: 'Global',
    label: 'US & EU Customers',
    detail: 'A distributed team covering American and European hours.',
  },
]

/** Short trust signals used beneath the hero. */
export const trustPoints = [
  'Team across China, the US and Brazil',
  'US & EU client experience',
  'Senior engineers only',
]
