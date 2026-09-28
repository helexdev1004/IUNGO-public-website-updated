import type { MouseEvent, ReactNode } from 'react'
import { useCallback, useRef } from 'react'

import { cn } from '@/lib/cn'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Colour of the pointer-tracking spotlight and the hover border. */
  accent?: 'green' | 'blue'
  /** Disables the pointer spotlight for dense or non-interactive cards. */
  spotlight?: boolean
  /** Raises the card slightly on hover. */
  lift?: boolean
  as?: 'div' | 'article' | 'li'
}

const accents = {
  green: {
    glow: 'rgb(142 214 43 / 0.16)',
    border: 'hover:border-brand-green/35',
    shadow: 'hover:shadow-[0_24px_60px_-28px_rgb(142_214_43/0.55)]',
  },
  blue: {
    glow: 'rgb(41 182 246 / 0.16)',
    border: 'hover:border-brand-blue/35',
    shadow: 'hover:shadow-[0_24px_60px_-28px_rgb(41_182_246/0.55)]',
  },
}

/**
 * Glassmorphic surface with an optional spotlight that follows the pointer.
 *
 * The spotlight is driven by two CSS custom properties written on mousemove,
 * so it costs no React re-render — the browser repaints a gradient and
 * nothing else.
 */
export function GlassCard({
  children,
  className,
  accent = 'green',
  spotlight = true,
  lift = true,
  as: Tag = 'div',
}: GlassCardProps) {
  /* Typed as HTMLElement rather than HTMLDivElement because `as` lets the
     caller render this as a div, article or li. */
  const ref = useRef<HTMLElement>(null)
  const tone = accents[accent]

  const handleMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!spotlight || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      ref.current.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      ref.current.style.setProperty('--my', `${event.clientY - rect.top}px`)
    },
    [spotlight],
  )

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      className={cn(
        'group/card relative isolate overflow-hidden rounded-2xl',
        'glass transition-all duration-400 ease-out',
        lift && 'hover:-translate-y-1',
        tone.border,
        tone.shadow,
        className,
      )}
    >
      {spotlight ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${tone.glow}, transparent 68%)`,
          }}
        />
      ) : null}
      {children}
    </Tag>
  )
}
