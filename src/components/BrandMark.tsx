import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Visual size in px. Defaults to 36. */
  size?: number;
  /** Renders without the outer bezel ring — for very small (favicon-style) use. */
  bare?: boolean;
  title?: string;
}

/** Round to 2 decimals — keeps SSR and client output byte-identical. */
const r = (n: number) => Math.round(n * 100) / 100;

/**
 * Forge & Co. monogram seal.
 *
 * Construction:
 *  - Outer octagonal bezel (anvil-face nod) with hairline gold stroke.
 *  - 11 watch-bezel ticks; the 12 o'clock tick is replaced by a struck-spark notch.
 *  - Inner disc filled with a warm gold gradient.
 *  - Ampersand monogram drawn as an SVG <path> (font-independent), in ink.
 *  - A single hairline serves as the maker's rule beneath the ampersand.
 *
 * Drawn on a 64×64 viewBox so it scales crisply from favicon to hero.
 * Coordinates are rounded so SSR markup matches client hydration exactly.
 */
export function BrandMark({ className, size = 36, bare = false, title }: BrandMarkProps) {
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    if (i === 0) return null;
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const r1 = 27;
    const r2 = i % 3 === 0 ? 24 : 25.5;
    return {
      i,
      x1: r(32 + Math.cos(angle) * r1),
      y1: r(32 + Math.sin(angle) * r1),
      x2: r(32 + Math.cos(angle) * r2),
      y2: r(32 + Math.sin(angle) * r2),
      heavy: i % 3 === 0,
    };
  });

  return (
    <svg
      role={title ? "img" : "presentation"}
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn("block", className)}
    >
      <defs>
        <linearGradient id="forge-gold-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.92 0.10 88)" />
          <stop offset="55%" stopColor="oklch(0.82 0.14 82)" />
          <stop offset="100%" stopColor="oklch(0.62 0.13 70)" />
        </linearGradient>
        <linearGradient id="forge-gold-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.95 0.09 88)" />
          <stop offset="100%" stopColor="oklch(0.6 0.13 68)" />
        </linearGradient>
      </defs>

      {/* Octagonal bezel (anvil-face geometry) */}
      {!bare && (
        <polygon
          points="20,4 44,4 60,20 60,44 44,60 20,60 4,44 4,20"
          fill="none"
          stroke="url(#forge-gold-stroke)"
          strokeWidth="1.25"
          strokeLinejoin="round"
          opacity="0.85"
        />
      )}

      {/* Watch-bezel ticks (skip 12 o'clock — replaced by spark notch) */}
      {!bare &&
        ticks.map((t) =>
          t ? (
            <line
              key={t.i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="url(#forge-gold-stroke)"
              strokeWidth={t.heavy ? 0.9 : 0.55}
              strokeLinecap="round"
              opacity="0.75"
            />
          ) : null
        )}

      {/* Struck-spark notch at top — subtle forge thematic */}
      {!bare && (
        <path
          d="M30.5 5.5 L32 2 L33.5 5.5"
          fill="none"
          stroke="url(#forge-gold-stroke)"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Inner gold disc */}
      <circle cx="32" cy="32" r={bare ? 28 : 22} fill="url(#forge-gold-fill)" />

      {/* Inner hairline ring for jeweler depth */}
      <circle
        cx="32"
        cy="32"
        r={bare ? 25 : 19.5}
        fill="none"
        stroke="oklch(0.16 0.012 60 / 0.35)"
        strokeWidth="0.4"
      />

      {/*
        Ampersand drawn as a vector path so it renders identically regardless
        of whether the Fraunces webfont has loaded. The path is hand-tuned to
        sit at the optical center of the 64×64 viewBox.
      */}
      <g fill="oklch(0.14 0.012 60)" transform="translate(32 32)">
        <path
          d="
            M -3.2 8.6
            C -7.8 8.6 -10.6 5.8 -10.6 2.0
            C -10.6 -1.2 -8.4 -3.4 -5.0 -5.4
            C -6.6 -7.2 -7.4 -8.8 -7.4 -10.6
            C -7.4 -13.8 -4.8 -16.0 -1.0 -16.0
            C 2.6 -16.0 5.0 -14.0 5.0 -11.0
            C 5.0 -8.6 3.4 -6.8 0.4 -5.0
            L 4.6 0.2
            C 5.6 -1.2 6.2 -3.0 6.4 -5.0
            L 9.6 -5.0
            C 9.2 -2.0 8.0 0.6 6.4 2.6
            L 10.8 8.0
            L 6.6 8.0
            L 4.4 5.2
            C 2.2 7.4 -0.2 8.6 -3.2 8.6
            Z
            M -2.8 5.6
            C -0.8 5.6 0.8 4.8 2.4 3.2
            L -2.8 -3.4
            C -5.4 -2.0 -6.8 -0.4 -6.8 1.6
            C -6.8 4.0 -5.2 5.6 -2.8 5.6
            Z
            M -1.0 -7.0
            C 1.0 -8.4 2.2 -9.6 2.2 -11.2
            C 2.2 -12.6 1.0 -13.4 -0.6 -13.4
            C -2.4 -13.4 -3.6 -12.4 -3.6 -10.6
            C -3.6 -9.4 -3.0 -8.4 -1.6 -6.8
            Z
          "
        />
      </g>

      {/* Maker's rule beneath the ampersand */}
      <line
        x1="22"
        y1="46"
        x2="42"
        y2="46"
        stroke="oklch(0.14 0.012 60 / 0.4)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
