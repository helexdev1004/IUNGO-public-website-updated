import type { SVGProps } from 'react'

import { cn } from '@/lib/cn'

/* ==========================================================================
   Inline icon set.

   Hand-rolled rather than pulled from an icon package: the site needs about
   thirty glyphs, and shipping them inline costs a couple of kilobytes instead
   of a dependency. Stroke icons share a 24×24 grid and inherit currentColor.
   ========================================================================== */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const paths = {
  /* --- Concepts ------------------------------------------------------- */
  brain: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="12" cy="4.2" r="1.5" />
      <circle cx="12" cy="19.8" r="1.5" />
      <circle cx="4.8" cy="8" r="1.5" />
      <circle cx="19.2" cy="8" r="1.5" />
      <circle cx="4.8" cy="16" r="1.5" />
      <circle cx="19.2" cy="16" r="1.5" />
      <path d="M12 5.7v3.9M12 14.4v3.9M6.1 8.8l3.8 2.1M14.1 13.1l3.8 2.1M6.1 15.2l3.8-2.1M14.1 10.9l3.8-2.1" />
    </g>
  ),
  sparkles: (
    <g {...stroke}>
      <path d="M12 3l1.7 4.6L18.3 9.3l-4.6 1.7L12 15.6l-1.7-4.6L5.7 9.3l4.6-1.7z" />
      <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </g>
  ),
  bot: (
    <g {...stroke}>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4.8M12 3.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
      <path d="M9 13v1.4M15 13v1.4" />
      <path d="M2.5 12.5v2.5M21.5 12.5v2.5" />
    </g>
  ),
  search: (
    <g {...stroke}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="M15.4 15.4L20 20" />
    </g>
  ),
  eye: (
    <g {...stroke}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </g>
  ),
  chart: (
    <g {...stroke}>
      <path d="M3.5 20.5h17" />
      <path d="M6.8 20.5v-6M12 20.5V7.5M17.2 20.5v-9.5" />
    </g>
  ),
  workflow: (
    <g {...stroke}>
      <rect x="3" y="3.5" width="6.5" height="5.5" rx="1.6" />
      <rect x="14.5" y="15" width="6.5" height="5.5" rx="1.6" />
      <rect x="3" y="15" width="6.5" height="5.5" rx="1.6" />
      <path d="M6.25 9v6M9.5 17.75h5" />
      <path d="M9.5 6.25h5.75A2.5 2.5 0 0 1 17.75 8.75V15" />
    </g>
  ),
  database: (
    <g {...stroke}>
      <ellipse cx="12" cy="5.8" rx="7.5" ry="2.8" />
      <path d="M4.5 5.8v12.4c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V5.8" />
      <path d="M19.5 12c0 1.55-3.36 2.8-7.5 2.8S4.5 13.55 4.5 12" />
    </g>
  ),
  layers: (
    <g {...stroke}>
      <path d="M12 3.2l8.5 4.3-8.5 4.3-8.5-4.3z" />
      <path d="M3.5 12.2l8.5 4.3 8.5-4.3" />
      <path d="M3.5 16.5l8.5 4.3 8.5-4.3" />
    </g>
  ),
  cart: (
    <g {...stroke}>
      <path d="M2.5 3.5h2.3l2.4 11.2h10.1l2.2-8H6.2" />
      <circle cx="9.2" cy="19" r="1.5" />
      <circle cx="16.8" cy="19" r="1.5" />
    </g>
  ),
  building: (
    <g {...stroke}>
      <path d="M3.5 20.5h17" />
      <path d="M5.5 20.5V5.2a1.7 1.7 0 0 1 1.7-1.7h6.1a1.7 1.7 0 0 1 1.7 1.7v15.3" />
      <path d="M15 10.5h2.8a1.7 1.7 0 0 1 1.7 1.7v8.3" />
      <path d="M8.6 7.5h3M8.6 11h3M8.6 14.5h3" />
    </g>
  ),
  compass: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.2 8.8l-1.9 4.5-4.5 1.9 1.9-4.5z" />
    </g>
  ),
  cube: (
    <g {...stroke}>
      <path d="M12 2.8l8.2 4.6v9.2L12 21.2l-8.2-4.6V7.4z" />
      <path d="M12 12l8.2-4.6M12 12v9.2M12 12L3.8 7.4" />
    </g>
  ),
  monitor: (
    <g {...stroke}>
      <rect x="2.8" y="4" width="18.4" height="12.5" rx="2" />
      <path d="M8.5 20.3h7M12 16.5v3.8" />
    </g>
  ),
  server: (
    <g {...stroke}>
      <rect x="3" y="4" width="18" height="6.2" rx="1.8" />
      <rect x="3" y="13.8" width="18" height="6.2" rx="1.8" />
      <path d="M6.8 7.1h.01M6.8 16.9h.01" />
    </g>
  ),
  cloud: (
    <g {...stroke}>
      <path d="M7 18.5h10.2a3.8 3.8 0 0 0 .5-7.57 5.6 5.6 0 0 0-10.85-1.4A4.1 4.1 0 0 0 7 18.5z" />
    </g>
  ),
  shield: (
    <g {...stroke}>
      <path d="M12 2.9l7.4 2.9v5.6c0 4.3-3 8.1-7.4 9.7-4.4-1.6-7.4-5.4-7.4-9.7V5.8z" />
      <path d="M9.2 12.1l2 2 3.6-3.9" />
    </g>
  ),
  globe: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12h17.2" />
      <path d="M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6s-1.2 6.2-3.4 8.6c-2.2-2.4-3.4-5.4-3.4-8.6S9.8 5.8 12 3.4z" />
    </g>
  ),
  target: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.1" />
    </g>
  ),
  users: (
    <g {...stroke}>
      <circle cx="9.4" cy="8.4" r="3.3" />
      <path d="M3 19.2a6.4 6.4 0 0 1 12.8 0" />
      <path d="M16.2 5.5a3.3 3.3 0 0 1 0 6.3M17.6 13.4a6.4 6.4 0 0 1 3.4 5.8" />
    </g>
  ),
  zap: (
    <g {...stroke}>
      <path d="M13.2 2.5L4.8 13.4h6.1l-.9 8.1 8.4-10.9h-6.1z" />
    </g>
  ),
  code: (
    <g {...stroke}>
      <path d="M8.6 7.5L3.8 12l4.8 4.5M15.4 7.5L20.2 12l-4.8 4.5M13.6 4.2l-3.2 15.6" />
    </g>
  ),
  rocket: (
    <g {...stroke}>
      <path d="M12 2.8c3.2 2 5 5.6 5 9.4l-2.6 3.1H9.6L7 12.2c0-3.8 1.8-7.4 5-9.4z" />
      <circle cx="12" cy="9.6" r="1.9" />
      <path d="M9.6 15.3L7.8 21l3-1.9M14.4 15.3l1.8 5.7-3-1.9" />
    </g>
  ),

  /* --- Interface ------------------------------------------------------- */
  arrowRight: (
    <g {...stroke}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </g>
  ),
  arrowUpRight: (
    <g {...stroke}>
      <path d="M7 17L17 7M8.5 7H17v8.5" />
    </g>
  ),
  check: (
    <g {...stroke}>
      <path d="M4.5 12.8l4.7 4.7L19.5 7.2" />
    </g>
  ),
  menu: (
    <g {...stroke}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </g>
  ),
  close: (
    <g {...stroke}>
      <path d="M6 6l12 12M18 6L6 18" />
    </g>
  ),
  chevronDown: (
    <g {...stroke}>
      <path d="M6 9.5l6 6 6-6" />
    </g>
  ),
  mail: (
    <g {...stroke}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.2" />
      <path d="M3.4 7l7.5 5.2a2 2 0 0 0 2.2 0L20.6 7" />
    </g>
  ),
  phone: (
    <g {...stroke}>
      <path d="M8.1 3.5l2 4.2-2 1.6a10.8 10.8 0 0 0 6.6 6.6l1.6-2 4.2 2v3.2a1.4 1.4 0 0 1-1.5 1.4C11.3 20 4 12.7 3.4 5a1.4 1.4 0 0 1 1.4-1.5z" />
    </g>
  ),
  mapPin: (
    <g {...stroke}>
      <path d="M12 21.2s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </g>
  ),
  clock: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </g>
  ),
  quote: (
    <g fill="currentColor">
      <path d="M9.2 5.5C6 6.9 4 10 4 13.4c0 3.1 1.8 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.9-3.4 3.8-4.3zM20 5.5c-3.2 1.4-5.2 4.5-5.2 7.9 0 3.1 1.8 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.7 1.9-3.4 3.8-4.3z" />
    </g>
  ),

  /* --- Social (filled brand glyphs) ------------------------------------ */
  linkedin: (
    <g fill="currentColor">
      <path d="M6.94 8.5v10.9H3.4V8.5zM5.17 3.4a2.05 2.05 0 1 1 0 4.1 2.05 2.05 0 0 1 0-4.1zM9.3 8.5h3.39v1.49h.05c.47-.9 1.63-1.84 3.35-1.84 3.58 0 4.24 2.36 4.24 5.42v5.83h-3.53v-5.17c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73v5.26H9.3z" />
    </g>
  ),
} as const

export type IconName = keyof typeof paths

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Accessible label. Omit for purely decorative icons. */
  title?: string
  size?: number | string
}

export function Icon({ name, title, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn('shrink-0', className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  )
}
