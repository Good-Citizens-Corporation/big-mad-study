# Pre-Registration, DRAFT, amended per methods review

> Slice #38. Hypotheses originate in EPIC-01 (#8), EPIC-02 (#13), EPIC-03 (#22); the primary hypothesis and analysis plan were amended per `methods-review.md` (2026-07-31) before submission, visible in this file's git history, which is the point of doing it now rather than after the freeze.
>
> **Target:** OSF Registries (osf.io/registries), free, DOI-issuing, citable, and amendments are visible rather than silent.
>
> **Submit before any participant data is collected.** After that, this document can only be amended, never rewritten, which is the whole value of it.

---

## Title

The Big-Mad Behavioral Study: where workplace frustration goes, a within-person study of system involvement and displacement in everyday work

## Authors

Bob Duebelbeis, Good Citizens Corporation. **[DECIDE]**, ORCID (free at orcid.org; OSF asks for it and reviewers expect it).

## Description

An observational, event-contingent experience-sampling pilot on what environments shaped by apps, dashboards, automation, and metrics do to mood and behavior across a range of work contexts, service, healthcare, delivery, trades, office, and remote roles.

The distinctive question is not how bad work feels but **where the frustration goes**, onto the tool, onto other people, or back onto the self, and whether that destination is patterned by the involvement of automated systems. The design deliberately does not assume automation as a cause; the primary comparison is within-person, and results are reported as within-person associations, never as population prevalence or moment-level causation.

## Hypotheses

### Primary, H1: within-person displacement

- **H1:** Within the same participant, moments involving automated or algorithmic systems are more likely to be displaced onto people (other people, or the self) than that participant's moments not involving such systems.
- **H0:** Displacement destination is independent of system involvement within person.
- **Meaningful magnitude:** odds ratio **≥ 1.5** for the within-person fixed effect. Below that, an effect of this kind is unlikely to be distinguishable from residual moment-level confounding (time of day, workload spikes) in an observational design of this size, so anything smaller is reported as no meaningful association _regardless of statistical significance_.

The comparison is within-person by design: each participant serves as their own control, so stable confounds, profession, temperament, income, the particular week, are absorbed by the person-level intercept. This is also the analysis most robust to the study's unpaid opt-in sampling (see Sampling): a motivated sample biases _who enrolls_, not the contrast between one person's system-involved and non-system moments.

### Secondary, H2: intensity

- **H2:** Within person, system-involved moments carry higher felt frustration intensity than non-system moments.
- **H0:** No within-person intensity difference by system involvement.
- **Meaningful magnitude:** ≥ 0.5 points on the 0–10 scale (≈ 0.25 SD of typical momentary-affect dispersion).

### Exploratory, moderation by exposure

Whether the within-person effect (H1) is larger for participants with higher overall automation exposure, using the **continuous** screener exposure score as a cross-level moderator. Explicitly **exploratory, not confirmatory**: a cross-level interaction at 60–90 participants is underpowered almost by construction, and registering it as confirmatory would set the study up to fail a test it could never pass.

### Descriptive, between-cohort comparisons

Cohort-level (`heavy_ai` / `light_ai` / `low_ai`) summaries of intensity and destination are reported **descriptively only**. Between-cohort contrasts inherit the full opt-in selection bias and the cohort variable's confounding with profession, autonomy, and income; no between-cohort result will be framed as testing the primary question.

### Process hypotheses (delivery, not science)

Carried from the delivery epics and evaluated operationally, not in the scientific analysis: clear landing copy raises screener starts/completions (EPIC-01); a plain-language mobile screener yields usable labels and high completion (EPIC-02); a value-back portal raises completion and perceived value (EPIC-03, measured via the post survey).

## Operational definitions

- **System involvement** (moment-level predictor), whether an app, dashboard, metric, algorithm, or automated system was part of the moment. **Coded from the narrative**, not asked: asking would prime participants toward the hypothesis. Two independent coders, blind to exposure score and cohort, working from a written codebook on transcripts (never audio); disagreements resolved by a third. Coders code a common **20% overlap sample**; Cohen's **κ ≥ 0.70 required** on that sample before the variable is used at all, below the floor, the primary analysis is reported as failed rather than patched. Unintelligible entries are flagged uncodable, not guessed.
- **Displacement destination** (moment-level outcome), participant self-report, forced choice at each check-in: _the tool / other people / myself / nowhere_, with the tie-break instruction "pick where **most** of it went." For the primary analysis the outcome is **binary: person-directed** (other people or self) **vs not** (tool or nowhere). Categories are frozen only after the disclosed pilot (see Pilot).
- **Frustration intensity** (moment-level, secondary), single self-rating 0–10 per check-in, verbally anchored in every prompt: "0 = barely registered, 10 = as worked up as you get."
- **Recency** (moment-level covariate/screen), "when did this happen?": _just now / within the last hour / earlier today / before today_.
- **Exposure** (person-level), the screener's continuous automation-exposure score. The `heavy_ai` / `light_ai` / `low_ai` labels derived from it are used for recruitment stratification and readable reporting only; **analysis uses the continuous score**, because trichotomizing a continuous measure discards information.

## Design

- **Type:** Observational, non-experimental, **event-contingent experience sampling**, participants report discrete self-selected moments ("a moment that changed your mood or behavior") as they occur, rather than responding to scheduled prompts. For discrete salient events this is the appropriate ESM scheme; scheduled prompting would measure current state at random times, a different construct.
- **Duration:** ~7 days of check-ins per participant, plus brief pre and post surveys.
- **Channels:** Voice or SMS check-ins, participant's choice; voice optional. Voice is transcribed on our own hardware (self-hosted Whisper); all coding is from transcripts.
- **Per-entry capture:** free narrative + destination (forced choice) + intensity (0–10) + recency (one tap). Added burden per entry: one word, one number, one tap.

## Pilot (design phase, disclosed)

Before registration of the final instrument wording, a pilot of **10–15 people from the authors' extended network, 2–3 days each, using the real SMS flow** finalizes the destination response options. The pilot includes a fifth option, _somewhere else (say where)_, with free text; the four categories are frozen only if ≥ 90% of pilot entries land cleanly in them, and revised before freezing if not. **Pilot data is design data:** it is excluded from all analyses and no pilot participant may enroll in the study proper.

## Sampling

- **Target:** ≥ 20 participants per cohort at enrollment, ~60–90 total, one wave.
- **Recruitment:** Public and **unpaid**, via LinkedIn and extended network initially. **[DECIDE]**, additional channels; channel choice materially affects sample composition.
- **Compensation:** None. Participants receive access to their own entries and patterns, and the published findings, no payment, gift, or lottery.
- **What unpaid opt-in does to the sample, registered rather than discovered later:** an unpaid public recruit selects for people who already have feelings about work and technology. This is the central sampling property of the study, not a caveat. It is the reason the primary hypothesis is within-person, and the reason no estimate in any report will be framed as population prevalence.
- **Expected attrition, and its direction:** unpaid daily participation loses people mid-week, and in a frustration study attrition is plausibly _caused by_ the constructs under measurement, the missingness is likely informative (MNAR), biasing completer summaries in unknown direction. We register the expectation, report enrollment-vs-completion characteristics by exposure score, and do not impute.
- **Eligibility:** 18+, able to complete voice or SMS check-ins for ~a week, English for this pilot wave.
- **Stopping rule:** recruitment closes at **90 enrolled participants or 6 weeks from launch, whichever comes first**, and is not reopened to chase a result. Analysis begins only after the final enrolled participant's 7-day window closes, and runs once.

## Measures

- **Screener:** work context; the continuous automation-exposure items; baseline single-item strain rating (descriptive use only).
- **Check-ins:** as specified in Design (narrative + destination + intensity + recency).
- **Pre survey:** the screener's baseline items, no separate instrument. Purpose: sample description only; no confirmatory analysis uses it.
- **Post survey:** brief exit items on perceived value, willingness to recommend, and data-handling comfort. Purpose: evaluates the EPIC-03 process hypothesis and the consent/trust posture; no confirmatory analysis of H1/H2 uses it.
- No other instruments. Every instrument above has a declared purpose; nothing is collected "in case."

## Analysis plan

**Primary (H1).** Multilevel logistic regression, entries nested in participants:

> `person_directed ~ system_involved + (1 | participant)`

- **Random slope:** we attempt `(1 + system_involved | participant)`; if it fails to converge or the slope variance is degenerate (likely at ~5–7 entries per person), we fall back to the random-intercept model. **This fallback is pre-declared here** so a convergence-driven model change cannot be a post-hoc choice.
- **Reported:** fixed-effect odds ratio with 95% CI, judged against OR ≥ 1.5; ICC of the empty model; number of participants contributing within-person variance.
- **Power gate:** only participants with at least one system-involved and one non-system entry inform the contrast. If fewer than **30 participants** have such variance, the primary analysis is reported as underpowered and descriptive only.
- **Sensitivity checks (pre-declared):** (a) primary model on entries marked _just now / within the last hour_ only; (b) primary model on a one-entry-per-day subsample (first entry per day); (c) primary model with time-of-day and recency as covariates.

**Secondary (H2).** Within-person intensity contrast: multilevel linear model `intensity ~ system_involved + (1 | participant)`, same fallback logic, judged against the ≥ 0.5-point threshold.

**Exploratory moderation.** `system_involved × exposure_score` cross-level interaction added to the primary model; reported as exploratory in every output.

**Descriptive.** Cohort-level tables of intensity and destination. If any inferential between-cohort test is reported at all it is labelled descriptive/secondary, uses the rules previously drafted (Kruskal–Wallis / χ² with the pre-declared `none/unclear` collapse for thin cells), and is gated: fewer than 15 completers per cohort ⇒ tables only, no tests.

**Entry inclusion.** Entries marked _before today_ are excluded from all confirmatory analyses and counted separately, same-day recall for salient discrete events is adequate for this design's claims; cross-day recall is not. No person-level exclusion applies to the primary model except the within-person-variance requirement above. "Completer" (≥ 3 check-in days) is a descriptive label and a gate for the secondary cohort analyses only.

**Coding.** As specified in Operational definitions: independent, blind, transcript-only, κ ≥ 0.70 on a 20% overlap sample, third-coder resolution, uncodable flagged not guessed.

**Missing data.** No imputation. Missingness is expected to be informative (see Sampling); completer-vs-enrolled characteristics are reported.

**Subgroups.** None are confirmatory. Any analysis by profession, tenure, channel, or demographic is exploratory and labelled so in every report.

**Analyst.** **[DECIDE]**, who runs the models; coders are blind to exposure as specified, and the analyst does not code.

## Known limitations, registered in advance

- **Self-selection is the central sampling property:** unpaid public opt-in selects for people who already feel something about the topic. Handled by making the primary hypothesis within-person; prevalence claims are out of scope entirely.
- **Noticing bias:** participants report the moments they notice. If system-involved frustration is more _memorable_ rather than more common or more displaced, the within-person contrast inherits that. This is a real, unremovable limitation of event-contingent sampling and we register it plainly.
- **Moment-level confounding:** the within-person design absorbs stable confounds but not momentary ones, a system-involved moment may also be a busier moment. The design supports within-person association, not moment-level causation.
- **Informative attrition:** dropout is plausibly correlated with the constructs under study; completer analyses are biased in unknown direction.
- **Measurement reactivity:** a week of logging frustration may itself change frustration; reactivity in ESM is typically small but nonzero.
- **Transcription noise:** voice entries pass through automated transcription before coding; errors enter the coded predictor. Mitigated by human coders on transcripts and the κ floor; residual noise is registered.
- **Single-item intensity measure:** reliability limits of single-item momentary ratings apply; intensity is secondary partly for this reason.
- Public framing primes attention to the phenomenon being measured; recall favors extremes; self-report throughout, with no behavioral or physiological corroboration.

## Ethics

- Independent IRB review sought (#31). **[DECIDE]**, reviewing body and reference once issued.
- Informed consent obtained before any data collection (#32); the study is unpaid and consent says so plainly.
- Biometric consent for voice obtained separately, in writing (#34).
- Transcription self-hosted; no participant audio disclosed to third parties (#36).
- Distress protocol with crisis resources in place (#37).

## Data availability

**[DECIDE]**, what is shared and when. Aggregate summaries are already promised publicly. Raw entries cannot be shared. A de-identified derived dataset is possible but must be assessed for re-identification risk first, and promising it here creates an obligation.

---

## Before submitting

1. Run the destination-category pilot and freeze the response options (blocks final instrument wording, not the rest of this document).
2. Resolve remaining **[DECIDE]**s: ORCID, additional recruitment channels, analyst, IRB reference, data availability.
3. Confirm no study data (pilot excluded, as disclosed) has been collected before the registration timestamp.
4. Submit, capture the DOI, and set it in `src/content/registration.ts`, the site copy and `/methods` notice follow automatically (#38, #28).
