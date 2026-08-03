/**
 * Technical plates: constructed diagrams, not sourced illustration.
 *
 * Built rather than licensed for three reasons. The design system's claim is
 * that every mark is derived from a stated construction, and a bought
 * illustration is by definition not; a study under methodological scrutiny
 * should not carry decoration borrowed to look rigorous; and this study's
 * subject matter is genuinely diagrammatic, so a real figure explains more
 * than a picture would.
 *
 * These differ from the section figures in kind. Those are punctuation and
 * are hidden from assistive technology. A plate carries information the
 * surrounding prose does not, so each has a caption and a text alternative
 * that says what a sighted reader gets from looking.
 */

export type PlateName = "displacement" | "week" | "separation";

export type Plate = {
  /** Shown under the figure, for every reader. */
  caption: string;
  /** For readers who cannot see it. Describes the finding, not the shapes. */
  description: string;
};

export const plates: Record<PlateName, Plate> = {
  displacement: {
    caption:
      "Fig. 1. A moment, and the four places the frustration from it can land.",
    description:
      "A diagram of one frustrating moment at the centre, with four paths leading outward to four destinations: the tool itself, other people, yourself, and nowhere, where it dissipates. The study records which of the four a participant reports for each moment, and asks whether that choice is patterned by whether an automated system was involved.",
  },
  week: {
    caption:
      "Fig. 2. One participant's week, from screener to published result.",
    description:
      "A timeline of participation. It begins with a short screener, then a brief survey. Seven days follow, each marked for the short check-ins a participant sends when a moment gets to them, with gaps shown because skipped days are expected and permitted. A closing survey follows, and after all participants finish, the aggregate results are published. Total participant time is roughly five to ten minutes on the days they take part.",
  },
  separation: {
    caption:
      "Fig. 3. Contact details and responses are held in separate stores.",
    description:
      "A diagram of two enclosures that never touch. The left holds contact details, a phone number or email address, used only to send check-in prompts. The right holds study responses: entries, ratings, and survey answers. Between them sits a single opaque identifier that means nothing on its own. Anyone obtaining the response store alone could not tell whose answers they were.",
  },
};
