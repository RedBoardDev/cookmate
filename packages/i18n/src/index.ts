export { locales, defaultLocale, localeNames, isValidLocale } from "./locales";
export type { Locale } from "./locales";

export type { ErrorMessageArgs } from "./errors/api-error-descriptors";
export {
  getErrorDescriptor,
  getFallbackErrorDescriptorFromStatus,
  isKnownErrorCode,
} from "./errors/api-error-descriptors";
