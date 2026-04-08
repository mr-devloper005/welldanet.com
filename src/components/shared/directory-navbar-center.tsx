'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function DirectoryNavbarCenter({ pillClass, activeClass }: { pillClass: string; activeClass: string }) {
  const pathname = usePathname()

  const homeActive = pathname === '/'
  const listingsActive = pathname.startsWith('/listings')

  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-1 sm:gap-2">
      <Link
        href="/"
        className={cn(
          'rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200',
          homeActive ? activeClass : pillClass,
        )}
      >
        Home
      </Link>
      <Link
        href="/listings"
        className={cn(
          'rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200',
          listingsActive ? activeClass : pillClass,
        )}
      >
        All Listings
      </Link>
    </div>
  )
}
