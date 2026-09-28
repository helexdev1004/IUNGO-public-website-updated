import { AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import {
  Field,
  FormError,
  FormSuccess,
  NetlifyFormFields,
  SelectShell,
} from '@/components/ui/FormField'
import { budgetRanges, projectTypes } from '@/data/services'
import { cn } from '@/lib/cn'
import { inputClass } from '@/lib/formStyles'
import { EMAIL_PATTERN, useNetlifyForm } from '@/lib/useNetlifyForm'

/* Project enquiry form. Its field names are mirrored in the hidden static
   "contact" form in index.html — keep the two in step. */

const FORM_NAME = 'contact'

interface Values extends Record<string, string> {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
}

const initial: Values = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
}

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }
  if (!values.projectType) errors.projectType = 'Please choose a project type.'
  if (!values.message.trim()) {
    errors.message = 'Please tell us a little about the project.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A sentence or two more would help us give a useful reply.'
  }

  return errors
}

export function ContactForm() {
  const { errors, status, field, errorId, handleSubmit, reset } = useNetlifyForm<Values>({
    formName: FORM_NAME,
    initial,
    validate,
  })

  if (status === 'success') {
    return (
      <FormSuccess
        title="Message received"
        body="Thank you for reaching out. One of our engineers will read this and reply within one business day — usually sooner."
        onReset={reset}
        resetLabel="Send another message"
      />
    )
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="glass ring-gradient rounded-2xl p-6 sm:p-8"
    >
      <NetlifyFormFields formName={FORM_NAME} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          required
          error={errors.name}
          id={field('name').id}
          errorId={errorId('name')}
        >
          <input
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass(errors.name)}
            {...field('name')}
          />
        </Field>

        <Field
          label="Email"
          required
          error={errors.email}
          id={field('email').id}
          errorId={errorId('email')}
        >
          <input
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClass(errors.email)}
            {...field('email')}
          />
        </Field>

        <Field label="Company" hint="Optional" id={field('company').id}>
          <input
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={inputClass()}
            {...field('company')}
          />
        </Field>

        <Field
          label="Project type"
          required
          error={errors.projectType}
          id={field('projectType').id}
          errorId={errorId('projectType')}
        >
          <SelectShell>
            <select
              className={cn(inputClass(errors.projectType), 'appearance-none pr-10')}
              {...field('projectType')}
            >
              <option value="">Select one…</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Budget range"
            hint="Optional — it helps us scope realistically"
            id={field('budget').id}
          >
            <SelectShell>
              <select className={cn(inputClass(), 'appearance-none pr-10')} {...field('budget')}>
                <option value="">Prefer not to say</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            label="Message"
            required
            error={errors.message}
            id={field('message').id}
            errorId={errorId('message')}
          >
            <textarea
              rows={6}
              placeholder="What are you trying to build or solve? Any deadlines or constraints we should know about?"
              className={cn(inputClass(errors.message), 'resize-y')}
              {...field('message')}
            />
          </Field>
        </div>
      </div>

      <AnimatePresence>{status === 'error' ? <FormError /> : null}</AnimatePresence>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          withArrow={status !== 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>

        <p className="text-[0.8125rem] leading-relaxed text-mist-dim">
          We reply within one business day.
        </p>
      </div>
    </form>
  )
}
