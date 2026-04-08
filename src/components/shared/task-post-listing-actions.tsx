'use client'

import { useCallback, useEffect, useState } from 'react'
import { Bookmark, Heart } from 'lucide-react'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { cn } from '@/lib/utils'

function readIds(key: string): string[] {
  return loadFromStorage<string[]>(key, [])
}

function toggleId(key: string, id: string) {
  const next = new Set(readIds(key))
  if (next.has(id)) next.delete(id)
  else next.add(id)
  saveToStorage(key, [...next])
}

export function TaskPostListingActions({
  postId,
  className,
  variant = 'dark',
}: {
  postId: string
  className?: string
  variant?: 'dark' | 'light'
}) {
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)

  const sync = useCallback(() => {
    setBookmarked(readIds(storageKeys.taskPostCardBookmarks).includes(postId))
    setLiked(readIds(storageKeys.taskPostCardLikes).includes(postId))
  }, [postId])

  useEffect(() => {
    sync()
  }, [sync])

  const baseBtn =
    variant === 'light'
      ? 'border border-white/40 bg-white/90 text-slate-900 shadow-sm hover:bg-white'
      : 'border border-slate-200/80 bg-white/90 text-slate-900 shadow-sm hover:bg-white'

  return (
    <div className={cn('flex items-center gap-1.5', className)} onClick={(e) => e.preventDefault()}>
      <button
        type="button"
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark listing'}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
          baseBtn,
          bookmarked && 'text-sky-600',
        )}
        onClick={(e) => {
          e.stopPropagation()
          toggleId(storageKeys.taskPostCardBookmarks, postId)
          sync()
        }}
      >
        <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-current')} />
      </button>
      <button
        type="button"
        aria-label={liked ? 'Unlike' : 'Like listing'}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
          baseBtn,
          liked && 'text-rose-500',
        )}
        onClick={(e) => {
          e.stopPropagation()
          toggleId(storageKeys.taskPostCardLikes, postId)
          sync()
        }}
      >
        <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
      </button>
    </div>
  )
}
