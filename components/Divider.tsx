import type { GeometryFigure } from "@/content/geometry";
import { Geometry } from "./Geometry";

/**
 * The layout separator: rule — figure — rule.
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
      className="flex w-full items-center gap-6 text-ink-soft opacity-70"
    >
      <span className="h-px flex-1 bg-hairline" />
      <Geometry figure={figure} size={size} />
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}
