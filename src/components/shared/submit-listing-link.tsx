'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const CREATE_LISTING_PATH = '/create/listing'

export function submitListingHref(isAuthenticated: boolean) {
  if (isAuthenticated) return CREATE_LISTING_PATH
  return `/login?next=${encodeURIComponent(CREATE_LISTING_PATH)}`
}

export function SubmitListingLink({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { isAuthenticated } = useAuth()
  return (
    <Link href={submitListingHref(isAuthenticated)} className={cn(className)}>
      {children}
    </Link>
  )
}
