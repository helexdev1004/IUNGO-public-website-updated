import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  /** Final value to count up to. */
  to: number
  /** Rendered before the number and never animated, e.g. a currency symbol. */
  prefix?: string
  /** Appended once counting finishes, e.g. '+' or '%'. */
  suffix?: string
  duration?: number
  className?: string
}

/* Ease-out cubic — fast start, gentle settle. Reads as "confident", which is
   the right feel for a statistic. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from zero to `to` the first time it scrolls into view.
 *
 * Driven by requestAnimationFrame rather than a library so the DOM text node
 * is the only thing updating, and so the final value is always rendered even
 * when motion is reduced.
 */
export function Counter({
  to,
  prefix = '',
  suffix = '',
  duration = 1900,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      setValue(to)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(easeOut(progress) * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {/* The accessible value is the final figure, not the mid-animation one. */}
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
    </span>
  )
}
