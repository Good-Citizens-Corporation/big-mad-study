# Proportion & iconography

The design system's geometry, stated so it can be checked. Everything here is
enforced by `src/app/proportion.test.ts`, if a claim below stops being true,
that suite fails.

## The three ratios

All constructible from the same figures with compass and straightedge, which
is the honest form of the claim: they are related by construction, not chosen
by taste.

| Token              | Value        | Construction                                              |
| ------------------ | ------------ | --------------------------------------------------------- |
| `--ratio-diagonal` | √2 ≈ 1.41421 | the diagonal of a square                                  |
| `--ratio-vesica`   | √3 ≈ 1.73205 | the height of a vesica piscis of unit radius              |
| `--ratio-golden`   | φ ≈ 1.61803  | the diagonal of a double square, less half its short side |

## Why √2 governs the type scale

Not mysticism, a property. √2 is the only ratio preserved under halving,
which is why ISO 216 paper folds A4 → A5 without changing shape. Applied to a
type scale it means **every second step is an exact doubling**:

```
0.7071   1   1.4142   2   2.8284   4     (rem)
 data   body  lead  title display specimen
```

Octaves land on integers; nothing drifts. A φ scale (1.618) is dramatic but
its steps grow too fast for a five-step interface scale; a perfect-fourth
scale (1.333) is gentler but its doublings fall between steps. √2 is the one
that stays coherent at both ends.

The root is `1rem` and not smaller because 16px is the floor below which
mobile browsers zoom on input focus, a human-factors constraint, not taste.

## Vertical rhythm

The same progression, one root, nine steps (`--rhythm` … `--rhythm-9`).
`--rhythm-3` **is** the 1rem body step: the vertical scale and the type scale
are the same scale, not two systems that happen to look similar. The test
asserts this.

Applied through `.flow-rhythm-{n}`, which spaces siblings rather than letting
each element hand-pick a margin.

## Measure

| Token           | Value | Source                                          |
| --------------- | ----- | ----------------------------------------------- |
| `--measure-min` | 45ch  | lower bound of Bringhurst's comfortable range   |
| `--measure`     | 66ch  | the classical optimum for single-column setting |
| `--measure-max` | 75ch  | upper bound                                     |

Line length is the most-studied variable in reading comfort, and the one most
often got wrong by full-width layouts. Running text uses `--measure`; titles
and leads use `--measure-min`, because short lines want to break earlier.

## Human-factors floors

Floors, not targets, the system may exceed them and must never go under.

- `--target-min: 2.75rem` (44px), smallest reliable touch target (Apple HIG;
  Material's 48dp is stricter and primary actions clear it).
- `--leading-body: 1.5`, the body line-height WCAG 1.4.12 requires content to
  survive being set to.

## Class names state principles

A class called `.measure-optimum` makes a claim a reader can check. A class
called `.max-w-prose` states a preference. The component layer is named for
what it applies:

`.measure-optimum` `.measure-minimum` `.measure-maximum` · `.frame-vesica`
`.frame-golden` `.frame-diagonal` · `.flow-rhythm-{4,5,6}` ·
`.target-comfortable` · `.specimen` `.specimen-ordinal` `.specimen-title`
`.specimen-lead` `.specimen-body`

**The rule for this layer:** if a value cannot be traced to one of the three
ratios or a cited human-factors floor, it does not belong in it.

## Iconography

Twelve compass-and-straightedge figures, after the system built for
sarapaula.com, whose governing rule is kept: **each figure is chosen for what
it marks, not for decoration.** A figure interchangeable with any other is
ornament, and ornament on a study about being worn down by interfaces would
be a small hypocrisy.

The figures, their meanings, and their assignment to sections live in
`src/content/geometry.ts`. They render through `<Geometry>` and are placed by
`<Divider>` as `rule, figure, rule` between sections.

All are `aria-hidden`. Every section they mark says in words what its figure
says in form, so a screen-reader user loses nothing, and the figures are
drawn in `--hairline`, which the palette suite deliberately holds _below_ 3:1
because decorative lines are exempt from WCAG 1.4.11.

## Known trap, recorded

`@theme inline` inlines its values into utilities and emits no custom
property. Font stacks referencing `var(--font-fraunces)` must be declared on
`body`, where next/font actually sets that variable, declared on `:root` they
resolve to the guaranteed-invalid value and every child inherits the
breakage. The display face fell back to sans this way, silently, through a
green build and a green test suite. It was caught by looking at the page.
