import Link from 'next/link'
import { Building2, Sparkles } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

/** Listing / directory visual shell (same for all factory recipes). */
const listingLoginUi = {
  panel: 'border border-slate-200 bg-white',
  side: 'border border-slate-200 bg-slate-50',
  muted: 'text-slate-600',
  action: 'bg-slate-950 text-white hover:bg-slate-800',
  icon: Building2,
  title: 'Sign in to manage your listings',
  body: 'Manage listings, verification details, contact info, and local discovery from one place.',
}

function buildNextQuery(next: string | undefined) {
  if (!next || !next.startsWith('/')) return ''
  return `?next=${encodeURIComponent(next)}`
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>
}) {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const resolved = (await searchParams) || {}
  const next = typeof resolved.next === 'string' ? resolved.next : undefined
  const nextQuery = buildNextQuery(next)

  const config = listingLoginUi
  const Icon = config.icon

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Listings, reviews, and saves in one calm directory rhythm', 'Search-first layout tuned for local discovery', 'Submit and manage listings after you sign in'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <LoginForm actionClassName={config.action} nextPath={next} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href={`/register${nextQuery}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
