import { useId, useState } from 'react'

/* ==========================================================================
   Shared form engine for every form on the site.

   SUBMISSION TARGET
   -----------------
   Forms post to Netlify Forms by default. Netlify registers a form by parsing
   the HTML it receives at build time and never runs your JavaScript, so every
   form here is mirrored by a hidden static form in index.html. Add or rename a
   field in a form component and you MUST update its twin there, or the new
   field is silently dropped.

   To send somewhere else (your own API, Formspree, a serverless function),
   change FORM_MODE below and pass an `endpoint`. Nothing else moves.
   ========================================================================== */

export type FormMode = 'netlify' | 'json'

export const FORM_MODE: FormMode = 'netlify'

/** Netlify listens at the site root regardless of which form posted. */
const NETLIFY_ENDPOINT = '/'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type FormErrors<T> = Partial<Record<keyof T, string>>

interface Options<T> {
  /** Must match the `name` on the matching hidden form in index.html. */
  formName: string
  initial: T
  validate: (values: T) => FormErrors<T>
  /** Used only when FORM_MODE is 'json'. */
  endpoint?: string
}

export function useNetlifyForm<T extends Record<string, string>>({
  formName,
  initial,
  validate,
  endpoint = '/api/contact',
}: Options<T>) {
  const formId = useId()
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitted, setSubmitted] = useState(false)

  const fieldId = (name: keyof T) => `${formId}-${String(name)}`
  const errorId = (name: keyof T) => `${fieldId(name)}-error`

  /** Spread onto an input, select or textarea to wire it up completely. */
  const field = (name: keyof T) => ({
    id: fieldId(name),
    name: String(name),
    value: values[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? errorId(name) : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const next = { ...values, [name]: event.target.value }
      setValues(next)
      /* Re-validate live only after a failed submit, so the form does not
         scold people while they are still typing. */
      if (submitted) setErrors(validate(next))
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    const found = validate(values)
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid as keyof T))?.focus()
      return
    }

    setStatus('submitting')

    try {
      const response =
        FORM_MODE === 'netlify'
          ? await fetch(NETLIFY_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({ 'form-name': formName, ...values }).toString(),
            })
          : await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ form: formName, ...values }),
            })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setValues(initial)
      setSubmitted(false)
      setStatus('success')
    } catch (error) {
      console.error(`Submission failed for form "${formName}":`, error)
      setStatus('error')
    }
  }

  return {
    values,
    errors,
    status,
    field,
    errorId,
    handleSubmit,
    reset: () => setStatus('idle'),
  }
}

/* A deliberately permissive check: the job is to catch typos, not to police
   the RFC. Real verification happens when the reply bounces. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
