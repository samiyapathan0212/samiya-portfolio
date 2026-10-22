import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the hash target after navigation, or to the top for a new page. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a tick so lazily loaded route content has mounted.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }, 60)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
