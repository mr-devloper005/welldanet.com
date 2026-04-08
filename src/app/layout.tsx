import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { CommandPalette } from '@/components/shared/command-palette'
import { AuthProvider } from '@/lib/auth-context'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { BRAND_PACKS } from '@/design/factory/brand-packs'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe } = getFactoryState()
  /** Listing-first UI: directory brand tokens on the body (motion/home data unchanged). */
  const brandPack = BRAND_PACKS['directory-clean']

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        data-site-shell="listing-home"
        data-motion-pack={recipe.motionPack}
        data-nav-layout="topbar"
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <CommandPalette />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
