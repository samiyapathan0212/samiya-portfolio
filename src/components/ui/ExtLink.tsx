import type { ReactNode } from 'react'

interface ExtLinkProps {
  href: string
  children: ReactNode
  className?: string
  download?: boolean
}

/** External link that opens in a new tab and says so to screen readers. */
export function ExtLink({ href, children, className, download }: ExtLinkProps) {
  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? '' : undefined}
      className={className}
    >
      {children}
      {!download && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
