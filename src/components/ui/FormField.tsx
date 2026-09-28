import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { Icon } from '@/components/ui/Icon'
import { EASE } from '@/lib/motion'

/* ==========================================================================
   Form primitives shared by every form on the site.
   The input styling lives in @/lib/formStyles.
   ========================================================================== */

interface FieldProps {
  label: string
  id: string
  children: ReactNode
  required?: boolean
  hint?: string
  error?: string
  errorId?: string
}

export function Field({ label, id, children, required, hint, error, errorId }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between gap-3 text-[0.875rem] font-medium text-frost"
      >
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-brand-green" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {hint ? <span className="text-[0.75rem] font-normal text-mist-dim">{hint}</span> : null}
      </label>

      {children}

      {error ? (
        <p id={errorId} className="mt-2 text-[0.8125rem] text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Native selects are styled with `appearance-none` so they match the text
 * inputs, which also removes the platform's dropdown arrow — this puts one
 * back, or the control reads as a text field.
 */
export function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <Icon
        name="chevronDown"
        size={16}
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-mist-dim"
      />
    </div>
  )
}

/** Shown in place of the form once a submission succeeds. */
export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel,
}: {
  title: string
  body: string
  onReset: () => void
  resetLabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      role="status"
      className="glass ring-gradient flex flex-col items-center rounded-2xl px-8 py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-green/30 bg-brand-green/10 text-brand-green shadow-glow-green">
        <Icon name="check" size={30} />
      </span>

      <h3 className="mt-7 font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist">{body}</p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-sm font-medium text-brand-green transition-colors hover:text-brand-green-soft"
      >
        {resetLabel}
      </button>
    </motion.div>
  )
}

/**
 * Submission failure notice.
 *
 * The site publishes no email address, so this cannot offer "email us
 * instead" — it has to be explicit that nothing was sent.
 */
export function FormError() {
  return (
    <motion.p
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      role="alert"
      className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[0.875rem] text-amber-200"
    >
      <Icon name="close" size={17} className="mt-0.5 shrink-0" />
      <span>
        Something went wrong and your message was{' '}
        <strong className="font-semibold">not</strong> sent. Please check your connection and try
        again in a moment.
      </span>
    </motion.p>
  )
}

/** Hidden input pair Netlify needs, plus the bot honeypot. */
export function NetlifyFormFields({ formName }: { formName: string }) {
  return (
    <>
      <input type="hidden" name="form-name" value={formName} />
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this in
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
    </>
  )
}
