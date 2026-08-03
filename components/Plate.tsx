import { plates, type PlateName } from "@/content/plates";

/**
 * Technical plates, drawn in the same hairline vocabulary as the section
 * figures but doing a different job: these carry information, so they are
 * exposed to assistive technology rather than hidden, and every one has a
 * caption a sighted reader sees and a description a screen reader hears.
 *
 * Labels are set in the data face at a size chosen against the viewBox so
 * they stay legible at 390px, which is the width that actually constrains
 * these. A plate that only works on a laptop is a plate that fails the
 * participants this study is recruiting.
 */

// Sized against the viewBox, which is 320 units wide and renders at ~26rem.
// A label at 7 units lands near 9px on screen: small enough to read as a
// technical annotation rather than as copy, large enough to survive at 390px.
const LABEL = "font-data uppercase fill-current [font-size:7px]";
const LABEL_SM = "font-data uppercase fill-current [font-size:5.5px]";

function Displacement() {
  // One moment at the centre; four destinations on the compass points of a
  // circle. The dashed path is "nowhere", drawn differently because a
  // dissipating feeling is not the same kind of event as a directed one.
  const r = 96;
  const spokes: [number, number, string][] = [
    [160, 160 - r, "THE TOOL"],
    [160 + r, 160, "OTHER PEOPLE"],
    [160, 160 + r, "MYSELF"],
    [160 - r, 160, "NOWHERE"],
  ];
  return (
    <>
      <circle cx="160" cy="160" r={r} strokeDasharray="2 4" opacity="0.5" />
      <circle cx="160" cy="160" r="22" className="fill-paper" />
      <text
        x="160"
        y="162"
        textAnchor="middle"
        className={LABEL_SM}
        stroke="none"
        letterSpacing="0.9"
      >
        MOMENT
      </text>

      {spokes.map(([x, y, label], i) => {
        const dx = (x - 160) / r;
        const dy = (y - 160) / r;
        const isNowhere = label === "NOWHERE";
        return (
          <g key={label}>
            <line
              x1={160 + dx * 24}
              y1={160 + dy * 24}
              x2={160 + dx * (r - 16)}
              y2={160 + dy * (r - 16)}
              strokeDasharray={isNowhere ? "3 4" : undefined}
            />
            <circle
              cx={x}
              cy={y}
              r="14"
              className="fill-paper"
              opacity={isNowhere ? 0.55 : 1}
            />
            <text
              x={x}
              y={dy > 0 ? y + 30 : y - 22}
              textAnchor="middle"
              className={LABEL}
              stroke="none"
              letterSpacing="1.1"
            >
              {label}
            </text>
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              className={LABEL_SM}
              stroke="none"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </>
  );
}

function Week() {
  // A measured line, after the monochord: the week as a scale with the
  // events that fall on it. Day marks are even; participation is not, and
  // the missing ticks say so.
  const x0 = 26;
  const x1 = 294;
  const days = 7;
  const span = (x1 - x0) / (days - 1);
  // Days 3 and 6 carry no check-in mark: skipping is expected, not failure.
  const active = [0, 1, 3, 4, 6];
  return (
    <>
      <line x1={x0} y1="104" x2={x1} y2="104" />
      <line x1={x0} y1="94" x2={x0} y2="114" />
      <line x1={x1} y1="94" x2={x1} y2="114" />

      {Array.from({ length: days }, (_, i) => {
        const x = x0 + i * span;
        return (
          <g key={i}>
            <line x1={x} y1="99" x2={x} y2="109" opacity="0.6" />
            <text
              x={x}
              y="128"
              textAnchor="middle"
              className={LABEL_SM}
              stroke="none"
            >
              {i + 1}
            </text>
            {active.includes(i) && (
              <>
                <line x1={x} y1="104" x2={x} y2="72" />
                <circle cx={x} cy="66" r="4.5" className="fill-paper" />
              </>
            )}
          </g>
        );
      })}

      <text
        x={(x0 + x1) / 2}
        y="46"
        textAnchor="middle"
        className={LABEL}
        stroke="none"
        letterSpacing="1.1"
      >
        CHECK-INS, 5 TO 10 MIN
      </text>
      <text
        x={(x0 + x1) / 2}
        y="148"
        textAnchor="middle"
        className={LABEL_SM}
        stroke="none"
        letterSpacing="0.8"
      >
        DAY
      </text>

      {/* The bookends, drawn as squares because they are single fixed events
          rather than a repeating one. */}
      <rect x={x0 - 14} y="164" width="28" height="28" />
      <text
        x={x0}
        y="208"
        textAnchor="start"
        className={LABEL_SM}
        stroke="none"
        letterSpacing="0.8"
      >
        SCREENER
      </text>
      <rect x={x1 - 14} y="164" width="28" height="28" />
      <text
        x={x1}
        y="208"
        textAnchor="end"
        className={LABEL_SM}
        stroke="none"
        letterSpacing="0.8"
      >
        RESULTS
      </text>
      <line x1={x0} y1="164" x2={x0} y2="114" strokeDasharray="3 4" />
      <line x1={x1} y1="164" x2={x1} y2="114" strokeDasharray="3 4" />
      <line
        x1={x0 + 14}
        y1="178"
        x2={x1 - 14}
        y2="178"
        strokeDasharray="3 4"
        opacity="0.5"
      />
    </>
  );
}

function Separation() {
  // Two enclosures that never touch. The only thing crossing the gap is an
  // identifier that means nothing on its own, so it is drawn as a small
  // closed figure rather than a line joining the two.
  return (
    <>
      <rect x="18" y="40" width="116" height="116" />
      <rect x="186" y="40" width="116" height="116" />

      <text
        x="76"
        y="30"
        textAnchor="middle"
        className={LABEL}
        stroke="none"
        letterSpacing="1.1"
      >
        CONTACT
      </text>
      <text
        x="244"
        y="30"
        textAnchor="middle"
        className={LABEL}
        stroke="none"
        letterSpacing="1.1"
      >
        RESPONSES
      </text>

      {["PHONE", "EMAIL"].map((t, i) => (
        <text
          key={t}
          x="76"
          y={82 + i * 26}
          textAnchor="middle"
          className={LABEL_SM}
          stroke="none"
          letterSpacing="0.8"
        >
          {t}
        </text>
      ))}
      {["ENTRIES", "RATINGS", "SURVEYS"].map((t, i) => (
        <text
          key={t}
          x="244"
          y={72 + i * 26}
          textAnchor="middle"
          className={LABEL_SM}
          stroke="none"
          letterSpacing="0.8"
        >
          {t}
        </text>
      ))}

      {/* The gap, marked as a gap. */}
      <line
        x1="160"
        y1="24"
        x2="160"
        y2="172"
        strokeDasharray="4 5"
        opacity="0.6"
      />

      <circle cx="160" cy="98" r="14" className="fill-paper" />
      <text
        x="160"
        y="101"
        textAnchor="middle"
        className={LABEL_SM}
        stroke="none"
      >
        ID
      </text>
      <text
        x="160"
        y="192"
        textAnchor="middle"
        className={LABEL_SM}
        stroke="none"
        letterSpacing="0.8"
      >
        MEANS NOTHING ALONE
      </text>
    </>
  );
}

const VIEWBOX: Record<PlateName, string> = {
  displacement: "0 0 320 320",
  week: "0 0 320 224",
  separation: "0 0 320 208",
};

export function Plate({ name }: { name: PlateName }) {
  const { caption, description } = plates[name];
  const titleId = `plate-${name}-title`;
  const descId = `plate-${name}-desc`;

  return (
    <figure className="my-rhythm-6 w-full max-w-[26rem]">
      <svg
        viewBox={VIEWBOX[name]}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-full text-ink-soft [&_*]:[vector-effect:non-scaling-stroke]"
      >
        <title id={titleId}>{caption}</title>
        <desc id={descId}>{description}</desc>
        {name === "displacement" && <Displacement />}
        {name === "week" && <Week />}
        {name === "separation" && <Separation />}
      </svg>
      <figcaption className="mt-rhythm-3 font-data text-data uppercase tracking-[0.16em] text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
