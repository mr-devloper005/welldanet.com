import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Local businesses listed", value: "8.6k+" },
  { label: "Categories covered", value: "120+" },
  { label: "Cities & towns", value: "340+" },
];

const values = [
  { title: "Trust-first listings", description: "Clear hours, contact info, and photos so people can choose local businesses with confidence." },
  { title: "Built for search", description: "Fast filters and maps-style browsing so visitors find the right listing quickly." },
  { title: "Fair for owners", description: "Simple tools to claim, update, and showcase your business on the directory." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a local business directory—helping people discover listings nearby and helping owners get found.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Our team</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild>
            <Link href="/listings">Browse listings</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A calmer place to list and find local businesses.
            </h2>
            <p className="text-sm text-muted-foreground">
              We focus on one job: making business listings easy to read, easy to update, and easy to discover.
              No mixed feeds—just a directory that works for shoppers and owners.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-border bg-card transition-transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
              <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
