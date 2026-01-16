## Rules
- React: `<Trans>Label</Trans>` or `t\`Text\`` (via `useLingui()` from `@lingui/react/macro`)
- Non-React: `msg\`Text\`` (via `@lingui/macro`)
- Catalogues: `packages/i18n/locales/<locale>/messages.po`
- Commands: `npm run lingui:extract` → edit `.po` → `npm run lingui:compile`
- Never use: `useTranslate`, old i18n helpers

## Workflow
1. Identify context: React component/hook → `<Trans>`/`t\`...\``, Domain → `msg\`...\``
2. Detect old system: `useTranslate()`, old helpers, anti-patterns
3. Propose Lingui API: React JSX → `<Trans>`, React logic → `t\`...\``, Domain → `msg\`...\``
4. Migration plan: replace old calls, structure messages, imports (see `references/patterns.md`)
5. Catalogue update: extract → edit `.po` → compile
6. Verification: display in fr/en/de, no fallback, no old API residue, key consistency

## Output
1. i18n Context
2. Old Implementation Analysis
3. Proposed Lingui Strategy
4. Migration / Addition Plan
5. Catalogue Update
6. Functional Verification

## Guardrails
- Never reintroduce old API
- Never mix Lingui + old system
- Always use correct imports: `@lingui/react/macro`, `@lingui/react`, `@lingui/macro`
- Respect existing p
# Lingui Patterns Reference

## React Component

```tsx
import { useLingui } from '@lingui/react/macro';
import { Trans } from '@lingui/react';

const { t } = useLingui();

// In JSX
<Trans>Select anomaly type</Trans>

// In logic
message.success(t`Intervention successfully created`);
```

## ValueObject / Domain

```ts
import { msg } from '@lingui/macro';

const label = msg`Some domain text`;
```

## API Hooks

```tsx
import { useLingui } from '@lingui/react/macro';

const { t } = useLingui();
message.error(t`An error occurred while creating the intervention`);
```
