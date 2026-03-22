# Repository Guidelines

## Agent Expectations (Senior Standard)
- Read existing code before changing it; understand the flow and local conventions first.
- Do not invent APIs, scripts, or structures. If something is unclear, verify in the repo or ask.
- Make minimal, targeted changes; avoid refactors that were not requested.
- Prefer clarity and correctness over speed; keep changes consistent with current patterns.
- Document assumptions and impacts in your change description.
- Do not add new libraries without explicit request.

## Project Structure & Module Organization
TypeScript monorepo with Yarn workspaces and Turborepo.

## Build, Lint, and Development Commands
Run from repo root unless noted:
- `make install` or `yarn install --frozen-lockfile` to install dependencies.
- `yarn dev` to start dev tasks via Turborepo.
- `yarn dev --filter=@cookmate/web` to focus a single app (example).
- `yarn --cwd apps/api dev` to run the API locally.
- `yarn build`, `yarn lint`, `yarn format`, `yarn typecheck` for quality checks.
- `yarn --cwd apps/api prisma:migrate:dev` for Prisma migrations.

## Coding Style & Naming Conventions
- Biome is the source of truth (`biome.json`): 2-space indent, 100-char line width.
- TypeScript ESM modules; keep code in `src/` and follow existing file patterns.
- Shared logic lives in `packages/`; app-specific logic stays in `apps/<name>/`.

## Frontend Module Rules (apps/web/src/modules)
- No imports between modules; each module is self-contained.
- One API hook per call under `api/` (no multi-call overview hooks).
- Mappers only map API DTOs to domain entities (`toDomain`).
- `packages/domain` contains business entities; frontend UI aggregates consume them.
- Build UI aggregates inside the module (aggregate = entity that composes entities/VOs + UI data).
- Shared UI/utilities belong in `apps/web/src/shared`.

## Environment & Tooling
- Node `24.11.1` (see `.nvmrc`) and Yarn `1.22.22`.

## MCP Tool Usage Guidelines

Use Distill MCP tools for token-efficient operations:

### Rule 1: Smart File Reading

When reading source code files for **exploration or understanding**:

\`\`\`
mcp__distill__smart_file_read filePath="path/to/file.ts"
\`\`\`

**When to use native Read instead:**
- Before editing a file (Edit requires Read first)
- Configuration files: `.json`, `.yaml`, `.toml`, `.md`, `.env`

### Rule 2: Compress Large Outputs

After Bash commands that produce large output (>500 chars):

\`\`\`
mcp__distill__auto_optimize content="<paste the large output>"
\`\`\`

### Rule 3: Code Execution SDK for Complex Operations

For multi-step operations, use `code_execute` instead of multiple tool calls (**98% token savings**):

\`\`\`
mcp__distill__code_execute code="<typescript code>"
\`\`\`

**SDK API (`ctx`):**

*Compression:*
- `ctx.compress.auto(content, hint?)` - Auto-detect and compress
- `ctx.compress.logs(logs)` - Summarize log output
- `ctx.compress.diff(diff)` - Compress git diff
- `ctx.compress.semantic(content, ratio?)` - TF-IDF compression

*Code:*
- `ctx.code.parse(content, lang)` - Parse to AST structure
- `ctx.code.extract(content, lang, {type, name})` - Extract element
- `ctx.code.skeleton(content, lang)` - Get signatures only

*Files:*
- `ctx.files.read(path)` - Read file content
- `ctx.files.exists(path)` - Check if file exists
- `ctx.files.glob(pattern)` - Find files by pattern

*Git:*
- `ctx.git.diff(ref?)` - Get git diff
- `ctx.git.log(limit?)` - Get commit history
- `ctx.git.status()` - Get repo status
- `ctx.git.branch()` - Get branch info
- `ctx.git.blame(file, line?)` - Git blame for a file

*Search:*
- `ctx.search.grep(pattern, glob?)` - Search for pattern in files
- `ctx.search.symbols(query, glob?)` - Search for symbols (functions, classes)
- `ctx.search.files(pattern)` - Search files by pattern
- `ctx.search.references(symbol, glob?)` - Find references to a symbol

*Analyze:*
- `ctx.analyze.dependencies(file)` - Analyze imports/exports
- `ctx.analyze.callGraph(fn, file, depth?)` - Build call graph
- `ctx.analyze.exports(file)` - Get file exports
- `ctx.analyze.structure(dir?, depth?)` - Directory structure with analysis

*Utilities:*
- `ctx.utils.countTokens(text)` - Count tokens
- `ctx.utils.detectType(content)` - Detect content type
- `ctx.utils.detectLanguage(path)` - Detect language from path

**Examples:**

\`\`\`typescript
// Get skeletons of all TypeScript files
const files = ctx.files.glob("src/**/*.ts").slice(0, 5);
return files.map(f => ({
  file: f,
  skeleton: ctx.code.skeleton(ctx.files.read(f), "typescript")
}));

// Compress and analyze logs
const logs = ctx.files.read("server.log");
return ctx.compress.logs(logs);

// Extract a specific function
const content = ctx.files.read("src/api.ts");
return ctx.code.extract(content, "typescript", { type: "function", name: "handleRequest" });
\`\`\`

### Quick Reference

| Action | Use |
|--------|-----|
| Read code for exploration | `mcp__distill__smart_file_read filePath="file.ts"` |
| Get function/class | `mcp__distill__smart_file_read filePath="file.ts" target={"type":"function","name":"myFunc"}` |
| Compress build errors | `mcp__distill__auto_optimize content="..."` |
| Summarize logs | `mcp__distill__summarize_logs logs="..."` |
| Multi-step operations | `mcp__distill__code_execute code="return ctx.files.glob('src/**/*.ts')"` |
| Before editing | Use native `Read` tool |

