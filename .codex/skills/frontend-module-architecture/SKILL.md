---
name: frontend-module-architecture
description: Enforces strict frontend module architecture for apps/web/src/modules (domain, application, api, ui). Use when creating or refactoring a module, designing list/create/delete flows, modal sub-flows, API hooks, entities, mappers, or when the user asks for module conventions, Screen/View split, or mutation feedback patterns.
---

# Frontend Module Architecture

## When to Apply

- Creating a new module under `apps/web/src/modules/<ModuleName>/`
- Refactoring an existing module (list, create, delete, modal)
- Adding API hooks, entities, mappers, or UI screens/views
- Deciding where toasts, callbacks, or loading state live
- Naming components (Screen vs View), handlers (ID vs entity), or files

## Core Principles

1. **No cross-module imports** — each module is self-contained.
2. **One API hook per call** — no multi-call “overview” hooks in `api/`.
3. **Mappers only map** — API DTO → domain entity (`toDomain`); no UI logic.
4. **Domain entity = class** — one class per entity, props + getters only; no getter that returns the full raw props object.
5. **Screen = orchestration, View = presentation** — Screen uses hooks, toasts, callbacks; View receives props and renders only.
6. **Mutations: callbacks at API, feedback at UI** — API hooks expose `onSuccess`/`onError`; UI layer owns toasts and i18n.

## Layer Checklist

| Layer      | Allowed | Forbidden |
|-----------|---------|-----------|
| **domain/** | Entity class, props interface, getters per prop, domain methods | Raw “get entity” getter, UI imports |
| **application/** | Zod schemas, input types, mapper `toDomain` only | Default value constants for forms, UI imports |
| **api/** | One hook per endpoint, query invalidation, optional callbacks | `toast`, `useLingui`, `getUserFacingErrorMessage` |
| **ui/** | Screens (orchestration), Views (props-only), hooks that own state/callbacks | API/mutation hooks inside View components |

## Naming Rules

- **Screen** — component that uses hooks, handles toasts/callbacks, passes data to a View.
- **View** — component that only receives props and renders; no API/mutation hook imports.
- **List “Screen” vs “View”** — if it only receives `collections`, `isLoading`, `onDelete`, etc., name it `*ListView`, not `*ListScreen`.
- **Handlers** — use IDs for actions: `onDelete: (id: string) => void`, not `(entity: Entity) => void`; caller passes `entity.id`.
- **Loading prop** — use a single name per flow, e.g. `isLoading` (not `isSkeleton` / `isDataLoading` in the same view).

## Mutation Feedback (Toasts)

- **API hook**: accepts `onSuccess?`, `onError?(error)`, performs mutation and query invalidation, calls callbacks; no `toast` or i18n.
- **UI (Screen or modal hook)**: passes callbacks to the API hook; inside callbacks uses `toast.success` / `toast.error(getUserFacingErrorMessage(t, error))`.

## Forms (TanStack Form)

- **Default values** — inline in `useForm({ defaultValues: { ... } satisfies InputType })`; do not export a separate default-values constant from application layer.
- **View props** — type form/error from the hook: `form: ReturnType<typeof useCreateThingForm>["form"]`, `error: ReturnType<typeof useCreateThingForm>["error"]` so field inference stays correct.

## Modal / Sub-flows

- **Modal container** — only Dialog + conditional `{open && <Content />}`; no cleanup effect for reset (state resets on unmount).
- **Content** — uses one modal hook (screen state, list data, delete/create handlers); renders Screen or View by `screen`.
- **Create flow** — CreateScreen (hook + toasts + callbacks) → CreateView (form UI only; local UI state e.g. emoji picker open is allowed in View).
- **List flow** — ListView receives `collections`, `isLoading`, `onCreate`, `onDelete(id)`, `isDeleting`; skeleton inline in same view, one `isLoading` branch.

## Loading / Skeleton

- **Inline** — skeleton lives in the same View that renders list/empty/content; one loading prop (`isLoading`).
- **Shape** — skeleton mirrors final list/card layout; no extra loading components unless complexity justifies it.
- **No API in View** — View does not call useQuery/useMutation; it only branches on `isLoading` and props.

## How to Organize UI (Concepts)

- **Entry point**: One root (e.g. modal or page) that mounts content conditionally; content holds the “current step” and renders the right Screen or View.
- **Orchestration in one place**: One hook (e.g. modal hook) owns screen state, list data, and action handlers; it passes data and callbacks down. Form hook owns form state and submit; it is used by the Screen that owns toasts/callbacks.
- **Screen vs View**: Put anything that uses API/mutation hooks and toasts in a Screen; put pure rendering (props only) in a View. Same idea for list: if the list only receives data + callbacks, treat it as a View and name accordingly.
- **Shared layout**: If several “steps” share the same chrome (title, back, container), extract a layout component; keep its props simple and consistent (e.g. both title and description as `string`).
- Structure folders and file names to reflect these roles; exact names and depth can vary by module.

## Backend / API

- Prefer server-side filters (e.g. `whereRole`) over client-side filtering; frontend calls API with params, no redundant `.filter()` on already-fetched list.
- After changing API query params, run `npm run generate` in `apps/web` to refresh kubb types; use generated types for hook params.

## Verification

- [ ] No imports from other modules.
- [ ] Mutation hooks in `api/` do not show toasts or use i18n; they expose callbacks only.
- [ ] Entity exposes props via getters only; no getter that returns the full raw entity/props object.
- [ ] List that is props-only is named as a View (or equivalent); Screen is reserved for orchestration.
- [ ] Action handlers (e.g. delete) take an id; caller passes `entity.id`.
- [ ] View components do not import API or mutation hooks.
- [ ] Form defaults are inlined in the form hook; View receives form/error typed from that hook’s return type.

## Additional Resources

- Layer-by-layer rules, glossary, and edge cases: [reference.md](reference.md)
- Code snippets (create/list/delete, entity, mapper): [examples.md](examples.md)
