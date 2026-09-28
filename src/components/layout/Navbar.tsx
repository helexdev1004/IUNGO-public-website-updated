import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/ui/Logo'
import { nav } from '@/data/site'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()

  /* Swap to the solid glass treatment once the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Any navigation closes whatever is open. */
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  /* A small grace period stops the dropdown snapping shut as the pointer
     travels from the trigger down into the panel. */
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
      isActive ? 'text-white' : 'text-mist hover:text-frost',
    )

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-400',
          scrolled
            ? 'border-b border-white/[0.07] bg-void/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-18 items-center gap-6 py-3">
          <Link to="/" className="group mr-auto shrink-0" aria-label="IUNGO Technology — home">
            <Logo />
          </Link>

          {/* ---- Desktop navigation ---------------------------------- */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMenu(item.label)
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
                      openMenu === item.label ? 'text-white' : 'text-mist hover:text-frost',
                    )}
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      size={15}
                      className={cn(
                        'transition-transform duration-300',
                        openMenu === item.label && 'rotate-180',
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === item.label ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                      >
                        <div className="glass-strong ring-gradient overflow-hidden rounded-2xl p-2 shadow-lift">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="group/item block rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-white/[0.06]"
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="text-[0.9375rem] font-medium text-frost group-hover/item:text-white">
                                  {child.label}
                                </span>
                                <Icon
                                  name="arrowUpRight"
                                  size={15}
                                  className="text-mist-dim opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100 group-hover/item:text-brand-green"
                                />
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-mist-dim">
                                {child.blurb}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={item.href} to={item.href!} className={linkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Button to="/contact" size="sm" withArrow>
              Contact Us
            </Button>
          </div>

          {/* ---- Mobile trigger --------------------------------------- */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="glass flex h-11 w-11 items-center justify-center rounded-xl text-frost transition-colors hover:text-white lg:hidden"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
          </button>
        </Container>
      </header>

      {/* ---- Mobile sheet ------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/96 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-5 pt-24 pb-10 sm:px-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.05, duration: 0.35 }}
                  >
                    {item.children ? (
                      <div className="py-2">
                        <p className="px-4 pb-2 font-mono text-[0.68rem] tracking-[0.22em] text-mist-dim uppercase">
                          {item.label}
                        </p>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block rounded-xl px-4 py-3 text-lg font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={item.href!}
                        className="block rounded-xl px-4 py-3 text-lg font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="mt-8 border-t border-white/[0.07] pt-8"
              >
                <Button to="/contact" size="lg" className="w-full" withArrow>
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
