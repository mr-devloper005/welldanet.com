'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls({ overlay }: { overlay?: boolean }) {
  const { user } = useAuth()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        overlay
          ? 'rounded-full text-white hover:bg-white/15 hover:text-white'
          : 'rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-950'
      }
      asChild
    >
      <Link href="/account/profile" aria-label="Your profile">
        <Avatar className={overlay ? 'h-9 w-9 border border-white/40' : 'h-9 w-9 border border-slate-200'}>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  )
}
