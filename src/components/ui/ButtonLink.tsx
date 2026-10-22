import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { ExtLink } from './ExtLink'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-ink',
  ghost: 'px-2 text-ink hover:text-accent',
}

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonLinkProps =
  | (CommonProps & { to: LinkProps['to']; href?: never; download?: never })
  | (CommonProps & { href: string; to?: never; download?: boolean })

/** One link-styled-as-button for internal routes (`to`) and external or file URLs (`href`). */
export function ButtonLink(props: ButtonLinkProps) {
  const { variant = 'secondary', children, className } = props
  const classes = cn(base, variants[variant], className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }
  if (props.href.startsWith('mailto:')) {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <ExtLink href={props.href} download={props.download} className={classes}>
      {children}
    </ExtLink>
  )
}
