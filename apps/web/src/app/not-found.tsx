import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center md:flex-row md:items-center md:gap-12 md:text-left">
        <div className="w-full max-w-[160px] shrink-0 md:max-w-[220px]">
          <Image
            src="/not_found_error.png"
            alt="Error not found illustration"
            width={500}
            height={500}
            priority
            sizes="(min-width: 768px) 220px, 160px"
            className="h-auto w-full"
          />
        </div>
        <div className="flex w-full max-w-lg flex-col items-center gap-4 md:items-start">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            404 Error
          </p>
          <h1 className="text-5xl font-display text-foreground sm:text-6xl">
            404
          </h1>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="pt-2">
            <Button asChild className="rounded-xl px-6">
              <Link href="/">Go to home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
