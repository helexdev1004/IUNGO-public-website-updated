import { AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import {
  Field,
  FormError,
  FormSuccess,
  NetlifyFormFields,
  SelectShell,
} from '@/components/ui/FormField'
import { chatApps, eligibleCountries } from '@/data/apply'
import { cn } from '@/lib/cn'
import { inputClass } from '@/lib/formStyles'
import { EMAIL_PATTERN, useNetlifyForm } from '@/lib/useNetlifyForm'

/* Application form for a single job posting at /apply/<code>. Its field names
   are mirrored in the hidden static "apply" form in index.html — keep the two
   in step, or a new field is silently dropped.

   What is asked for: name, where they live, email, a chat handle, and who
   referred them.

   Country is a dropdown of eligible countries rather than free text, because
   these postings are open to US and European residents only and that is the
   one requirement worth enforcing rather than trusting. The chat handle is
   how the first conversation actually happens. The referral is optional —
   these links get forwarded, and requiring a name would turn away anyone who
   arrived without one. */

const FORM_NAME = 'apply'

interface Values extends Record<string, string> {
  name: string
  country: string
  city: string
  email: string
  chatApp: string
  chatHandle: string
  referral: string
  /** Which posting this came from. Not shown — it rides along in the POST. */
  posting: string
}

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'

  /* The second check only catches a tampered or stale value — the dropdown
     cannot offer anything that fails it. */
  if (!values.country) {
    errors.country = 'Please choose the country you live in.'
  } else if (!eligibleCountries.includes(values.country)) {
    errors.country = 'This role is open to residents of the United States and Europe only.'
  }

  if (!values.city.trim()) errors.city = 'Please add your city.'

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
      country: '',
      city: '',
      email: '',
      chatApp: '',
      chatHandle: '',
      referral: '',
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
        Takes about a minute. We reply to every application.
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

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Country"
            required
            error={errors.country}
            id={field('country').id}
            errorId={errorId('country')}
          >
            <SelectShell>
              <select
                className={cn(inputClass(errors.country), 'appearance-none pr-10')}
                autoComplete="country-name"
                {...field('country')}
              >
                <option value="">Select your country…</option>
                {eligibleCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <Field
            label="City"
            required
            error={errors.city}
            id={field('city').id}
            errorId={errorId('city')}
          >
            <input
              type="text"
              autoComplete="address-level2"
              placeholder="Berlin"
              className={inputClass(errors.city)}
              {...field('city')}
            />
          </Field>
        </div>

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

        <Field label="Who referred you?" hint="Optional" id={field('referral').id}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Their name"
            className={inputClass()}
            {...field('referral')}
          />
        </Field>
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
