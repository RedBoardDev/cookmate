import { env } from "@/shared/lib/env";

class RecipeShareService {
  public buildShareUrl(recipeId: string, shortUrl?: string | null): string | null {
    const trimmedShortUrl = shortUrl?.trim();

    if (trimmedShortUrl) {
      if (this.isAbsoluteUrl(trimmedShortUrl)) {
        return trimmedShortUrl;
      }

      const baseUrl = this.getShortLinkBaseUrl();
      if (baseUrl) {
        const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
        return `${normalizedBaseUrl}/r/${trimmedShortUrl}`;
      }
    }

    if (typeof window === "undefined") {
      return null;
    }

    return new URL(`/recipes/${recipeId}`, window.location.origin).toString();
  }

  public async copyToClipboard(value: string, promptLabel: string): Promise<boolean> {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        // Ignore and fallback below.
      }
    }

    if (typeof window !== "undefined") {
      window.prompt(promptLabel, value);
      return true;
    }

    return false;
  }

  private isAbsoluteUrl(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }

  private ensureBaseUrl(baseUrl: string): string {
    if (this.isAbsoluteUrl(baseUrl)) {
      return baseUrl;
    }

    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${baseUrl}`;
    }

    return `https://${baseUrl}`;
  }

  private getShortLinkBaseUrl(): string | null {
    const baseUrl = env.shortLinkBaseUrl?.trim();
    if (baseUrl) {
      return this.ensureBaseUrl(baseUrl);
    }

    if (typeof window !== "undefined") {
      return window.location.origin;
    }

    return null;
  }
}

export const recipeShareService = new RecipeShareService();
