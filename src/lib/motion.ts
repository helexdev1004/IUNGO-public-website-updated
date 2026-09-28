/**
 * Shared easing curve.
 *
 * A strong ease-out: quick to commit, slow to settle. Used everywhere so the
 * whole site moves with one personality rather than a different one per
 * component. The explicit tuple type is what Framer Motion's `ease` prop
 * expects — a bare number[] is rejected.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
