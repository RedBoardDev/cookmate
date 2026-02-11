import { EmailNotVerifiedError, MaxCollectionsReachedError } from "./errors";

export const DEFAULT_MAX_OWNED_COLLECTIONS = 15;

export const UserPolicies = {
  /**
   * Check if the user's email is verified
   */
  isEmailVerified(emailVerified: boolean): boolean {
    return emailVerified;
  },

  /**
   * Assert the user's email is verified, throws EmailNotVerifiedError if not
   */
  assertEmailVerified(emailVerified: boolean): void {
    if (!this.isEmailVerified(emailVerified)) {
      throw new EmailNotVerifiedError();
    }
  },

  /**
   * Check if user can own more collections based on their current count
   */
  canOwnMoreCollections(currentOwnedCount: number): boolean {
    return currentOwnedCount < DEFAULT_MAX_OWNED_COLLECTIONS;
  },

  /**
   * Assert user can own more collections, throws MaxCollectionsReachedError if limit reached
   */
  assertReachMaxCollections(currentOwnedCount: number): void {
    if (!this.canOwnMoreCollections(currentOwnedCount)) {
      throw new MaxCollectionsReachedError();
    }
  },
};
