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

**[DECIDE]** — H1-D is the study's actual research question and is currently the *least* specified of the four, because the epics were written around delivery rather than analysis. Before submitting, state: the exposure measure, the frustration measure, the displacement coding scheme, and what magnitude would count as meaningful. A hypothesis that cannot be disconfirmed by a specific result is not registered, it is merely published.

## Design

- **Type:** Observational, non-experimental. No condition is manipulated.
- **Cohorts:** Assigned from screener responses into `heavy_ai`, `light_ai`, `low_ai` by deterministic config rules. Cohort is a grouping variable, not a treatment.
- **Duration:** ~7 days of check-ins per participant, plus pre and post surveys.
- **Channels:** Voice or SMS check-ins, participant's choice. Voice is optional.

## Sampling

- **Target:** ≥ 20 participants per cohort in the first wave (EPIC-02).
- **Recruitment:** LinkedIn and extended network initially. **[DECIDE]** — additional channels; note that channel choice materially affects sample composition, and EPIC-02 explicitly measures against over-representation.
- **Eligibility:** 18+, able to complete voice or SMS check-ins for ~a week, English for this pilot.
- **Stopping rule:** **[DECIDE]** — state when recruitment ends. "When we have enough" is not a stopping rule and invites optional stopping.

## Measures

- Screener: work context, automation exposure, baseline frustration.
- Daily check-ins: free-text or transcribed voice, describing moments that changed mood or behavior.
- Pre/post surveys: **[DECIDE]** — name the instruments. If validated scales are used, cite them; if bespoke items, say so plainly.

## Analysis plan

**[DECIDE]** — the weakest section, and the one reviewers will read hardest. Specify before submission:

- Primary analysis for H1-D, including the statistical test.
- How free-text and transcripts are coded, by whom, and how inter-rater agreement is established.
- Handling of missing days and partial participation.
- Whether any subgroup analyses are planned, or exploratory. Unregistered subgroup analysis presented as confirmatory is the most common way studies mislead without lying.

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
