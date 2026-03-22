# Agent Rules - Cookmate Web

## Stack
Next.js 15 (App Router) • TypeScript strict • Tailwind • shadcn/ui • TanStack Query • Zod

## Commands
```bash
yarn run lint        # ESLint
yarn run format      # Format code
yarn run typecheck   # Type check
npx shadcn@latest add <component>
```

## Architecture

```
src/
├── app/                        # Routes only (no logic)
├── modules/<Feature>/          # Bounded contexts (PascalCase)
│   ├── domain/                 # Entities, VOs (NO React)
│   ├── application/           # Services, schemas, mappers (Result<T>)
│   ├── api/                   # SDK wrappers + useQuery/useMutation hooks
│   └── ui/                    # Components + UI hooks (view state only)
├── shared/                     # Cross-module (ONLY allowed import)
├── shared/ui/primitives/       # shadcn primitives
└── styles/                     # globals.css, theme tokens
```

**Data flow:** `Component → api/useQuery → application service → SDK → API`

## Core Rules (non-negotiable)

- **No cross-module imports** — shared/ only
- **No fetch in components** — TanStack Query via hooks
- **No business logic in ui/** — domain/ + application/ only (UI hooks can manage view state)
- **shadcn for all primitives** — add via CLI, never copy-paste

## Layer Contracts

| Layer | Contains | Rules |
|-------|----------|-------|
| `domain/` | Entity, VO (`@cookmate/domain-driven-design`) | No React, private ctor + `create()` factory |
| `application/` | Services (`Result<T>`), Schemas (Zod), Mappers | Orchestration only |
| `api/` | SDK wrappers, useQuery/useMutation hooks | `invalidateQueries()` on success |
| `ui/` | Components + UI hooks | View state only, call hooks (never services directly) |

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Module folders | PascalCase | `MealPlans/` |
| Layer folders | lowercase | `domain/`, `ui/` |
| Components | PascalCase.tsx | `WeeklyPlanner.tsx` |
| Hooks | useCamelCase.ts | `useRecipes.ts` |
| Domain files | camelCase.entity.ts / .vo.ts | `recipe.entity.ts` |
| Services | camelCase.service.ts | `recipe.service.ts` |
| Schemas | camelCase.schema.ts | `recipe.schema.ts` |

## UI Architecture

**📚 See `.cursor/rules/ui-architecture.mdc` for complete UI rules** (auto-loaded when working in `src/modules/**/ui/**/*`)

### Quick Reference

```
ui/
├── <Feature>Screen.tsx    # Container: loading/error/data → View
├── <Feature>View.tsx      # Pure presentation (props only)
├── components/            # UI components (subfolders if 3+ related files)
├── hooks/                 # ALL UI hooks (forms, filters, view state)
└── states/                # Loading/error/empty states
```

**Key Rules:**
- **Forms**: TanStack Form only → `Collections/ui/create/useCreateCollectionForm.ts`
- **Filters**: Pattern → `Recipes/ui/hooks/useQuickFilters.ts`
- **Components**: Decouple if >300 lines OR distinct logic
- **Subfolders**: Create if 3+ related files OR distinct feature
- **Naming**: Feature prefix for hooks/states/screen/view, NOT for components in subfolders

### Design Guidelines

- Semantic color tokens from theme (`SHADCN_THEME.css` + `globals.css`)
- **shadcn/ui** for all primitives (add via CLI)
- Accessible patterns: semantic HTML, proper labels, focus states, keyboard navigation
- Empty/loading/error states mandatory for data views
- Consistent spacing scale, clear hierarchy, mobile-first
- Prefer composition over one giant component

## Do

- `@/` alias for imports
- `cn()` for conditional classes
- CSS variables (`--primary`, `--background`)
- Early returns, small components (<100 lines)
- Named exports, interfaces for props
- Empty/loading/error states for all data views

## Don't

- Hardcode colors or random px values
- Create god components
- Use enums (use `as const` objects)
- Add libraries without asking

## Checklist

Before finishing a change:

- [ ] Correct layer + module placement?
- [ ] UI uses **shadcn** components?
- [ ] Tailwind is clean (no noisy class soup)?
- [ ] TanStack Query keys are consistent?
- [ ] Mutations invalidate the right queries?
- [ ] No dead code?
- [ ] No TODOs?
- [ ] No new libraries added (unless explicitly requested)?
