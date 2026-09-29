import { AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { Field, FormError, FormSuccess, NetlifyFormFields } from '@/components/ui/FormField'
import { cn } from '@/lib/cn'
import { inputClass } from '@/lib/formStyles'
import { EMAIL_PATTERN, useNetlifyForm } from '@/lib/useNetlifyForm'

/* Recruitment form. Its field names are mirrored in the hidden static
   "careers" form in index.html — keep the two in step.

   Deliberately short: name, email, location and a free-text message. There is
   no role picker, experience dropdown or portfolio field — everything an
   applicant wants to say goes in the message. */

const FORM_NAME = 'careers'

interface Values extends Record<string, string> {
  name: string
  email: string
  location: string
  referral: string
  message: string
}

const initial: Values = {
  name: '',
  email: '',
  location: '',
  referral: '',
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
  if (!values.message.trim()) {
    errors.message = 'Please tell us a little about yourself.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'A sentence or two more would help us assess your application.'
  }

  return errors
}

export function CareersForm() {
  const { errors, status, field, errorId, handleSubmit, reset } = useNetlifyForm<Values>({
    formName: FORM_NAME,
    initial,
    validate,
  })

  if (status === 'success') {
    return (
      <FormSuccess
        title="Application received"
        body="Thank you for your interest in joining IUNGO. An engineer will review your application and reply — whichever way the answer goes."
        onReset={reset}
        resetLabel="Submit another application"
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
            placeholder="jane@example.com"
            className={inputClass(errors.email)}
            {...field('email')}
          />
        </Field>

        <Field label="Where you are based" hint="Optional" id={field('location').id}>
          <input
            type="text"
            autoComplete="country-name"
            placeholder="City, Country"
            className={inputClass()}
            {...field('location')}
          />
        </Field>

        {/* Optional on purpose — plenty of good applicants arrive without an
            introduction, and a required field here would turn them away. */}
        <Field label="Who referred you?" hint="Optional" id={field('referral').id}>
          <input
            type="text"
            placeholder="Their name"
            className={inputClass()}
            {...field('referral')}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="About you"
            required
            error={errors.message}
            id={field('message').id}
            errorId={errorId('message')}
          >
            <textarea
              rows={6}
              placeholder="What do you work on, and what are you looking for next? Anything you have built that you are proud of is worth mentioning."
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
          {status === 'submitting' ? 'Sending…' : 'Submit application'}
        </Button>

        <p className="text-[0.8125rem] leading-relaxed text-mist-dim">
          We reply to every application.
        </p>
      </div>
    </form>
  )
}
