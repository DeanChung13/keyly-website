# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- Read `CONTEXT.md` at the repo root when it exists.
- Read ADRs under `docs/adr/` that touch the area being explored.
- If either location does not exist, proceed silently. Create domain files lazily through domain modeling when terms or decisions are actually resolved.

## File structure

This is a single-context repository:

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
└── src/
```

## Use the glossary's vocabulary

Use terms as defined in `CONTEXT.md` in issue titles, hypotheses, tests, and plans. If a needed concept is absent, reconsider whether it is real domain language or capture it through domain modeling.

## Flag ADR conflicts

Surface contradictions with existing ADRs explicitly instead of silently overriding them.
