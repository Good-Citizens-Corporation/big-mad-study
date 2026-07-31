# Pre-Registration — DRAFT, ready to submit

> Slice #38. Assembled from EPIC-01 (#8), EPIC-02 (#13), and EPIC-03 (#22) — the hypotheses below are **not new**, they are the ones already written in those issues. That is the point: this document moves them from "public on GitHub" to "timestamped and frozen by a third party."
>
> **Target:** OSF Registries (osf.io/registries) — free, DOI-issuing, citable, and amendments are visible rather than silent. AsPredicted is lighter but less suitable given IRB review is planned (#31).
>
> **Submit before any participant data is collected.** After that, this document can only be amended, never rewritten — which is the whole value of it.

---

## Title

The Big-Mad Behavioral Study: automation exposure, frustration, and behavioral displacement in everyday work

## Authors

**[DECIDE]** — names, affiliations, ORCIDs. Good Citizens Corporation.

## Description

An exploratory, mixed-methods observational study of what environments shaped by apps, dashboards, automation, and metrics do to mood, patience, and behavior across a range of work contexts — service, healthcare, delivery, trades, office, and remote roles.

The study deliberately does not assume automation as a cause. It maps associations between self-reported automation exposure and self-reported frustration, coping, and behavioral displacement, and it reports those associations as associations.

## Hypotheses

Stated as H1/H0 pairs, per the epics they come from.

### H1-A — Landing clarity (EPIC-01)

- **H1:** A clear, non-hype explanation of the study, who runs it, and what participation involves will increase the rate at which visitors start and complete the screener.
- **H0:** Improving the clarity and transparency of the landing page will not materially change screener start or completion rates.

### H1-B — Screener design (EPIC-02)

- **H1:** A single, mobile-first screener using plain language will yield usable cohort labels and high completion without intimidating participants.
- **H0:** Cohort-assignment quality and completion rate will not differ from a longer survey using standard research framing.

### H1-C — Value returned to participants (EPIC-03)

- **H1:** Giving participants a privacy-respecting view of their own entries and basic patterns will increase completion and perceived value.
- **H0:** Providing a participant portal and value-back views will not materially change completion, satisfaction, or willingness to recommend.

### H1-D — The substantive question

- **H1:** Higher self-reported automation exposure is associated with higher self-reported frustration and with displacement of that frustration onto people rather than tools.
- **H0:** Self-reported automation exposure shows no meaningful association with frustration intensity or its direction of displacement.

**Operational definitions — [PROPOSED, needs sign-off before submission]**

H1-D was the least specified of the four, because the epics were written around delivery rather than analysis. A hypothesis that cannot be disconfirmed by a specific result is not registered, it is merely published. The following makes it disconfirmable:

- **Automation exposure** — the screener's exposure items, scored into the cohort label `heavy_ai` / `light_ai` / `low_ai` by the deterministic rules in EPIC-02. Cohort is the exposure variable; it is a grouping, not a treatment.
- **Frustration intensity** — a single 0–10 self-rating attached to each check-in ("how much did that moment get to you?"), averaged per participant across their study week. **[DECIDE]** — this item does not exist yet in the check-in design; adding it is a prerequisite for H1-D and belongs in the capture EPIC.
- **Displacement target** — each check-in coded to exactly one of `tool`, `self`, `other_people`, `none/unclear`. Two independent coders, disagreements resolved by a third. Inter-rater agreement reported as Cohen's κ; **κ ≥ 0.70 required** before the coded variable is used at all. If agreement falls below that, the displacement analysis is reported as failed rather than patched.
- **Meaningful magnitude** — declared in advance so a null cannot be talked into a finding:
  - frustration: a **≥ 0.5 point** difference in mean rating between the `heavy_ai` and `low_ai` cohorts on the 0–10 scale;
  - displacement: **Cramér's V ≥ 0.2** for the cohort × target association.
  - Anything smaller is reported as "no meaningful association" even if it reaches statistical significance at this sample size.

## Design

- **Type:** Observational, non-experimental. No condition is manipulated.
- **Cohorts:** Assigned from screener responses into `heavy_ai`, `light_ai`, `low_ai` by deterministic config rules. Cohort is a grouping variable, not a treatment.
- **Duration:** ~7 days of check-ins per participant, plus pre and post surveys.
- **Channels:** Voice or SMS check-ins, participant's choice. Voice is optional.

## Sampling

- **Target:** ≥ 20 participants per cohort in the first wave (EPIC-02).
- **Recruitment:** Public and **unpaid**, via LinkedIn and extended network initially. **[DECIDE]** — additional channels; note that channel choice materially affects sample composition, and EPIC-02 explicitly measures against over-representation.
- **Compensation:** None. Participants receive access to their own entries and patterns, and the published findings — the same value-back everyone gets — but no payment, gift, or lottery.
- **What unpaid opt-in does to the sample, registered rather than discovered later:** an unpaid public recruit selects for people who already have feelings about work and technology. The "opt-in samples skew toward people who already feel something" limitation below is therefore not a caveat but the central sampling property of this study. Between-cohort prevalence comparisons inherit this bias in full; within-person contrasts (each participant serving as their own comparison) are substantially more robust to it, since a motivated sample biases _who enrolls_, not the difference between one person's system-involved and non-system moments. No estimate in any report will be framed as population prevalence.
- **Expected attrition:** unpaid daily participation loses people mid-week. We expect a substantial partial-participant group; the < 3 check-in-day exclusion rule (Analysis plan) and the partial-participant reporting requirement exist for exactly this. If fewer than 15 participants per cohort complete, the between-cohort analyses are reported as underpowered and descriptive only.
- **Eligibility:** 18+, able to complete voice or SMS check-ins for ~a week, English for this pilot.
- **Stopping rule — [PROPOSED]:** recruitment closes at **90 enrolled participants or 6 weeks from launch, whichever comes first**, and is not reopened to chase a result. Analysis runs once, after the last enrolled participant completes their week. Declaring this now is what stops optional stopping — looking at the data, not liking it, and recruiting a bit more.

## Measures

- Screener: work context, automation exposure, baseline frustration.
- Daily check-ins: free-text or transcribed voice, describing moments that changed mood or behavior.
- Pre/post surveys: **[DECIDE]** — name the instruments. If validated scales are used, cite them; if bespoke items, say so plainly.

## Analysis plan

**[PROPOSED, needs sign-off before submission]**

Deliberately simple. At ~20 participants per cohort, an elaborate model would imply precision the design cannot deliver; the pre-specification matters more than the sophistication.

**Primary — frustration.** Mean per-participant frustration rating compared across the three cohorts by Kruskal–Wallis (the 0–10 ratings are ordinal and will not be assumed normal). If significant at α = 0.05, pairwise Dunn tests with Holm correction. Reported with the `heavy_ai` − `low_ai` difference and its confidence interval, judged against the ≥ 0.5 threshold above.

**Primary — displacement.** Cohort × displacement-target contingency table, χ² test of independence, effect size as Cramér's V against the ≥ 0.2 threshold. Cells with expected count < 5 collapse `none/unclear` into a single residual category, decided now rather than after seeing the table.

**Coding.** Two coders work independently from a written codebook, blind to cohort. κ reported before any inferential result. Voice entries are coded from transcripts, not audio, so coders never hear a participant's voice.

**Missing data.** Participants with fewer than 3 check-in days are excluded from the primary analyses and reported separately as partial participants, with their count and cohort distribution. No imputation. The exclusion rule is set here, before any data exists, precisely so it cannot be tuned later.

**Subgroups.** None are confirmatory. Any analysis by profession, tenure, channel, or demographic is **exploratory**, will be labelled as such in every report, and cannot be presented as testing H1-D. Unregistered subgroup analysis presented as confirmatory is the most common way studies mislead without lying.

**Analyst.** **[DECIDE]** — who runs this, and whether they are blind to cohort labels during coding.

## Known limitations, registered in advance

Carried from EPIC-01's own "Bias + limitations" content, which is already public on the landing page:

- Opt-in samples skew toward people who already feel something about the topic.
- Public framing primes attention to the phenomenon being measured.
- People recall extremes more readily than averages.
- The design supports associations and patterns, not causal claims about automation.
- Self-report throughout, with no behavioral or physiological corroboration.

## Ethics

- Independent IRB review sought (#31). **[DECIDE]** — reviewing body and reference once issued.
- Informed consent obtained before any data collection (#32).
- Biometric consent for voice obtained separately, in writing (#34).
- Transcription self-hosted; no participant audio disclosed to third parties (#36).
- Distress protocol with crisis resources in place (#37).

## Data availability

**[DECIDE]** — what is shared and when. Aggregate summaries are already promised publicly. Raw entries cannot be shared. A de-identified derived dataset is possible but must be assessed for re-identification risk first, and promising it here creates an obligation.

---

## Before submitting

1. Resolve every **[DECIDE]**, especially the analysis plan and H1-D's operational definitions.
2. Confirm no participant data has been collected. If any has, say so in the registration — a registration that misrepresents its own timing is worse than none.
3. Submit, capture the DOI, and land it in `/methods` and the landing page claim (#38, #28).
