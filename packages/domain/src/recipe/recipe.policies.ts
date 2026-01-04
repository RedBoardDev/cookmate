import { NotRecipeOwnerError } from "./errors";

export const RecipePolicies = {
  /**
   * Check if user is the owner of the recipe
   */
  isOwner(ownerId: string, userId: string): boolean {
    return ownerId === userId;
  },

  /**
   * Check if user can view the recipe
   * For now, only owner can view (personal recipes)
   */
  canView(ownerId: string, userId: string): boolean {
    return this.isOwner(ownerId, userId);
  },

  /**
   * Check if user can edit the recipe
   */
  canEdit(ownerId: string, userId: string): boolean {
    return this.isOwner(ownerId, userId);
  },

  /**
   * Check if user can delete the recipe
   */
  canDelete(ownerId: string, userId: string): boolean {
    return this.isOwner(ownerId, userId);
  },

  /**
   * Assert user is the owner, throws NotRecipeOwnerError if not
   */
  assertOwner(ownerId: string, userId: string): void {
    if (!this.isOwner(ownerId, userId)) {
      throw new NotRecipeOwnerError();
    }
  },

  /**
   * Assert user can view the recipe, throws NotRecipeOwnerError if not
   */
  assertCanView(ownerId: string, userId: string): void {
    if (!this.canView(ownerId, userId)) {
      throw new NotRecipeOwnerError();
    }
  },

  /**
   * Assert user can edit the recipe, throws NotRecipeOwnerError if not
   */
  assertCanEdit(ownerId: string, userId: string): void {
    if (!this.canEdit(ownerId, userId)) {
      throw new NotRecipeOwnerError();
    }
  },

  /**
   * Assert user can delete the recipe, throws NotRecipeOwnerError if not
   */
  assertCanDelete(ownerId: string, userId: string): void {
    if (!this.canDelete(ownerId, userId)) {
      throw new NotRecipeOwnerError();
    }
  },
};
