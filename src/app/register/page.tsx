import Link from 'next/link'
import { Building2, Sparkles } from 'lucide-react'
import { RegisterForm } from '@/components/auth/register-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

/** Listing / directory visual shell (same for all factory recipes). */
const listingRegisterUi = {
  panel: 'border border-slate-200 bg-white',
  side: 'border border-slate-200 bg-slate-50',
  muted: 'text-slate-600',
  action: 'bg-slate-950 text-white hover:bg-slate-800',
  icon: Building2,
  title: 'Create a business-ready account',
  body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
}

function buildNextQuery(next: string | undefined) {
  if (!next || !next.startsWith('/')) return ''
  return `?next=${encodeURIComponent(next)}`
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>
}) {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const resolved = (await searchParams) || {}
  const next = typeof resolved.next === 'string' ? resolved.next : undefined
  const nextQuery = buildNextQuery(next)

  const config = listingRegisterUi
  const Icon = config.icon

  return (
    <div className="site-shell">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Business profile aligned with directory listings', 'Faster path from signup to your first listing', 'Trust cues and categories that match local search'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <RegisterForm actionClassName={config.action} nextPath={next} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href={`/login${nextQuery}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
