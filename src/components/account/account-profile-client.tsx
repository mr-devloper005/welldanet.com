'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Camera, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

export function AccountProfileClient() {
  const router = useRouter()
  const { user, logout, updateUser } = useAuth()
  const { toast } = useToast()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setBio(user.bio || '')
  }, [user])

  const handleAvatar = (file: File | null) => {
    if (!file || !user) return
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image.' })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Maximum size is 2MB.' })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      updateUser({ avatar: result })
      toast({ title: 'Photo updated', description: 'Your profile picture was saved.' })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!user) return
    updateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      bio: bio.trim(),
    })
    toast({ title: 'Profile saved', description: 'Your details were updated.' })
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus-profile-updated'))
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <div className="site-shell">
        <NavbarShell />
        <main className="site-container flex justify-center py-16">
          <div className="site-surface-card w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-600">Sign in to view and edit your profile.</p>
            <Button asChild className="mt-6 rounded-full bg-slate-950 text-white hover:bg-slate-800">
              <Link href="/login?next=/account/profile">Sign in</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="site-container py-10 sm:py-14">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Your profile</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Update how you appear on the site. Changes are saved on this device.
            </p>
          </div>

          <div className="site-surface-card w-full rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 border border-slate-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name?.charAt(0) ?? '?'}</AvatarFallback>
              </Avatar>
              <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => handleAvatar(e.target.files?.[0] ?? null)} />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full border border-slate-200 bg-white p-0 shadow-sm"
                onClick={() => fileRef.current?.click()}
                aria-label="Upload profile photo"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-slate-600">Member since {user.joinedDate}</p>
              <Button type="button" variant="link" className="mt-1 h-auto p-0 text-xs text-slate-950" onClick={() => fileRef.current?.click()}>
                Upload new photo
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="acct-name">Display name</Label>
              <Input id="acct-name" value={name} onChange={(e) => setName(e.target.value)} className="border-slate-200 bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acct-email">Email</Label>
              <Input id="acct-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-slate-200 bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="acct-bio">Bio</Label>
              <Textarea
                id="acct-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="A short introduction…"
                className="resize-none border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" onClick={handleSave} className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
              Save changes
            </Button>
            <Button type="button" variant="outline" className="rounded-full border-slate-200" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
