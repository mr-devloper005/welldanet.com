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

export function RegisterForm({ actionClassName, nextPath }: { actionClassName: string; nextPath?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter name, email, and password.',
      })
      return
    }
    await signup(trimmedName, trimmedEmail, password)
    toast({ title: 'Account created', description: 'You are signed in.' })
    router.push(postAuthRedirectPath(nextPath))
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="register-name">Full name</Label>
        <Input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="h-12 border-current/10 bg-transparent"
          placeholder="Full name"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
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
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="h-12 border-current/10 bg-transparent"
          placeholder="Password"
          required
          minLength={6}
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full px-6 text-sm font-semibold ${actionClassName}`}>
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            Creating account…
          </span>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}
