import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  { title: 'Data we collect', body: 'Account details, listing content you submit (name, address, hours, photos), and usage data to run search and security.' },
  { title: 'How we use data', body: 'To show and rank listings, prevent abuse, improve local search, and communicate about your business profile.' },
  { title: 'Your choices', body: 'Update or remove listing information, manage email preferences, or delete your account at any time.' },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we handle information for accounts and business listings on our directory."
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
