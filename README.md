# IUNGO Technology — public website

Marketing site for IUNGO Technology. React 19 + TypeScript + Tailwind CSS v4 + Framer Motion,
built with Vite and deployed to Netlify.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
npm run lint
```

---

## Project structure

```
src/
├─ data/                 ← ALL COPY LIVES HERE. Edit these, not the components.
│  ├─ site.ts            company details, navigation, footer, social links
│  ├─ services.ts        the six service practices + contact-form dropdowns
│  ├─ careers.ts         copy shown beside the recruitment form
│  ├─ apply.ts           job postings served at /apply/<code>
│  ├─ technology.ts      AI capabilities, tech stack, marquee
│  ├─ projects.ts        case studies
│  ├─ team.ts            roster + globe node positions
│  └─ stats.ts           headline figures
├─ components/
│  ├─ layout/            Navbar, Footer, Layout (route shell + scroll manager)
│  ├─ sections/          page-level blocks (Hero, Stats, ContactForm, …)
│  ├─ ui/                primitives (Button, GlassCard, Reveal, Counter, Icon, …)
│  ├─ visuals/           ParticleNetwork canvas, GlobeNetwork, GlowOrbs
│  └─ Seo.tsx            per-page <title>/<meta>, hoisted by React 19
├─ pages/                one file per route
├─ lib/                  cn() class joiner, shared easing curve
└─ index.css             design tokens (@theme), base styles, component classes
```

**To rebrand**, change the `@theme` block at the top of `src/index.css`. Colours, fonts,
shadows and animation timings are all defined there once; nothing else hard-codes a hex value.

**To change copy**, edit the matching file in `src/data/`. Components read from these, so
you rarely need to open a `.tsx` file to change what the site says.

---

## Deploying to Netlify

`netlify.toml` is already configured — build command `npm run build`, publish directory
`dist`, plus the SPA redirect that React Router needs and a set of security headers.

**Recommended: connect the Git repository.** In Netlify, *Add new site → Import an existing
project*, pick the repo, and accept the detected settings. Every push then deploys, and pull
requests get preview URLs.

**Alternative: drag and drop.** Run `npm run build` and drop the `dist` folder onto the
Netlify dashboard. Fastest way to a live URL. Form detection parses the deployed HTML, so
the forms are picked up this way too — but every update means rebuilding and re-dropping by
hand, and there are no deploy previews.

---

## The three forms → your inbox

Every form posts to **Netlify Forms** with no backend and no API key. `/contact` carries the
first two behind a tab switcher; the third belongs to a job posting:

| Form name | Component | Purpose |
| --- | --- | --- |
| `contact` | `sections/ContactForm.tsx` | Project enquiries |
| `careers` | `sections/CareersForm.tsx` | Open job applications |
| `apply` | `sections/ApplyForm.tsx` | Applications to one posting at `/apply/<code>` |

They share one engine — `lib/useNetlifyForm.ts` handles validation, focus management,
submission and status; `ui/FormField.tsx` holds the field primitives. Adding another form
means writing its fields and a `validate` function, nothing more.

Netlify registers a form by parsing the HTML it receives at build time, and it never runs
your JavaScript — so it cannot see a form that React renders at runtime. All three are
therefore mirrored by hidden static forms at the bottom of `index.html`. **If you add or
rename a field in any of those components, update its twin there or the new field is silently
dropped.** A quick check: the `name` attributes in each component must exactly match the
matching hidden form.

### Delivering submissions to an inbox

**The destination address is a Netlify dashboard setting, not a code setting.** Nothing in
this repository controls where submissions are emailed — there is no netlify.toml option and
no HTML field for it. It has to be done once in the Netlify UI, after the first deploy:

1. **Site configuration → Forms → enable form detection**, then redeploy. On newer Netlify
   accounts this is off by default, and no form appears until a build runs with it on.
2. **Forms → Form submission notifications → Add notification → Email notification** →
   enter the team inbox. The address is deliberately not recorded in this repository,
   which is public; it is in `DEPLOYMENT.local.md` alongside this file.

   A notification set to fire **on new submission from any form** covers `contact`,
   `careers` and `apply` together — that is the simplest setup and what is configured today.
   Per-form notifications exist too, if enquiries and applications should reach different
   inboxes; in that case each form needs its own and configuring one does nothing for the
   others.

Until both are set, submissions are still captured and visible under **Forms** in the Netlify
dashboard, but nobody is emailed about them.

### What the careers form collects

Name, email, location (optional) and a free-text message — nothing else. There is no role
picker, experience dropdown, CV upload or portfolio field, so **an applicant's only place to
share a CV or GitHub link is the message body.**

If you later want a file upload, Netlify Forms supports it, but it needs a multipart POST
instead of the form-encoded one the forms share, plus an `<input type="file">` in the
hidden static form.

### Job postings at `/apply/<code>`

A posting is an entry in `src/data/apply.ts`, addressed by its `code`:
`/apply/1e32jsdnn23`. Nothing on the site links to it and it is deliberately left out of
`public/sitemap.xml` and marked `noindex`, so a posting reaches the people it was sent to
and not search results. **Deleting the entry retires the posting** — the URL then falls
through to the 404 page. Adding a second posting is one more object in that array; the page
and the form are shared.

Its form asks for name, location, email, a chat handle (Telegram, WhatsApp or Discord) and
who referred the applicant. Location is required here, unlike the careers form, because
these postings are open to US and EU residents only; the referral is optional, since these
links get forwarded and requiring a name would turn away anyone who arrived without one.
Each submission also carries a hidden
`posting` field naming which posting it came from, which is what tells two postings apart in
the Netlify dashboard.

Three things worth knowing:

- **The free tier allows 100 submissions/month.** Beyond that it becomes a paid add-on.
- **Replies do not reach the sender.** The notification email comes from Netlify, so pressing
  Reply in your mail client does not contact the person who wrote in — copy their address out
  of the message body. If reply-to matters, use Formspree or Web3Forms instead (see below).
- **The form does nothing in local development.** There is no Netlify backend behind
  `npm run dev`, so submitting locally will show the error state. Test it on a deploy preview.
- **The form is the only contact route.** No email address appears anywhere on the site, by
  design — which means a visitor whose submission fails has no way to reach you. Test the form
  on every deploy, and keep the Netlify notification pointed at an inbox someone reads.

### Sending somewhere else instead

Everything is in one place at the top of `src/components/sections/ContactForm.tsx`:

```ts
const MODE: Mode = 'netlify'   // change to 'json'
const ENDPOINT = MODE === 'netlify' ? '/' : '/api/contact'
```

Set `MODE` to `'json'` and point `ENDPOINT` at your own API, a serverless function, or a
form service. The component then POSTs `application/json` instead of form-encoded data.
No other file needs to change.

---

## Before going live — checklist

Search the project for `TODO(` to find every one of these in place.

**Content that is still placeholder:**

- [ ] `src/data/team.ts` — **every team member is named "Placeholder Name".** Replace with
      real people. Cards fall back to a monogram avatar until you add `photo` paths
      (put image files in `public/team/`).
- [ ] `src/data/projects.ts` — replace the placeholder case studies with delivered
      engagements, and the `metrics` values (currently `"Example"`) with figures you can
      evidence. Get client permission before naming anyone.
- [ ] `src/data/site.ts` — real `url` and social profile links.
- [ ] Set the Netlify form notifications for **all three** of `contact`, `careers` and `apply` (see
      "Delivering submissions to an inbox" above; the address is in `DEPLOYMENT.local.md`).
      **The site publishes no email address** — these forms are the only way to reach IUNGO,
      so an unconfigured notification means enquiries go nowhere a person will see.

**Setup:**

- [ ] Point `site.url` at the live domain (drives canonical URLs and structured data).
- [ ] Update the domain in `public/robots.txt` and `public/sitemap.xml`.
- [ ] Add a 1200×630 share image at `public/og-image.png` (referenced by `Seo.tsx`).
- [ ] Replace `public/favicon.svg` and the wordmark in `src/components/ui/Logo.tsx` with the
      official IUNGO vector logo, if you have the source file.
- [ ] Add real Privacy and Terms pages — the footer currently links both to `/contact`.
- [ ] Enable Netlify form detection and add the email notification (above).

---

## Notes on the build

**SEO.** Page titles and meta descriptions are rendered per-route by `src/components/Seo.tsx`
and hoisted into `<head>` by React 19 — no helmet library. Because this is a single-page app,
those tags are applied client-side. Google renders JavaScript and will see them; some other
crawlers and link-preview scrapers will not. If that matters, turn on Netlify's prerendering
(*Site configuration → Build & deploy → Prerendering*), or move to a prerender step. The
defaults baked into `index.html` are what a non-JS crawler sees today.

**Accessibility.** Skip link, visible focus rings, labelled form fields with errors wired
through `aria-describedby`, `aria-expanded` on the navigation menus, and `prefers-reduced-motion`
honoured throughout — every animation either stops or renders in its final state, so no
content depends on motion to be visible.

**Performance.** Routes are code-split with `React.lazy`; the home page ships in the main
bundle since that is where most visitors land. The hero particle canvas caps its particle
count, clamps device pixel ratio to 2, and stops its render loop entirely when scrolled out
of view. Icons are inline SVG rather than an icon package.

**The globe** on the About, Team and home pages is a stylised diagram, not a map projection —
node positions in `team.ts` are hand-placed for legibility. The location list beside it is
what carries the actual information.
