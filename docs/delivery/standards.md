# Big Mad Study, Delivery Standards

**This file is the single source of truth for ZOMBIES, SOLID, Clean Code, DRY, INVEST, the EPIC design record, and the gate list.** Nothing else in the repo restates these, the delivery cycle (`.claude/skills/deliver/SKILL.md`), the adversarial reviewer (`.claude/agents/adversarial-reviewer.md`), and the audit loop (`.claude/workflows/deliver-audit.js`) all link here. If a rule is wrong, fix it _here_ and every consumer follows.

For **how** a change is delivered (the cycle), see the `deliver` skill. This file is the **what**, the bar every change is held to.

> Adapted from the TerraQuotes delivery standards. The principles are unchanged; the gate list, the board, and the codebase reference are this repo's.

---

## The EPIC is the design record, protect it

**The EPIC issue is the highest-value artifact in this repo.** It is the one place carrying a **falsifiable hypothesis**: job story → hypothesis → success metrics → **null hypothesis** → telemetry contract → acceptance criteria. That frame is why we can tell whether work _succeeded_, not merely that it _merged_. A slice with no parent EPIC is a diff with no why, unfalsifiable by construction.

This repo is unusual in that the hypotheses were written down **before** any data was collected, in public, where participants can read them. That is a claim the landing page now makes out loud. Weakening the EPIC discipline makes the site dishonest, not just the process sloppy.

Rules:

- **Every slice has a real parent.** Not a string in the body, a **native sub-issue link**, so the EPIC carries live `subIssuesSummary` progress and the linkage is queryable.
- **The EPIC template is filled in full.** Every section. A hypothesis you can't disprove isn't a hypothesis, so the **null hypothesis (H0)** is mandatory, not decoration.
- **Slices cite the hypothesis they advance.** A slice that can't say which part of its EPIC's hypothesis it tests is either mis-parented or unnecessary.
- **The EPIC is not done when its slices merge, it's done when its hypothesis is evaluated.** At close, state the success metrics against their targets and whether H0 survived. "All slices merged" is not an outcome; it's an activity report.

---

## INVEST, every change, not just slices

Every unit of work is **I**ndependent, **N**egotiable, **V**aluable, **E**stimable, **S**mall, **T**estable. If any letter is false, split it or convert it to a SPIKE/CHORE, do not start it.

The two that actually get violated:

- **Independent**, it must merge on its own. If it needs another change to land first, it is not a separate unit; it is half of one.
- **Small**, it must merge safely in ≤ 1 focused day. "Small" is about _reviewable blast radius_, not line count.

---

## The gate list (real, not aspirational)

Run all of these locally before opening a PR. Each maps to a CI check in `.github/workflows/ci.yml` that will fail the PR if you skip it.

```bash
yarn lint        # eslint . --ext .js,.jsx,.ts,.tsx  → CI "Lint"
yarn typecheck   # tsc --noEmit                      → CI "Typecheck"
yarn test        # vitest run                        → CI "Unit tests"
yarn build       # next build                        → CI "Build"
```

Rules:

- **All four must pass. No suppression.** Do not silence a rule to get green; fix the code, or annotate with an `eslint-disable-next-line ... -- <reason> (#issue)` naming why the rule genuinely cannot apply.
- **`yarn ci` is currently broken and is not the gate.** It chains `yarn test:ci`, which needs `@vitest/coverage-v8`, not installed. Until that dependency lands, run the four commands above individually. Do not report `yarn ci` as passing; it does not run.
- **Coverage is not gated and not measured.** There is no threshold and no upload. Do not claim a coverage gate that does not exist.
- **E2E now runs in CI** (`E2E & accessibility` job, added by SLICE-03), as well as on the husky `prepush` hook. `--verbose` prints the Gherkin AC log. It covers BM-E2E-01 through -04, including the axe/keyboard/heading accessibility baseline.
- **Two PR guards run on top of CI**, and both are title-sensitive:
  - `pr-title-guard`, the PR title must start with `EPIC:` or `SLICE:`.
  - `slice-test-guard`, a `SLICE:` PR must change at least one `*.test.*` / `*.spec.*` file. A slice with no test change cannot merge, by design.
- **Prettier is not enforced by CI.** `yarn format` writes; there is no check script and no CI job. Run it anyway, but do not describe it as a gate.

---

## Contrast is a gate, enforced by test

`src/app/palette.test.ts` reads the design tokens out of `src/app/globals.css` and asserts their WCAG ratios. It is not decoration: the light palette put every token within a few points of failing, and the numbers are not eyeballable.

- Text tokens (`--ink`, `--ink-soft`, `--accent`) must clear **AAA (7:1)** on both `--paper` and `--paper-alt`.
- `--rule` bounds interactive controls and must clear **3:1** (WCAG 1.4.11).
- `--hairline` is decorative and is asserted to stay _below_ 3:1. If you need a line around a control, use `--rule`, do not darken the hairline.

Changing a token without running this suite is how the palette silently regresses.

---

## ZOMBIES, test ordering and coverage

Write tests in this order. Each letter must have at least one named test before the change is done, or a stated reason it does not apply.

|       | Letter    | Covers                                                           |
| ----- | --------- | ---------------------------------------------------------------- |
| **Z** | Zero      | zero / null / empty / absent input                               |
| **O** | One       | a single valid input                                             |
| **M** | Many      | multiple items (collections, repetition, ordering)               |
| **B** | Boundary  | edge of the valid range; idempotency; off-by-one                 |
| **I** | Interface | the contract itself, does the signature make sense to a caller? |
| **E** | Exception | error propagation; what throws, what swallows                    |
| **S** | Simple    | the happy path, end to end                                       |

Zero comes first. Beyond that the order is a judgment call, pick the case that reveals the most about the design.

---

## SOLID, evaluated at every refactor

|       | Principle             | The question to ask                                                                                                 |
| ----- | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **S** | Single Responsibility | Does this unit have exactly one reason to change? Copy is not in the component; layout is not in the content model. |
| **O** | Open/Closed           | Does adding a new case require _modifying_ this unit, or can it accept what the caller passes?                      |
| **L** | Liskov Substitution   | Does every implementation honor the full interface contract?                                                        |
| **I** | Interface Segregation | Does the interface declare only what callers actually need?                                                         |
| **D** | Dependency Inversion  | Do components depend on the type, or on a concretion they shouldn't know about?                                     |

**Altitude rules for this repo:**

- `src/content/**` is data, not markup. A slide describes _what is said_; `components/Slide*` decides _how it looks_. Never put class names or JSX in content.
- `src/lib/types.ts` is a leaf, it imports nothing from the app.
- A field that no longer renders comes out of the type. A dead optional field is how the next person reintroduces it.

---

## Clean Code gates

- No method longer than 20 lines
- No parameter list longer than 3 items (a typed object counts as 1)
- No `// TODO` in committed code
- No inline comment that restates what the code does, rename the symbol instead. The only sanctioned doc comment is JSDoc on exported functions, classes, and types.
- Every name is a verb phrase for functions, a noun phrase for types and variables
- Names reveal intent

---

## DRY gates

- No design value hardcoded in a component, it belongs in a token in `globals.css`
- No type duplicated from `src/lib/types.ts`, import from the source
- No second event-emitting path: telemetry goes through `track()` in `src/lib/telemetry.ts`
- Copying >3 lines of logic is a signal to extract a function

---

## Test integrity

A test that cannot fail is worse than no test, it buys false confidence.

- **Mutation is the proof.** Before trusting a test, break the implementation and watch the test go red. If it stays green, the test is decoration.
- **No tautologies.** A test must not assert the implementation back to itself.
- No `expect(true)`, no `.skip`/`.todo` left in committed code, no assertion deleted to reach green.
- **A test that imports through `@/` must import a _value_ to prove the alias works.** Type-only imports are erased before Vite resolves them, a suite can pass while the alias is broken, which is exactly how the missing vitest `resolve.alias` went unnoticed.

---

## Codebase quick reference

| Need                        | Pattern                                     | File                        |
| --------------------------- | ------------------------------------------- | --------------------------- |
| Landing copy                | add/edit a `Slide` in `publicHomeSlides`    | `src/content/publicHome.ts` |
| Slide shape                 | `Slide`, `SlideBodyItem`, `SlideCTA`        | `src/lib/types.ts`          |
| Emit an event               | `track(name, props)`                        | `src/lib/telemetry.ts`      |
| Design tokens               | `--paper` / `--ink` / `--accent` / `--rule` | `src/app/globals.css`       |
| Contrast guard              | reads tokens, asserts WCAG                  | `src/app/palette.test.ts`   |
| E2E with Gherkin AC logging | `runStep(<GIVEN/WHEN/THEN>, fn)`            | `e2e/BM-E2E-*.spec.ts`      |

---

## What the standards do not decide

- Which ZOMBIES case comes first beyond Zero, pick what reveals the most about the design.
- Whether an abstraction should be extracted, the tests tell you. Three tests sharing setup indicate an extraction.
- How to name things beyond "verb phrase for functions", name what it does, not what it is.

These are judgment calls. They belong to the engineer, not the checklist.
