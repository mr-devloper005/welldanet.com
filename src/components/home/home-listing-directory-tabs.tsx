'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { cn } from '@/lib/utils'

const TAB_SLUGS = ['all', ...CATEGORY_OPTIONS.slice(0, 10).map((c) => c.slug)]

export function HomeListingDirectoryTabs({
  posts,
  taskKey,
  tabLabel,
  sectionClass,
}: {
  posts: SitePost[]
  taskKey: TaskKey
  tabLabel: string
  sectionClass?: string
}) {
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    if (tab === 'all') return posts
    const normalized = normalizeCategory(tab)
    return posts.filter((post) => {
      const content = post.content && typeof post.content === 'object' ? post.content : {}
      const raw = typeof (content as { category?: string }).category === 'string' ? (content as { category: string }).category : ''
      if (!raw) {
        const tag = post.tags?.[0]
        return typeof tag === 'string' && normalizeCategory(tag) === normalized
      }
      return normalizeCategory(raw) === normalized
    })
  }, [posts, tab])

  return (
    <section className={cn('site-container px-4 py-14 sm:px-6 lg:px-8', sectionClass)}>
      <div className="flex flex-col gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{tabLabel}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Browse by category</h2>
        </div>
        <Link href="/listings" className="text-sm font-semibold text-primary transition-opacity hover:opacity-80">
          View all listings →
        </Link>
      </div>
      <div
        role="tablist"
        aria-label="Listing categories"
        className="mt-6 flex flex-wrap gap-2"
      >
        {TAB_SLUGS.map((slug) => {
          const label =
            slug === 'all'
              ? 'All'
              : CATEGORY_OPTIONS.find((c) => c.slug === slug)?.name || slug
          const selected = tab === slug
          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(slug)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                selected
                  ? 'bg-foreground text-background shadow-[var(--shadow-soft)]'
                  : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.length ? (
          filtered.slice(0, 8).map((post) => (
            <TaskPostCard key={post.id} post={post} href={buildPostUrl(taskKey, post.slug)} taskKey={taskKey} />
          ))
        ) : (
          <p className="col-span-full rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
            No listings in this category yet.{' '}
            <Link href="/listings" className="font-semibold text-primary underline-offset-4 hover:underline">
              Explore all listings
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
