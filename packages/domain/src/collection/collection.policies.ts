import {
  NotCollectionMemberError,
  NotCollectionOwnerError,
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
};
