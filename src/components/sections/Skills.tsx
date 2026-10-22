import { skillGroups } from '../../content/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="skills-title"
            index="03"
            eyebrow="Toolkit"
            title="Skills"
            description="Grouped by what they are used for. No percentage bars: the projects above show how each one is used."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={(index % 2) * 0.05}>
              <section aria-labelledby={`skills-${group.title}`} className="group border-t border-line-strong pt-5 transition-colors duration-200 hover:border-accent">
                <h3 id={`skills-${group.title}`} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-serif text-2xl text-ink sm:text-3xl">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
