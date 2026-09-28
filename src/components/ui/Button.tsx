import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Appends a right-pointing arrow that nudges on hover. */
  withArrow?: boolean
  className?: string
  /** Internal route — renders a react-router <Link>. */
  to?: string
  /** External URL — renders an <a> with safe rel attributes. */
  href?: string
}

type Props = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap transition-all duration-300 ease-out disabled:pointer-events-none ' +
  'disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-3'

const variants: Record<Variant, string> = {
  /* Brand gradient fill. The inner span carries the sheen on hover. */
  primary: cn(
    'text-void font-semibold',
    'bg-[linear-gradient(100deg,var(--color-brand-green),var(--color-brand-green-soft)_45%,var(--color-brand-blue-soft))]',
    'bg-[length:180%_auto] bg-left hover:bg-right',
    'shadow-[0_8px_30px_-8px_rgb(142_214_43/0.55)]',
    'hover:shadow-[0_12px_44px_-8px_rgb(142_214_43/0.75)] hover:-translate-y-0.5',
  ),
  /* Glass outline — used for the second action in a pair. */
  secondary: cn(
    'glass text-frost hover:text-white',
    'hover:border-brand-blue/45 hover:bg-white/[0.07] hover:-translate-y-0.5',
    'hover:shadow-[0_12px_40px_-14px_rgb(41_182_246/0.6)]',
  ),
  ghost: 'text-mist hover:text-frost hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  to,
  href,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className)

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <Icon
          name="arrowRight"
          size={17}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
