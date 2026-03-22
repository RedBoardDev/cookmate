"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Something went wrong</p>
          <h1 className="text-5xl font-bold text-gray-900">Error</h1>
          <p className="text-lg text-gray-600">An unexpected error occurred. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
