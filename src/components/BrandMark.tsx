import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  /** Visual size in px. Defaults to 36. */
  size?: number;
  /** Renders without the outer bezel ring — for very small (favicon-style) use. */
  bare?: boolean;
  title?: string;
}

/**
 * Forge & Co. monogram seal.
 *
 * Construction:
 *  - Outer octagonal bezel (anvil-face nod) with hairline gold stroke.
 *  - 12 watch-bezel tick marks; the top tick is replaced by a struck-spark notch.
 *  - Inner disc filled with a warm gold gradient.
 *  - Fraunces-style ampersand at the optical center, in ink.
 *  - A single hairline serves as the maker's rule beneath the ampersand.
 *
 * Drawn on a 64×64 viewBox so it scales crisply from favicon to hero.
 */
export function BrandMark({ className, size = 36, bare = false, title }: BrandMarkProps) {
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
        Array.from({ length: 12 }).map((_, i) => {
          if (i === 0) return null;
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r1 = 27;
          const r2 = i % 3 === 0 ? 24 : 25.5;
          const x1 = 32 + Math.cos(angle) * r1;
          const y1 = 32 + Math.sin(angle) * r1;
          const x2 = 32 + Math.cos(angle) * r2;
          const y2 = 32 + Math.sin(angle) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#forge-gold-stroke)"
              strokeWidth={i % 3 === 0 ? 0.9 : 0.55}
              strokeLinecap="round"
              opacity="0.75"
            />
          );
        })}

      {/* Struck-spark notch at top — subtle forge thematic */}
      {!bare && (
        <g opacity="0.95">
          <path
            d="M30.5 5.5 L32 2 L33.5 5.5"
            fill="none"
            stroke="url(#forge-gold-stroke)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Inner gold disc */}
      <circle
        cx="32"
        cy="32"
        r={bare ? 28 : 21}
        fill="url(#forge-gold-fill)"
      />

      {/* Inner hairline ring for jeweler depth */}
      <circle
        cx="32"
        cy="32"
        r={bare ? 25 : 18.5}
        fill="none"
        stroke="oklch(0.16 0.012 60 / 0.35)"
        strokeWidth="0.4"
      />

      {/* Fraunces-style ampersand monogram */}
      <text
        x="32"
        y="40.5"
        textAnchor="middle"
        fontFamily='"Fraunces", "Cormorant Garamond", Georgia, serif'
        fontSize="26"
        fontStyle="italic"
        fontWeight="400"
        fill="oklch(0.14 0.012 60)"
        style={{ fontFeatureSettings: '"ss01", "salt"' }}
      >
        &amp;
      </text>

      {/* Maker's rule beneath the ampersand */}
      <line
        x1="24"
        y1="44"
        x2="40"
        y2="44"
        stroke="oklch(0.14 0.012 60 / 0.35)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
