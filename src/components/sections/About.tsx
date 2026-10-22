import { GraduationCap } from 'lucide-react'
import { site } from '../../content/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Tag } from '../ui/Tag'

const targetRoles = ['Data Analyst', 'Business Analyst', 'Entry-level Data Engineering', 'Software Engineer', 'Full-Stack']

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading id="about-title" index="05" eyebrow="About" title="Evidence first" />
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink/90">
              <p>
                I'm a Computer Science Engineering student in {site.location.split(',')[0]} who works across data
                analytics and software engineering. I like questions where the answer has to be defended with
                evidence, which is why FORESIGHT ships the simple baseline that beat my gradient-boosting model
                instead of the more impressive-sounding one.
              </p>
              <p>
                On the analytics side that means cleaning messy data, validating it over time rather than at random,
                and turning findings into dashboards people can use. On the engineering side it means building the
                application around the analysis: APIs, databases, tests and deployment.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={0.05}>
            <section aria-labelledby="education-title" className="rounded-xl border border-line bg-surface p-6">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <GraduationCap className="size-4 text-accent" aria-hidden="true" />
                <span id="education-title">Education</span>
              </p>
              <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight">
                B.Tech — Computer Science Engineering
              </h3>
              <p className="mt-1 text-muted">Walchand Institute of Technology, Solapur</p>
              <p className="mt-5 border-t border-line pt-4">
                <span className="font-mono text-3xl text-ink">9.35</span>
                <span className="font-mono text-muted"> / 10</span>
                <span className="ml-3 text-sm text-muted">CGPA</span>
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section aria-labelledby="roles-title" className="rounded-xl border border-line bg-surface p-6">
              <p id="roles-title" className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Looking for roles in
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-labelledby="roles-title">
                {targetRoles.map((role) => (
                  <li key={role}>
                    <Tag className="px-2.5 py-1 text-sm">{role}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
