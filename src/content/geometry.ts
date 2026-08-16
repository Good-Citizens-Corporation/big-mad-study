/**
 * Sacred-geometry figures, after the system built for sarapaula.com.
 *
 * The governing rule there, kept here: **each figure is chosen for what it
 * marks, not for decoration.** A figure that could be swapped for any other
 * without loss is ornament, and ornament on a study about being worn down by
 * interfaces would be a small hypocrisy.
 *
 * These are compass-and-straightedge constructions, circles, squares, and
 * the divisions you can derive from them with no measurement. They are drawn
 * as hairlines, sized like punctuation, and they carry no information a
 * sighted-only reader gets and a screen-reader user does not: every heading
 * still says in words what its figure says in form.
 */

export type GeometryFigure =
  | "vesica"
  | "triad"
  | "lattice"
  | "return"
  | "balance"
  | "gnomon"
  | "partition"
  | "horizon"
  | "gate"
  | "seed"
  | "compass"
  | "monochord";

/** Why each figure exists. Read as the argument for keeping it. */
export const figureMeanings: Record<GeometryFigure, string> = {
  vesica:
    "Two circles, each through the other's centre. The oldest figure for two things overlapping without merging, a person and the system they work inside.",
  triad:
    "Three overlapping circles. Where frustration goes: the tool, other people, yourself. They overlap because real moments are mixed.",
  lattice:
    "A grid inside a square, one intersection marked. A system you did not design, and your position in it.",
  return:
    "A logarithmic spiral turning inward. Frustration that comes back around to the person who felt it.",
  balance:
    "A circle halved, a mark in each half. The hypothesis and its null, given equal standing before any data exists.",
  gnomon:
    "A right angle and the arc its shadow sweeps. The oldest instrument for measuring time by watching something ordinary.",
  partition:
    "Two squares that never touch, and the line between them. Contact details kept apart from responses.",
  horizon:
    "A circle, its waterline, and one small circle below. What a study can see, and what stays under the surface.",
  gate: "An arch inscribed in a square. A threshold you choose to cross, and can decline.",
  seed: "Three circles sharing a row, the seed of life. What returns to the people who gave something.",
  compass:
    "A circle drawn from a fixed centre, its radius shown. Method: everything derived from a stated starting point.",
  monochord:
    "A string marked at its harmonic divisions. Finding real proportion in something that otherwise reads as noise.",
};

/**
 * Which figure marks which section of the landing deck. Keyed by slide id so
 * a renamed section cannot silently keep a figure that no longer fits.
 */
export const sectionFigures: Record<string, GeometryFigure> = {
  top: "vesica",
  "about-the-study": "compass",
  "whos-behind-this": "balance",
  "what-were-studying": "triad",
  "who-this-is-for": "lattice",
  "what-youll-do": "gnomon",
  "time-commitment": "gnomon",
  "what-you-get-back": "seed",
  "how-it-works": "compass",
  "bias-limitations": "horizon",
  privacy: "partition",
  eligibility: "gate",
  questions: "monochord",
  updates: "monochord",
  contact: "vesica",
};
