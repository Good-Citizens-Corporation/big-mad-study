---
name: deliver
description: The Big Mad Study delivery cycle — take one issue from branch to PR via strict TDD, SOLID-driven refactor, and a looping adversarial audit that gates on quality. Use when implementing any issue, slice, chore, or bug fix.
---

# Deliver

One issue → one branch → one PR to `main`. Small, reliable, traceable changes; kanban flow.

**The bar every change is held to lives in [`docs/delivery/standards.md`](../../../docs/delivery/standards.md)** — ZOMBIES, SOLID, Clean Code, DRY, test integrity, the contrast gate, and the gate list. Read it. This skill does not restate it; if the two ever disagree, the standards win.

Deviating from this cycle is a defect in the process, not a judgment call. The judgment calls are named explicitly at the end.

> Adapted from the TerraQuotes `deliver` skill.

---

## 0. Pick

Take the issue from the **Big Mad Study** project board (Status=Ready), lightest first. Read the **full issue body** — it is the authoritative spec, including its **Out of scope**. Then read its **parent EPIC**: the slice tells you _what_, the EPIC tells you _why_ and how you'll know it worked. Name which part of the EPIC's hypothesis this slice advances; if you can't, it's mis-parented or unnecessary.

Confirm **INVEST** (standards) before starting. If any letter is false, split it or convert it — don't start it.

Move the issue to **In progress** _now_, not later. A board that lags the work is worse than no board.

If the spec is wrong, ambiguous, or impossible: **stop and say so.** Do not improvise a different design.

---

## 1. Branch

```bash
git checkout main && git pull --ff-only
git checkout -b <issue>-<type>-<short-name>    # matches the existing convention, e.g. 10-slice-epic-01-big-mad-story-value-prop
git branch --show-current                       # verify — never work on main
```

PRs go **to `main`**.

---

## 2. Scope it to one testable unit

One change = one behavior that can be driven by tests. The unit is the **behavior**, not the file count.

If you cannot name the single behavior in one sentence, the scope is wrong.

---

## 3. Red — no code without a failing test first

Write **exactly one** test. Select the case by **ZOMBIES** ordering (see standards). The test must:

- assert one specific behavior
- have a name that reads as a sentence describing what the system does — for acceptance criteria, name it in GIVEN/WHEN/THEN form so the test and the issue read the same
- follow the `describe → it` structure of neighbouring test files

```bash
yarn test <path>    # targeted while iterating
```

**Required outcome: it fails, for the reason you intended.** If it passes before the implementation exists, the test is trivially true — rewrite it. A test that never went red is not evidence. Read the failure message: a suite that fails to _resolve an import_ is not a red test, it's a broken harness.

---

## 4. Green — the simplest thing that passes

Write the **minimum** implementation to pass that one test, within the SOLID/Clean Code bar in the standards.

Minimum means minimum:

- if a hardcoded return value passes the test, write that
- no code for cases no test covers yet
- no generalization — let the next test force it

Run the gate list (standards). All must pass.

---

## 5. Commit (green)

```bash
git branch --show-current                       # verify first
git add <explicit paths>                        # never -A
git commit -m "test+impl: <ZOMBIES case> — <what this cycle proved>"
```

**Repeat 3→5 until every ZOMBIES letter is covered** (or you can state why one doesn't apply). One test at a time. Do not batch.

---

## 6. Refactor the implementation

Now — and only now — reduce complexity. Evaluate against **SOLID + Clean Code + DRY** (standards). Extract constants and helpers with a focus on **common domain language**: the names are the deliverable as much as the logic.

Tests must stay green throughout; if a refactor needs a test changed, the refactor is changing behavior — stop and reconsider.

Commit separately: `refactor: <what and why>`.

---

## 7. Content and design changes carry extra proof

**Fires when:** the change touches `src/content/**`, `src/app/globals.css`, or any component's visual output.

- A token change runs `src/app/palette.test.ts`. Contrast is not eyeballable.
- A layout or landmark change runs `yarn test:e2e`. CI does not.
- A visual change is **looked at** before it is claimed — build output proves compilation, not appearance. Screenshot the running app.

Say in the PR which of these applied and which did not.

---

## 8. The adversarial audit loop

This is the quality gate. Run it via the orchestrated workflow:

```
Workflow({ name: 'deliver-audit', args: { issue: <N>, branch: '<branch>' } })
```

Or invoke `.claude/agents/adversarial-reviewer.md` directly per round. **Design (why it terminates and why it can't be gamed):**

- **A fresh reviewer every round.** No memory of prior rounds, so it cannot be worn down.
- **A different lens every round** — round 1 _correctness & spec_, round 2 _maintainability & extendability_, round 3 _adversarial: write a test this implementation fails_. Perspective diversity catches what redundancy can't.
- **Blocking bar = MEDIUM.** Loop while any finding ≥ MEDIUM survives; fix, re-commit, re-review with a new agent.
- **Exit = two consecutive rounds with zero findings ≥ MEDIUM.** One clean round can be a lazy reviewer.
- **Hard cap = 3 fix rounds.** Hitting the cap with a MEDIUM still open → **stop and escalate. Do not open the PR.**
- **Surviving LOWs are disclosed, never dropped** — they go in the PR body under _Accepted residuals_ with the reason.
- **"Clean" must be falsifiable.** A reviewer returning clean must state what it checked and how.
- **Mutation is mandatory.** The reviewer must break the implementation and confirm a test goes red — reading tests is not reviewing them.

Commit any fixes from each round. Final commit when the loop exits clean.

---

## 9. Gates

Run the **full real gate list** from the standards — `yarn lint`, `yarn typecheck`, `yarn test`, `yarn build`, individually. Plus `yarn test:e2e` if the diff touches routing, landmarks, or the landing page.

Do not run `yarn ci` and report it as the gate; it is broken (see standards).

---

## 10. PR to main

```bash
git push -u origin <branch>
GH_PAGER="" gh pr create --base main --head <branch> --title "SLICE: ..." --body-file <file>
```

**The title must start with `EPIC:` or `SLICE:`** — `pr-title-guard` fails the PR otherwise. A `SLICE:` PR must also change at least one test file, or `slice-test-guard` fails it.

Body includes:

- ZOMBIES coverage: one line per letter (or why it doesn't apply)
- Acceptance criteria: each `- [ ]` from the issue → the test that covers it
- Audit loop: rounds run, findings fixed, **accepted residuals**
- Verification evidence: real numbers (test counts, contrast ratios, E2E AC log), not "tests pass"

Move the issue to **In review**. On merge → **Done**.

**Never merge without Bob's explicit per-PR go-ahead.**

---

## The board is a live signal

| Trigger        | Column                                       |
| -------------- | -------------------------------------------- |
| Work starts    | In progress                                  |
| PR opened      | In review                                    |
| PR merged      | Done                                         |
| Blocked on Bob | Needs decision (+ the question as a comment) |

---

## What this cycle does not decide

- Which ZOMBIES case comes first beyond Zero
- Whether an abstraction should be extracted — three tests sharing setup is the tell
- Naming, beyond "verb phrase for functions, noun phrase for types"

These belong to the engineer. Everything above does not.
