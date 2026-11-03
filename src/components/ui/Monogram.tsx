/* ==========================================================================
   Generated avatar, used until a real headshot is supplied.

   Each person gets a distinct piece of geometry derived from their name, so
   a roster without photographs reads as a designed set rather than a row of
   identical grey boxes. It is deliberately abstract: it never implies a face,
   which is the only honest thing a placeholder avatar can do.

   Deterministic — the same name always produces the same avatar, so cards do
   not reshuffle their appearance between builds.
   ========================================================================== */

/** FNV-1a. Small, stable, and good enough to spread names across variants. */
function hash(input: string) {
  let h = 2166136261
  for (let index = 0; index < input.length; index += 1) {
    h ^= input.charCodeAt(index)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/* Brand hexes rather than the CSS custom properties: these are drawn inside
   an SVG gradient, which cannot read var(--color-*) reliably across engines.
   Keep in step with the @theme block in index.css. */
const palettes = {
  green: [
    ['#8ed62b', '#6fae1f'],
    ['#a9e65c', '#8ed62b'],
    ['#8ed62b', '#29b6f6'],
  ],
  blue: [
    ['#29b6f6', '#0e8fcc'],
    ['#67cdfa', '#29b6f6'],
    ['#29b6f6', '#8ed62b'],
  ],
} as const

interface MonogramProps {
  name: string
  initials: string
  accent: 'green' | 'blue'
  /** Rendered size in pixels. */
  size?: number
  className?: string
}

export function Monogram({ name, initials, accent, size = 56, className }: MonogramProps) {
  /* One salted hash per property rather than slices of a single one. Taking
     bit ranges out of one FNV value left all eight names on the same variant
     — the shifted high bits are not independent enough to survive a % 3. */
  const seed = hash(name)
  const pair = palettes[accent][hash(`${name}#palette`) % palettes[accent].length]
  const angle = hash(`${name}#angle`) % 360
  const variant = hash(`${name}#variant`) % 3

  /* Unique per name so two avatars on the same page cannot collide on an
     SVG id — ids are global to the document, not scoped to the element. */
  const uid = `mono-${seed.toString(36)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label={`${name} — no photograph supplied`}
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-g`} gradientTransform={`rotate(${angle} 0.5 0.5)`}>
          <stop offset="0%" stopColor={pair[0]} stopOpacity="0.9" />
          <stop offset="100%" stopColor={pair[1]} stopOpacity="0.55" />
        </linearGradient>

        <clipPath id={`${uid}-c`}>
          <rect width="56" height="56" rx="16" />
        </clipPath>
      </defs>

      <rect width="56" height="56" rx="16" fill={`url(#${uid}-g)`} />

      {/* A seeded flourish, clipped to the tile. Three variants is enough to
          make a grid of eight look varied without looking random. */}
      <g clipPath={`url(#${uid}-c)`} opacity="0.3">
        {variant === 0 ? (
          <>
            <circle cx={12 + (seed % 32)} cy="52" r="26" fill="none" stroke="#050816" strokeWidth="1.5" />
            <circle cx={12 + (seed % 32)} cy="52" r="17" fill="none" stroke="#050816" strokeWidth="1.5" />
          </>
        ) : null}

        {variant === 1
          ? Array.from({ length: 4 }, (_, row) =>
              Array.from({ length: 4 }, (_, column) => (
                <circle
                  key={`${row}-${column}`}
                  cx={9 + column * 13}
                  cy={9 + row * 13}
                  r={(hash(`${name}#${row}${column}`) % 2) + 1}
                  fill="#050816"
                />
              )),
            )
          : null}

        {variant === 2
          ? Array.from({ length: 5 }, (_, index) => (
              <line
                key={index}
                x1={-20 + index * 18}
                y1="60"
                x2={10 + index * 18}
                y2="-4"
                stroke="#050816"
                strokeWidth="2"
              />
            ))
          : null}
      </g>

      <text
        x="28"
        y="29"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#050816"
        fontSize="18"
        fontWeight="700"
        fontFamily="Sora, ui-sans-serif, system-ui, sans-serif"
        letterSpacing="-0.02em"
      >
        {initials}
      </text>
    </svg>
  )
}
