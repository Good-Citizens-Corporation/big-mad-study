# Retention & Destruction Schedule — DRAFT

> **Not approved.** Draft for counsel review — slices #33 and #34.
> Illinois BIPA requires a _published_ retention schedule and destruction guidelines for biometric identifiers, with a hard outer limit. That obligation is what makes this a document rather than a config value.

## Schedule

| Data                          | Retention                                                                                           | Destruction trigger            | Owner        |
| ----------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------ | ------------ |
| Raw voice audio               | **[DECIDE]** — recommend the shorter of _transcription complete + 30 days_ or _study end + 90 days_ | Automated job                  | **[DECIDE]** |
| Transcripts (de-identified)   | **[DECIDE]**                                                                                        | Manual, on request or schedule | **[DECIDE]** |
| Screener responses            | **[DECIDE]**                                                                                        | Automated job                  | **[DECIDE]** |
| Survey responses              | **[DECIDE]**                                                                                        | Automated job                  | **[DECIDE]** |
| Contact details (email/phone) | Study end + **[DECIDE]**                                                                            | Automated job                  | **[DECIDE]** |
| Consent records               | Longer than the data they authorize — **[DECIDE]**                                                  | Manual                         | **[DECIDE]** |
| Analytics                     | **[DECIDE]**                                                                                        | Provider default               | **[DECIDE]** |
| Published aggregates          | Indefinite                                                                                          | N/A — not personal data        | —            |

## Rules

1. **Biometric data has the shortest clock and no exceptions.** BIPA's outer bound is the earlier of "purpose satisfied" or three years from last interaction. Ours should be far shorter — the purpose is satisfied the moment transcription completes.
2. **Consent records outlive the data they authorize.** Deleting the proof of permission before the thing permitted is backwards.
3. **Deletion means every store.** Responses, contact details, audio, transcripts, backups, and analytics. A store added later without deletion coverage must fail the deletion test (#33).
4. **Destruction is evidenced.** A retention job that runs silently cannot be shown to have run. Log what was destroyed and when, without logging what it contained.
5. **Backups are in scope.** A deletion path that leaves data in a backup for another year is not a deletion path. **[DECIDE]** — state the backup rotation and how deletion propagates.

## Open

- **[DECIDE]** Who owns each destruction job, with a named backup.
- **[DECIDE]** What happens to data if the study is abandoned mid-flight. Participants consented to a study that would run; if it stops, the default should be destruction, not indefinite storage against a possible restart.
- **[DECIDE]** What happens on acquisition or wind-down of the company. BIPA's no-sale rule does not evaporate in a transaction, and participants should be told the answer up front.
