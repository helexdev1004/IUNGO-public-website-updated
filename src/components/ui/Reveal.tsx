import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE } from '@/lib/motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  /** Seconds to wait before starting. Stagger lists by index * 0.06 or so. */
  delay?: number
  duration?: number
  direction?: Direction
  /** Travel distance in pixels. */
  distance?: number
  className?: string
  /** Animate every time it scrolls into view rather than only the first time. */
  repeat?: boolean
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

/**
 * Scroll-triggered entrance animation.
 *
 * Honours prefers-reduced-motion by rendering the content already in its
 * final state — the content must never depend on the animation to be visible.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 26,
  className,
  repeat = false,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, margin: '-80px 0px -80px 0px' }}
      transition={{
        duration,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionTag>
  )
}
