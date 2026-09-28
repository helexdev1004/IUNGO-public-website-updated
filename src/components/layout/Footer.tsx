import { Link } from 'react-router-dom'

import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { footerNav, site } from '@/data/site'

/* Read once at module load rather than on every render — the copyright year
   does not need to be reactive. */
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-surface">
      {/* Horizon glow along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,rgb(142_214_43/0.45),rgb(41_182_246/0.45),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(41_182_246/0.1),transparent_68%)] blur-3xl"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-8">
          {/* ---- Identity ---------------------------------------------- */}
          <div className="max-w-sm">
            <Link to="/" className="group inline-block" aria-label="IUNGO Technology — home">
              <Logo withDescriptor />
            </Link>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-mist">
              Global AI &amp; software engineering partner. We connect international technology
              talent to build systems that hold up in production.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/40 hover:text-brand-green"
                >
                  <Icon name={social.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* ---- Link columns ------------------------------------------ */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-[0.68rem] tracking-[0.22em] text-mist-dim uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[0.9375rem] text-mist transition-colors duration-200 hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- Contact strip -------------------------------------------- */}
        <div className="mt-14 grid gap-4 border-t border-white/[0.07] pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* The contact form is the only way in — no address to scrape. */}
          <Link
            to="/contact"
            className="group flex items-center gap-3 text-[0.9375rem] text-mist transition-colors hover:text-frost"
          >
            <span className="glass flex h-9 w-9 items-center justify-center rounded-lg text-brand-green">
              <Icon name="mail" size={16} />
            </span>
            Send us a message
            <Icon
              name="arrowRight"
              size={15}
              className="text-mist-dim transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <p className="flex items-center gap-3 text-[0.9375rem] text-mist">
            <span className="glass flex h-9 w-9 items-center justify-center rounded-lg text-brand-blue">
              <Icon name="mapPin" size={16} />
            </span>
            {site.headquartersLine}
          </p>

          <p className="flex items-center gap-3 text-[0.9375rem] text-mist">
            <span className="glass flex h-9 w-9 items-center justify-center rounded-lg text-brand-green">
              <Icon name="clock" size={16} />
            </span>
            US &amp; EU business hours
          </p>
        </div>

        {/* ---- Legal ---------------------------------------------------- */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-sm text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {YEAR} {site.name}. All rights reserved.
          </p>
          {/* TODO(content): link these to real policy pages before launch. */}
          <p className="flex gap-6">
            <Link to="/contact" className="transition-colors hover:text-mist">
              Privacy
            </Link>
            <Link to="/contact" className="transition-colors hover:text-mist">
              Terms
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
