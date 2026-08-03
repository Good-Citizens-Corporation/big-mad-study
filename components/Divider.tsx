import type { GeometryFigure } from "@/content/geometry";
import { Geometry } from "./Geometry";

/**
 * The layout separator: rule, figure, rule.
 *
 * It replaces a plain border between sections, so the page gains meaning
 * where it previously had only a line. `role="separator"` because that is
 * what it is; the figure inside is decorative and hidden.
 */
export function Divider({
  figure,
  size = 30,
}: {
  figure: GeometryFigure;
  size?: number;
}) {
  return (
    <div
      role="separator"
      className="inline-flex items-center justify-center text-ink-soft opacity-70"
    >
      <Geometry figure={figure} size={size} />
    </div>
  );
}
