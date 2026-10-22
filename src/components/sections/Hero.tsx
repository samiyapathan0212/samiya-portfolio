import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight, FileText, Mail } from 'lucide-react'
import { images } from '../../content/projects'
import { site } from '../../content/site'
import { BrowserFrame } from '../ui/BrowserFrame'
import { ButtonLink } from '../ui/ButtonLink'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

const facts = [
  { value: '36,550', label: 'daily sales records forecast in FORESIGHT' },
  { value: '11.80%', label: 'WAPE of the simple baseline that beat the ML model' },
  { value: '111', label: 'automated backend tests in ShopSphere' },
  { value: '9,551', label: 'restaurant records analysed at Cognifyz' },
]

const pipeline = ['Data', 'Forecast', 'Product']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.002 })
  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="relative scroll-mt-24 overflow-hidden pt-10 sm:pt-14">
      {/* Faint measurement grid: the "data" half of the identity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <svg aria-hidden="true" viewBox="0 0 120 720" preserveAspectRatio="none" className="pointer-events-none absolute right-[4%] top-0 hidden h-full w-20 overflow-visible opacity-70 lg:block">
        <path d="M90 0 C90 90 24 105 24 190 S102 290 74 370 S12 490 42 560 S91 650 48 720" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 7" />
        <motion.path d="M90 0 C90 90 24 105 24 190 S102 290 74 370 S12 490 42 560 S91 650 48 720" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={{ pathLength: reduceMotion ? 1 : lineProgress }} />
      </svg>

      <div className="container-x relative">
        <Reveal>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            {site.role}
            <span aria-hidden="true" className="hidden h-px w-16 bg-accent sm:block" />
            <span className="text-muted">{site.location}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-serif text-[clamp(4.25rem,20vw,15rem)] font-medium leading-[0.82] tracking-[-0.04em]"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>Samiya</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em] italic lg:pl-[1.2em]">
              <motion.span className="block" initial={reduceMotion ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}>Pathan</motion.span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:mt-0 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 lg:pt-10">
            <Reveal delay={0.08}>
              <p className="max-w-md font-serif text-2xl leading-snug sm:text-3xl">
                I turn raw data into forecasts, and forecasts into software people can use.
              </p>
              <ol aria-label="How I work" className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {pipeline.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    {step}
                    {i < pipeline.length - 1 && <span aria-hidden="true" className="h-px w-8 bg-accent" />}
                  </li>
                ))}
              </ol>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink to={{ pathname: '/', hash: '#projects' }} variant="primary">
                  Explore Projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={site.resume} variant="secondary">
                  <FileText className="size-4" aria-hidden="true" />
                  View Resume
                </ButtonLink>
                <ButtonLink to={{ pathname: '/', hash: '#contact' }} variant="ghost">
                  <Mail className="size-4" aria-hidden="true" />
                  Contact Me
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <figure className="relative pb-16 sm:pb-24 lg:mt-4">
                <div className="lg:ml-auto lg:w-[98%]">
                  <BrowserFrame address="foresight-analytics-ai.streamlit.app" className="shadow-card">
                    <SmartImage image={images.foresightHome} sizes="(min-width: 1024px) 640px, 92vw" priority />
                  </BrowserFrame>
                </div>
                <div className="absolute bottom-0 left-0 w-[68%] sm:w-[58%]">
                  <BrowserFrame address="shopsphere-frontend-kfka.onrender.com" className="shadow-card">
                    <SmartImage image={images.shopsphereHero} sizes="(min-width: 1024px) 340px, 50vw" />
                  </BrowserFrame>
                </div>
                <div className="absolute bottom-0 right-0 hidden w-[40%] sm:block">
                  <BrowserFrame address="internship-job-portal-nf21.onrender.com" className="shadow-card">
                    <SmartImage image={images.jobPortalHero} sizes="220px" />
                  </BrowserFrame>
                </div>
                <figcaption className="sr-only">
                  Screenshots of three live projects: FORESIGHT, ShopSphere and the Internship Job Portal.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="container-x relative mt-6 sm:mt-10">
        <dl className="grid grid-cols-2 border-y border-line bg-bg/70 backdrop-blur-0 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.value}
              className={`py-6 pr-4 ${index > 0 ? 'lg:border-l lg:pl-6 lg:border-line' : ''} ${index % 2 === 1 ? 'border-l border-line pl-4 lg:pl-6' : ''} ${index > 1 ? 'border-t border-line lg:border-t-0' : ''}`}
            >
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block font-mono text-2xl text-ink sm:text-3xl">{fact.value}</span>
                <span className="mt-1 block text-sm text-muted">{fact.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <a
          href="#projects"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-ink"
        >
          Scroll to work
          <motion.span aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }} className="grid size-5 place-items-center rounded-full border border-line-strong"><ArrowDown className="size-3" /></motion.span>
        </a>
      </div>
    </section>
  )
}
