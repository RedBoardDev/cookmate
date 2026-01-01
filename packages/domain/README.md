# Domain Package Guide (Shared Business Core)

This package defines the shared business model. It is used by both
backend and frontend and represents what a concept **is** in the business.

It is **not**:
- a database schema
- a UI view model
- an API DTO contract

## What lives here

- **Entities**: core business objects and their rules (policies).
- **Value Objects**: domain-level types and invariants (difficulty, duration, etc.).
- **Domain Errors**: business failures.

## Snapshot-First Rule (Option A)

Every API response that represents a shared entity returns the **full business
snapshot** required by that entity. This enables the frontend to always build
shared entities from the SDK DTOs.

Example snapshot for `CollectionEntity`:
- `id`, `name`, `ownerId`, `createdAt`, `updatedAt`

Extra fields are allowed on responses (counts, flags, members) but the snapshot
is always present.

## Backend usage

1) **Validate inputs** with domain schemas (create/update).
2) **Load or create entities** from persistence.
3) **Apply policies** on entities.
4) **Persist changes**.
5) **Return the full snapshot**, plus extra computed fields if needed.

This keeps business rules centralized and prevents inconsistent API behavior.

## Frontend usage

- SDK (OpenAPI) returns typed DTOs.
- Mappers build **UI aggregates** per module.
- UI aggregates **compose** shared entities + UI-specific fields.

Example:
- `CollectionListItem` = `{ collection: CollectionEntity, membersCount, isSelected }`
- `RecipeDetail` = `{ recipe: RecipeEntity, ingredients, instructions }`

You do **not** create extra “business entities” in the frontend. You use the
shared entity from this package and add UI-only data in aggregates.

## Policies inside entities

Policies should live on entities **only** when they depend solely on the entity’s
own state.

- ✅ `collection.isOwner(userId)`
- ✅ `recipe.assertCanPublish()`
- ❌ `collection.canDelete()` if it depends on other aggregates

Cross-aggregate rules should be handled by domain services or policies outside
entities.

## Keep entities small and stable

Only include fields that define the business concept. Exclude:
- secrets (passwords, tokens)
- heavy content that belongs to a separate concept

If a field is heavy or optional, split the concept:
- `Recipe` (core) vs `RecipeContent` (ingredients, instructions)
- `User` (public) vs `UserCredentials`

## Change management

Adding a field to a shared entity means:
- update the domain schema/entity
- update all API responses returning that entity
- update SDK types
- update frontend mappers

Because the snapshot is the contract, changes are deliberate and explicit.

## Example references

- Shared domain entities: `packages/domain/src`
- API handlers/repos: `apps/api/src`
- SDK DTOs (simulated): `apps/web/src/sdk/types.ts`
- UI aggregates:
  - Collections: `apps/web/src/modules/CollectionsList`, `apps/web/src/modules/CollectionSettings`
  - Recipes: `apps/web/src/modules/RecipesList`, `apps/web/src/modules/RecipeDetail`
  - User: `apps/web/src/modules/UserProfile`
