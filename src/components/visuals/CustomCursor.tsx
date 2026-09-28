import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/* ==========================================================================
   Custom cursor: a dot that tracks the pointer exactly, and a ring that
   chases it with spring easing.

   Deliberate constraints, because custom cursors are easy to get wrong:

   • Pointer position is written to motion values, never to React state, so
     moving the mouse costs zero re-renders. Only the mode (default /
     interactive / pressed) goes through state, and that changes rarely.
   • Enabled only for a fine pointer — touch devices keep their native
     behaviour and render nothing at all.
   • Disabled under prefers-reduced-motion. A lagging element chasing the
     pointer is exactly the kind of motion that setting exists to stop.
   • Over text fields it hides itself and restores the native I-beam, which
     carries information a dot cannot.
   • The native cursor is hidden by a class this component adds at runtime,
     so if the script fails the page still has a normal working cursor.
   ========================================================================== */

const INTERACTIVE = 'a, button, [role="tab"], [role="button"], summary, label[for]'
const TEXT_FIELD = 'input:not([type="submit"]):not([type="button"]), textarea, select'

type Mode = 'default' | 'interactive' | 'text'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('default')
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  /* The dot sits exactly under the pointer; the ring springs toward it. */
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const spring = { stiffness: 400, damping: 34, mass: 0.55 }
  const ringX = useSpring(x, spring)
  const ringY = useSpring(y, spring)

  /* Only run where a precise pointer exists and motion is welcome. */
  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    /* Hiding the native cursor is done here rather than in the stylesheet:
       if this component never mounts, the class is never added and the
       normal cursor survives. */
    document.documentElement.classList.add('cursor-custom')

    let lastTarget: Element | null = null

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)

      /* closest() on every move would be wasteful — only re-evaluate when
         the pointer actually crosses onto a different element. */
      const target = event.target as Element | null
      if (target === lastTarget) return
      lastTarget = target

      if (!target?.closest) return
      if (target.closest(TEXT_FIELD)) setMode('text')
      else if (target.closest(INTERACTIVE)) setMode('interactive')
      else setMode('default')
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('blur', onLeave)

    return () => {
      document.documentElement.classList.remove('cursor-custom')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, visible, x, y])

  if (!enabled) return null

  /* Over a text field the native I-beam is more useful than anything we can
     draw, so we get out of the way entirely. */
  const hidden = !visible || mode === 'text'
  const interactive = mode === 'interactive'

  return (
    <div aria-hidden="true">
      {/* ---- Trailing ring ------------------------------------------- */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          data-cursor="ring"
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: interactive ? 52 : 30,
            height: interactive ? 52 : 30,
            opacity: hidden ? 0 : 1,
            scale: pressed ? 0.82 : 1,
            borderColor: interactive ? 'rgb(142 214 43 / 0.9)' : 'rgb(41 182 246 / 0.55)',
            backgroundColor: interactive ? 'rgb(142 214 43 / 0.12)' : 'rgb(142 214 43 / 0)',
            boxShadow: interactive
              ? '0 0 26px -4px rgb(142 214 43 / 0.65)'
              : '0 0 18px -6px rgb(41 182 246 / 0.5)',
          }}
          transition={{
            width: { type: 'spring', stiffness: 380, damping: 26 },
            height: { type: 'spring', stiffness: 380, damping: 26 },
            scale: { type: 'spring', stiffness: 700, damping: 26 },
            opacity: { duration: 0.18 },
            default: { duration: 0.22 },
          }}
          style={{ borderWidth: 1.5 }}
        />
      </motion.div>

      {/* ---- Leading dot --------------------------------------------- */}
      <motion.div className="pointer-events-none fixed top-0 left-0 z-[9999]" style={{ x, y }}>
        <motion.div
          data-cursor="dot"
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green"
          animate={{
            width: interactive ? 5 : 7,
            height: interactive ? 5 : 7,
            opacity: hidden ? 0 : 1,
            scale: pressed ? 1.5 : 1,
          }}
          transition={{ type: 'spring', stiffness: 700, damping: 30, opacity: { duration: 0.15 } }}
          style={{ boxShadow: '0 0 12px rgb(142 214 43 / 0.9)' }}
        />
      </motion.div>
    </div>
  )
}
