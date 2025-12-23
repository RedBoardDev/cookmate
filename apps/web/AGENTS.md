# apps/web — Agent Guide

## Scope
- Work only inside `apps/web` for frontend tasks.
- Backend API is external (Fastify). Web only consumes REST API.

## Architecture (front only)
```
apps/web/src/
  app/                      # Next App Router (pages/layouts)
  modules/                  # Feature modules
    <feature>/
      domain/               # Types and UI domain models (front only)
      application/          # UI use-cases, state, queries (TanStack Query)
      api/                  # API layer (OpenAPI SDK wrappers)
      ui/                   # Components + sections
      mappers/              # DTO -> ViewModel (optional)
  ui/                       # Design system (shadcn components live in ui/components/ui)
  shared/                   # Cross-feature utils (query client, env, utils)
  styles/                   # globals.css (Tailwind + theme tokens)
```

## Data flow
UI -> application (queries/hooks) -> api (SDK) -> REST API

## Rules
- No backend/domain logic in the frontend.
- Use TanStack Query for all remote data.
- API calls go through the SDK wrappers in `modules/*/api`.
- Use `@/` alias for imports inside `src`.
- Keep `shared/` minimal (query client, env, utils).
- Add shadcn components via CLI so paths stay aligned with `components.json`.

## Naming
- Folders: kebab-case (e.g. `meal-plans`)
- Components: PascalCase
- Hooks: `useXxx`
- Services: `*-service.ts`
