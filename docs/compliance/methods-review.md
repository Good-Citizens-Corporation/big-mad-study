# Methods review, answers to the brief

**Reviewer:** Claude (Anthropic), acting as methodological reviewer at the author's request. This is an AI review grounded in the experience-sampling literature, disclosed as such. It is intended to sharpen the pre-registration; a named human methodologist remains worth adding for credibility and for field-specific error-catching.

**Scope:** the seven questions in `methods-brief.md` §6. Format: a decision per question, with reasoning, and what to change in `pre-registration.md`.

---

## Q1, Construct: is felt intensity 0–10 per entry right?

**Keep it, and demote it.** The 0–10 momentary self-rating is standard practice in event-contingent experience sampling; single-item momentary affect measures are acceptable where the construct is narrow and the burden budget is tight, which is exactly this design. Do not add duration, recovery, or consequence items, each is a defensible construct, but every added item taxes an unpaid sample, and none of them serves the primary hypothesis below.

The demotion matters more than the item: **intensity is not the study's primary outcome, destination is.** The intensity rating's main job is (a) a manipulation-free description of the sample's moments and (b) a covariate/secondary outcome. Rewrite the registration so the intensity hypothesis is explicitly secondary. This also defuses the single-item reliability objection: measurement error in a secondary descriptive variable is a limitation to note, not a design flaw.

Anchor the scale verbally at both ends in every prompt ("0 = barely registered, 10 = as worked up as you get"), unanchored 0–10 scales drift between people, and while within-person designs absorb between-person anchor differences, the anchors cost nothing.

## Q2, Primary hypothesis: A or B?

**B, within-person. Register it as primary; demote A's cohort comparisons to secondary/descriptive.** The reasoning in the brief is correct and is the standard argument for intensive longitudinal designs: stable confounds are absorbed by the person-level intercept, and the opt-in selection that poisons between-person prevalence claims largely spares the within-person contrast.

**The model.** Pre-declare the outcome as **binary**: destination is _person-directed_ (other people or self) vs _not_ (tool or nowhere). This matches the hypothesis as written ("displaced onto other people, or onto the self"), avoids a multinomial model the sample cannot support, and makes the effect size interpretable. Then:

> Multilevel logistic regression: `person_directed ~ system_involved + (1 | participant)`, entries nested in participants.

- **Random slope:** attempt `(1 + system_involved | participant)`; if it fails to converge or the slope variance is degenerate, likely at ~5–7 entries per person, fall back to random intercept only, and say in the registration that this fallback is pre-declared. Convergence-driven model changes decided after seeing data are exactly what registration exists to prevent.
- **Report** the fixed-effect odds ratio with 95% CI, and the ICC of the empty model.
- **Who contributes:** only participants with within-person variance on `system_involved` (at least one system and one non-system entry) inform the contrast. Report how many do. If fewer than **30 participants** have such variance, report the primary analysis as underpowered and descriptive, this replaces the "<15 completers per cohort" rule for the primary (keep that rule for the secondary cohort analyses).
- **Effect threshold** replacing Cramér's V ≥ 0.2: **OR ≥ 1.5** for a meaningful within-person effect. Justification to register: below ~1.5, an effect of this kind is unlikely to be distinguishable from residual moment-level confounding (time of day, workload spikes) in an observational design of this size, whatever its p-value.
- **Moment-level confounding is the new weak point**, within-person designs kill stable confounds but not momentary ones (a system-involved moment may also be a busier moment). Add elapsed-time and time-of-day as sensitivity covariates, and register the limitation explicitly: the design supports within-person association, not moment-level causation.

**Multiple entries per day** are non-independent beyond the person level. With ~1 entry/day this is negligible; do not add a day level to the model, but register a sensitivity check (primary model on a one-entry-per-day subsample, first entry) in case entry patterns are clumpier than expected.

## Q3, The cohort variable

**Keep the screener's underlying items; drop the trichotomy from the analysis.** Cutting a continuous exposure measure into three bins discards information and manufactures spurious homogeneity within bins, this is the well-known cost of categorizing continuous variables. Use the **continuous exposure score** as the person-level moderator (`system_involved × exposure` cross-level interaction), and treat the `heavy/light/low` labels as what they actually are: a recruitment-balancing and communication device. The registration should say the labels are used for recruitment stratification and reporting readability, and the moderation analysis uses the continuous score.

Label the moderation analysis **exploratory**, not confirmatory. A cross-level interaction at 60–90 participants is underpowered almost by construction; registering it as confirmatory sets the study up to "fail" on a test it could never pass.

## Q4, Recall latency

**The design is event-contingent sampling, which is a recognized ESM variant, own that framing.** For discrete, self-defined events ("a moment that changed your mood"), event-contingent reporting is the appropriate scheme, and signal-contingent prompting would measure a different thing (current state at random times), not a better version of the same thing. The brief's worry that the moment-level claim is untenable without prompting is overstated; what's needed is bounding and honesty, not a redesign.

Concretely:

- **Add the elapsed-time item** as proposed: _just now / within the last hour / earlier today / before today_. One tap, fits the burden budget.
- **Exclusion rule to register:** entries marked _before today_ are excluded from the primary analysis (both intensity and destination) and counted separately. Same-day recall for salient discrete events is adequate for this design's claims; cross-day recall is not.
- **Sensitivity check to register:** primary model on the _just now / within the hour_ subset only.
- **Registration language:** describe the study as event-contingent sampling of self-selected salient moments, and state the noticing-bias limitation from the brief (§5B) verbatim, if system-involved frustration is more _memorable_ rather than more common, the sample of moments inherits that. This is a real, honest, unremovable limitation of the design; registering it plainly is the correct handling.

## Q5, Destination categories

**Pilot before you freeze, this is the one place a pilot is non-negotiable.** The four categories (_tool / other people / myself / nowhere_) are plausible but untested, and the primary outcome is built directly on them. Two known risks: real moments are often mixed ("snapped at my partner about the app"), and _nowhere_ conflates "it dissipated" with "I swallowed it," which are psychologically opposite.

Minimal pilot that fits your constraints: **10–15 people from your extended network, 2–3 days each, using the real SMS flow**, with a fifth option, _somewhere else (say where)_, and free text. Freeze the categories only after seeing whether ≥ 90% of pilot entries land cleanly in the four. Pilot data is design data, not study data: say in the registration that a pilot was run to finalize response options and that pilot entries are excluded from all analyses. This is standard and looks like rigor, not contamination, but only if the registration discloses it.

Also pre-declare the tie-breaking instruction shown to participants: "pick where _most_ of it went."

## Q6, The numbers

| Number                                    | Verdict                | Notes                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| κ ≥ 0.70 for system-involvement coding    | **Keep**               | Standard floor for substantive coding; with a tight binary codebook you should clear 0.80. Also register: coders code a common 20% overlap sample, κ computed on that.                                                                                                                                                                                                                                                    |
| ≥ 0.5-point intensity threshold           | **Keep, relabeled**    | Fine for the now-secondary intensity analysis. Describe it as ~0.25 SD on typical momentary-affect dispersion; it stops being load-bearing once intensity is secondary.                                                                                                                                                                                                                                                   |
| < 3 check-in-days exclusion               | **Replace**            | Right instinct, wrong design. It protected person-mean estimates (analysis A). The multilevel model uses all entries from everyone, excluding sparse participants throws away information and adds a selection filter. Keep a "≥ 3 days" definition only for describing _completers_ and for the secondary cohort analyses; the primary model has no person-level exclusion except zero within-person variance (see Q2). |
| 90 participants or 6 weeks stopping rule  | **Keep**               | Sound as an anti-optional-stopping device. Add one clause: analysis begins only after the final enrolled participant's window closes.                                                                                                                                                                                                                                                                                     |
| < 15 completers/cohort ⇒ descriptive only | **Keep for secondary** | Superseded for the primary by the "< 30 participants with within-person variance" rule (Q2).                                                                                                                                                                                                                                                                                                                              |

## Q7, What you didn't ask

Four things, two of which need action:

1. **Attrition is almost certainly informative (action).** In an unpaid frustration study, dropping out mid-week is plausibly _caused by_ frustration level, the data are missing not-at-random in the direction of the outcome. No fix at this scale, but the registration must say it: "attrition is expected to correlate with the constructs under study; completer analyses are biased in unknown direction; we report enrollment-vs-completion characteristics." Reviewers will ask; pre-empting it is cheap.
2. **The pre/post surveys have no job (action).** The registration lists them with a `[DECIDE]` for instruments, but under hypothesis B nothing uses them. Every unjustified instrument is burden spent for nothing in a design whose scarcest resource is unpaid goodwill. Either give them one declared purpose, a baseline single-item exposure/strain measure to describe the sample, or cut them. Do not register instruments you have no analysis for.
3. **Measurement reactivity (register, no action).** A week of logging frustration can change frustration, reactivity in ESM is typically small but nonzero. One sentence in limitations.
4. **Transcription as a measurement step (register, no action).** Whisper errors enter the coded system-involvement variable. Mitigation is already in the design (coders read transcripts; κ floor); add one line registering transcription as a noise source and that coders flag unintelligible entries as uncodable rather than guessing.

---

## Summary of required registration changes

1. Primary hypothesis → within-person (B), binary outcome, multilevel logistic, OR ≥ 1.5 threshold, pre-declared random-slope fallback, "< 30 with within-person variance" power gate.
2. Intensity hypothesis → secondary; cohort comparisons → secondary/descriptive; moderation → exploratory, on the continuous exposure score.
3. Frame as event-contingent sampling; add elapsed-time item, before-today exclusion, recency sensitivity check; register the noticing-bias limitation.
4. Destination categories frozen only after a disclosed 10–15-person pilot; pilot data excluded from analyses.
5. Replace the person-level exclusion rule as per Q6; keep κ, stopping rule, and thresholds as amended.
6. Add limitations: informative attrition, reactivity, transcription noise. Give the pre/post surveys a job or cut them.
