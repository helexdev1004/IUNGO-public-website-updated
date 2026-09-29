import { AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import {
  Field,
  FormError,
  FormSuccess,
  NetlifyFormFields,
  SelectShell,
} from '@/components/ui/FormField'
import { chatApps } from '@/data/apply'
import { cn } from '@/lib/cn'
import { inputClass } from '@/lib/formStyles'
import { EMAIL_PATTERN, useNetlifyForm } from '@/lib/useNetlifyForm'

/* Application form for a single job posting at /apply/<code>. Its field names
   are mirrored in the hidden static "apply" form in index.html — keep the two
   in step, or a new field is silently dropped.

   Four things are asked for and nothing else: name, location, email and a
   chat handle. Location is required here (unlike the general careers form)
   because these postings are open to US and EU residents only, and the chat
   handle is how the first conversation actually happens. */

const FORM_NAME = 'apply'

interface Values extends Record<string, string> {
  name: string
  location: string
  email: string
  chatApp: string
  chatHandle: string
  /** Which posting this came from. Not shown — it rides along in the POST. */
  posting: string
}

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'

  if (!values.location.trim()) {
    errors.location = 'This role is open to US and EU residents, so we need to know where you are.'
  }

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }

  if (!values.chatApp) errors.chatApp = 'Please choose where we should message you.'

  if (!values.chatHandle.trim()) {
    errors.chatHandle = values.chatApp
      ? `Please add your ${values.chatApp} ${values.chatApp === 'WhatsApp' ? 'number' : 'username'}.`
      : 'Please add the username or number we should reach you on.'
  }

  return errors
}

export function ApplyForm({ postingCode, postingTitle }: { postingCode: string; postingTitle: string }) {
  const { values, errors, status, field, errorId, handleSubmit, reset } = useNetlifyForm<Values>({
    formName: FORM_NAME,
    initial: {
      name: '',
      location: '',
      email: '',
      chatApp: '',
      chatHandle: '',
      posting: `${postingTitle} (${postingCode})`,
    },
    validate,
  })

  /* Drives the handle field's placeholder and hint — a Telegram username and
     a WhatsApp number are not typed the same way. */
  const chosen = chatApps.find((app) => app.id === values.chatApp)

  if (status === 'success') {
    return (
      <FormSuccess
        title="Application received"
        body="Thank you for applying. A member of the team reviews every application and will follow up by email or on your chat app with the next steps."
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
      <input type="hidden" {...field('posting')} />

      <h2 className="font-display text-xl font-semibold text-white">Apply for this role</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">
        Four details, about a minute. We reply to every application.
      </p>

      <div className="mt-7 grid gap-5">
        <Field
          label="Full name"
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
          label="Where you live"
          required
          hint="US or EU"
          error={errors.location}
          id={field('location').id}
          errorId={errorId('location')}
        >
          <input
            type="text"
            autoComplete="address-level2"
            placeholder="City, Country"
            className={inputClass(errors.location)}
            {...field('location')}
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

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Chat app"
            required
            error={errors.chatApp}
            id={field('chatApp').id}
            errorId={errorId('chatApp')}
          >
            <SelectShell>
              <select
                className={cn(inputClass(errors.chatApp), 'appearance-none pr-10')}
                {...field('chatApp')}
              >
                <option value="">Select one…</option>
                {chatApps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <Field
            label="Username or number"
            required
            hint={chosen?.hint}
            error={errors.chatHandle}
            id={field('chatHandle').id}
            errorId={errorId('chatHandle')}
          >
            <input
              type="text"
              autoComplete="off"
              placeholder={chosen?.placeholder ?? 'Pick a chat app first'}
              className={inputClass(errors.chatHandle)}
              {...field('chatHandle')}
            />
          </Field>
        </div>
      </div>

      <AnimatePresence>{status === 'error' ? <FormError /> : null}</AnimatePresence>

      <div className="mt-7 flex flex-col gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          withArrow={status !== 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Submit application'}
        </Button>

        <p className="text-[0.8125rem] leading-relaxed text-mist-dim">
          Your details are used only to contact you about this role.
        </p>
      </div>
    </form>
  )
}
