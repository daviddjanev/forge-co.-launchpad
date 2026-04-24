import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";

/**
 * Gold-on-ink entrance curtain. Drops away on first paint, then unmounts
 * itself so it never intercepts pointer events. Only runs once per session.
 */
export function PageCurtain() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const seen = sessionStorage.getItem("forge:curtain");
    if (seen) {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem("forge:curtain", "1");
    const t1 = setTimeout(() => setPhase("out"), 900);
    const t2 = setTimeout(() => setPhase("gone"), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center ${
        phase === "out" ? "curtain-out" : ""
      }`}
    >
      <div className="curtain-panel curtain-top" />
      <div className="curtain-panel curtain-bottom" />
      <div className="relative z-10 flex flex-col items-center gap-5 curtain-mark">
        <BrandMark size={72} />
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
            Forge &amp; Co.
          </span>
          <span className="h-px w-10 bg-gold" />
        </div>
      </div>
    </div>
  );
}
