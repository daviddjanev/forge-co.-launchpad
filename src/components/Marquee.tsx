import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  items: string[];
  baseSpeed?: number; // px/sec base
}

export function Marquee({ items, baseSpeed = 60 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const lastT = useRef<number | null>(null);
  const lastScroll = useRef(0);
  const velocity = useRef(0); // -1..1ish, smoothed
  const direction = useRef(1);
  const [trackWidth, setTrackWidth] = useState(0);
  const doubled = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // measure half (one set) width
    const measure = () => setTrackWidth(el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    let raf = 0;
    let scrollRaf: number | null = null;

    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScroll.current;
        lastScroll.current = y;
        // Map delta to a velocity multiplier (clamped)
        const v = Math.max(-6, Math.min(6, delta * 0.15));
        velocity.current = v;
        if (delta !== 0) direction.current = delta > 0 ? 1 : -1;
        scrollRaf = null;
      });
    };

    const tick = (t: number) => {
      if (lastT.current === null) lastT.current = t;
      const dt = (t - lastT.current) / 1000;
      lastT.current = t;

      // Decay velocity back toward 0
      velocity.current *= 0.92;
      const speed = baseSpeed * (1 + Math.abs(velocity.current));
      offset.current -= direction.current * speed * dt;

      if (trackWidth > 0) {
        // Wrap
        if (offset.current <= -trackWidth) offset.current += trackWidth;
        if (offset.current >= 0) offset.current -= trackWidth;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offset.current}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [baseSpeed, trackWidth]);

  return (
    <div className="relative border-y border-border bg-surface overflow-hidden py-5">
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center px-8">
            <span className="font-display text-2xl md:text-3xl text-foreground/90 italic">
              {item}
            </span>
            <span className="ml-8 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        ))}
      </div>
    </div>
  );
}
