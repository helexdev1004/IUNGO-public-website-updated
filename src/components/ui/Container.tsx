import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** 'wide' for full-bleed grids, 'narrow' for long-form reading. */
  width?: 'default' | 'wide' | 'narrow'
}

const widths = {
  default: 'max-w-7xl',
  wide: 'max-w-[88rem]',
  narrow: 'max-w-3xl',
}

export function Container({ children, className, as: Tag = 'div', width = 'default' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-5 sm:px-8', widths[width], className)}>{children}</Tag>
}
