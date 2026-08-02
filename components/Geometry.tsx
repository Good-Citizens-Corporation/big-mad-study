import type { GeometryFigure } from "@/content/geometry";

/**
 * Compass-and-straightedge figures drawn as hairlines. See
 * src/content/geometry.ts for what each one marks and why it earns its place.
 *
 * Always aria-hidden: these are punctuation, and every section they mark says
 * the same thing in words. A screen-reader user loses nothing.
 */

/** Quarter-arcs with the golden ratio between successive radii. */
const spiralPath = (() => {
  let r = 26;
  let x = 50;
  let y = 50;
  let d = `M ${x} ${y}`;
  const dirs: [number, number][] = [
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 1],
  ];
  for (let i = 0; i < 6; i += 1) {
    const [dx, dy] = dirs[i % 4];
    const nx = x + r * dx;
    const ny = y + r * dy;
    d += ` A ${r} ${r} 0 0 1 ${nx} ${ny}`;
    x = nx;
    y = ny;
    r /= 1.618;
  }
  return d;
})();

function Figure({ figure }: { figure: GeometryFigure }) {
  switch (figure) {
    case "vesica":
      return (
        <>
          <circle cx="36" cy="50" r="28" />
          <circle cx="64" cy="50" r="28" />
        </>
      );
    case "triad":
      return (
        <>
          <circle cx="50" cy="36" r="20" />
          <circle cx="37.88" cy="57" r="20" />
          <circle cx="62.12" cy="57" r="20" />
        </>
      );
    case "lattice":
      return (
        <>
          <rect x="26" y="26" width="48" height="48" />
          <line x1="42" y1="26" x2="42" y2="74" />
          <line x1="58" y1="26" x2="58" y2="74" />
          <line x1="26" y1="42" x2="74" y2="42" />
          <line x1="26" y1="58" x2="74" y2="58" />
          <circle cx="42" cy="58" r="3.5" className="fill-current" />
        </>
      );
    case "return":
      return <path d={spiralPath} />;
    case "balance":
      return (
        <>
          <circle cx="50" cy="50" r="34" />
          <line x1="50" y1="16" x2="50" y2="84" />
          <circle cx="33" cy="50" r="6" />
          <circle cx="67" cy="50" r="6" />
        </>
      );
    case "gnomon":
      return (
        <>
          <line x1="30" y1="75" x2="30" y2="30" />
          <line x1="30" y1="75" x2="78" y2="75" />
          <line x1="30" y1="75" x2="58.3" y2="46.7" />
          <path d="M 70 75 A 40 40 0 0 0 30 35" />
        </>
      );
    case "partition":
      return (
        <>
          <rect x="14" y="32" width="34" height="34" />
          <rect x="52" y="32" width="34" height="34" />
          <line x1="50" y1="20" x2="50" y2="80" />
        </>
      );
    case "horizon":
      return (
        <>
          <circle cx="50" cy="44" r="30" />
          <line x1="14" y1="44" x2="86" y2="44" />
          <circle cx="50" cy="70" r="7" />
        </>
      );
    case "gate":
      return (
        <>
          <rect x="22" y="22" width="56" height="56" />
          <path d="M 30 78 L 30 50 A 20 20 0 0 1 70 50 L 70 78" />
        </>
      );
    case "seed":
      return (
        <>
          <circle cx="34" cy="50" r="20" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="66" cy="50" r="20" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="50" cy="50" r="34" />
          <line x1="50" y1="50" x2="74.04" y2="25.96" />
          <circle cx="50" cy="50" r="3" className="fill-current" />
        </>
      );
    case "monochord":
      return (
        <>
          <line x1="14" y1="50" x2="86" y2="50" />
          <line x1="14" y1="40" x2="14" y2="60" />
          <line x1="86" y1="40" x2="86" y2="60" />
          <line x1="50" y1="42" x2="50" y2="58" />
          <line x1="38" y1="45" x2="38" y2="55" />
          <line x1="62" y1="45" x2="62" y2="55" />
        </>
      );
  }
}

export function Geometry({
  figure,
  size = 30,
}: {
  figure: GeometryFigure;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      focusable="false"
      className="block overflow-visible [&_*]:[vector-effect:non-scaling-stroke]"
    >
      <Figure figure={figure} />
    </svg>
  );
}
