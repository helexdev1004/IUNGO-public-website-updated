import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/cn'

interface ParticleNetworkProps {
  className?: string
  /** Particles per square pixel. Raise for a denser mesh. */
  density?: number
  /** Let the pointer pull nearby nodes and draw links to the cursor. */
  interactive?: boolean
  opacity?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  blue: boolean
}

const GREEN = '142, 214, 43'
const BLUE = '41, 182, 246'

/**
 * Animated node network drawn on a canvas.
 *
 * Performance notes, because this sits behind the hero on every visit:
 *  • particle count scales with area and is hard-capped
 *  • the render loop stops entirely when the canvas scrolls out of view
 *  • device pixel ratio is clamped to 2 — beyond that the cost is invisible
 *  • prefers-reduced-motion renders a single static frame and never loops
 */
export function ParticleNetwork({
  className,
  density = 0.00009,
  interactive = true,
  opacity = 1,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let running = true
    let linkDistance = 130

    const pointer = { x: -9999, y: -9999, active: false }

    const seed = () => {
      const count = Math.min(130, Math.max(24, Math.round(width * height * density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.7,
        blue: Math.random() > 0.55,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      linkDistance = Math.min(165, Math.max(95, width / 8.5))
      seed()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // --- Links between nearby nodes -----------------------------------
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > linkDistance) continue

          const strength = (1 - distance / linkDistance) * 0.42
          ctx.strokeStyle = `rgba(${a.blue && b.blue ? BLUE : GREEN}, ${strength})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }

        // --- Link to the pointer ----------------------------------------
        if (interactive && pointer.active) {
          const dx = a.x - pointer.x
          const dy = a.y - pointer.y
          const distance = Math.hypot(dx, dy)
          const reach = linkDistance * 1.35

          if (distance < reach) {
            const strength = (1 - distance / reach) * 0.55
            ctx.strokeStyle = `rgba(${BLUE}, ${strength})`
            ctx.lineWidth = 0.9
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()

            // Gentle pull toward the cursor, capped so nodes never swarm.
            a.vx -= (dx / distance) * 0.008
            a.vy -= (dy / distance) * 0.008
          }
        }
      }

      // --- Nodes ---------------------------------------------------------
      for (const p of particles) {
        const tone = p.blue ? BLUE : GREEN
        ctx.fillStyle = `rgba(${tone}, 0.85)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // Soft halo — cheap at this radius and it sells the "glow".
        ctx.fillStyle = `rgba(${tone}, 0.12)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap rather than bounce: no visible edge, no clustering at walls.
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Bleed off pointer-induced velocity so motion stays calm.
        p.vx *= 0.995
        p.vy *= 0.995
        const speed = Math.hypot(p.vx, p.vy)
        if (speed < 0.06) {
          p.vx += (Math.random() - 0.5) * 0.02
          p.vy += (Math.random() - 0.5) * 0.02
        }
      }

      render()
      if (running) frame = requestAnimationFrame(step)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()

    if (reduced) {
      render()
      return
    }

    frame = requestAnimationFrame(step)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // Stop the loop entirely once the canvas leaves the viewport.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          frame = requestAnimationFrame(step)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      running = false
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [reduced, density, interactive])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      style={{ opacity }}
    />
  )
}
