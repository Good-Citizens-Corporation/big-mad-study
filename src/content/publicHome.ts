import type { Slide } from "@/lib/types";
import { preRegistration } from "./registration";

/**
 * A frozen, timestamped registration issued by an independent registry.
 * Its absence is meaningful: see buildPublicHomeSlides below.
 */
export type PreRegistration = {
  registry: string;
  doi: string;
  /** Always a doi.org URL — it outlives any single registry's hostname. */
  url: string;
  /** ISO date the registry froze the record. */
  registeredAt: string;
};

/**
 * The landing deck is a function of the registration state rather than a
 * fixed array, because one paragraph of it is only true once a registry has
 * timestamped our hypotheses. Claiming pre-registration before that is the
 * exact kind of unverifiable assertion this study is meant not to make.
 */
export function buildPublicHomeSlides(
  registration: PreRegistration | null,
): Slide[] {
  return [
    {
      id: "top",
      title: "The Big-Mad Behavioral Study",
      subtitle:
        "A public experiment about what modern work does to mood, patience, and behavior.",
      body: [
        {
          type: "p",
          text: "Most people who feel worn down by tools and timelines assume they're the problem.",
        },
        {
          type: "p",
          text: "This study starts from a more boring possibility: maybe the environment changed. Or maybe something else did.",
        },
        { type: "p", text: "We're here to separate signal from noise." },
      ],
      ctas: [
        { label: "Start here", href: "/start", variant: "primary" },
        {
          label: "How it works",
          href: "/v2#how-it-works",
          variant: "secondary",
        },
      ],
    },
    {
      id: "about-the-study",
      title: "What this study is about",
      subtitle:
        "The short version, before you decide whether any of this is worth your time.",
      body: [
        {
          type: "ul",
          items: [
            "Who it's for: people whose day is shaped by apps, dashboards, tickets, routes, or metrics — any industry, any comfort level with technology",
            "Time commitment: a short screener, about a week of 5–10 minute check-ins, and two brief surveys",
            "What you get back: plain-language summaries of what we find, aggregate results, and an open look at our methods and limitations",
            "What it costs you: nothing. You can skip days, skip questions, or stop entirely without explaining why",
          ],
        },
        {
          type: "p",
          text: "We are not asking you to become a research subject in the intimidating sense. We're asking what your day actually does to you, in your own words, a few minutes at a time.",
        },
      ],
      ctas: [
        {
          label: "How we handle data",
          href: "/methods",
          variant: "secondary",
        },
      ],
    },
    {
      id: "whos-behind-this",
      title: "Who's behind this",
      body: [
        {
          type: "p",
          text: "The Big-Mad Behavioral Study is run by Good Citizens, a small team that builds things for people living inside systems they didn't design.",
        },
        {
          type: "p",
          text: "That's the whole motivation. If work feels heavier than it used to, the usual explanation on offer is that you need better habits, better boundaries, or a better attitude. We think that's worth testing rather than assuming, because the alternative explanation—that the environment changed—is cheaper to believe and harder to prove.",
        },
        registration
          ? {
              type: "p",
              text: `So we're doing this in the open. The hypothesis, the null it's tested against, and the limitations were registered with ${registration.registry} on ${registration.registeredAt}, before we collected any data — timestamped by someone other than us, so we can't quietly change what we were looking for. If the pattern we expect isn't there, that gets published too. A study that can only confirm itself isn't a study.`,
            }
          : {
              type: "p",
              text: "So we're doing this in the open. The hypothesis, the null it's tested against, and the limitations are written down in public, and they will be filed with an independent registry before we collect any data — timestamped by someone other than us, so we can't quietly change what we were looking for. If the pattern we expect isn't there, that gets published too. A study that can only confirm itself isn't a study.",
            },
      ],
      ctas: [
        {
          label: "Good Citizens",
          href: "https://goodcitizens.us",
          variant: "secondary",
        },
        ...(registration
          ? [
              {
                label: "Read the pre-registration",
                href: registration.url,
                variant: "secondary" as const,
              },
            ]
          : []),
      ],
    },
    {
      id: "what-were-studying",
      title: "What we're studying",
      body: [
        { type: "p", text: "One question:" },
        {
          type: "p",
          text: "When your day is shaped by apps, dashboards, automation, metrics, or do more with less... what happens inside you—and where does it go next?",
        },
        {
          type: "p",
          text: "Sometimes it lands on the tool. Sometimes it lands on other people. Sometimes it lands back on you.",
        },
        {
          type: "p",
          text: "We're not assuming the cause. We're mapping patterns.",
        },
      ],
    },
    {
      id: "who-this-is-for",
      title: "Who this is for",
      body: [
        {
          type: "p",
          text: "This is for people who live inside systems they didn't design.",
        },
        {
          type: "ul",
          items: [
            "Work support, service, healthcare, delivery, or trades where an app routes your day",
            "Work office/remote roles juggling tickets, chats, meetings, docs, and dashboards",
            "Have a low-tech job that still runs on other people's schedules and software",
          ],
        },
        {
          type: "p",
          text: "You do not need to be an AI person. We're recruiting across heavy, light, and minimal automation exposure.",
        },
      ],
    },
    {
      id: "what-youll-do",
      title: "What you'll do",
      body: [
        { type: "p", text: "If you join, you'll:" },
        {
          type: "ul",
          items: [
            "Take a short screener (work context + what shapes your day)",
            "Do quick check-ins for about a week (short voice notes or texts about moments that changed your mood or behavior)",
            "Take two tiny surveys (one before, one after)",
          ],
        },
        { type: "p", text: "That's it. No essays. No login. No homework." },
      ],
      ctas: [{ label: "Start here", href: "/start", variant: "primary" }],
    },
    {
      id: "time-commitment",
      title: "Time commitment",
      body: [
        { type: "p", text: "Built for people who are already tired." },
        {
          type: "ul",
          items: [
            "Check-ins: 5–10 minutes on the days you participate",
            "Pre survey: a few minutes",
            "Post survey: a few minutes",
          ],
        },
        {
          type: "p",
          text: "You can skip a day, skip a question, or stop entirely. There is no perfect attendance.",
        },
      ],
    },
    {
      id: "what-you-get-back",
      title: "What you get back",
      body: [
        { type: "p", text: "Research shouldn't disappear into a black box." },
        {
          type: "ul",
          items: [
            "A small thank-you (details shared after eligibility)",
            "Plain-language summaries of patterns we're seeing",
            "Aggregate results once we have enough responses",
            "A transparent look at methods, prompts, and guardrails",
          ],
        },
        {
          type: "p",
          text: "Nothing is shared with employers. Contact info is stored separately from responses. Names and identifiers are removed before analysis.",
        },
      ],
    },
    {
      id: "how-it-works",
      title: "How participation works",
      body: [
        {
          type: "p",
          text: "The flow is simple: screener → onboarding (if fit) → pre survey → about a week of check-ins → post survey → published aggregates.",
        },
        { type: "p", text: "We report associations, not proof of cause." },
        {
          type: "p",
          text: "We're not assuming automation is the driver; it's one possible factor among many.",
        },
      ],
      ctas: [{ label: "Start here", href: "/start", variant: "primary" }],
    },
    {
      id: "bias-limitations",
      title: "Bias + limitations",
      body: [
        {
          type: "p",
          text: "No study is neutral. Here's what we acknowledge up front:",
        },
        {
          type: "ul",
          items: [
            "Opt-in samples can skew toward people who already feel something",
            "Public framing can prime attention",
            "People remember extremes better than averages",
            "This can show patterns and relationships, not automation caused X",
          ],
        },
        {
          type: "p",
          text: "We publish limitations alongside findings. That's part of the deal.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      body: [
        {
          type: "p",
          text: "We designed this to avoid two common failures: (1) collecting more data than we need, and (2) pretending privacy exists when it doesn't.",
        },
        {
          type: "p",
          text: "Contact info is stored separately from responses.",
        },
        { type: "p", text: "We remove names and identifiers before analysis." },
        {
          type: "p",
          text: "We publish aggregate summaries and anonymized excerpts—never raw voice.",
        },
        {
          type: "p",
          text: "If you accidentally include something identifying, tell us and we'll remove it.",
        },
      ],
      ctas: [
        {
          label: "How we handle data",
          href: "/methods",
          variant: "secondary",
        },
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      body: [
        {
          type: "p",
          text: "This pilot is designed to capture a range of work contexts.",
        },
        {
          type: "ul",
          items: [
            "18+",
            "Can do voice or SMS check-ins for about a week",
            "English for this pilot (current constraint)",
          ],
        },
        {
          type: "p",
          text: "We're intentionally recruiting across heavy, light, and minimal automation exposure.",
        },
      ],
    },
    {
      id: "faq",
      title: "FAQ",
      body: [
        {
          type: "ul",
          items: [
            "Is this therapy? → No. It's research.",
            "Do I have to talk about AI? → No. Talk about what actually happened.",
            "Can I do SMS only? → Yes. Voice is encouraged, not required.",
            "What if I miss days? → Normal. Participate when you can.",
            "Can I quit? → Any time. No explanation required.",
            "Will this affect my job? → We don't contact employers. Nothing is shared with employers.",
          ],
        },
      ],
    },
    {
      id: "updates",
      title: "Updates",
      body: [
        {
          type: "p",
          text: "This is where we publish what we're learning, what we changed, and why—when there are enough responses to avoid overfitting.",
        },
        {
          type: "p",
          text: "We don't publish hot takes from tiny samples. We wait until patterns are real.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [
        {
          type: "p",
          text: "Questions, concerns, edge cases, researcher curiosity—send a note.",
        },
      ],
      ctas: [
        { label: "Start here", href: "/start", variant: "primary" },
        { label: "Back to updates", href: "/v2#updates", variant: "secondary" },
      ],
    },
  ];
}

export const publicHomeSlides: Slide[] = buildPublicHomeSlides(preRegistration);
