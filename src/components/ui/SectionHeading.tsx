import { motion, useReducedMotion } from 'framer-motion'

interface SectionHeadingProps {
  id: string
  index: string
  eyebrow: string
  title: string
  description?: string
}

/** Section opening: oversized outlined numeral beside a large serif title. */
export function SectionHeading({ id, index, eyebrow, title, description }: SectionHeadingProps) {
  const reduce = useReducedMotion()
  return (
    <div className="grid items-end gap-6 border-b border-line pb-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true"> / </span>
          <span className="sr-only">, </span>
          {eyebrow}
        </p>
        <motion.h2
          id={id}
          initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-tight"
        >
          {title}
        </motion.h2>
      </div>
      <div className="lg:col-span-4">
        {description && <p className="max-w-md text-muted lg:ml-auto">{description}</p>}
      </div>
    </div>
  )
}

