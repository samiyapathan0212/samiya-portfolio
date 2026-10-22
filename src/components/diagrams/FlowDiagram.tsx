import type { FlowStage } from '../../content/types'
import { cn } from '../../lib/cn'

interface FlowDiagramProps {
  stages: FlowStage[]
  columns: 3 | 4
  caption: string
  label: string
}

/* Arrow glyphs between steps are decorative pseudo-content; the ordered list carries the meaning. */
const arrowClasses =
  "relative after:absolute after:left-1/2 after:top-full after:z-10 after:-translate-x-1/2 after:py-0.5 after:text-lg after:leading-none after:text-accent after:content-['↓'] last:after:hidden " +
  'lg:after:left-full lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:px-1 lg:after:py-0 lg:after:content-[\'→\']'

const hideEndOfRow: Record<3 | 4, string> = {
  3: 'lg:[&:nth-child(3n)]:after:hidden',
  4: 'lg:[&:nth-child(4n)]:after:hidden',
}

export function FlowDiagram({ stages, columns, caption, label }: FlowDiagramProps) {
  return (
    <figure>
      <ol
        aria-label={label}
        className={cn(
          'grid list-none gap-6 lg:gap-x-8',
          columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
        )}
      >
        {stages.map((stage, index) => (
          <li key={stage.title} className={cn(arrowClasses, hideEndOfRow[columns])}>
            <div className="h-full rounded-xl border border-line bg-surface p-4">
              <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-1 font-medium text-ink">{stage.title}</p>
              {stage.detail && <p className="text-sm text-muted">{stage.detail}</p>}
              {stage.items && (
                <ul className="mt-3 space-y-1 border-t border-line pt-3 text-sm text-muted">
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  )
}
