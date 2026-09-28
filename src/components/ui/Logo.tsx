import { cn } from '@/lib/cn'

/* ==========================================================================
   IUNGO wordmark.

   TODO(brand): this is a faithful interpretation of the supplied logo —
   lowercase blue "i", green "UNGO", target rings inside the letter O. If you
   have the original vector file, drop it in /public and swap the markup here
   so the site uses the authentic letterforms.
   ========================================================================== */

interface LogoProps {
  className?: string
  /** Hide the wordmark and render only the glyph (mobile, favicon-like uses). */
  markOnly?: boolean
  /** Adds the "Technology" descender under the wordmark. */
  withDescriptor?: boolean
}

/** The target glyph that appears inside the logo's O letters. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('h-9 w-9', className)} aria-hidden="true">
      <defs>
        <linearGradient id="iungo-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8ED62B" />
          <stop offset="100%" stopColor="#29B6F6" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="url(#iungo-mark)" strokeWidth="3.2" />
      {/* Crosshair ticks, echoing the target inside the logo's O */}
      <g stroke="url(#iungo-mark)" strokeWidth="2.6" strokeLinecap="round">
        <path d="M20 4.5v5.5M20 30v5.5M4.5 20h5.5M30 20h5.5" />
      </g>
      {/* Core */}
      <circle cx="20" cy="20" r="4.6" fill="url(#iungo-mark)" />
    </svg>
  )
}

export function Logo({ className, markOnly = false, withDescriptor = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-90" />

      {markOnly ? null : (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]">
            <span className="text-brand-blue">i</span>
            <span className="text-brand-green">UNGO</span>
          </span>
          {withDescriptor ? (
            <span className="mt-1 font-mono text-[0.58rem] tracking-[0.34em] text-mist-dim uppercase">
              Technology
            </span>
          ) : null}
        </span>
      )}

      <span className="sr-only">IUNGO Technology</span>
    </span>
  )
}
