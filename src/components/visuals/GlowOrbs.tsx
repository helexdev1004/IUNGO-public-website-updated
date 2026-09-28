import { cn } from '@/lib/cn'

interface GlowOrbsProps {
  className?: string
  variant?: 'hero' | 'section' | 'corner'
}

/**
 * Soft out-of-focus colour fields that sit behind content.
 *
 * Pure CSS gradients rather than images: they scale to any viewport, cost
 * nothing to download, and re-tint automatically if the brand colours change.
 */
export function GlowOrbs({ className, variant = 'section' }: GlowOrbsProps) {
  if (variant === 'hero') {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
        <div className="absolute -top-[22%] -right-[8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.22),transparent_66%)] blur-3xl animate-sheen" />
        <div className="absolute top-[14%] -left-[12%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgb(142_214_43/0.2),transparent_66%)] blur-3xl animate-sheen [animation-delay:2.5s]" />
        <div className="absolute -bottom-[26%] left-[32%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.14),transparent_70%)] blur-3xl animate-sheen [animation-delay:4.5s]" />
      </div>
    )
  }

  if (variant === 'corner') {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
        <div className="absolute -top-40 right-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgb(142_214_43/0.13),transparent_68%)] blur-3xl" />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute top-1/4 -left-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgb(142_214_43/0.11),transparent_68%)] blur-3xl" />
      <div className="absolute bottom-0 -right-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.11),transparent_68%)] blur-3xl" />
    </div>
  )
}
