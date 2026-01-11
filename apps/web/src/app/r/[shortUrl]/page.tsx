import { ShortUrlRedirectScreen } from "@/modules/ShortUrlRedirect/ui/ShortUrlRedirectScreen";

export const dynamic = "force-dynamic";

interface ShortUrlPageProps {
  params: Promise<{ shortUrl: string }>;
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortUrl } = await params;

  return <ShortUrlRedirectScreen shortUrl={shortUrl} />;
}
