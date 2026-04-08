import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Directory & search', status: 'Operational' },
  { name: 'Listing pages & maps', status: 'Operational' },
  { name: 'Media (photos)', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Slower listing search results', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Category filter delay', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="Uptime for listing search, business pages, and media on the directory."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="border-border bg-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{service.name}</h2>
                <Badge className="mt-3" variant="secondary">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Incident History</h3>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-lg border border-border bg-secondary/40 px-4 py-3">
                  <div className="text-xs text-muted-foreground">{incident.date}</div>
                  <div className="text-sm font-medium text-foreground">{incident.title}</div>
                  <div className="text-xs text-muted-foreground">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
