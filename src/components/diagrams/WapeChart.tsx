const rows = [
  { name: 'Seasonal-naive baseline', value: 11.8, note: 'kept in production', tone: 'bg-accent' },
  { name: 'HistGradientBoosting', value: 15.2, note: 'evaluated, rejected', tone: 'bg-line-strong' },
]

const MAX = 20

export function WapeChart() {
  return (
    <figure>
      <div
        role="img"
        aria-label="Backtest error (WAPE), lower is better. Seasonal-naive baseline 11.80 percent, HistGradientBoosting 15.20 percent."
        className="space-y-5 rounded-xl border border-line bg-surface p-5"
      >
        {rows.map((row) => (
          <div key={row.name}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-ink">{row.name}</span>
              <span className="font-mono text-ink">{row.value.toFixed(2)}%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-surface-2">
              <div className={`h-3 rounded-full ${row.tone}`} style={{ width: `${(row.value / MAX) * 100}%` }} />
            </div>
            <p className="mt-1 text-xs text-muted">{row.note}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        WAPE across the same eight rolling-origin backtest windows. Lower is better.
      </figcaption>
    </figure>
  )
}
