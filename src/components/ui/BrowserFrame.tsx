import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface BrowserFrameProps {
  /** The real address of the app shown, displayed in the frame's title bar. */
  address: string
  children: ReactNode
  className?: string
}

export function BrowserFrame({ address, children, className }: BrowserFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-surface shadow-card', className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong/60" />
          <span className="size-2 rounded-full bg-line-strong/60" />
          <span className="size-2 rounded-full bg-line-strong/60" />
        </span>
        <span className="min-w-0 truncate font-mono text-[0.7rem] text-muted">{address}</span>
      </div>
      {children}
    </div>
  )
}
