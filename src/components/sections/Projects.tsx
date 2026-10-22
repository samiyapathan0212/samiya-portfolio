import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ExternalLink, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProjects, getProject, moreProjects } from '../../content/projects'
import type { Project } from '../../content/types'
import { cn } from '../../lib/cn'
import { WapeChart } from '../diagrams/WapeChart'
import { BrowserFrame } from '../ui/BrowserFrame'
import { ExtLink } from '../ui/ExtLink'
import { GitHubIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'
import { TagList } from '../ui/Tag'
import { useSpotlight } from '../../hooks/useSpotlight'

const textLink =
  'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent'

/** One-line disclosure shown on every showcase, so the picture never oversells the project. */
const disclosure: Record<string, string> = {
  foresight: 'Synthetic data. The simple baseline (11.80% WAPE) beat the ML model (15.20%), so the baseline ships.',
  shopsphere: 'Demo catalogue on the client; payments are simulated by a sandbox gateway.',
  uniast: 'Research prototype. Clinical accuracy and diagnostic suitability have not been established.',
  'internship-job-portal': 'Demo listings. The admin area has no login yet.',
}

const stageLabel: Record<string, string> = {
  foresight: 'Forecast',
  shopsphere: 'Commerce',
  uniast: 'Research',
  'internship-job-portal': 'Workflow',
}

function hostOf(url?: string): string {
  try {
    return url ? new URL(url).host : ''
  } catch {
    return ''
  }
}

const showcaseId = (slug: string) => `showcase-${slug}`

/* ---------- Connected project navigation ---------- */

function ProjectNav({ active }: { active: string }) {
  const go = (slug: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(showcaseId(slug))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }
  const activeIndex = featuredProjects.findIndex((p) => p.slug === active)

  return (
    <nav
      aria-label="Featured projects"
      className="sticky top-16 z-20 -mx-4 mt-10 border-y border-line bg-bg px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <ol className="relative mx-auto flex max-w-[75rem] items-stretch">
        {featuredProjects.map((project, i) => {
          const isActive = project.slug === active
          const done = i < activeIndex
          return (
            <li key={project.slug} className={cn('flex min-w-0 items-center', isActive ? 'flex-[3] sm:flex-1' : 'flex-none sm:flex-1')}>
              <button
                type="button"
                onClick={() => go(project.slug)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'flex min-h-14 w-full min-w-0 items-center gap-3 py-2 text-left transition-colors duration-200',
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full border font-mono text-[0.7rem] transition-colors duration-200',
                    isActive
                      ? 'border-accent bg-accent text-accent-ink'
                      : done
                        ? 'border-accent text-accent'
                        : 'border-line-strong',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:block">
                    {stageLabel[project.slug]}
                  </span>
                  <span className={cn('truncate text-sm font-medium', isActive ? 'block' : 'hidden sm:block')}>{project.title.replace('Internship & ', '')}</span>
                </span>
              </button>
              {i < featuredProjects.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'mx-2 h-px w-4 shrink-0 transition-colors duration-300 sm:w-full sm:max-w-24',
                    i < activeIndex ? 'bg-accent' : 'bg-line-strong',
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ---------- Showcase shell ---------- */

function Showcase({ project, index, children }: { project: Project; index: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const depth = useTransform(scrollYProgress, [0, 1], [28, -28])
  const number = String(index + 1).padStart(2, '0')
  const note = disclosure[project.slug]
  return (
    <article
      ref={ref}
      id={showcaseId(project.slug)}
      aria-labelledby={`${project.slug}-title`}
      className="scroll-mt-36 py-16 sm:py-24"
    >
      <Reveal>
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">{number}</span> · {project.category} · {project.kind}
            </p>
            <h3
              id={`${project.slug}-title`}
              className="mt-3 font-serif text-[clamp(3.25rem,10vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.03em]"
            >
              {project.title}
            </h3>
          </div>
          <p aria-hidden="true" className="outline-num hidden text-right font-serif text-[10rem] leading-none lg:col-span-3 lg:block">
            {number}
          </p>
        </div>
        <p className="mt-4 max-w-2xl text-xl text-muted">{project.subtitle}</p>
      </Reveal>

      <motion.div className="mt-10" style={{ y: reduce ? 0 : depth }}>{children}</motion.div>

      <Reveal>
        <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg text-ink/90">{project.summary}</p>
            {note && (
              <p className="mt-5 flex max-w-xl items-start gap-2 text-sm text-muted">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {note}
              </p>
            )}
          </div>
          <div className="lg:col-span-6">
            <dl className="grid grid-cols-3 gap-4">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-mono text-3xl text-ink sm:text-4xl">{stat.value}</dd>
                  <dt className="mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <TagList items={project.tech} label={`${project.title} technologies`} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6">
              <Link to={`/projects/${project.slug}`} className={textLink}>
                Read the case study
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {project.links.live && (
                <ExtLink href={project.links.live} className={textLink}>
                  Live demo
                  <ExternalLink className="size-4" aria-hidden="true" />
                </ExtLink>
              )}
              {project.links.repo && (
                <ExtLink href={project.links.repo} className={textLink}>
                  <GitHubIcon className="size-4" />
                  GitHub
                </ExtLink>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  )
}

/** A screenshot in a browser frame that links to the case study and lifts on hover. */
function Shot({
  project,
  image,
  sizes,
  priority,
  className,
}: {
  project: Project
  image: Project['image']
  sizes: string
  priority?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  if (!image) return null
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`Open the ${project.title} case study`}
      className={cn('group block rounded-xl', className)}
    >
      <motion.div
        initial={reduce ? false : { clipPath: 'inset(12% 9% 12% 9% round 10px)', scale: 0.94 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 10px)', scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="origin-center"
      >
        <BrowserFrame address={hostOf(project.links.live)} className="hover-lift group-hover:border-accent">
          <SmartImage image={image} sizes={sizes} priority={priority} className="transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
        </BrowserFrame>
      </motion.div>
    </Link>
  )
}

/* ---------- Three art-directed compositions ---------- */

function ForesightVisuals({ project }: { project: Project }) {
  return (
    <Reveal>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <Shot project={project} image={project.image} sizes="(min-width: 1024px) 820px, 92vw" className="lg:col-span-8" />
        <div className="lg:col-span-4 lg:mb-[-2rem]">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">The result that mattered</p>
          <WapeChart />
        </div>
      </div>
    </Reveal>
  )
}

function ShopsphereVisuals({ project }: { project: Project }) {
  const cs = project.caseStudy
  const second = cs?.gallery[1]
  return (
    <Reveal>
      <div className="relative">
        <Shot project={project} image={project.image} sizes="(min-width: 1024px) 900px, 92vw" className="lg:w-[78%]" />
        {second && (
          <div className="mt-6 lg:absolute lg:-bottom-12 lg:right-0 lg:mt-0 lg:w-[48%]">
            <Shot project={project} image={second} sizes="(min-width: 1024px) 520px, 92vw" />
          </div>
        )}
      </div>
      {second && <div className="hidden lg:block lg:h-12" aria-hidden="true" />}
    </Reveal>
  )
}

function JobPortalVisuals({ project }: { project: Project }) {
  const gallery = project.caseStudy?.gallery ?? []
  const [listings, admin] = [gallery[1], gallery[2]]
  return (
    <Reveal>
      <div className="grid gap-6 md:grid-cols-12">
        <Shot project={project} image={project.image} sizes="(min-width: 768px) 560px, 92vw" className="md:col-span-7" />
        <div className="grid gap-6 md:col-span-5 md:mt-16">
          <Shot project={project} image={listings} sizes="(min-width: 768px) 420px, 92vw" />
          <Shot project={project} image={admin} sizes="(min-width: 768px) 420px, 92vw" className="md:ml-8" />
        </div>
      </div>
    </Reveal>
  )
}

/** An explanatory workflow illustration, deliberately not presented as an app screenshot. */
function UniASTVisuals() {
  return (
    <Reveal>
      <figure className="overflow-hidden border-y border-line bg-[var(--surface)] px-5 py-8 sm:px-10 sm:py-12">
        <figcaption className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Workflow illustration · not an application screenshot</figcaption>
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {['01 / Image', '02 / ROI', '03 / Session'].map((label, i) => (
              <div key={label} className="relative flex aspect-square flex-col justify-between border border-line bg-bg p-3 sm:p-5">
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-accent">{label}</span>
                {i === 0 ? <span className="mx-auto grid size-12 place-items-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs text-accent">IMG</span> : null}
                {i === 1 ? <span className="mx-auto size-12 border-2 border-dashed border-accent" /> : null}
                {i === 2 ? <span className="mx-auto grid size-12 place-items-center border border-line font-mono text-lg">↗</span> : null}
              </div>
            ))}
          </div>
          <div className="border border-line bg-bg p-4 sm:p-6">
            <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wider text-muted"><span>Kinetic response</span><span>Illustrative only</span></div>
            <svg viewBox="0 0 620 190" role="img" aria-label="Illustrative kinetic curve and reference baseline, not measured study data" className="mt-4 w-full overflow-visible">
              <path d="M20 28H600M20 72H600M20 116H600M20 160H600" stroke="var(--border)" strokeDasharray="3 7" />
              <path d="M20 124 C120 123 150 120 215 111 S318 87 372 73 S458 55 600 52" fill="none" stroke="var(--accent)" strokeWidth="4" />
              <path d="M20 102H600" fill="none" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="8 8" />
              <text x="22" y="183" fill="var(--muted)" fontSize="11" fontFamily="monospace">TIME →</text>
            </svg>
            <div className="mt-2 flex gap-5 font-mono text-[0.6rem] uppercase tracking-wider text-muted"><span><i className="mr-2 inline-block size-2 rounded-full bg-accent" />measurement trace</span><span><i className="mr-2 inline-block size-2 rounded-full bg-line-strong" />reference</span></div>
          </div>
        </div>
      </figure>
    </Reveal>
  )
}

const visuals: Record<string, (p: { project: Project }) => ReactNode> = {
  foresight: ForesightVisuals,
  shopsphere: ShopsphereVisuals,
  'internship-job-portal': JobPortalVisuals,
  uniast: UniASTVisuals,
}

/* ---------- Casebook: art-directed analytics bento ---------- */

const bento: Record<string, string> = {
  'fitness-tracker-analysis': 'lg:col-span-4',
  'cognifyz-restaurant-analysis': 'lg:col-span-2',
  'superstore-sales-analytics': 'lg:col-span-2',
  'hr-attrition-dashboard': 'lg:col-span-2',
  'customer-shopping-behaviour': 'lg:col-span-2',
  'itunes-sql-analysis': 'lg:col-span-3',
  'video-game-market-intelligence': 'lg:col-span-3',
}

const bentoOrder = [
  'fitness-tracker-analysis',
  'cognifyz-restaurant-analysis',
  'superstore-sales-analytics',
  'hr-attrition-dashboard',
  'customer-shopping-behaviour',
  'itunes-sql-analysis',
  'video-game-market-intelligence',
]

const bigWord: Record<string, string> = {
  'customer-shopping-behaviour': 'SQL',
  'itunes-sql-analysis': 'MySQL',
  'video-game-market-intelligence': 'Py → SQL → BI',
}

function Tile({ project, number }: { project: Project; number: string }) {
  const lead = project.stats[0]
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent sm:p-8',
        bento[project.slug],
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{number}</span> · {project.category}
        </p>
        <p className="shrink-0 text-right font-mono text-xs text-muted">{project.kind.split(' · ')[0]}</p>
      </div>

      <div className={cn(project.image && 'lg:grid lg:grid-cols-2 lg:items-start lg:gap-8')}>
        <div>
      {lead ? (
        <p className="mt-8 font-mono text-5xl leading-none tracking-tight text-ink sm:text-6xl">
          {lead.value}
          <span className="mt-2 block font-sans text-sm tracking-normal text-muted">{lead.label}</span>
        </p>
      ) : (
        <p className="mt-8 font-serif text-5xl leading-none text-ink sm:text-6xl">{bigWord[project.slug] ?? project.tech[0]}</p>
      )}

      <h4 id={`${project.slug}-title`} className="mt-6 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
        {project.title}
      </h4>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      <p className="mt-4 text-sm text-ink/90">{project.summary}</p>

        </div>
      {project.image && (
        <figure className="mt-6 overflow-hidden rounded-lg border border-line lg:mt-0">
          <SmartImage image={project.image} sizes="(min-width: 1024px) 720px, 92vw" className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
          <figcaption className="border-t border-line bg-surface-2 px-3 py-2 text-xs text-muted">
            {project.image.caption}
          </figcaption>
        </figure>
      )}

      </div>

      <div className="mt-auto pt-6">
        <TagList items={project.tech} label={`${project.title} technologies`} />
        <div className="mt-3">
          {project.links.repo ? (
            <ExtLink href={project.links.repo} className={textLink}>
              <GitHubIcon className="size-4" />
              Source on GitHub
            </ExtLink>
          ) : (
            <p className="font-mono text-xs text-muted">Notebook not published</p>
          )}
        </div>
      </div>
    </article>
  )
}

function Casebook() {
  const ordered = bentoOrder.map((slug) => moreProjects.find((p) => p.slug === slug)).filter((p): p is Project => !!p)
  return (
    <div className="border-t border-line pb-6 pt-20 sm:pt-28">
      <Reveal>
        <div className="grid items-end gap-4 lg:grid-cols-12">
          <h3 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-tight lg:col-span-7">
            The analytics casebook
          </h3>
          <p className="max-w-md text-muted lg:col-span-5 lg:ml-auto">
            Smaller projects from internships and independent study: Python analysis, SQL, and Power BI dashboards.
          </p>
        </div>
      </Reveal>
      <ul className="mt-12 grid gap-4 lg:grid-cols-6">
        {ordered.map((project, i) => (
          <li key={project.slug} className={cn('flex', bento[project.slug])}>
            <Reveal className="flex w-full">
              <Tile project={project} number={String(i + 4).padStart(2, '0')} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Section ---------- */

export function Projects() {
  const [active, setActive] = useState(featuredProjects[0]?.slug ?? '')
  const spotlightRef = useSpotlight<HTMLElement>()

  useEffect(() => {
    const targets = featuredProjects
      .map((p) => document.getElementById(showcaseId(p.slug)))
      .filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top) setActive(top.target.id.replace('showcase-', ''))
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.1, 0.5] },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={spotlightRef} id="projects" aria-labelledby="projects-title" className="stage spotlight-zone scroll-mt-16 border-t border-line pt-20 sm:pt-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="projects-title"
            index="01"
            eyebrow="Selected work"
            title="Forecasts, platforms, research"
            description="Four featured builds, from demand intelligence to a smartphone-based research workflow. Each case study is clear about its evidence and limits."
          />
        </Reveal>

        <ProjectNav active={active} />

        <div className="divide-y divide-line">
          {featuredProjects.map((project, index) => {
            const Visuals = visuals[project.slug]
            const p = getProject(project.slug) ?? project
            return (
              <Showcase key={p.slug} project={p} index={index}>
                {Visuals && <Visuals project={p} />}
              </Showcase>
            )
          })}
        </div>

        <Casebook />
      </div>
    </section>
  )
}
