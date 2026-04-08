import { redirect } from "next/navigation";

export const revalidate = 3;

export default async function DevelopersSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  redirect("/developers");
}
