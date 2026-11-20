# Pre-Registration, DRAFT, amended per methods review, the survey audit of 2026-11-12, and the external human methods review of 2026-11

> Slice #38. Hypotheses originate in EPIC-01 (#8), EPIC-02 (#13), EPIC-03 (#22); the primary hypothesis and analysis plan were amended per `methods-review.md` (2026-07-31) before submission, visible in this file's git history, which is the point of doing it now rather than after the freeze.
>
> _Amended 2026-11-19:_ per the external human methods review (`methods-review-external.md`; reviewer anonymous at their request). Hypotheses now state one relationship each and are level-neutral; the between-person analysis is registered beside the within-person one; duration is explicitly not measured; a relief item is piloted; write-in promotion and a pilot report are registered.
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

The distinctive question is not how bad work feels but **where the frustration goes**, onto the tool, onto other people, or back onto the self, and whether that destination is patterned by the involvement of automated systems. The design deliberately does not assume automation as a cause; the primary comparison is within-person, a secondary between-person comparison is reported beside it, and results are reported as associations, never as population prevalence or moment-level causation.

## Hypotheses

Each hypothesis states **one relationship**, and each is stated **the same way at both levels of analysis** (reviewer, 2026-11): whether we look within a person or between people does not change the hypothesis, only the exposure variable that carries it.

- **Within-person (primary) exposure:** `system_involved`, whether an app, dashboard, metric, algorithm or automated system was part of the moment (coded; see Operational definitions).
- **Between-person (secondary) exposure:** the screener's continuous automation-exposure score.

### Primary, H1 and H1a: where the frustration goes

- **H1:** Higher automation exposure is associated with frustration displaced onto **other people rather than onto tools**. Outcome: among entries whose destination is _other people_ or _the tool_, destination is _other people_.
- **H1a:** Higher automation exposure is associated with frustration displaced onto **other people rather than onto oneself**. Outcome: among entries whose destination is _other people_ or _myself_, destination is _other people_.
- **H0 (each):** Destination is independent of automation exposure.
- **Why two, and why not pooled:** the earlier H1 pooled other people and self ("person-directed") against tool and nowhere. A system that raises self-blame and lowers snapping at others would cancel in that pooled outcome (audit 2026-11-12), and the reviewer asked for one relationship per hypothesis. _Nowhere_ (and in the pilot, the split and _somewhere else_ options) sit outside both contrasts and are reported as shares.
- **Decision rule, each judged on its own, within-person estimate (the author confirmed this rule on 2026-11-12 for the earlier pooled outcome; applying it to H1 and H1a was decided 2026-11-19: the same rule, judged separately for each):** the effect counts only if the point estimate is **≥ 1.5 and the 95% interval's lower bound is above 1**. If the estimate clears 1.5 but the interval includes 1, the result is reported as _unclear_; if it is below 1.5, as _no meaningful association_. We do not combine H1 and H1a into one claim, and both are reported whatever they show.
- **Meaningful magnitude:** odds ratio **≥ 1.5** for the within-person fixed effect. Below that, an effect of this kind is unlikely to be distinguishable from residual moment-level confounding (time of day, workload spikes) in an observational design of this size, so anything smaller is reported as no meaningful association _regardless of statistical significance_.
- **The two exposures are different constructs.** `system_involved` is a coded feature of one moment; the screener score is a stable trait of a person. The hypothesis is the same, the evidence is not, and disagreement between the two analyses may reflect that difference, not an error in either. The person-mean term in the within-person model is a between-person estimate of its own; it is reported in the output tables, not interpreted as a test.
- **Between-person test of the same hypotheses:** registered as a **secondary, pre-specified** analysis (see Analysis plan), reported beside the within-person result with its interval. _Decided 2026-11-19:_ it carries no magnitude threshold and no pass/fail label; it is reported with its estimate and interval only, because it is the weaker design and a threshold would present it as a second confirmatory test. Agreement or disagreement between the two analyses is described in words and is never resolved by choosing the one that agrees with us.

The within-person comparison is primary by design: each participant serves as their own control, so stable confounds, profession, temperament, income, the particular week, are absorbed by the person-level intercept. This is also the analysis most robust to the study's unpaid opt-in sampling (see Sampling): a motivated sample biases _who enrolls_, not the contrast between one person's system-involved and non-system moments. The between-person analysis is run **because** it tests the same hypotheses a different way, and agreement across both strengthens validity (reviewer); it is secondary because it inherits the opt-in selection bias and the confounding that the within-person design removes.

### Secondary, H2: intensity

- **H2:** Higher automation exposure is associated with higher felt frustration intensity (within person: system-involved moments carry higher intensity than that participant's non-system moments).
- **H0:** No association between automation exposure and intensity.
- **Meaningful magnitude:** ≥ 0.5 points on the 0–10 scale (≈ 0.25 SD of typical momentary-affect dispersion).

### Exploratory

- **E1, moderation by exposure.** Whether the within-person effect (H1) is larger for participants with higher overall automation exposure, using the **continuous** screener exposure score as a cross-level moderator. Explicitly **exploratory, not confirmatory**: a cross-level interaction at 60–90 participants is underpowered almost by construction, and registering it as confirmatory would set the study up to fail a test it could never pass.
- **E2, relief.** Whether frustration displaced onto other people is followed by relief ("After that, did you feel relieved?" yes / no / I don't know) more often than frustration displaced onto a tool, and whether that is stronger at higher intensity. **Conditional:** the item is asked in the pilot only; it enters the study, and E2 stays registered, only if the pilot shows people can answer it for every destination (criterion decided 2026-11-19: "I don't know" under 30% for each destination). If dropped, the decision and the pilot data behind it are reported. Relief is used instead of "recovery" because recovery is hard to identify, and relief is simple to ask (reviewer).

### Descriptive, between-cohort comparisons

Cohort-level (high / medium / low automation exposure) summaries of intensity and destination are reported as tables. The low-vs-high contrast is a **robustness check** on the continuous between-person analysis (see Analysis plan), not a separate test of the primary question.

### Process hypotheses (delivery, not science)

Carried from the delivery epics and evaluated operationally, not in the scientific analysis: clear landing copy raises screener starts/completions (EPIC-01); a plain-language mobile screener yields usable labels and high completion (EPIC-02); a value-back portal raises completion and perceived value (EPIC-03, measured via the post survey).

## Operational definitions

- **System involvement** (moment-level predictor), whether an app, dashboard, metric, algorithm, or automated system was part of the moment. **Coded from the narrative**, not asked: asking would prime participants toward the hypothesis. For the same reason nothing participants see (examples, prompts, recruitment pages) pairs an app with a reaction to it; the pilot briefing's earlier example did and was replaced. Each entry is also marked with how much was written, and the primary model is repeated on entries with at least a sentence or two, because a thin story can hide a system and thin stories are more likely when someone has snapped at a colleague (differential misclassification). Entries too short to code are reported as uncodable, with their share by person. Two independent coders, blind to exposure score and cohort, working from a written codebook on transcripts (never audio); disagreements resolved by a third. Coders code a common **20% overlap sample**; Cohen's **κ ≥ 0.70 required** on that sample before the variable is used at all, below the floor, the primary analysis is reported as failed rather than patched. Unintelligible entries are flagged uncodable, not guessed.
- **Displacement destination** (moment-level outcome), participant self-report, forced choice at each check-in: _the tool / other people / myself / nowhere_, asked as "Where did most of that frustration end up?" with the tie-break "pick the closest." The order of the choices differs between participants and is fixed within each (audit 2026-11-12: a fixed order gives primacy to the first choice for everyone). For H1 the outcome is **other people vs the tool**; for H1a it is **other people vs myself** (entries outside each pair are left out of that model and reported as shares). The earlier pooled "person-directed" outcome is reported descriptively only. Categories are frozen only after the disclosed pilot (see Pilot); a destination that pilot participants keep writing in under _somewhere else_ is added by the rule in Pilot.
- **Frustration intensity** (moment-level, secondary), single self-rating 0–10 per check-in, verbally anchored in every prompt, in these exact words: "0 = barely registered, 10 = as worked up as you get." The question is "How frustrated were you?" (audit 2026-11-12: "how strong was it?" had no referent, and "as strong as it gets" could mean ever or for me).
- **Relief** (moment-level, exploratory, pilot-only until the pilot decides), "After that, did you feel relieved?": _yes / no / I don't know_. Not asked as a before/after duration or recovery measure: **frustration duration is not measured** (reviewer: people don't time their feelings, and a retrospective duration is biased), and recovery is not measured because whether it occurred is very hard to identify.
- **Recency** (moment-level covariate/screen), "when did this happen?": _just now / within the last hour / earlier today / before today_.
- **Exposure** (person-level), the screener's continuous automation-exposure score. The `high` / `medium` / `low` automation-exposure labels (renamed 2026-11-12 from `heavy_ai` / `light_ai` / `low_ai`, because the construct is automation and metrics, not AI) derived from it are used for recruitment stratification and readable reporting only; **analysis uses the continuous score**, because trichotomizing a continuous measure discards information. **Coding of the low / medium / high groups, registered in advance (reviewer):** the cut points are fixed by the screener's deterministic scoring rules before any data are analyzed; the group contrast is a robustness check run two ways: (i) low vs high with the medium group excluded from the contrast but retained, and shown, in the continuous model and the cohort tables; (ii) all three groups as an ordered factor. The medium group is never silently dropped.
- **Between-person covariates** (person-level, new 2026-11-19): age, gender, profession (grouped), and socioeconomic status. _Decided 2026-11-19:_ the screener asks household income band and highest education (two items, coded as ordered bands). Personality traits are **not** collected; each added item taxes an unpaid sample and the within-person design does not need it. Adding these items to the screener requires the consent and privacy drafts to name them (counsel).

## Design

- **Type:** Observational, non-experimental, **event-contingent experience sampling**, participants report discrete self-selected moments ("a moment that changed your mood or behavior") as they occur, rather than responding to scheduled prompts. For discrete salient events this is the appropriate ESM scheme; scheduled prompting would measure current state at random times, a different construct.
- **Duration:** ~7 days of check-ins per participant, plus brief pre and post surveys.
- **Channels:** Voice or SMS check-ins, participant's choice; voice optional. Voice is transcribed on our own hardware (self-hosted Whisper); all coding is from transcripts.
- **Per-entry capture:** free narrative + destination (forced choice) + intensity (0–10) + recency (one tap). Added burden per entry: one word, one number, one tap.

## Pilot (design phase, disclosed)

Before registration of the final instrument wording, a pilot of **10–15 people from the authors' extended network, 2–3 days each,** finalizes the destination response options. _Amended 2026-11-01:_ the pilot runs on a private web page, not the SMS flow, because a texting number needs carrier registration, which takes weeks; it tests the wording, not texting, and a second short pilot by text with different people comes before the study opens. _Amended 2026-11-12:_ the pilot offers more than the study will: _nowhere_ split into _it faded_ and _I kept it in_ (the methods review's worry that one word covers opposites), _split about evenly_, _somewhere else (say where)_, and a _none of these fit well_ box on every entry, so that forced choice cannot hide misfit; every entry also records when it happened. The four categories are frozen only if ≥ 90% of pilot entries land cleanly in them, **the lower 95% Wilson bound of that share is ≥ 80%, and there are ≥ 40 entries from ≥ 10 people** (rule confirmed by the author 2026-11-12); otherwise they are revised before freezing (if the split option is common, the two kinds of nowhere are separated). The study's SMS parser is run over the pilot's free text and its agreement with what people picked is reported. Before the wording is frozen, **5–8 people who work in the study's target jobs (driving, nursing, support) read each question aloud and say what it means to them** (cognitive interviews), because the pilot sample skews toward design and software. _Amended 2026-11-19 (external review):_ (a) the pilot adds the relief item above, to test whether people can answer it for every destination; (b) the _somewhere else (say where)_ write-ins are coded by two people, and a place that appears in **≥ 5% of pilot entries from ≥ 3 people** becomes a fifth choice in the study (thresholds decided 2026-11-19); (c) the registration reports the pilot's dates, the number of people and entries, and every change the pilot caused to the design, in a "Pilot report" section completed before submission. **Pilot data is design data:** it is excluded from all analyses and no pilot participant may enroll in the study proper.

### Pilot report (to be completed before submission)

Registered now so it cannot be skipped later (reviewer: report the pilot's date, sample size and how it shaped the design). **[TO COMPLETE]**: pilot dates; number of people and entries; clean-in-the-four share with its 95% Wilson lower bound; write-in themes and any category added; relief item: answer shares by destination and whether it stays; changes made to wording, options or the plan because of the pilot.

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

**Primary (H1 and H1a), within person.** For each hypothesis, a multilevel logistic regression, entries nested in participants, on the entries in its contrast (H1: destination is _other people_ or _the tool_; H1a: _other people_ or _myself_):

> `other_people ~ system_involved_within + system_involved_person_mean + (1 | participant)`

where `system_involved_within` is the entry's value minus that participant's own mean, and the mean enters as its own term, so the first coefficient is the within-person effect alone (Mundlak / within-between decomposition; audit 2026-11-12: without it a random-intercept model blends within- and between-person association). A conditional logistic model, which uses only within-person differences, is run as a pre-declared check.

- **Random slope:** we attempt `(1 + system_involved | participant)`; if it fails to converge or the slope variance is degenerate (likely at ~5–7 entries per person), we fall back to the random-intercept model. **This fallback is pre-declared here** so a convergence-driven model change cannot be a post-hoc choice.
- **Reported:** for each of H1 and H1a, the fixed-effect odds ratio with 95% CI, judged against OR ≥ 1.5; ICC of the empty model; number of participants contributing within-person variance in that contrast.
- **Power simulation, before registration (audit 2026-11-12; sharpened 2026-11-19):** because each hypothesis now uses only the entries in its own contrast, the simulation is run per contrast: with realistic dropout and 5–7 entries per person, how many recruits give ≥ 30 participants who have both kinds of entry _within that contrast_, and what odds ratio is detectable; if the answer is that the study is likely underpowered, say so here rather than after.
- **Power gate:** only participants with at least one system-involved and one non-system entry inform the contrast. If fewer than **30 participants** have such variance in a contrast, that hypothesis's primary analysis is reported as underpowered and descriptive only.
- **Between-person gate and power (new 2026-11-19):** the between-person models are only as informative as the spread of exposure and the number of participants per covariate allow. _Decided 2026-11-19:_ a minimum before they are interpreted: ≥ 40 completers with an exposure score, and no more than one covariate per 10 completers; below it they are reported as descriptive. The power simulation above also covers the between-person model, because the registration cannot claim a second look it has not checked is feasible.
- **Sensitivity checks (pre-declared):** (a) primary model on entries marked _just now / within the last hour_ only; (b) primary model on a one-entry-per-day subsample (first entry per day); (c) primary model with time-of-day and recency as covariates.

**Secondary (H2).** Within-person intensity contrast: multilevel linear model `intensity ~ system_involved_within + system_involved_person_mean + (1 | participant)`, same fallback logic, judged against the ≥ 0.5-point threshold.

**Secondary, between person (H1, H1a, H2; new 2026-11-19).** The same three hypotheses tested across participants, with the continuous screener exposure score as the predictor, adjusted for age, gender, profession and socioeconomic status (see Operational definitions), using one row per entry in a multilevel model with a participant intercept (logistic for H1 and H1a, linear for H2). Reported with estimates and 95% intervals beside the within-person results, and labeled secondary in every output because it is exposed to the opt-in selection and residual confounding that the within-person design removes. Robustness: the low-vs-high contrast, and the ordered three-group version, as registered above. The pre-declared reading: agreement strengthens the evidence; disagreement is reported as disagreement, never resolved by choosing the analysis that agrees with us.

**Day-level and week-level variables (pre-declared, conditional).** Because entries are event-contingent, a day with no entry has no data, so a day-level exposure or frustration series exists only for days on which something was reported, and its missingness is itself informative. Whether to construct day-level (share of that day's entries involving a system; mean intensity) and week-level versions is therefore decided **from missingness alone, before any outcome is examined by exposure**: they are built only if at least **50%** (decided 2026-11-19) of the calendar days in each completer's 7-day window have ≥ 1 entry (the denominator is every calendar day in the window, not only days with an entry). If built, they are reported as exploratory and never as a replacement for the entry-level primary analysis; if not, the decision and the observed missingness are reported.

**Exploratory moderation.** `system_involved × exposure_score` cross-level interaction added to the primary model; reported as exploratory in every output.

**Descriptive.** Cohort-level tables of intensity and destination. Any inferential low / medium / high test beyond the robustness checks above is labelled descriptive/secondary, uses the rules previously drafted (Kruskal–Wallis / χ² with the pre-declared `none/unclear` collapse for thin cells), and is gated: fewer than 15 completers per cohort ⇒ tables only, no tests.

**Entry inclusion.** Entries marked _before today_ are excluded from all confirmatory analyses and counted separately, same-day recall for salient discrete events is adequate for this design's claims; cross-day recall is not. No person-level exclusion applies to the primary model except the within-person-variance requirement above. "Completer" (≥ 3 check-in days) is a descriptive label and a gate for the secondary cohort analyses only.

**Coding.** As specified in Operational definitions: independent, blind, transcript-only, κ ≥ 0.70 on a 20% overlap sample, third-coder resolution, uncodable flagged not guessed.

**Missing data.** No imputation. Missingness is expected to be informative (see Sampling); completer-vs-enrolled characteristics are reported.

**Subgroups.** None are confirmatory. Any analysis by profession, tenure, channel, or demographic is exploratory and labelled so in every report.

**Analyst.** **[DECIDE]**, who runs the models; coders are blind to exposure as specified, and the analyst does not code.

**Survey methodologist.** _Updated 2026-11-19._ A survey methodologist who is a person, and who did not write this plan, **reviewed the methods brief and gave written feedback** (`methods-review-external.md`); this is the human review the plan required for methods. The reviewer is **not named, at their own request**; the registration will say "an external survey methodologist, anonymous at their request" and nothing more identifying. The reviewer has **offered to read the questionnaire** (wording, order, flow); **that has not happened**, and the plan is not filed until it has, so the earlier requirement that a person read "every instrument" remains open for the instruments. Also **[DECIDE]**: publish the screener items (not in this repository today) so the exposure score can be audited, and specify how a voice note records destination and intensity.

## Known limitations, registered in advance

- **Self-selection is the central sampling property:** unpaid public opt-in selects for people who already feel something about the topic. Handled by making the primary hypothesis within-person; prevalence claims are out of scope entirely.
- **Noticing bias:** participants report the moments they notice. If system-involved frustration is more _memorable_ rather than more common or more displaced, the within-person contrast inherits that. This is a real, unremovable limitation of event-contingent sampling and we register it plainly.
- **Moment-level confounding:** the within-person design absorbs stable confounds but not momentary ones, a system-involved moment may also be a busier moment. The design supports within-person association, not moment-level causation.
- **Informative attrition:** dropout is plausibly correlated with the constructs under study; completer analyses are biased in unknown direction.
- **Measurement reactivity:** a week of logging frustration may itself change frustration; reactivity in ESM is typically small but nonzero.
- **Transcription noise:** voice entries pass through automated transcription before coding; errors enter the coded predictor. Mitigated by human coders on transcripts and the κ floor; residual noise is registered.
- **Between-person comparison is weaker:** people whose work runs on automation differ in profession, autonomy, hours and income; the adjustment covers only what the screener asks (age, gender, profession, socioeconomic status) and cannot cover what it does not. The between-person analysis is therefore secondary and reported beside the within-person one, never in its place.
- **Event-contingent days:** day- and week-level summaries exist only for days with an entry (see Analysis plan), so they inherit a selection that the entry-level analysis does not.
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

1. Run the destination-category pilot, including the relief item and the write-in coding, freeze the response options, and complete the **Pilot report** (dates, people, entries, what changed) in this document (blocks final instrument wording, not the rest of this document).
   1a. Have the external methodologist read the questionnaire (offered 2026-11; not yet done), and add the screener's age / gender / profession / SES items and, if chosen, a short personality measure.
2. Resolve remaining **[DECIDE]**s: ORCID, additional recruitment channels, analyst, IRB reference, data availability.
3. Confirm no study data (pilot excluded, as disclosed) has been collected before the registration timestamp.
4. Submit, capture the DOI, and set it in `src/content/registration.ts`, the site copy and `/methods` notice follow automatically (#38, #28).
