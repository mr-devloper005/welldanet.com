'use client'

import { Suspense, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'
import { DirectoryNavbarCenter } from '@/components/shared/directory-navbar-center'
import { SubmitListingLink } from '@/components/shared/submit-listing-link'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  /* Listing-first UI: always use directory navbar shell (visual only; routes unchanged). */
  const isDirectoryProduct = true

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]
    const pillIdle =
      recipe.brandPack === 'market-utility'
        ? 'text-[#56604b] hover:bg-[#e7edd9]'
        : 'text-slate-600 hover:bg-slate-100'
    const pillActive = cn('shadow-[var(--shadow-soft)]', palette.cta)

    return (
      <header data-mobile-nav="true" className={cn('sticky top-0 z-50 w-full border-b border-transparent', palette.shell)}>
        <nav className="site-container flex min-h-[4.25rem] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden p-1.5 sm:h-11 sm:w-11', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="block truncate text-base font-semibold sm:text-lg">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 px-2 lg:block">
              <Suspense fallback={<div className="mx-auto h-10 max-w-3xl animate-pulse rounded-full bg-black/5" />}>
                <DirectoryNavbarCenter pillClass={pillIdle} activeClass={pillActive} />
              </Suspense>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="sm" asChild className="hidden rounded-full md:inline-flex">
                <Link href="/search" className="gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden lg:inline">Search</span>
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button size="sm" asChild className={cn('rounded-full px-3 sm:px-4', palette.cta)}>
                    <SubmitListingLink className="inline-flex items-center gap-1">
                      <Plus className="h-4 w-4 sm:mr-0.5" />
                      <span className="hidden sm:inline">Submit listing</span>
                      <span className="sr-only sm:hidden">Submit listing</span>
                    </SubmitListingLink>
                  </Button>
                  <NavbarAuthControls />
                </>
              ) : (
                <Button variant="ghost" size="sm" asChild className="hidden rounded-full sm:inline-flex">
                  <Link href="/login">Sign in</Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="lg:hidden">
            <Suspense fallback={<div className="h-9 w-full animate-pulse rounded-xl bg-black/5" />}>
              <DirectoryNavbarCenter pillClass={pillIdle} activeClass={pillActive} />
            </Suspense>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={cn('border-t', palette.mobile)}>
            <div className="site-container space-y-2 px-4 py-4 sm:px-6">
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold', palette.search)}
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive ? 'bg-foreground text-background' : palette.post,
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'

  const centerLinkClass = (active: boolean) => cn('shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors', active ? style.active : style.idle)

  const renderTaskCenter = (className?: string) => (
    <nav className={cn('scrollbar-none flex items-center gap-1 overflow-x-auto', className)} aria-label="Primary">
      <Link href="/" className={centerLinkClass(pathname === '/')}>
        Home
      </Link>
      {primaryNavigation.map((task) => {
        const Icon = taskIcons[task.key] || LayoutGrid
        const isActive = pathname.startsWith(task.route)
        return (
          <Link key={task.key} href={task.route} className={cn(centerLinkClass(isActive), 'inline-flex items-center gap-1.5')}>
            <Icon className="h-3.5 w-3.5 opacity-80" />
            <span className="whitespace-nowrap">{task.label}</span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <header data-mobile-nav="true" className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav
        className={cn(
          'site-container flex min-h-[4.25rem] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8',
          isFloating && 'min-h-[5rem] pt-2',
        )}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden p-1.5 sm:h-11 sm:w-11', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-base font-semibold sm:text-lg">{SITE_CONFIG.name}</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-70">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">{renderTaskCenter('max-w-4xl justify-center')}</div>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn('hidden rounded-full md:inline-flex', isFloating && 'text-white hover:bg-white/10 hover:text-white')}
            >
              <Link href="/search" className="gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </Link>
            </Button>
            {isAuthenticated ? (
              <>
                <Button size="sm" asChild className={cn('rounded-full px-3 sm:px-4', style.cta)}>
                  <SubmitListingLink className="inline-flex items-center gap-1">
                    <Plus className="h-4 w-4 sm:mr-0.5" />
                    <span className="hidden sm:inline">Submit listing</span>
                    <span className="sr-only sm:hidden">Submit listing</span>
                  </SubmitListingLink>
                </Button>
                <NavbarAuthControls />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn('hidden rounded-full sm:inline-flex', isFloating && 'text-white hover:bg-white/10 hover:text-white')}
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full px-3 sm:px-4', style.cta)}>
                  <Link href="/register" className="gap-1">
                    <Plus className="h-4 w-4 sm:mr-0.5" />
                    <span className="hidden sm:inline">Get started</span>
                    <span className="sr-only sm:hidden">Get started</span>
                  </Link>
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn('rounded-full lg:hidden', isFloating && 'text-white hover:bg-white/10 hover:text-white')}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="lg:hidden">{renderTaskCenter('pb-1')}</div>
      </nav>

      {isMobileMenuOpen && (
        <div className={cn('border-t', style.mobile)}>
          <div className="site-container space-y-2 px-4 py-4 sm:px-6">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold', style.idle, 'border border-current/10')}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {isAuthenticated ? null : (
              <div className="flex flex-col gap-2 border-t border-current/10 pt-3">
                <Button variant="ghost" size="sm" asChild className="w-full justify-center rounded-full">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button size="sm" asChild className={cn('w-full justify-center rounded-full', style.cta)}>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Get started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )

}
