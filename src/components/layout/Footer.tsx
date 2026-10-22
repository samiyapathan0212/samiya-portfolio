import { ArrowUp, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navItems, site } from '../../content/site'
import { ExtLink } from '../ui/ExtLink'
import { GitHubIcon, LinkedInIcon } from '../ui/Icons'

const linkClass =
  'inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink'

const year = new Date().getFullYear()

export function Footer() {

  return (
    <footer className="overflow-hidden border-t border-line bg-surface">
      <p
        aria-hidden="true"
        className="outline-num container-x select-none whitespace-nowrap pt-10 font-serif text-[clamp(3.5rem,15.5vw,13rem)] leading-[0.9] tracking-[-0.04em]"
      >
        Samiya Pathan
      </p>
      <div className="container-x grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-2xl font-medium tracking-tight">{site.name}</p>
          <p className="mt-1 text-muted">{site.role}</p>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Analytics, forecasting and full-stack projects, written up with their limits as well as their results.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to={{ pathname: '/', hash: `#${item.id}` }} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Elsewhere</p>
          <ul className="mt-3">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <ExtLink href={site.linkedin} className={linkClass}>
                <LinkedInIcon className="size-4" />
                LinkedIn
              </ExtLink>
            </li>
            <li>
              <ExtLink href={site.github} className={linkClass}>
                <GitHubIcon className="size-4" />
                GitHub
              </ExtLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-sm text-muted">
            © {year} {site.name}
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              })
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
