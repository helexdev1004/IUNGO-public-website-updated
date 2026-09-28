/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately dependency-free: the project has no conflicting-class problem
 * that would justify pulling in clsx + tailwind-merge, and every kilobyte on
 * a marketing site is paid for by the visitor.
 */
export type ClassValue = string | number | null | undefined | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []

  const walk = (value: ClassValue) => {
    if (!value && value !== 0) return
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    out.push(String(value))
  }

  inputs.forEach(walk)
  return out.join(' ')
}
