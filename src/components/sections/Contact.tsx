import { useState } from 'react'
import { ArrowUpRight, Check, Copy, FileDown, MapPin } from 'lucide-react'
import { site } from '../../content/site'
import { GitHubIcon, LinkedInIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type CopyState = 'idle' | 'copied' | 'error'

export function Contact() {
  const [copy, setCopy] = useState<CopyState>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopy('copied')
    } catch {
      setCopy('error')
    }
    window.setTimeout(() => setCopy('idle'), 2500)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="contact-title"
            index="06"
            eyebrow="Contact"
            title="Let's build something that holds up"
            description="I'm open to data analyst, business analyst, entry-level data engineering, software engineer and full-stack roles. Email is the quickest way to reach me."
          />

          <a
            href={`mailto:${site.email}`}
            className="group mt-12 flex items-end justify-between gap-6 border-b border-line-strong pb-6 transition-colors duration-300 hover:border-accent"
          >
            <span className="min-w-0 break-words font-serif text-[clamp(1.15rem,5.1vw,5rem)] leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
              {site.email}
            </span>
            <ArrowUpRight
              className="size-8 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none sm:size-12"
              aria-hidden="true"
            />
            <span className="sr-only">Email me</span>
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-strong bg-bg px-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink"
            >
              {copy === 'copied' ? (
                <Check className="size-4 text-ok" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              Copy address
            </button>
            <span className="font-mono text-sm text-muted" role="status" aria-live="polite">
              {copy === 'copied' && 'Copied to clipboard'}
              {copy === 'error' && `Copy failed — ${site.email}`}
            </span>
          </div>

          <ul className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            <li className="bg-bg">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-surface-2"
              >
                <LinkedInIcon className="size-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">LinkedIn</span>
                  <span className="block truncate text-ink">samiya-pathan</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="bg-bg">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-surface-2"
              >
                <GitHubIcon className="size-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">GitHub</span>
                  <span className="block truncate text-ink">samiyapathan0212</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="bg-bg">
              <a
                href={site.resume}
                download=""
                className="flex min-h-16 items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-surface-2"
              >
                <FileDown className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Resume</span>
                  <span className="block truncate text-ink">Download PDF</span>
                </span>
              </a>
            </li>
          </ul>

          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <MapPin className="size-4" aria-hidden="true" />
            {site.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
