import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { ProjectImage } from '../../content/types'
import { cn } from '../../lib/cn'

interface SmartImageProps {
  image: ProjectImage
  sizes: string
  priority?: boolean
  className?: string
}

/** Image with reserved dimensions (no layout shift), lazy loading and a text fallback if it fails to load. */
export function SmartImage({ image, sizes, priority = false, className }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 bg-surface-2 p-6 text-center text-sm text-muted',
          className,
        )}
      >
        <ImageOff className="size-6" aria-hidden="true" />
        <span>Preview unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={cn('block h-auto w-full', className)}
    />
  )
}
