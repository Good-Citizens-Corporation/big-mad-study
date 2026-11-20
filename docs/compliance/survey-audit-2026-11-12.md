# Big-Mad Behavioral Study: audit of the survey science

Nov 12, 2026. Prompted by Natalie A. Thomas's LinkedIn post: the best survey science (question wording, scale design, order bias) is mostly outside LLM training data, so LLM-made surveys are weak. Our plan was reviewed only by an LLM, so this audit reads the instrument against exactly those concerns.

**Read:** `docs/compliance/pre-registration.md`, `methods-review.md`, `methods-brief.md`, `src/lib/checkin/parseSms.ts` (study repo); `src/content/bigmad.ts`, the plan, pilot briefing and pilot check-in page (this site). **Not available to audit:** the screener items (the exposure score), the post survey, the codebook, and how voice notes capture destination and intensity. None is in either repository.

## What holds up

Written-down null and thresholds before data; within-person comparison; unpaid and selection stated as a property, not a footnote; "before today" entries excluded; blind two-coder system-involvement coding with a κ floor and a declared failure; random-slope fallback declared in advance; limits, attrition direction and reactivity registered; the AI review disclosed; deletion and a distress protocol. These are real strengths.

## Fix before the wording is frozen

1. **The pilot briefing primes the hypothesis the plan says it avoids.** The plan codes system involvement from the story because "asking would prime participants." The briefing's only example is *"7, other people, the routing app moved my last stop and I snapped at the dispatcher"*: an app plus displacement onto people, which is H1's pattern, modeled for every participant. People imitate examples. Use several examples that span all four destinations, with and without a system, or none.
2. **The public pages state the hypothesis before enrollment.** "The explanation that costs the people who built the software nothing" invites system blame. Combined with LinkedIn recruitment, this is demand characteristics on top of selection. The within-person design does not remove it: someone told that systems cause frustration notices and reports system moments differently. Register it as a limitation and consider a neutral recruitment page.
3. **The key predictor is missing differentially.** `system_involved` is coded from a story the form calls optional ("or leave it blank"; "leave out anything you'd rather not say"). A moment where someone snapped at a colleague is the entry most likely to be left thin. No mention does not mean no system, so "non-system" moments absorb the thin stories. That is differential misclassification correlated with the outcome. Planned handling (flag uncodable, no imputation) reports it but doesn't bound it. Add a sensitivity analysis (model on entries with stories above a length floor) and consider a neutral structured item, such as "what was it about?" with systems among several decoys, if the priming cost is acceptable. Bob's call; register either way.
3b. **The model does not isolate the within-person effect.** `person_directed ~ system_involved + (1 | participant)` blends within- and between-person association unless the person's mean `system_involved` is added (Mundlak / within-between decomposition) or a conditional logit is used. Without it, "each participant is their own control" is not what the estimate says.
4. **The pilot doesn't test the instrument the study will use.** The pilot is a web form with radio buttons for destination. The study's SMS flow parses free text with regexes (`parseSms.ts`): "me" maps to *myself*, "nobody" and "nothing" to *nowhere*, "app/system/software/dashboard/machine" to *tool*. Mode effects and parser misclassification are untested. The pilot form also has **no recency item**, though the registered per-entry capture includes it. Add it, and run the parser over pilot free text to measure agreement with what people picked.
5. **The ≥ 90% "land cleanly" test cannot fail.** A forced single choice hides misfit: people pick the nearest option and move on. Only "somewhere else" signals trouble. The methods review itself named two known failures, mixed moments and *nowhere* conflating "it faded" with "I swallowed it", and the pilot offers neither a *split* option nor a *didn't fit* flag. Also: no minimum number of entries is set. With about 30 entries, 27 clean has a lower 95% bound near 74%; register the criterion with its interval, on people as well as entries.
6. **H1 pools opposites.** "Person-directed" = other people + myself. A system that raises self-blame and lowers snapping at others would cancel. Register other-directed and self-directed as separate secondary outcomes (or a multinomial descriptive).
7. **No power analysis, and the power gate is likely to trip.** Participants need at least one entry of each kind to contribute; the gate is 30. At 60–90 recruits, informative attrition and 5–7 entries each, simulate before registering. If the expected answer is "underpowered and descriptive," say so.

## Wording

- **"it" has no referent.** "How strong was it?" and "Where did most of it go?" each lean on "it" (the mood? the frustration? the moment?). Name it: "How frustrated were you?" and "Where did most of that frustration end up?"
- **The premise is mood; the construct is frustration.** "Something at work just changed your mood?" admits positive moods the outcome item can't take ("where did it go" assumes a negative feeling).
- **Anchors differ from the registered ones.** Page: "0 is barely, 10 is as strong as it gets." Registered: "0 = barely registered, 10 = as worked up as you get." "As strong as it gets" is open to *ever* or *for me*. Freeze one wording and test it.
- **Option order is fixed** (tool, other people, myself, nowhere). Fixed order is stable within a person but gives primacy to *tool* for everyone; counterbalance across people.
- **"Myself" is ambiguous** (self-blame, self-talk, bottling it up). **"the tool"** is system jargon for a driver or nurse.
- **The cohort labels say `heavy_ai/light_ai/low_ai`, but the construct is automation and metrics.** Rename, and publish the screener items so they can be audited.

## Process

- **The only methods review was an LLM's** (disclosed). That is the post's point applied to us: coverage of the literature it wasn't trained on. Add a named human survey methodologist before the plan is registered (the draft already says one is worth adding). Add 5–8 think-aloud interviews with people in the target jobs (drivers, nurses, support agents); the pilot is Bob's network, which skews toward design and software.
- **Make these checks first, as the rest of the brand does:** a wording lint (referent present, one construct per item, anchors identical to the registered text, no examples that contain the predictor), a parser test set with labeled messages, and a simulation for the power gate. Each fails the build the way the confirmed-facts check does.

## Order I would do it in

1 (examples), 4 (recency item, parser test), 5 (split and didn't-fit options, criterion with interval), wording fixes, then 3, 3b, 6, 7 in the plan, then the human methodologist and interviews, then register.

*References from memory, not rechecked here:* Tourangeau, Rips and Rasinski, *The Psychology of Survey Response* (2000); Krosnick on satisficing (1991); Stone and Shiffman on reporting momentary data (2002); Bell and Jones on within-between models (2015).

## Status, Nov 12, 2026

Fixed on the site: the pilot form (frustration wording, registered anchors, "where did that end up", nowhere split in two, split, none-fit box, recency item, per-person choice order, story prompt without "leave it blank"), the briefing (made-up examples that pair no app with a reaction, four questions, the new criterion), the studio tally (clean share and its 95% lower bound), the plan (secondary outcomes, interval decision rule, uncodable and thin-story handling, within-between model, power simulation, interviews, methodologist, screener and voice open items) and the public pages (neutral on the answer; priming added to the limits). Fixed in the study repo's `pre-registration.md`: the same amendments, with the cohort labels renamed. Still open and not something I can do: a named human methodologist, the 5–8 interviews, the power simulation, the screener items and the voice-note capture, none of which exist in either repo; and renaming the cohort identifiers in code, which are not in the repo's source.

Confirmed on Nov 12, 2026: the pilot pass rule (at least 90% clean, lower bound at least 80%, at least 40 answers from 10 people) and the H1 rule (estimate at least 1.5 and the interval above 1). No methodologist is named: the plan needs a person who did not write it, and we are looking (Nov 13).
