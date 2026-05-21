import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function CommunitySlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/listings/${slug}`);
}
