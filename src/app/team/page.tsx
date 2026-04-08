import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/team",
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Meet the people building ${SITE_CONFIG.name}, the local business listings directory.`,
  });
}

export default function TeamPage() {
  return (
    <PageShell
      title="Team"
      description={`We build and operate ${SITE_CONFIG.name} as a listings-first directory—product, support, and local partnerships.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/about">About the directory</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>
              <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
