# Methods brief, for external review

**The Big-Mad Behavioral Study** · Good Citizens Corporation · prepared 2026-07-31

**The ask:** roughly an hour of a quantitative methodologist's time, ideally someone who works with experience-sampling / EMA designs, on the seven numbered questions in §6, before we freeze a pre-registration. Everything here is amendable today and frozen after submission, which is why the review comes now.

We are a small industry team, not academics. The design below was developed carefully but without a methodologist in the room, and several of its numeric choices are placeholders that need an owner. We would rather hear "this is wrong" now than in peer review.

---

## 1. The study in one paragraph

An observational, mixed-methods pilot on what modern work environments, apps, dashboards, metrics, automation, do to mood and behavior. Participants complete a screener, then for ~7 days send short check-ins (SMS text or voice note, their choice) about **moments that changed their mood or behavior**, plus brief pre/post surveys. The distinctive question is not "how bad does work feel" (well studied) but **where the frustration goes**: onto the tool, onto other people, or back onto the self, and whether that destination is patterned by involvement of automated systems.

## 2. Design constraints that are fixed

These are commitments already made publicly or structurally; treat them as givens, not variables:

- **Unpaid, public opt-in recruit** via LinkedIn and extended network. No payment, gift, or lottery. Expected: strong self-selection toward people who already have feelings about the topic, and substantial mid-week attrition.
- **Burden ceiling:** the recruitment page promises 5–10 minutes on participating days, "no essays, no login, no homework," and that any question or day can be skipped. Instruments must fit inside that.
- **Scale:** target ≥ 20 per exposure group, ~60–90 participants total, one wave. This is a pilot; we know what that does to power.
- **Channels:** voice or SMS, participant's choice, voice optional. Voice is transcribed on our own hardware (self-hosted Whisper); coders work from transcripts, never audio.
- **Everything is public:** hypotheses, nulls, limitations, and this brief live in a public repository; the registration will be on OSF. Findings are published either way.

## 3. Exposure grouping

A screener assigns each participant to `heavy_ai` / `light_ai` / `low_ai` by deterministic scoring rules, a one-time, self-reported categorization. We are aware this is the weakest measurement in the study: coarse, self-reported, and confounded with profession, autonomy, and income. Question 3 below is about how much weight it can bear.

## 4. Per-entry measurement plan (proposed)

Each check-in captures, on top of the free narrative:

| Variable                                                                | Method                                                                             | Rationale                                                                                                                                   |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Destination**, where the frustration landed                          | Self-report, forced choice: _the tool / other people / myself / nowhere_           | Only the participant knows where it landed; coding it from text infers expression, not experience                                           |
| **Intensity**, how much the moment got to them                         | Self-report, single item 0–10                                                      | Felt intensity is the construct (see §5); single-item momentary ratings are standard in ESM, with known reliability limits we will register |
| **System involvement**, was an app/metric/algorithm part of the moment | **Coded from the narrative** by two coders blind to exposure group; κ ≥ 0.70 floor | Objective enough to code reliably; _asking_ it would prime participants toward the hypothesis                                               |

The split rule: subjective states are self-reported; observable features are coded. Burden added per entry: one word and one number.

**Definitional choice made:** frustration is **felt intensity in the moment**, not accumulated strain (which validated scales like PSS measure), not expressed intensity (which coders could rate). This choice eliminated end-of-day ratings (retrospective aggregate; peak-end bias is already in our registered limitations) and coder-rated intensity (rater error would enter the outcome variable). If the definition itself is wrong, that supersedes everything downstream, see question 1.

**Unresolved within this plan:** where the 0–10 sits in a voice note (leading number parses reliably but may prime the narrative; trailing number preserves spontaneity but parses worse), and how to bound the gap between moment and report, an entry recorded six hours later is recalled intensity wearing a momentary label. Candidate: an elapsed-time item (_just now / within an hour / earlier today / older_) used as covariate and exclusion screen. Question 4.

## 5. The fork we most need judged: two candidate primary hypotheses

**A, Between-person (as currently drafted in the registration):**

> H1: Higher automation exposure (cohort) is associated with higher mean frustration intensity and with displacement onto people rather than tools.
> Analysis: Kruskal–Wallis across cohorts for intensity; χ² / Cramér's V for cohort × destination.

Honest assessment: underpowered at ~20/cohort, and confounded, cohorts differ by profession, autonomy, income. Any between-group difference has a dozen explanations besides automation.

**B, Within-person (proposed replacement):**

> H1: Within the same participant, system-involved moments are more likely to be displaced onto other people or the self than that participant's non-system moments.
> H0: Destination is independent of system involvement within person.

Rationale: the comparison moves inside the person, so every stable confound (job, temperament, week) is controlled by design; the effective N becomes entries (~300–600) rather than participants; and an angrier-than-average opt-in sample biases _who enrolls_, not the within-person contrast. Cohort demotes to a moderator (is the within-person effect larger under heavy exposure?).

What we know we'd be taking on: entries nest within persons, so the drafted χ²/KW tests are no longer the right analysis, presumably a multilevel logistic (destination ~ system-involvement + (1|participant)), which we are not confident specifying unaided. There is also a selection concern specific to B: participants report the moments they _notice_, and if system-involved frustration is more memorable rather than more common or more displaced, the within-person contrast inherits that. Signal-contingent prompting would address it but violates the burden promises in §2.

## 6. The questions

1. **Construct:** Is "felt intensity in the moment," self-reported 0–10 per entry, the right operationalization of frustration for this question, or is there a dimension (duration, recovery, behavioral consequence) that matters more and costs no more burden?
2. **Primary hypothesis:** A or B (§5)? If B, what is the correct minimal model given ~60–90 participants × ~5–7 entries, and what should be declared as the effect threshold in place of Cramér's V ≥ 0.2?
3. **The cohort variable:** Given its confounds, is `heavy/light/low` usable as a moderator, or should exposure be measured differently (or continuously) at the screener?
4. **Momentary validity:** Is an elapsed-time item with a declared exclusion threshold an adequate answer to recall latency, or is the moment-level claim untenable without prompting, in which case, what is the least-burden prompting scheme that preserves it?
5. **Destination categories:** Are _tool / other people / myself / nowhere_ exhaustive and non-overlapping enough for a forced choice, or does this need a pilot-and-revise step before registration?
6. **Numbers needing an owner:** κ ≥ 0.70 floor; ≥ 0.5-point intensity threshold; < 3 check-in-day exclusion; 90-participants-or-6-weeks stopping rule; "< 15 completers per cohort ⇒ descriptive only." Each was chosen as defensible-sounding rather than derived. Keep, replace, or delete?
7. **What did we not ask that we should have?**

## 7. What we are _not_ asking you to review

Ethics and consent (an independent IRB submission is in preparation, with a separate biometric-consent track for voice), privacy/legal posture, recruitment copy, or the software. If something in those areas alarms you in passing, we want to hear it, but §6 is the ask.

## 8. Artifacts

- Pre-registration draft (the document this review would amend): `docs/compliance/pre-registration.md` in the public repo
- Hypotheses as originally written: GitHub issues #8, #13, #22 (Good-Citizens-Corporation/big-mad-study)
- Registered-in-advance limitations: opt-in self-selection (now the central sampling property, the study is unpaid), public framing primes attention, recall favors extremes, associations not causation, self-report throughout
- Consent, privacy, retention, and distress-protocol drafts: `docs/compliance/`

Contact: **Bob Duebelbeis**, Good Citizens Corporation · methods@bigmadstudy.com
