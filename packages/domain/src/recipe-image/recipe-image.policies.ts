import { NotRecipeImageOwnerError } from "./errors";

export const RecipeImagePolicies = {
  /**
   * Check if user is the owner of the recipe (and thus of its images)
   */
  isOwner(recipeOwnerId: string, userId: string): boolean {
    return recipeOwnerId === userId;
  },

  /**
   * Check if user can view the recipe image
   */
  canView(recipeOwnerId: string, userId: string): boolean {
    return this.isOwner(recipeOwnerId, userId);
  },

  /**
   * Check if user can edit the recipe image (add, update, reorder)
   */
  canEdit(recipeOwnerId: string, userId: string): boolean {
    return this.isOwner(recipeOwnerId, userId);
  },

  /**
   * Check if user can delete the recipe image
   */
  canDelete(recipeOwnerId: string, userId: string): boolean {
    return this.isOwner(recipeOwnerId, userId);
  },

  /**
   * Assert user is the recipe owner, throws NotRecipeImageOwnerError if not
   */
  assertOwner(recipeOwnerId: string, userId: string): void {
    if (!this.isOwner(recipeOwnerId, userId)) {
      throw new NotRecipeImageOwnerError();
    }
  },

  /**
   * Assert user can view the recipe image, throws NotRecipeImageOwnerError if not
   */
  assertCanView(recipeOwnerId: string, userId: string): void {
    if (!this.canView(recipeOwnerId, userId)) {
      throw new NotRecipeImageOwnerError();
    }
  },

  /**
   * Assert user can edit the recipe image, throws NotRecipeImageOwnerError if not
   */
  assertCanEdit(recipeOwnerId: string, userId: string): void {
    if (!this.canEdit(recipeOwnerId, userId)) {
      throw new NotRecipeImageOwnerError();
    }
  },

  /**
   * Assert user can delete the recipe image, throws NotRecipeImageOwnerError if not
   */
  assertCanDelete(recipeOwnerId: string, userId: string): void {
    if (!this.canDelete(recipeOwnerId, userId)) {
      throw new NotRecipeImageOwnerError();
    }
  },
};
