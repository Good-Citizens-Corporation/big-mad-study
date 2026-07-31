export const meta = {
  name: "deliver-audit",
  description:
    "The deliver cycle's adversarial audit loop: fresh reviewer per round, rotating lens, fix-and-re-review until two consecutive clean rounds or a hard cap.",
  whenToUse:
    'After the refactor/builder commits of the `deliver` skill, before opening the PR. args: { issue: <number>, branch: "<branch>", repoPath?: "<abs path>" }',
  phases: [
    {
      title: "Audit",
      detail: "review → fix → re-review, until clean or capped",
    },
  ],
};

// ── Loop policy ──────────────────────────────────────────────────────────────
// Terminates, and cannot be gamed:
//  • fresh reviewer each round (no memory → cannot be worn down)
//  • rotating lens (perspective diversity beats redundancy)
//  • blocking bar = MEDIUM; LOWs survive as disclosed residuals
//  • exit = 2 CONSECUTIVE clean rounds (one clean round can be a lazy reviewer)
//  • hard cap = 3 fix rounds; capped with a blocker open ⇒ ESCALATE, never ship
const BLOCKING = new Set(["high", "HIGH", "medium", "MEDIUM"]);
const MAX_FIX_ROUNDS = 3;
const CLEAN_STREAK_TO_EXIT = 2;

const LENSES = [
  'CORRECTNESS & SPEC — trace the logic for a wrong result; verify the diff honors the issue\'s "Does not change" and Non-goals.',
  "MAINTAINABILITY & EXTENDABILITY — SOLID/Clean Code per the standards. Will the next case require modifying this unit? Does any name lie about what the code does? Is this a second copy of something (DRY), or a design value hardcoded where a token exists?",
  "ADVERSARIAL — try to write a test the current implementation FAILS. Mutate every load-bearing line and find the ones no test kills. Attack the privacy and consent promises the site makes out loud.",
];

const REPO = args?.repoPath || "/Users/duebelbytes/Sites/big-mad-study";
const ISSUE = args?.issue;
const BRANCH = args?.branch;

if (!ISSUE || !BRANCH) {
  throw new Error(
    'deliver-audit requires args: { issue: <number>, branch: "<branch>" }',
  );
}

const FINDING = {
  type: "object",
  additionalProperties: false,
  properties: {
    severity: { type: "string", description: "high | medium | low" },
    what: { type: "string" },
    where: { type: "string", description: "file:line" },
    failureScenario: {
      type: "string",
      description: "concrete input/state → concrete wrong outcome",
    },
    provenBy: {
      type: "string",
      description:
        "the mutation/command run to prove it, and its output. Empty ⇒ unproven suspicion, not a finding.",
    },
  },
  required: ["severity", "what", "where", "failureScenario"],
};

const REVIEW_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    verdict: { type: "string", description: "clean | findings" },
    findings: { type: "array", items: FINDING },
    whatIChecked: {
      type: "string",
      description:
        'REQUIRED even when clean: what was checked, how, and which mutations were run and killed. An unauditable "looks good" is not a passing round.',
    },
    mutationsRun: {
      type: "array",
      items: { type: "string" },
      description: "each mutation attempted and whether a test killed it",
    },
  },
  required: ["verdict", "findings", "whatIChecked"],
};

const FIX_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    fixed: { type: "array", items: { type: "string" } },
    rejected: {
      type: "array",
      items: { type: "string" },
      description: "findings NOT fixed + why the finding does not hold",
    },
    commitSha: { type: "string" },
    verification: { type: "string", description: "gate results after the fix" },
  },
  required: ["fixed", "verification"],
};

function reviewPrompt(lens, round, priorContext) {
  return `You are reviewing SLICE/issue #${ISSUE} on branch \`${BRANCH}\` in ${REPO}.

Read the authoritative spec: \`GH_PAGER="" gh issue view ${ISSUE} --repo Good-Citizens-Corporation/big-mad-study\`
Read the standards: ${REPO}/docs/delivery/standards.md
Read the diff: \`cd ${REPO} && git --no-pager diff origin/main...${BRANCH}\` and \`git --no-pager log --oneline origin/main..${BRANCH}\`

THIS ROUND'S LENS (round ${round}):
${lens}

${priorContext}

PROVE, DON'T READ. Before trusting any test: break the implementation it covers, run the test, and confirm it goes RED. If it stays green, the test is decoration — that is a MEDIUM finding. Revert every mutation you make and leave the tree exactly as you found it. Re-run the author's claimed evidence rather than trusting it.

Report ONLY verified findings, each with a concrete failure scenario and the mutation/command that proves it. Findings are cheap and expected; silence is expensive — but a padded LOW is noise. If it is genuinely clean, say so and make it falsifiable via whatIChecked.

Return ONLY the structured object.`;
}

phase("Audit");

let round = 1;
let fixRounds = 0;
let cleanStreak = 0;
const history = [];
let escalate = null;

while (cleanStreak < CLEAN_STREAK_TO_EXIT) {
  const lens = LENSES[(round - 1) % LENSES.length];
  const prior = history.length
    ? `PRIOR ROUNDS (for context — re-verify, do not assume they were fixed correctly):\n${JSON.stringify(history, null, 2)}`
    : "This is the first round.";

  const review = await agent(reviewPrompt(lens, round, prior), {
    label: `audit:r${round}`,
    phase: "Audit",
    schema: REVIEW_SCHEMA,
    agentType: "adversarial-reviewer",
  });

  if (!review) {
    escalate = `Reviewer died in round ${round} — treat as UNREVIEWED. Do not open the PR.`;
    break;
  }

  const blockers = (review.findings || []).filter((f) =>
    BLOCKING.has(f.severity),
  );
  history.push({
    round,
    lens: lens.split("—")[0].trim(),
    verdict: review.verdict,
    findings: review.findings,
  });
  log(
    `round ${round} [${lens.split("—")[0].trim()}]: ${blockers.length} blocking, ${(review.findings || []).length - blockers.length} low`,
  );

  if (blockers.length === 0) {
    cleanStreak += 1;
    round += 1;
    continue;
  }

  cleanStreak = 0;
  fixRounds += 1;

  if (fixRounds > MAX_FIX_ROUNDS) {
    escalate = `Hit the ${MAX_FIX_ROUNDS}-round fix cap with ${blockers.length} blocking finding(s) still open. STOP — do not open the PR. Escalate to Bob.`;
    break;
  }

  const fix = await agent(
    `You are fixing verified review findings on issue #${ISSUE}, branch \`${BRANCH}\`, in ${REPO}.

Standards: ${REPO}/docs/delivery/standards.md — the bar. Spec: \`GH_PAGER="" gh issue view ${ISSUE} --repo Good-Citizens-Corporation/big-mad-study\`.

BLOCKING FINDINGS (each was proven by mutation — treat as real unless you can demonstrate otherwise):
${JSON.stringify(blockers, null, 2)}

For each: fix it TDD-first — write the failing test that pins the defect (watch it go RED), then the minimum fix (GREEN). If you believe a finding does NOT hold, do not silently skip it: put it in \`rejected\` with the evidence that refutes it.

Do NOT weaken or delete tests to reach green. Do NOT fix by suppressing a lint rule.

Then run the FULL gate list from the standards. Verify \`git branch --show-current\` is \`${BRANCH}\` before committing (a vanished worktree can silently drop you onto a sibling's branch). Commit: \`fix: address audit round ${round} findings (#${ISSUE})\`.

Return ONLY the structured object.`,
    { label: `fix:r${round}`, phase: "Audit", schema: FIX_SCHEMA },
  );

  history.push({ round, fix });
  if (!fix) {
    escalate = `Fix agent died in round ${round}. Blocking findings remain unaddressed — do not open the PR.`;
    break;
  }
  round += 1;
}

const allFindings = history.flatMap((h) => h.findings || []);
const residuals = allFindings.filter((f) => !BLOCKING.has(f.severity));

return {
  issue: ISSUE,
  branch: BRANCH,
  outcome: escalate ? "ESCALATE" : "CLEAN",
  escalate,
  roundsRun: round - 1,
  fixRounds,
  cleanStreak,
  // Disclose in the PR body under "Accepted residuals" — never drop silently.
  acceptedResiduals: residuals,
  history,
};
