# Modules Agents Guide

This file defines the target rules for agents working under `src/modules`.

## Scope

- `src/modules` is a parallel target architecture.
- Nothing here is wired into the running app yet.
- Do not modify the existing implementation under `src/interfaces/http/routes` unless explicitly asked.
- Do not modify `@cookmate/domain`. It remains the source of truth for pure domain rules.

## Core Architecture

- Organize code by feature first: `recipe`, `collection`, etc.
- Split feature logic into `commands`, `queries`, `http`, and `infra`.
- Keep HTTP concerns inside `http/routes`.
- Keep Prisma, S3, auth, and other I/O inside `infra`.
- Keep business orchestration inside `commands` or `queries`.
- Prefer direct function exports such as `executeCreateRecipe(...)`.
- Do not introduce object-oriented `service.execute(...)` patterns by default.
- Do not add a factory such as `buildExecuteXxx(...)` unless there is a real and immediate need for injected dependencies.

## Route Responsibility

Each HTTP route folder may contain:

- `index.ts`: route registration
- `schema.ts`: HTTP request/response validation
- `handler.ts`: HTTP adapter only
- `select.ts`: read projection
- `where.ts`: list filter mapping
- `order-by.ts`: list sorting mapping

Handlers must stay thin:

- read `ctx`
- map HTTP input to command/query input
- call `executeXxx(...)`
- return `{ status, data }`

Handlers must not:

- call Prisma directly
- contain business rules
- build persistence payloads
- contain route-local `db-access.ts`
- contain route-local business `errors.ts`

## Commands

Use `commands/<name>/` for rich mutations:

- `create-*`
- `update-*`
- `delete-*` with side effects
- `sync-*`
- `import-*`
- `publish-*`
- `attach-*`

Recommended command structure:

```text
commands/<command-name>/
  contract.ts
  execute.ts
  deps.ts
  build-*.ts
  present-*.ts
  generate-*.ts
```

Rules:

- `execute.ts` is the orchestration entry point.
- `execute.ts` must stay short and readable.
- Extract heavy mapping or presentation logic into small local helpers.
- Use `deps.ts` only to declare real external dependencies of the command.
- Keep helpers local to the command unless they are clearly shared within the feature.
- Fail fast before expensive I/O whenever possible.

Use `contract.ts` when the command needs a shared input/output contract between the route and the command.

`execute.ts` should usually read like this:

1. validate cheap invariants early
2. compute identifiers or local values
3. call required infra dependencies
4. build persistence input
5. persist
6. present the result

## Queries

Use `queries/<name>/` for reads when a read has meaningful logic.

Simple reads may stay lightweight:

- route `handler.ts`
- route `select.ts` / `where.ts` / `order-by.ts`
- direct call to a reader in `infra`

Add `queries/<name>/execute.ts` only if the read has real orchestration value.

## Validation Rules

- HTTP boundary validation belongs in `schema.ts`.
- Shared command/query validation belongs in `contract.ts` when needed.
- Do not duplicate the same validation in both the route and the command without a clear reason.
- If the command builds a new internal payload, validate that built payload where it is constructed.

## Dependency Rules

- Prefer a small `deps.ts` over a global `ports/` layer.
- Keep dependency abstractions local to the command/query.
- Do not create repository interfaces just to mirror Prisma names.
- Introduce an abstraction only when it removes real coupling or clarifies orchestration.

## File Size and Extraction

- Avoid large monolithic `execute.ts` files.
- If `execute.ts` starts mixing orchestration, mapping, and presentation, extract helpers.
- Extract helpers for real responsibilities, not for trivial one-liners.
- Prefer several focused files over one bloated command file.

## Naming

- Public command entry points use direct names such as `executeCreateRecipe`.
- Public query entry points use direct names such as `executeListRecipes`.
- Builders use `build...`.
- Presenters use `present...` or `build...Result`.
- Generators use `generate...`.

## Route Type Defaults

- `create` / `update` / complex `delete`: use a command
- non-CRUD actions: use a command
- simple `get` / `list`: keep them light, use a query only if needed

## Practical Checklist

When creating or refactoring a route in `src/modules`:

1. Decide whether it is a command or a query.
2. Keep `schema.ts` as the HTTP boundary.
3. Keep `handler.ts` thin.
4. Put orchestration in `execute.ts`.
5. Put I/O in `infra`.
6. Extract mapping helpers if `execute.ts` gets noisy.
7. Reuse `@cookmate/domain` schemas, policies, and errors.
8. Do not wire the route into the running app unless explicitly asked.

## Anti-Patterns

- fat handlers
- `db-access.ts` inside route folders
- route-local business `errors.ts`
- duplicated validation layers
- one repository interface per Prisma call
- object wrappers whose only method is `.execute()`
- abstractions added "just in case"
