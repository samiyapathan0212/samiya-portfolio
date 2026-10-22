import { ArrowLeft, ArrowRight, ExternalLink, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FlowDiagram } from '../components/diagrams/FlowDiagram'
import { WapeChart } from '../components/diagrams/WapeChart'
import { BrowserFrame } from '../components/ui/BrowserFrame'
import { ExtLink } from '../components/ui/ExtLink'
import { GitHubIcon } from '../components/ui/Icons'
import { Reveal } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { TagList } from '../components/ui/Tag'
import { caseStudyProjects, getProject } from '../content/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'

const textLink =
  'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent'

function Block({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <Reveal>
      <section aria-labelledby={id} className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-12">
        <h2 id={id} className="font-serif text-2xl font-medium tracking-tight lg:col-span-4">
          {label}
        </h2>
        <div className="lg:col-span-8">{children}</div>
      </section>
    </Reveal>
  )
}

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="max-w-2xl space-y-4 text-ink/90">
    {items.map((p) => (
      <p key={p}>{p}</p>
    ))}
  </div>
)

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="max-w-2xl list-disc space-y-2 pl-5 text-ink/90 marker:text-accent">
    {items.map((p) => (
      <li key={p}>{p}</li>
    ))}
  </ul>
)

function hostOf(url?: string) {
  try {
    return url ? new URL(url).host : ''
  } catch {
    return ''
  }
}

export default function CaseStudyPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const cs = project?.caseStudy

  usePageMeta(
    project && cs ? `${project.title} case study — Samiya Pathan` : 'Case study not found — Samiya Pathan',
    project && cs ? `${project.title}: ${cs.tagline}` : 'This case study does not exist.',
  )

  if (!project || !cs) return <NotFound />

  const i = caseStudyProjects.findIndex((p) => p.slug === project.slug)
  const next = caseStudyProjects[(i + 1) % caseStudyProjects.length]

  return (
    <article className="container-x py-12 sm:py-16">
      <Link to="/#projects" className={textLink}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {project.category} · {project.kind}
        </p>
        <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-4 text-xl text-muted">{cs.tagline}</p>
        <div className="mt-6">
          <TagList items={project.tech} label={`${project.title} technologies`} />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6">
          {project.links.live && (
            <ExtLink href={project.links.live} className={textLink}>
              {project.slug === 'uniast' ? 'Live Demo' : 'Live demo'} <ExternalLink className="size-4" aria-hidden="true" />
            </ExtLink>
          )}
          {project.links.repo && (
            <ExtLink href={project.links.repo} className={textLink}>
              <GitHubIcon className="size-4" /> {project.slug === 'uniast' ? 'View Source' : 'GitHub'}
            </ExtLink>
          )}
          {project.links.api && (
            <ExtLink href={project.links.api} className={textLink}>
              {project.slug === 'uniast' ? 'Backend API' : 'API'} <ExternalLink className="size-4" aria-hidden="true" />
            </ExtLink>
          )}
        </div>
      </header>

      {cs.notice && (
        <aside
          aria-labelledby="notice-title"
          className="mt-10 rounded-xl border border-line-strong bg-surface p-5 sm:p-6"
        >
          <h2 id="notice-title" className="flex items-center gap-2 font-medium text-ink">
            <TriangleAlert className="size-4 text-accent" aria-hidden="true" />
            {cs.notice.title}
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
            {cs.notice.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </aside>
      )}

      {cs.metrics.length > 0 && (
        <Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-bg p-5">
                <dd className="font-mono text-2xl text-ink">{m.value}</dd>
                <dt className="mt-1 text-sm text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
          {cs.metricsNote && <p className="mt-3 text-sm text-muted">{cs.metricsNote}</p>}
        </Reveal>
      )}

      <div className="mt-12">
        <Block id="cs-overview" label="Overview">
          <Paragraphs items={cs.overview} />
        </Block>
        <Block id="cs-problem" label="The problem">
          <Paragraphs items={cs.problem} />
        </Block>
        <Block id="cs-contribution" label="What I built">
          <Paragraphs items={cs.contribution} />
        </Block>
        <Block id="cs-features" label="Key features">
          <Bullets items={cs.features} />
        </Block>

        <Block id="cs-architecture" label="Architecture">
          <FlowDiagram
            stages={cs.architecture.stages}
            columns={cs.architecture.columns}
            caption={cs.architecture.caption}
            label={`${project.title} architecture`}
          />
        </Block>

        {cs.showWapeChart && (
          <Block id="cs-wape" label="Baseline vs model">
            <WapeChart />
          </Block>
        )}

        {cs.gallery.length > 0 && (
          <Block id="cs-gallery" label="Screenshots">
            <div className="space-y-8">
              {cs.gallery.map((img) => (
                <figure key={img.src}>
                  <BrowserFrame address={hostOf(project.links.live)}>
                    <SmartImage image={img} sizes="(min-width: 1024px) 760px, 92vw" />
                  </BrowserFrame>
                  <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Block>
        )}

      {project.slug === 'uniast' && (
        <aside className="mt-10 border-l-2 border-accent bg-surface px-5 py-4 text-sm text-muted">
          No genuine UniAST screenshots were included in the portfolio repository. Useful additions would be the image inspection and ROI selection screens, a kinetics chart with its reference baseline, and the research session or calibration view.
        </aside>
      )}

        <Block id="cs-decisions" label="Key decisions">
          <dl className="max-w-2xl space-y-5">
            {cs.decisions.map((d) => (
              <div key={d.title}>
                <dt className="font-medium text-ink">{d.title}</dt>
                <dd className="mt-1 text-ink/90">{d.body}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="cs-challenges" label="Challenges">
          <dl className="max-w-2xl space-y-5">
            {cs.challenges.map((c) => (
              <div key={c.challenge}>
                <dt className="font-medium text-ink">{c.challenge}</dt>
                <dd className="mt-1 text-ink/90">{c.solution}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="cs-limitations" label="Limitations">
          <Bullets items={cs.limitations} />
        </Block>
        <Block id="cs-lessons" label="What I learned">
          <Bullets items={cs.lessons} />
        </Block>
        <Block id="cs-next" label="What's next">
          <Bullets items={cs.next} />
        </Block>
      </div>

      <nav aria-label="Next case study" className="mt-8 border-t border-line pt-8">
        <Link to={`/projects/${next.slug}`} className="group inline-block">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Next case study</span>
          <span className="mt-1 flex items-center gap-2 font-serif text-3xl font-medium tracking-tight group-hover:text-accent">
            {next.title}
            <ArrowRight className="size-6" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  )
}
