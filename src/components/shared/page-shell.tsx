'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="site-shell">
      <NavbarShell />
      <main>
        <section className="site-page-header">
          <div className="site-page-header-inner">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
              {description && (
                <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
              )}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        </section>
        <section className="site-container px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
