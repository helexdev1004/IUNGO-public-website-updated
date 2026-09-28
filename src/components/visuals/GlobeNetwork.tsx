import { motion, useReducedMotion } from 'framer-motion'

import { mapNodes } from '@/data/team'
import { cn } from '@/lib/cn'

/* ==========================================================================
   Stylised globe showing where the team works from.

   This is a decorative diagram, not a cartographic projection — node
   positions are hand-placed for legibility and the location names beside it
   carry the actual information. Drawing an inaccurate world map would be
   worse than drawing an honest abstraction.
   ========================================================================== */

const CX = 50
const CY = 50
const R = 44

/** Latitude rings: ellipses flattened by perspective as they near the poles. */
const latitudes = [-30, -15, 0, 15, 30].map((offset) => {
  const rx = Math.sqrt(Math.max(R * R - offset * offset, 1))
  return { cy: CY + offset, rx, ry: rx * 0.17 }
})

/** Meridians: ellipses narrowing toward the globe's edge. */
const meridians = [1, 0.72, 0.42, 0.14].map((scale) => ({ rx: R * scale, ry: R }))

const hub = mapNodes.find((node) => node.hub) ?? mapNodes[0]

/** Arc from the hub to a node, bowed away from the globe centre. */
function arcPath(x: number, y: number) {
  const mx = (hub.x + x) / 2
  const my = (hub.y + y) / 2
  const dx = mx - CX
  const dy = my - CY
  const length = Math.hypot(dx, dy) || 1
  const lift = 12
  return `M ${hub.x} ${hub.y} Q ${mx + (dx / length) * lift} ${my + (dy / length) * lift} ${x} ${y}`
}

export function GlobeNetwork({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      {/* Ambient glow behind the sphere */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.16),transparent_62%)] blur-2xl"
      />

      <svg viewBox="0 0 100 100" className="relative h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="globe-wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ED62B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#29B6F6" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="globe-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8ED62B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#29B6F6" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="globe-fill" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#12203f" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* Sphere body */}
        <circle cx={CX} cy={CY} r={R} fill="url(#globe-fill)" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#globe-wire)" strokeWidth="0.4" />

        {/* Wireframe */}
        <g fill="none" stroke="url(#globe-wire)" strokeWidth="0.25" opacity="0.65">
          {latitudes.map((lat, i) => (
            <ellipse key={`lat-${i}`} cx={CX} cy={lat.cy} rx={lat.rx} ry={lat.ry} />
          ))}
          {meridians.map((m, i) => (
            <ellipse key={`mer-${i}`} cx={CX} cy={CY} rx={m.rx} ry={m.ry} />
          ))}
        </g>

        {/* Connection arcs from the hub outward */}
        <g fill="none" stroke="url(#globe-arc)" strokeWidth="0.45" strokeLinecap="round">
          {mapNodes
            .filter((node) => !node.hub)
            .map((node, i) =>
              reduced ? (
                <path key={node.label} d={arcPath(node.x, node.y)} opacity="0.5" />
              ) : (
                <motion.path
                  key={node.label}
                  d={arcPath(node.x, node.y)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.35 + i * 0.13, ease: 'easeOut' }}
                />
              ),
            )}
        </g>

        {/* Nodes */}
        <g>
          {mapNodes.map((node, i) => (
            <g key={node.label}>
              {!reduced && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.hub ? 2.4 : 1.8}
                  fill={node.hub ? '#8ED62B' : '#29B6F6'}
                  opacity={0.28}
                  animate={{ r: node.hub ? [2.4, 5.2, 2.4] : [1.8, 4, 1.8], opacity: [0.28, 0, 0.28] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.hub ? 1.5 : 1}
                fill={node.hub ? '#8ED62B' : '#29B6F6'}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Hub callout */}
      <div
        className="absolute rounded-lg border border-brand-green/30 bg-void/80 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-brand-green backdrop-blur-sm"
        style={{ left: `${hub.x}%`, top: `${hub.y}%`, transform: 'translate(12px, -50%)' }}
      >
        {hub.label} · HQ
      </div>
    </div>
  )
}
