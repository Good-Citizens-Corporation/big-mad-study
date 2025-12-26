# Big-Mad Study Web

This repo powers the web front-end for **The Big-Mad Behavioral Study** – an open, voice-first research project from [Good Citizens Corporation](https://goodcitizens.us) about how frustration builds up and where it goes in a world full of automation, AI, and algorithmic nudging.

The goal of this codebase is twofold:

1. Run the actual participant experience (screener, journaling, basic results).  
2. Serve as a reusable, public example of **research-friendly, test-driven, telemetry-aware** product practice.

---

## What this app does (MVP)

In the first phase, this Next.js app will:

- Host the **public study landing page** and FAQ.  
- Run the **pre-study screener** to sort participants into cohorts (Heavy-AI, Light-AI, Low-AI).  
- Offer an accessible, mobile-first path into **voice and SMS journaling** (via Twilio + Whisper) once the pipeline is live.  
- Provide a simple **participant portal** where people can:
  - See their invitation / cohort, and  
  - Get their daily prompt link or call/SMS instructions.

Later phases (tracked in GitHub issues) will add:

- A ResearchOps view for sample health and completion tracking.  
- Export pipelines for analysis (e.g., Firestore → BigQuery / Airtable / Notion).  
- Public write-ups on how to replicate the stack for other studies.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript)  
- **Language:** TypeScript (strict)  
- **Package manager:** Yarn  
- **Testing:**
  - Unit: Vitest  
  - Component: React Testing Library  
- **Linting & formatting:** ESLint, TypeScript compiler  
- **CI / Quality:**
  - GitHub Actions (lint, typecheck, test, build on every PR)  
  - Sonar (code quality / code smells)  
  - GitHub CodeQL (security scanning)  
- **Planned integrations:** Twilio (SMS/voice), OpenAI Whisper (transcription), Firestore/BigQuery for storage.

---

## Local development

Clone the repo and install dependencies:

```bash
yarn install
```

Run the dev server:

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

This project uses the Next.js App Router with `src/` and `src/app/page.tsx` as the main entry point. The page will hot-reload as you edit.

---

## Scripts

Common scripts (all run via Yarn):

```bash
# Lint the codebase
yarn lint

# Type-check only (no emit)
yarn typecheck

# Run unit tests (Vitest)
yarn test

# Create a production build
yarn build

# Start the production server locally
yarn start
```

CI runs `lint`, `typecheck`, `test`, and `build` on every pull request to `main`.

---

## Project structure (high level)

```text
big-mad-study/
  src/
    app/
      page.tsx        # Home / landing page (will evolve into public study entry)
    ...               # Future routes (screener, participant portal, etc.)
  .github/
    workflows/        # CI, CodeQL, Sonar, etc.
  README.md
  package.json
  tsconfig.json
  ...
```

As the Twilio/Whisper integration and journaling API layer are implemented, those modules will live under `src/lib/` and `src/app/api/`.

---

## How we work in this repo

This project is intentionally opinionated. It is meant to demonstrate a lean, test-first workflow for research products.

### Branch & PR rules

- All changes to `main` go through a **pull request** (enforced via branch rules).  
- CI must pass (lint, typecheck, tests, build) before merge.  
- Security/quality checks (CodeQL, Sonar) must be green.

### Issues, EPICs, and SLICES

We use GitHub issues to track work:

- `EPIC`: High-level theme (e.g., *EPIC: Public Screener Web Experience*).  
- `SLICE`: Small, shippable increment within an epic, written as an INVEST-style story.

Each SLICE should:

- Be small enough to complete in a short, focused session.  
- Have clear acceptance criteria.  
- Be covered by tests (unit and/or e2e) tied back to the issue number.

### Testing style (XP / TDD)

We aim for **RED → GREEN → REFACTOR**:

1. Write a failing test that expresses the behavior.
2. Implement the smallest amount of code to make it pass.
3. Refactor with tests green, guided by Sonar / lints.

We favor:

- Pure functions for domain logic (cohort assignment, journaling rules, etc.).  
- Thin React components that delegate to well-tested helpers.  
- No over-commenting; JSDoc is used only where types alone aren’t expressive enough.

---

## Environment configuration

For now, the MVP runs with only the default Next.js dev config.

As the voice/SMS pipeline is implemented, we will introduce environment variables for Twilio, Whisper, and storage providers, for example:

```bash
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_MESSAGING_SERVICE_SID=...
WHISPER_API_KEY=...
FIRESTORE_PROJECT_ID=...
```

These **must not** be committed to the repo. Use a local `.env.local` file and your deployment platform’s secret store (e.g., Vercel environment variables) for production.

---

## Deployment

The app is designed to be deployed on platforms that support Next.js (e.g., Vercel). A typical flow:

1. Push to `main` via a passing PR.  
2. Vercel builds and deploys the app.  
3. CI and CodeQL continue to run in GitHub Actions for extra safety.

More detailed deployment and environment docs will be added once the Twilio/Whisper integration is live.
---

## Good Citizens Research Lab values

This repo is the first “lab notebook” for how Good Citizens wants to run research in public. A few working principles:

- **Participant value first**  
  If we ask for your time or emotional energy, we owe you something back: a clearer sense of your own patterns, and a view into what we’re learning. The goal isn’t just compliance; it’s reflection and shared understanding.

- **Accessible by default**  
  Not everyone has time, energy, or bandwidth for a 20-minute survey on a laptop. This study treats **voice, SMS, and simple mobile-first web flows** as first-class paths into participation.

- **Open methods, not open people**  
  We don’t publish raw, identifiable data. We do publish:
  - the screener and journal designs  
  - the stack (Next.js, Twilio, Whisper, storage)  
  - the way we analyze and visualize patterns  
  The reusable asset here is the **recipe**, not the people.

- **Test-driven research tooling**  
  The plumbing for this study (cohort assignment, journaling logic, pipelines) is treated like any other production code:
  - written with tests  
  - run through CI  
  - inspected for code quality and security  
  The idea: research infrastructure should be as reliable as the products built on top of it.

- **Language- & culture-aware by design**  
  We expect people to bring different languages, norms, and comfort levels with tech. Where possible, we:
  - support voice and text,  
  - plan for multilingual prompts and responses, and  
  - invite bug reports when wording or translations miss the mark.

- **Vendor-agnostic patterns**  
  Twilio, Whisper, and Firestore/BigQuery are here as concrete examples, not requirements. The architecture is meant to be portable to other providers that can handle messaging, storage, and analysis in a similar way.
---

## Contributing / getting involved

This repo is public on purpose. It’s meant to:

- Run a real-world study about frustration and AI, and  
- Give other teams a **copyable template** for building accessible, research-focused pipelines.

Ways to get involved:

- Open an issue with feedback on the study design, accessibility, or implementation.  
- Propose an enhancement and open a PR.  
- Use the structure here as a starting point for your own research toolchain.

If you’re participating in The Big-Mad Behavioral Study as a respondent: thank you. If you’re here as a developer or researcher: feel free to borrow aggressively from this setup – that’s the point.
