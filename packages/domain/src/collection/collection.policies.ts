import {
  NotCollectionOwnerError,
  NotCollectionMemberError,
  CannotRemoveOwnerError,
  CannotAddMemberError,
} from "./errors";

export const CollectionPolicies = {
  /**
   * Check if user is a member of the collection
   */
  isMember(ownerId: string, userId: string, isMember = false): boolean {
    return this.isOwner(ownerId, userId) || isMember;
  },

  /**
   * Check if user is the owner of the collection
   */
  isOwner(ownerId: string, userId: string): boolean {
    return ownerId === userId;
  },

  /**
   * Check if user can view the collection (owner OR member)
   */
  canView(ownerId: string, userId: string, isMember: boolean): boolean {
    return this.isOwner(ownerId, userId) || isMember;
  },

  /**
   * Check if user can add a member to the collection
   */
  canAddMember(ownerId: string, userId: string): boolean {
    return this.isOwner(ownerId, userId);
  },

  /**
   * Check if user can remove a member from the collection
   */
  canRemoveMember(ownerId: string, userId: string): boolean {
    return this.isOwner(ownerId, userId);
  },

  /**
   * Assert user is the owner, throws NotCollectionOwnerError if not
   */
  assertOwner(ownerId: string, userId: string): void {
    if (!this.isOwner(ownerId, userId)) {
      throw new NotCollectionOwnerError();
    }
  },

  /**
   * Assert user can view the collection, throws NotCollectionMemberError if not
   */
  assertCanView(ownerId: string, userId: string, isMember: boolean): void {
    if (!this.canView(ownerId, userId, isMember)) {
      throw new NotCollectionMemberError();
    }
  },

  /**
   * Assert user can add a member to the collection, throws CannotAddMemberError if not
   */
  assertCanAddMember(ownerId: string, userId: string): void {
    if (!this.canAddMember(ownerId, userId)) {
      throw new CannotAddMemberError();
    }
  },

  /**
   * Assert user is a member of the collection, throws NotCollectionMemberError if not
   */
  assertIsMember(ownerId: string, userId: string, isMember: boolean): void {
    if (!this.isMember(ownerId, userId, isMember)) {
      throw new NotCollectionMemberError();
    }
  },

  /**
   * Assert a member can be removed (owner cannot be removed)
   */
  assertCanRemoveMember(ownerId: string, memberIdToRemove: string): void {
    if (ownerId === memberIdToRemove) {
      throw new CannotRemoveOwnerError();
    }
  },

  /**
   * Check if user can add a recipe to the collection (owner OR member)
   */
  canAddRecipe(ownerId: string, userId: string, isMember: boolean): boolean {
    return this.canView(ownerId, userId, isMember);
  },

  /**
   * Assert user can add a recipe to the collection, throws NotCollectionMemberError if not
   */
  assertCanAddRecipe(ownerId: string, userId: string, isMember: boolean): void {
    if (!this.canAddRecipe(ownerId, userId, isMember)) {
      throw new NotCollectionMemberError();
    }
  },
};
