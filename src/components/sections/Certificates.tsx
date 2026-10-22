import { Maximize2 } from 'lucide-react'
import { certificateGroups, certificates } from '../../content/certificates'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface CertificatesProps {
  onOpen: (id: string) => void
}

export function Certificates({ onOpen }: CertificatesProps) {
  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="certificates-title"
            index="04"
            eyebrow="Credentials"
            title="Certificates"
            description="Each certificate is shown as issued. Open one to see it full size, with its credential number and a link to verify it where the issuer offers one."
          />
        </Reveal>

        <div className="mt-14 space-y-14">
          {certificateGroups.map((group) => {
            const items = certificates.filter((c) => c.group === group)
            return (
              <section key={group} aria-labelledby={`cert-group-${group}`}>
                <h3
                  id={`cert-group-${group}`}
                  className="flex items-baseline border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted"
                >
                  {group}
                  <span className="ml-3 text-accent">{String(items.length).padStart(2, '0')}</span>
                </h3>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((cert, index) => (
                    <li key={cert.id}>
                      <Reveal className="h-full" delay={index * 0.055}>
                        <button
                          type="button"
                          onClick={() => onOpen(cert.id)}
                          aria-label={`View certificate: ${cert.title}, ${cert.issuer}`}
                          className="certificate-tile group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg text-left transition-colors duration-200 hover:border-accent"
                        >
                          <span className="relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-surface-2">
                            <img
                              src={cert.image}
                              width={cert.width}
                              height={cert.height}
                              alt={cert.alt}
                              loading="lazy"
                              decoding="async"
                              className="size-full object-contain p-3 drop-shadow-md"
                            />
                            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-ink opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                              <Maximize2 className="size-3" aria-hidden="true" />
                              View
                            </span>
                          </span>
                          <span className="flex flex-1 flex-col p-4">
                            <span className="font-serif text-xl font-medium leading-snug text-ink">{cert.title}</span>
                            <span className="mt-0.5 text-sm text-muted">{cert.issuer}</span>
                            <span className="mt-2 font-mono text-xs text-muted">{cert.dateText}</span>
                          </span>
                        </button>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
