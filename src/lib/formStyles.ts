import { cn } from '@/lib/cn'

/**
 * Shared styling for every text input, select and textarea.
 *
 * Lives here rather than beside the form components because a module that
 * exports both components and plain functions loses Fast Refresh during
 * development — React cannot tell which exports are components.
 */
export function inputClass(error?: string) {
  return cn(
    'w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-frost',
    'placeholder:text-mist-dim/70 transition-all duration-200',
    'focus:bg-white/[0.05] focus:outline-none',
    error
      ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/25'
      : 'border-white/10 focus:border-brand-green/60 focus:ring-2 focus:ring-brand-green/20',
  )
}
