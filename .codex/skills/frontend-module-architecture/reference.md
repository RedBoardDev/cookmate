# Frontend Module Architecture — Reference

## Glossary

| Term | Definition |
|------|------------|
| **Module** | Self-contained folder under `apps/web/src/modules/<Name>/` with `domain`, `application`, `api`, `ui` (or subset). No imports from other modules. |
| **Entity** | Domain class extending `Entity<Props>`; identity via `UniqueEntityID`; exposes only props via getters and domain methods. |
| **Screen** | UI component that orchestrates: uses hooks (data, mutation, form), handles toasts/callbacks, passes props to a View. |
| **View** | UI component that only receives props and renders; may hold local UI state (e.g. dropdown open); must not import API or mutation hooks. |
| **Mapper** | Object with `toDomain(dto)` mapping API DTO to module entity; lives in `application/`. |
| **API hook** | Hook that wraps generated kubb hook; exposes mutation + optional `onSuccess`/`onError`; no user-facing messages. |

## Domain Layer

- **Entity**: One class per aggregate root. Constructor private; `static create(props)` returns instance. ID from `props` (e.g. `props.collection.id`).
- **Props interface**: Holds domain data (and optional UI-related fields like `recipeCount` if returned by API). No getter that returns the whole props object or raw “entity” DTO.
- **Getters**: One getter per prop (or derived value). Naming: `get id()`, `get name()`, `get recipeCount()`, etc.
- **Methods**: Domain logic only (e.g. `isOwned(userId)`). No UI or API knowledge.
- **Imports**: From `@cookmate/core`, `@cookmate/domain/*`, or shared types; never from `application/`, `api/`, or `ui/`.

## Application Layer

- **Schemas**: Zod schemas for validation; export inferred types (e.g. `CreateCollectionInput`). Do not export a separate default-values constant for forms.
- **Mapper**: Single responsibility `toDomain(data)`. Map every field the entity needs; do not add `?? null` for fields already typed as `string | null` in API types. Use generated types (e.g. `GetX200['data'][number]`) for `data`.
- **Imports**: Domain entity, generated types, Zod; no UI or API hooks.

## API Layer

- **One hook per endpoint**: One hook per API call (list, create, delete, etc.). No “overview” hook that calls multiple endpoints.
- **Query hooks**: Return `{ data-derived list, error, isLoading }`; optional params (e.g. `whereRole`) from options, passed to generated hook. Use generated query params type when available.
- **Mutation hooks**: Accept options `{ onSuccess?, onError?(error) }`. Inside mutation: perform request, invalidate queries, then `options.onSuccess?.()` / `options.onError?.(error)`. No `toast`, no `useLingui`, no `getUserFacingErrorMessage`.
- **Convenience wrapper**: If generated hook expects `mutate({ id })`, export `mutate(id: string)` that calls `generated.mutate({ id })` so UI stays ID-based.
- **Imports**: Generated hooks/types, `@/shared/lib/api-error` for `ApiError`; no UI, no i18n.

## UI Layer

### Responsibilities and flow

- **Modal / root**: Dialog (or equivalent) and conditional content (`open && <Content />`). Content uses one orchestration hook and renders the right step (list vs create, etc.). No cleanup effect to “reset on close”—state resets naturally when content unmounts.
- **Orchestration hook**: Owns screen/step state, list data (from API hook), and action handlers (e.g. delete, create). Passes data and callbacks down. Form hook is used by the Screen that needs it, not by the View.
- **Screen**: Uses API/mutation/form hooks; handles toasts and navigation callbacks; passes derived props to a View. One Screen per “flow” (e.g. create flow).
- **View**: Receives only props; renders UI; may hold local UI state (dropdown open, etc.). No API or mutation hook imports. For list: one component that shows skeleton/empty/list, plus an item component. Name as View when it’s props-only.
- **Shared layout**: If multiple steps share the same chrome (title, back, container), extract a layout component; keep prop types consistent (e.g. `title` and `description` same type).
- How you group these into folders and how you name files is up to the module; the important part is separating orchestration (hooks, toasts, callbacks) from presentation (props only).

### Screen vs View

- **Screen**: Imports and uses `useXForm`, `useXMutation`, etc.; handles `onSuccess`/`onError` (toasts, navigation); passes to View: `form`, `isSubmitting`, `error`, `onBack`, etc.
- **View**: Receives only props; no import of API or mutation hooks. Can use `useLingui` for static labels/placeholders. Can hold local state (e.g. emoji picker open). Form/error props typed via `ReturnType<typeof useXForm>` so TanStack Form field types stay inferred.

### Lists and Loading

- Single loading prop per view: `isLoading`. Skeleton rendered inline in the same component that renders list/empty; structure mirrors final list/card layout. No API or mutation logic in the view; view only branches on `isLoading` and props.
- Prefer server-side filtering (API params) over client-side `.filter()` so the list is exactly what the user requested.

### Actions (e.g. Delete)

- Contract: `onDelete: (id: string) => void`; list item calls `onDelete(entity.id)`. Do not pass the full entity to the handler. Orchestration hook implements the handler and passes it down; API hook exposes a `mutate(id)`-style API so the UI stays ID-based.

## Forms (TanStack Form)

- **Defaults**: Inline in `useForm({ defaultValues: { ... } satisfies InputType })`. For nullable fields, use `null as string | null` if needed so validator schema and form type align.
- **Validation**: `validators: { onChange: schema }` with Zod schema from application layer.
- **View typing**: Use `ReturnType<typeof useXForm>["form"]` and `["error"]` for props so that `form.Field` render props are correctly typed and no manual generic for `ReactFormApi` is required.

## Barrels and Index

- Avoid barrel files (`index.ts` that re-exports) unless there is a clear need (e.g. public API surface). Prefer direct imports to the file that defines the component or hook.
- Avoid using array index as React key when a stable id is available (e.g. `entity.id`).

## Backend Alignment

- List endpoints: Prefer query params for filters (e.g. `whereRole=OWNER|MEMBER|ALL`) so the frontend does not re-filter the list client-side. After backend changes, run `npm run generate` in `apps/web` and use the new query param types in the API hook.
