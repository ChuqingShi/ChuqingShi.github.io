# 03 · TypeScript in this codebase

## Concept

TypeScript is JavaScript plus **type annotations** that are checked before the code runs and then erased. It is close to Python with type hints and `mypy`, with one important difference: `npm run typecheck` (and `npm run build`) refuse to continue when a type is wrong, so a typo in a field name stops the build instead of reaching visitors.

| TypeScript | Python equivalent (roughly) |
| --- | --- |
| `type Project = { id: string; tags: string[] }` | `class Project(TypedDict): id: str; tags: list[str]` |
| `subtopic?: string` (optional field) | `subtopic: NotRequired[str]` |
| `'live' \| 'local'` (union of literal strings) | `Literal['live', 'local']` |
| `string \| Placeholder` | `str \| Placeholder` |
| `Record<NoteType, string>` | `dict[NoteType, str]` where every key must be present |
| `function f<T>(x: T)` | `def f(x: T)` with `T = TypeVar('T')` |
| `const` | a name that can't be reassigned (the object itself can still change) |
| `x?.y` | `x.y if x is not None else None` |
| `x ?? 'default'` | `x if x is not None else 'default'` |
| `(a) => a * 2` | `lambda a: a * 2` |
| `` `Hello ${name}` `` | `f"Hello {name}"` |
| `import type { Note } from …` | `from typing import TYPE_CHECKING` imports: types only, gone at runtime |

## Why here

Content is edited by hand. Types make sure every milestone, project and note has the fields the components need, and that a project status can only be one of the four statuses in `plan.md`.

## Find it in code

- `src/content/types.ts`: every content shape. Read it first; the rest of the code leans on it.
  - `Fillable = string | Placeholder` and the **type guard** `isPlaceholder(...)`. After `if (isPlaceholder(value))`, TypeScript knows `value` is a `Placeholder` inside the `if` and a `string` after it. This is *narrowing*; Python's `isinstance` plays the same role for mypy.
  - `ProjectStatus = 'live' | 'local' | 'in-development' | 'experimental'`: try `status: 'online'` in `src/content/projects.ts` and the typecheck fails.
- `src/components/StatusBadge.tsx`: `Record<ProjectStatus, string>` means "a label for every status". Add a fifth status to the union and TypeScript points at this object until you give it a label.
- `src/lib/notes.ts`: `parseNote` turns untyped Markdown metadata into a typed `Note`, checking each field at runtime. Types are erased when the code runs, so data from outside the program (files, user input) still needs real checks.
- `src/content/profile.ts`: `as const` makes every value read-only and as specific as possible.

## Try it yourself

In `src/content/projects.ts`, change LyricLens's `status: 'local'` to `status: 'deployed'`.

## Verify

```bash
npm run typecheck
```

Expect an error naming the file and line, saying `"deployed"` is not assignable to `ProjectStatus`. Change it back and run the command again: no output means no errors.
