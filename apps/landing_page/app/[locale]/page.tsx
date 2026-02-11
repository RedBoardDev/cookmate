"use client";

import { LandingPage } from "@/components/landing/landing-page";
import { AuthProvider } from "@/lib/auth-context";

export default function Page() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}
