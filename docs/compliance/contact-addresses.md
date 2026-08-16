# Contact addresses

The study's addresses, one per **audience and obligation** — not one per department. Each exists because some document promises someone a way to reach us, and the promise differs in kind.

**Status:** the aliases below must be created at `bigmadstudy.com` before any document referencing them is published. A consent form pointing at a bouncing address is worse than one with a blank in it.

## The set

| Address | For | Referenced by | Response commitment |
| --- | --- | --- | --- |
| `study@bigmadstudy.com` | Participant questions about the study — what it is, how to take part, what happens next. The default human channel. | Consent ("About the study"), landing page | **[DECIDE]** — recommend 2 business days, stated publicly |
| `privacy@bigmadstudy.com` | Data questions, deletion requests, "what do you have on me". | Consent (deletion path), privacy policy, screener confirmation | Bounded by the published deletion window — **[DECIDE]** days |
| `methods@bigmadstudy.com` | Methodologists, peer reviewers, replication requests, the methods brief. | Methods brief, pre-registration, `/methods` | Best effort; no participant relies on it |
| `press@bigmadstudy.com` | Media and inbound from recruitment posts. | Public site footer (when added) | Best effort |
| `security@bigmadstudy.com` | Vulnerability disclosure. Cheap to run, and the alternative is a researcher with no route reporting it publicly. | `/.well-known/security.txt` (when added) | Best effort, acknowledged |
| `noreply@bigmadstudy.com` | Outbound transactional sending identity. Never monitored, and says so in every message it sends. | Prompt/confirmation email, if email is ever used | None — must state where to reply instead |

## Why these are separate

**`privacy@` is not a courtesy split.** Deletion and access requests carry a published response window and are the channel a regulator or IRB would ask about. Keeping them out of the general-questions inbox is what makes "we will delete within N days" auditable rather than aspirational — and it means a deletion request cannot be lost behind twenty "when does this start?" emails.

**`study@` is the one that must be genuinely monitored.** The distress protocol (#37) directs participants in crisis to 988 rather than to us, so no `urgent@` exists by design — but a participant who discloses something serious will often reply to whatever address they already have. That makes `study@` a place where a hard message can arrive with no warning, and it needs a named reader with a named backup.

**`methods@` keeps peer correspondence off a personal address.** The methods brief currently goes out from `bob@goodcitizens.us`; a study making public claims about transparency should survive its author changing jobs.

**`noreply@` exists to be honest.** If outbound mail is ever sent, its From address should not imply a conversation that nobody is reading.

## Not created, deliberately

- `urgent@` / `crisis@` — would imply a monitored emergency channel this study cannot staff. The protocol routes to 988 and 911 instead, and says so in consent.
- `support@` — duplicates `study@` for a study with no product to support.
- `info@` / `hello@` / `contact@` — generic catch-alls that collect spam and tell a participant nothing about who reads them.
- `irb@` — the IRB's own contact goes in the consent document (#31); it is theirs, not ours, and forwarding it through us would defeat the independence it exists to provide.

## Open

- **[DECIDE]** Who monitors `study@` and `privacy@`, with a named backup. Likely the same two humans as the check-in reviewers (#37) and coders (#48).
- **[DECIDE]** Published response windows for `study@` and `privacy@`. Do not publish one you cannot keep on a bad week.
- **[DECIDE]** Whether all six forward to one inbox initially. Forwarding is fine and normal at this size — the semantic separation is for the reader and the auditor, and it survives being backed by a single mailbox. What must not happen is publishing an address that reaches nobody.
