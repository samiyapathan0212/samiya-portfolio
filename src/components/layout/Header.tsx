import { useCallback, useEffect, useRef, useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, site } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'
import { Monogram } from '../ui/Icons'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(sectionIds, isHome)
  // The menu is open only for the location it was opened on, so navigating closes it without an effect.
  const here = pathname + hash
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === here
  const setOpen = useCallback((value: boolean | ((v: boolean) => boolean)) => {
    setOpenAt((prev) => {
      const current = prev === here
      const next = typeof value === 'function' ? value(current) : value
      return next ? here : null
    })
  }, [here])
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [setOpen])

  // Close the menu when the viewport grows to the desktop layout.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [setOpen])

  // While open: lock page scroll, close on Escape, and keep Tab inside the menu.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(true)
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [
        toggleRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []),
      ].filter((el): el is HTMLElement => el !== null)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg" style={{ height: 'var(--header-h)' }}>
      <div className="container-x flex h-full items-center justify-between gap-4">
        <Link
          to={{ pathname: '/', hash: '#home' }}
          aria-label={`${site.name} — home`}
          className="flex items-center gap-3 rounded-lg"
        >
          <Monogram />
          <span className="hidden font-serif text-lg font-medium tracking-tight sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isHome && active === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200 hover:text-ink',
                      isActive ? 'text-ink' : 'text-muted',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-accent transition-opacity duration-200',
                        isActive ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <ButtonLink href={site.resume} variant="primary" className="hidden lg:inline-flex">
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line-strong bg-surface text-ink transition-colors duration-200 hover:border-ink lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-30 overflow-y-auto bg-bg lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item) => {
                const isActive = isHome && active === item.id
                return (
                  <li key={item.id}>
                    <Link
                      to={{ pathname: '/', hash: `#${item.id}` }}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex min-h-14 items-center justify-between font-serif text-3xl tracking-tight transition-colors duration-200',
                        isActive ? 'text-accent' : 'text-ink',
                      )}
                    >
                      {item.label}
                      {isActive && <span className="size-2 rounded-full bg-accent" aria-hidden="true" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3 pb-8">
              <ThemeToggle showLabel />
              <ButtonLink href={site.resume} variant="primary">
                <FileText className="size-4" aria-hidden="true" />
                Resume
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
