import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const pillars = [
  {
    title: "Local reviewers & regulars",
    body: "Saved favorites and honest feedback help others pick the right café, shop, or service in your area.",
  },
  {
    title: "Business owners",
    body: "Claim your listing, respond to trends in your category, and keep hours and photos current.",
  },
  {
    title: "Neighborhood guides",
    body: "We spotlight collections of listings—think “best breakfast spots” or “family-friendly services”—built from real directory data.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/community",
    title: `Community | ${SITE_CONFIG.name}`,
    description: `How people and businesses use ${SITE_CONFIG.name} together—a local listings community.`,
  });
}

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description={`${SITE_CONFIG.name} works when locals share what they love and owners keep listings accurate. Here is how that fits together.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/contact">Partner with us</Link>
          </Button>
          <Button asChild>
            <Link href="/listings">Explore listings</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((item) => (
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
