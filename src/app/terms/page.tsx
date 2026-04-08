import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { title: "Accounts", body: "Keep login details secure. You are responsible for activity under your account, including listing updates." },
  {
    title: "Listing content",
    body: "You represent that business information you submit is accurate. You grant us a license to display your listing in the directory and search results.",
  },
  { title: "Acceptable use", body: "No false listings, impersonation, spam, harassment, or illegal content. We may remove listings that violate these rules." },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`Terms for using ${SITE_CONFIG.name} as a visitor or listing owner on our business directory.`}
    >
      <Card className="border-border bg-card">
        <CardContent className="space-y-4 p-6">
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
  );
}
