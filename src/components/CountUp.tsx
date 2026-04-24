import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

interface CountUpProps {
  /** The full string to display, e.g. "120+", "1.4s", "EU · US". Numbers inside animate. */
  value: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
}

/**
 * Counts up the numeric portion of `value` when scrolled into view.
 * Non-numeric suffixes/prefixes ("+", "s", "EU · US") are preserved.
 * Strings with no leading number render statically.
 */
export function CountUp({ value, duration = 1400, className }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const [display, setDisplay] = useState<string>(target !== null ? "0" : value);

  useEffect(() => {
    if (!inView || target === null) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const current = target * eased;
      setDisplay(current.toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target.toFixed(decimals));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {target !== null ? `${display}${suffix}` : value}
    </span>
  );
}
