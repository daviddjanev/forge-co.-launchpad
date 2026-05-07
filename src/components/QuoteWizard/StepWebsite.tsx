import type { WebsiteTier } from "./types";
import { Zap } from "lucide-react";

interface StepWebsiteProps {
  tier: WebsiteTier;
  rush: boolean;
  onTierChange: (t: WebsiteTier) => void;
  onRushChange: (r: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIERS: { value: WebsiteTier; label: string; price: number; bullets: string[] }[] = [
  {
    value: "basic",
    label: "Basic Landing Page",
    price: 800,
    bullets: ["Single page", "Scroll animations", "Mobile responsive", "14-day delivery"],
  },
  {
    value: "premium",
    label: "Premium Site",
    price: 1200,
    bullets: [
      "Multi-section layout",
      "3D visual effects",
      "CMS (edit content yourself)",
      "Art direction included",
    ],
  },
];

export function StepWebsite({ tier, rush, onTierChange, onRushChange, onNext, onBack }: StepWebsiteProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Step 3
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-2">What kind of website?</h2>
      <p className="text-muted-foreground mb-8">
        Both options are fully custom — no templates.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {TIERS.map((t) => {
          const selected = tier === t.value;
          return (
            <button
              key={t.value}
              onClick={() => onTierChange(t.value)}
              className={`flex flex-col p-5 rounded-xl border text-left transition-all duration-200 ${
                selected ? "border-gold bg-gold/10" : "border-border hover:border-border-strong"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`font-sans font-medium ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                  {t.label}
                </span>
                <span className={`font-display text-xl ${selected ? "text-gold" : "text-muted-foreground"}`}>
                  ${t.price}
                </span>
              </div>
              <ul className="space-y-1">
                {t.bullets.map((b) => (
                  <li key={b} className="font-sans text-xs text-muted-foreground flex items-center gap-2">
                    <span className={selected ? "text-gold" : ""}>—</span> {b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onRushChange(!rush)}
        className={`flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all duration-200 mb-10 ${
          rush ? "border-gold bg-gold/10" : "border-border hover:border-border-strong"
        }`}
      >
        <Zap className={`w-4 h-4 ${rush ? "text-gold" : "text-muted-foreground"}`} />
        <div className="flex-1">
          <p className={`font-sans text-sm font-medium ${rush ? "text-foreground" : "text-muted-foreground"}`}>
            Rush delivery
          </p>
          <p className="font-sans text-xs text-muted-foreground">7 days instead of 14</p>
        </div>
        <span className={`font-display text-lg ${rush ? "text-gold" : "text-muted-foreground"}`}>
          +$300
        </span>
      </button>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-3 rounded-full bg-gold text-background px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-gold-soft transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
