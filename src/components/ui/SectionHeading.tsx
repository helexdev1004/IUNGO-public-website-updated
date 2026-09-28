import type { ReactNode } from 'react'

import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Heading level — sections below the page title should stay at h2. */
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <Reveal>
          <p
            className={cn(
              'mb-5 inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] uppercase',
              'text-brand-green',
            )}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green shadow-glow-green" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <Tag
          className={cn(
            'font-display font-semibold text-balance text-white',
            Tag === 'h1'
              ? 'text-4xl leading-[1.06] sm:text-5xl lg:text-6xl'
              : 'text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]',
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <div
            className={cn(
              'mt-5 text-base leading-relaxed text-mist sm:text-lg',
              centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            )}
          >
            {description}
          </div>
        </Reveal>
      ) : null}
    </div>
  )
}
