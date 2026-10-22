import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle band of the viewport. */
export function useActiveSection(ids: readonly string[], enabled: boolean): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (!enabled) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
