import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

const topics = [
  {
    title: "Getting your listing verified",
    body: "What we look for in photos, hours, and contact details so customers trust your business card.",
  },
  {
    title: "Local SEO for small businesses",
    body: "How categories, addresses, and clear descriptions help you show up when people search nearby.",
  },
  {
    title: "Seasonal updates that matter",
    body: "When to refresh your listing for holidays, new services, or changed hours.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/blog",
    title: `Guides & tips | ${SITE_CONFIG.name}`,
    description: `Practical guides for business owners on ${SITE_CONFIG.name}—listings, visibility, and local discovery.`,
  });
}

export default function BlogPage() {
  return (
    <PageShell
      title="Guides for listing owners"
      description="Short reads on making the most of your business listing—accuracy, photos, and local discovery."
      actions={
        <Button asChild>
          <Link href="/listings">Browse listings</Link>
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.title} className="border-border bg-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{topic.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        More articles coming soon. Need help with your listing now?{" "}
        <Link href="/help" className="font-medium text-foreground underline-offset-4 hover:underline">
          Visit the help center
        </Link>
        .
      </p>
    </PageShell>
  );
}
