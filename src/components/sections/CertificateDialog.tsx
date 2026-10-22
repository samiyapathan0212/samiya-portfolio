import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { certificates } from '../../content/certificates'
import { ExtLink } from '../ui/ExtLink'

interface CertificateDialogProps {
  /** Id of the certificate to show, or null when closed. */
  openId: string | null
  onChange: (id: string | null) => void
}

const navButton =
  'inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink'

/** Native <dialog>: focus is trapped, Escape closes it, and focus returns to the trigger. */
export function CertificateDialog({ openId, onChange }: CertificateDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const index = certificates.findIndex((c) => c.id === openId)
  const cert = index >= 0 ? certificates[index] : undefined

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (openId && !dialog.open) dialog.showModal()
    if (!openId && dialog.open) dialog.close()
  }, [openId])

  useEffect(() => {
    if (!openId) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [openId])

  const step = (delta: number) => {
    const next = certificates[(index + delta + certificates.length) % certificates.length]
    if (next) onChange(next.id)
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="certificate-dialog-title"
      onClose={() => onChange(null)}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> element itself.
        if (event.target === ref.current) ref.current?.close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-card"
    >
      {cert && (
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line p-4 sm:p-5">
            <div className="min-w-0">
              <h3 id="certificate-dialog-title" className="font-serif text-xl font-medium tracking-tight sm:text-2xl">
                {cert.title}
              </h3>
              <p className="text-sm text-muted">
                {cert.issuer} · {cert.dateText}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close certificate viewer"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-line-strong text-ink transition-colors duration-200 hover:border-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-surface-2 p-3 sm:p-5">
            <img
              key={cert.id}
              src={cert.image}
              width={cert.width}
              height={cert.height}
              alt={cert.alt}
              className="mx-auto block h-auto max-h-[62dvh] w-auto max-w-full rounded-md border border-line bg-white object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-4 sm:p-5">
            <div className="min-w-0 space-y-1 text-sm">
              {cert.credential && (
                <p>
                  <span className="text-muted">{cert.credential.label}: </span>
                  <span className="font-mono text-ink">{cert.credential.value}</span>
                </p>
              )}
              {cert.note && <p className="max-w-xl text-muted">{cert.note}</p>}
              {cert.verifyUrl && (
                <p>
                  <ExtLink
                    href={cert.verifyUrl}
                    className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                  >
                    {cert.verifyLabel ?? 'Verify online'}
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </ExtLink>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step(-1)} className={navButton} aria-label="Previous certificate">
                <ChevronLeft className="size-4" aria-hidden="true" />
                Prev
              </button>
              <span className="font-mono text-xs text-muted" aria-live="polite">
                {index + 1} / {certificates.length}
              </span>
              <button type="button" onClick={() => step(1)} className={navButton} aria-label="Next certificate">
                Next
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
