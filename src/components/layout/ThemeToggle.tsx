import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/theme-context'
import { cn } from '../../lib/cn'

interface ThemeToggleProps {
  /** Shows a visible text label next to the icon (used in the mobile menu). */
  showLabel?: boolean
  className?: string
}

export function ThemeToggle({ showLabel = false, className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink',
        className,
      )}
    >
      <Icon className="size-[1.125rem]" aria-hidden="true" />
      {showLabel && <span>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>}
    </button>
  )
}
