import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/ui/ButtonLink'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found — Samiya Pathan', 'This page does not exist. Return to the portfolio home page.')
  return (
    <section className="container-x flex min-h-[60dvh] flex-col items-start justify-center py-24" aria-labelledby="nf-title">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 id="nf-title" className="mt-3 font-serif text-5xl font-medium tracking-tight sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/" variant="primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </ButtonLink>
        <ButtonLink to="/#projects">View projects</ButtonLink>
      </div>
    </section>
  )
}
