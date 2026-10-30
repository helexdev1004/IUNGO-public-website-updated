import { AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import {
  Field,
  FormError,
  FormSuccess,
  NetlifyFormFields,
  SelectShell,
} from '@/components/ui/FormField'
import { experienceLevels, expertiseAreas, qualifications } from '@/data/community'
import { cn } from '@/lib/cn'
import { inputClass } from '@/lib/formStyles'
import { EMAIL_PATTERN, useNetlifyForm } from '@/lib/useNetlifyForm'

/* Membership application for the AI Community. Its field names are mirrored
   in the hidden static "community" form in index.html — keep the two in step,
   or a new field is silently dropped.

   Longer than the other forms on the site, and deliberately so: the page
   promises that applications are reviewed and that members are matched to
   projects by qualification, which cannot be done from a name and an email.
   Everything that is not needed to make that judgement is optional. */

const FORM_NAME = 'community'

interface Values extends Record<string, string> {
  name: string
  email: string
  country: string
  expertise: string
  role: string
  experience: string
  qualification: string
  profile: string
  background: string
}

const initial: Values = {
  name: '',
  email: '',
  country: '',
  expertise: '',
  role: '',
  experience: '',
  qualification: '',
  profile: '',
  background: '',
}

function validate(values: Values) {
  const errors: Partial<Record<keyof Values, string>> = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }

  if (!values.country.trim()) errors.country = 'Please tell us where you are based.'
  if (!values.expertise) errors.expertise = 'Please choose the field closest to your expertise.'
  if (!values.role.trim()) errors.role = 'Please tell us your current or most recent role.'
  if (!values.experience) errors.experience = 'Please choose your level of experience.'

  if (!values.background.trim()) {
    errors.background = 'Please tell us about your background.'
  } else if (values.background.trim().length < 40) {
    errors.background =
      'A few more sentences would help us match you to the right projects.'
  }

  return errors
}

export function CommunityForm() {
  const { errors, status, field, errorId, handleSubmit, reset } = useNetlifyForm<Values>({
    formName: FORM_NAME,
    initial,
    validate,
  })

  if (status === 'success') {
    return (
      <FormSuccess
        title="Application received"
        body="Thank you for applying to the IUNGO AI Community. A member of the team reads every application and will email you with the next steps, including your Slack invitation if your background is a fit."
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

        <Field
          label="Where you are based"
          required
          error={errors.country}
          id={field('country').id}
          errorId={errorId('country')}
        >
          <input
            type="text"
            autoComplete="country-name"
            placeholder="City, Country"
            className={inputClass(errors.country)}
            {...field('country')}
          />
        </Field>

        <Field
          label="Field of expertise"
          required
          error={errors.expertise}
          id={field('expertise').id}
          errorId={errorId('expertise')}
        >
          <SelectShell>
            <select
              className={cn(inputClass(errors.expertise), 'appearance-none pr-10')}
              {...field('expertise')}
            >
              <option value="">Select one…</option>
              {expertiseAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.title}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        <Field
          label="Current or most recent role"
          required
          error={errors.role}
          id={field('role').id}
          errorId={errorId('role')}
        >
          <input
            type="text"
            autoComplete="organization-title"
            placeholder="Senior Backend Engineer"
            className={inputClass(errors.role)}
            {...field('role')}
          />
        </Field>

        <Field
          label="Years of experience"
          required
          error={errors.experience}
          id={field('experience').id}
          errorId={errorId('experience')}
        >
          <SelectShell>
            <select
              className={cn(inputClass(errors.experience), 'appearance-none pr-10')}
              {...field('experience')}
            >
              <option value="">Select one…</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        <Field
          label="Highest qualification"
          hint="Optional"
          id={field('qualification').id}
        >
          <SelectShell>
            <select
              className={cn(inputClass(), 'appearance-none pr-10')}
              {...field('qualification')}
            >
              <option value="">Prefer not to say</option>
              {qualifications.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </SelectShell>
        </Field>

        <Field
          label="LinkedIn, GitHub or site"
          hint="Optional"
          id={field('profile').id}
        >
          <input
            type="text"
            autoComplete="url"
            placeholder="linkedin.com/in/janedoe"
            className={inputClass()}
            {...field('profile')}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="About your background"
            required
            error={errors.background}
            id={field('background').id}
            errorId={errorId('background')}
          >
            <textarea
              rows={6}
              placeholder="What do you specialise in, and what have you worked on? Publications, systems you have built, or domains you know deeply are all worth mentioning — this is what we match against open projects."
              className={cn(inputClass(errors.background), 'resize-y')}
              {...field('background')}
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
          {status === 'submitting' ? 'Sending…' : 'Apply to join'}
        </Button>

        <p className="text-[0.8125rem] leading-relaxed text-mist-dim">
          Free for domain experts. No fees, no commission.
        </p>
      </div>
    </form>
  )
}
