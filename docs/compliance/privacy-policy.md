# Privacy Policy, DRAFT

> **Not approved. Not for publication.** Draft for counsel review, slice #33.

**Last updated:** DRAFT · **Applies to:** bigmadstudy.com and the check-in flows

---

## The short version

We collect the least we can get away with, we keep your contact details apart from your answers, we never talk to your employer, and you can have all of it deleted by asking.

The rest of this page is the detail behind those four claims.

## What we collect, and why

| What                                                 | Why                                     | Kept for                                              |
| ---------------------------------------------------- | --------------------------------------- | ----------------------------------------------------- |
| Screener answers (work context, automation exposure) | To assign a study cohort                | **[DECIDE]**                                          |
| Check-in entries (text)                              | The research data itself                | **[DECIDE]**                                          |
| Check-in entries (audio, optional)                   | The research data itself                | Audio deleted after **[DECIDE]**; transcript retained |
| Survey answers (pre and post)                        | To measure change over the week         | **[DECIDE]**                                          |
| Contact details (email and/or phone)                 | To send check-in prompts                | Deleted at study end + **[DECIDE]**                   |
| Website analytics                                    | To see whether the page explains itself | **[DECIDE]**                                          |

We do **not** collect your name at work, your employer, your job title in identifiable form, your location beyond **[DECIDE]**, or anything about your health beyond what you volunteer in an entry.

## Voice recordings

If you opt into voice check-ins, we collect a recording of your voice. Several US states, Illinois, Texas, Washington, treat a voiceprint as a biometric identifier with specific rules. We follow the strictest of them regardless of where you live.

- We ask for written, separate permission before any recording.
- **Transcription runs on our own hardware.** We use Whisper, an open-source speech-to-text model, running on machines we control. Your audio is not uploaded to any transcription service.
- We delete original audio after **[DECIDE]**. Transcripts, stripped of identifying detail, are kept for the research.
- **We do not sell, lease, trade, or otherwise profit from biometric data.** Not now, not later, not as part of any acquisition.
- Voice is always optional and never a condition of participation. (The study is unpaid; there is no compensation to condition.)

## Who else touches your data

An unnamed processor is not a disclosure, so here they are:

| Company                  | What they do                              | Agreement                   |
| ------------------------ | ----------------------------------------- | --------------------------- |
| Twilio                   | Sends and receives check-in text messages | DPA, **[DECIDE: signed?]** |
| Google Cloud (Firestore) | Stores study data                         | DPA, **[DECIDE: signed?]** |
| Vercel                   | Hosts the website; handles server logs    | DPA, **[DECIDE: signed?]** |
| **[DECIDE]** analytics   | Measures site usage                       | DPA, **[DECIDE]**          |

**No third-party AI service processes your entries.** Transcription is self-hosted. If that ever changes, this page changes first and we ask your permission again.

## Who does not

Your employer. We do not contact employers, we do not verify employment, and nothing you write or say is shared with any workplace. This is not a courtesy, it is a design constraint.

## How it is separated

Contact details live in a different store from your responses, linked only by an identifier that means nothing on its own. Someone who obtained the response data alone could not tell whose it was.

## What we publish

Aggregate patterns across participants. Short anonymized excerpts, if any, stripped of identifying detail. Never raw audio. Never a single participant's entries as a set.

We also publish our limitations and the results we did not expect. Our hypotheses were pre-registered publicly before collection **[DECIDE, link the DOI once #38 completes]**.

## Your choices

- **See what we hold:** ask, and we will tell you.
- **Delete it:** ask, and we will delete your entries and contact details within **[DECIDE]** days, then confirm. No reason needed.
- **Stop texts:** reply STOP to any message.
- **Withdraw:** stop at any time, for any reason, without explanation.

Data already folded into published aggregates cannot be extracted, because at that point it is no longer separable. Everything else goes.

**[DECIDE]**, whether to offer GDPR/CCPA-specific rights language. If any EU or California participants are expected (California is near-certain), this section needs the statutory rights spelled out with the statutory response windows.

## Security

**[DECIDE]**, describe encryption at rest and in transit, access controls, and who on the team can see raw entries. Do not claim a control that is not implemented; an aspirational security section is the kind of statement that turns a breach into a misrepresentation.

## Breach

If data is exposed, we will notify affected participants within **[DECIDE]** and say plainly what happened.

## Contact

privacy@bigmadstudy.com, monitored by a human. If you email it, a person reads it.

General questions about taking part go to study@bigmadstudy.com; this address is for your data specifically, so requests about it are not lost behind them.

---

## Notes for review

- Every retention figure is unset on purpose. Pick real numbers you can honor; a retention policy you exceed is worse than a longer one you keep.
- The security section must describe what is actually built at launch.
- This page is the destination of the "How we handle data" link already live on the landing page (#28). Until it exists, that link resolves to `/methods`, which does not yet contain this content.
