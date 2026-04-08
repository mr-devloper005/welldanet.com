import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  { title: 'Essential cookies', body: 'Required for sign-in, session safety, and core directory features.' },
  { title: 'Analytics cookies', body: 'Help us see how people browse listings and search so we can improve the experience.' },
  { title: 'Preference cookies', body: 'Remember filters, location hints, and UI choices across visits.' },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Cookies used on our listings directory—essential, analytics, and preferences."
    >
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground">Last updated: March 16, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-border bg-secondary/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
