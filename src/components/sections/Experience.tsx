import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { roles } from '../../content/experience'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TagList } from '../ui/Tag'

interface ExperienceProps {
  onOpenCertificate: (id: string) => void
}

const actionClass =
  'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent'

export function Experience({ onOpenCertificate }: ExperienceProps) {
  const timelineRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 65%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.002 })
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="experience-title"
            index="02"
            eyebrow="Internships"
            title="Experience"
            description="Four internships in data analytics, data science and full-stack development. Dates come from the offer letters and certificates."
          />
        </Reveal>

        <div className="relative mt-14">
          <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-[0.15rem] top-8 w-px bg-line md:left-[1.55rem]">
            <motion.div className="h-full origin-top bg-accent" style={{ scaleY: reduce ? 1 : progress }} />
          </div>
          <ol ref={timelineRef} className="relative divide-y divide-line border-y border-line">
          {roles.map((role, roleIndex) => (
            <li key={role.id}>
              <Reveal delay={reduce ? 0 : roleIndex * 0.055}>
                <article aria-labelledby={`${role.id}-title`} className="grid gap-5 py-12 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-3">
                    <motion.p aria-hidden="true" initial={reduce ? false : { opacity: 0, scale: 0.78, x: -10 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 w-fit bg-surface pr-3 outline-num font-serif text-7xl leading-none md:text-8xl">
                      {String(roleIndex + 1).padStart(2, '0')}
                    </motion.p>
                    <motion.p initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: reduce ? 0 : 0.08 }} className="mt-4 font-mono text-sm text-ink">{role.period}</motion.p>
                    {role.ongoing && (
                      <motion.p initial={reduce ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: reduce ? 0 : 0.16 }} className="mt-2 inline-flex items-center gap-2 rounded-full border border-ok/30 bg-ok/5 px-3 py-1 text-sm font-medium text-ok">
                        <span className="size-2 rounded-full bg-ok" aria-hidden="true" />
                        In progress
                      </motion.p>
                    )}
                    {role.mode && <p className="mt-1 text-sm text-muted">{role.mode}</p>}
                  </div>

                  <div className="md:col-span-9">
                    <motion.h3 id={`${role.id}-title`} initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: reduce ? 0 : 0.08 }} className="font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                      {role.title}
                    </motion.h3>
                    <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 }} className="mt-1 text-xl text-accent">{role.org}</motion.p>

                    <ul className="mt-5 max-w-3xl list-disc space-y-2.5 pl-5 text-ink/90 marker:text-accent">
                      {role.points.map((point, pointIndex) => (
                        <motion.li key={point} initial={reduce ? false : { opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: reduce ? 0 : 0.22 + pointIndex * 0.075 }}>{point}</motion.li>
                      ))}
                    </ul>

                    <div className="mt-5">
                      <TagList items={role.tags} label={`${role.org} technologies`} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-6">
                      {role.projectSlug && (
                        <Link to={`/projects/${role.projectSlug}`} className={actionClass}>
                          {role.projectLabel}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      )}
                      {!role.projectSlug && role.projectLabel && (
                        <Link to={{ pathname: '/', hash: '#projects' }} className={actionClass}>
                          {role.projectLabel}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      )}
                      {role.certificateId && (
                        <button
                          type="button"
                          onClick={() => onOpenCertificate(role.certificateId as string)}
                          className={actionClass}
                        >
                          <Award className="size-4" aria-hidden="true" />
                          View internship certificate
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
