'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { postAuthRedirectPath } from '@/lib/auth-redirect'

export function LoginForm({ actionClassName, nextPath }: { actionClassName: string; nextPath?: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter both email and password.',
      })
      return
    }
    await login(trimmed, password)
    toast({ title: 'Signed in', description: 'Welcome back.' })
    router.push(postAuthRedirectPath(nextPath))
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="h-12 border-current/10 bg-transparent"
          placeholder="Email address"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="h-12 border-current/10 bg-transparent"
          placeholder="Password"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full px-6 text-sm font-semibold ${actionClassName}`}>
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Signing in…
          </span>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  )
}
