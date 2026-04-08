import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const areas = [
  {
    title: "Listing feeds & embeds",
    body: "Use stable URLs and JSON-shaped listing data to power partner sites, intranets, or city portals. Contact us for access patterns and rate limits.",
  },
  {
    title: "Brand & attribution",
    body: "When you surface our listings, we ask for clear attribution and links back so users always know the source.",
  },
  {
    title: "Data freshness",
    body: "Listings change often. Plan for periodic syncs and respect business owners’ updates to hours and contact info.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/developers",
    title: `Developers | ${SITE_CONFIG.name}`,
    description: `Integrate with ${SITE_CONFIG.name} listing data—feeds, attribution, and partner guidelines.`,
  });
}

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="Guidelines and starting points for partners who want to use or display directory listings responsibly."
      actions={
        <Button asChild>
          <Link href="/contact">Talk to partnerships</Link>
        </Button>
      }
    >
      <div className="grid gap-6">
        {areas.map((item) => (
          <Card key={item.title} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
