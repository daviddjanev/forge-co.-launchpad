import type { VoiceAgentTier, CallVolume } from "./types";

interface StepVoiceAgentProps {
  tier: VoiceAgentTier;
  volume: CallVolume;
  onTierChange: (t: VoiceAgentTier) => void;
  onVolumeChange: (v: CallVolume) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIERS: { value: VoiceAgentTier; label: string; price: number; desc: string }[] = [
  { value: "basic", label: "Basic", price: 800, desc: "Answers FAQs, takes messages" },
  { value: "standard", label: "Standard", price: 1000, desc: "Handles bookings/orders during business hours" },
  { value: "full", label: "Full", price: 1500, desc: "24/7, multilingual, advanced conversation flows" },
];

const VOLUMES: { value: CallVolume; label: string; approx: string; monthly: number }[] = [
  { value: "small", label: "Small", approx: "~100–200 calls/mo", monthly: 200 },
  { value: "medium", label: "Medium", approx: "~300–500 calls/mo", monthly: 250 },
  { value: "large", label: "Large", approx: "500+ calls/mo", monthly: 300 },
];

export function StepVoiceAgent({
  tier,
  volume,
  onTierChange,
  onVolumeChange,
  onNext,
  onBack,
}: StepVoiceAgentProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Step 4
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-2">
        What should your voice agent do?
      </h2>
      <p className="text-muted-foreground mb-8">
        Picks the capability level and monthly plan.
      </p>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
        Capability
      </p>
      <div className="flex flex-col gap-3 mb-8">
        {TIERS.map((t) => {
          const selected = tier === t.value;
          return (
            <button
              key={t.value}
              onClick={() => onTierChange(t.value)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                selected ? "border-gold bg-gold/10" : "border-border hover:border-border-strong"
              }`}
            >
              <div>
                <p className={`font-sans font-medium text-sm mb-0.5 ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                  {t.label}
                </p>
                <p className="font-sans text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <span className={`font-display text-xl ml-4 shrink-0 ${selected ? "text-gold" : "text-muted-foreground"}`}>
                ${t.price}
              </span>
            </button>
          );
        })}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
        Expected call volume
      </p>
      <p className="font-sans text-xs text-muted-foreground mb-3">
        * Approximate — monthly cost depends on actual usage. Final quote confirmed before contract.
      </p>
      <div className="grid grid-cols-3 gap-3 mb-10">
        {VOLUMES.map((v) => {
          const selected = volume === v.value;
          return (
            <button
              key={v.value}
              onClick={() => onVolumeChange(v.value)}
              className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all duration-200 ${
                selected ? "border-gold bg-gold/10" : "border-border hover:border-border-strong"
              }`}
            >
              <span className={`font-sans font-medium text-sm mb-1 ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                {v.label}
              </span>
              <span className="font-sans text-xs text-muted-foreground mb-2">{v.approx}</span>
              <span className={`font-display text-lg ${selected ? "text-gold" : "text-muted-foreground"}`}>
                ~${v.monthly}/mo
              </span>
            </button>
          );
        })}
      </div>

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
          See my estimate →
        </button>
      </div>
    </div>
  );
}
