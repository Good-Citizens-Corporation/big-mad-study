# Copilot instructions for `big-mad-study`

## General expectations

- This is a **Next.js 16** app using **TypeScript**, **App Router**, and **Yarn**.
- Prefer **functional React components** with hooks. Do **not** use class components.
- Use **semantic HTML** and aim for **WCAG AA/AAA** accessibility where reasonable.
- Keep dependencies minimal. Before suggesting a new dependency, check if it can be done with:
  1. the browser / Node standard library, or
  2. an existing dependency in `package.json`.

## Testing & XP workflow

- We follow **TDD / RED → GREEN → REFACTOR**.
- When adding new behavior, first:
  - Propose a **Vitest** unit test in `*.test.ts`/`*.test.tsx` under `src/`.
  - Use **React Testing Library** for component tests.
- When suggesting refactors, preserve existing tests and update them only when behavior intentionally changes.
- Treat failing tests and **Sonar** / **ESLint** issues as blockers.

## Linting, types, and CI

- Code must pass:
  - `yarn lint`
  - `yarn typecheck`
  - `yarn test --run`
  - `yarn build`
- Prefer **strict TypeScript**:
  - No `any` unless explicitly annotated and justified in a comment.
  - Narrow types instead of broad unions where possible.

## Project domain

This project powers **The Big-Mad Behavioral Study**:

- We collect **voice and SMS journals** about frustration with technology and work.
- We use **Twilio** for SMS/voice and **Whisper** for transcription.
- Data ultimately flows into a persistent store (e.g. Firestore / BigQuery) via a clean API layer.

When generating code:

- Keep Twilio/Whisper calls wrapped in small, testable services (no inline API calls inside React components).
- Isolate “research domain” logic (cohort assignment, journaling prompts, telemetry) into pure functions where possible.

## Style & structure

- Use **named exports** for most things; default exports only for Next.js route components.
- Prefer small, composable modules over “God” components.
- Use **JSDoc** only when the intent isn’t obvious from the types.
- Follow existing naming patterns:
  - `FDS_` / `BigMad_` prefixes for domain concepts are OK where already used.
  - Test files mirror the filename of the code under test.

## What NOT to do

- Don’t paste or invent fake API keys, secrets, or credentials.
- Don’t generate large boilerplate configuration files unless explicitly requested.
- Don’t weaken lint / TypeScript configs to “make the build pass.”