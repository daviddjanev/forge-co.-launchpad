import { useInView } from "@/hooks/use-in-view";

/**
 * Animated SVG "gold filament" — a hairline that draws itself across the
 * viewport with a small diamond at center. Used between major sections.
 */
export function FilamentDivider({ label }: { label?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div ref={ref} className="relative w-full py-16">
      <div className="container-x max-w-[1400px] mx-auto flex items-center gap-6">
        <svg
          viewBox="0 0 1000 12"
          preserveAspectRatio="none"
          className="flex-1 h-3 overflow-visible"
          aria-hidden
        >
          <line
            x1="0"
            y1="6"
            x2="1000"
            y2="6"
            stroke="url(#filament-grad)"
            strokeWidth="1"
            className={`filament-line ${inView ? "filament-in" : ""}`}
          />
          <g
            transform="translate(500 6) rotate(45)"
            className={`filament-mark ${inView ? "filament-mark-in" : ""}`}
          >
            <rect x="-3" y="-3" width="6" height="6" fill="var(--gold)" />
          </g>
          <defs>
            <linearGradient id="filament-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {label ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
