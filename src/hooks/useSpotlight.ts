import { useEffect, useRef } from 'react'

/** Pointer-following light for dark sections. CSS variables avoid React renders on pointermove. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    const followPointer = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      element.style.setProperty('--spotlight-x', `${currentX}px`)
      element.style.setProperty('--spotlight-y', `${currentY}px`)
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        frame = requestAnimationFrame(followPointer)
      } else {
        frame = 0
      }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const rect = element.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
      element.style.setProperty('--spotlight-opacity', '1')
      if (!frame) frame = requestAnimationFrame(followPointer)
    }
    const leave = () => {
      element.style.setProperty('--spotlight-opacity', '0')
    }

    element.addEventListener('pointermove', move, { passive: true })
    element.addEventListener('pointerleave', leave, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', leave)
    }
  }, [])

  return ref
}
