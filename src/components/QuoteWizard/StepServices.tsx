import type { ServiceChoice } from "./types";
import { Globe, Mic, Sparkles } from "lucide-react";

const OPTIONS: {
  value: ServiceChoice;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge?: string;
}[] = [
  {
    value: "website",
    icon: <Globe className="w-6 h-6" />,
    title: "Website only",
    desc: "A high-design animated site built to convert.",
  },
  {
    value: "voice",
    icon: <Mic className="w-6 h-6" />,
    title: "AI Voice Agent only",
    desc: "An agent that answers calls, takes orders, books 24/7.",
  },
  {
    value: "both",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Website + Voice Agent",
    desc: "The full stack. Website that looks the part, voice agent that works around the clock.",
    badge: "Limited Launch Offer",
  },
];

interface StepServicesProps {
  value: ServiceChoice | null;
  onChange: (v: ServiceChoice) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepServices({ value, onChange, onNext, onBack }: StepServicesProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Step 2
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-2">
        What can we build for you?
      </h2>
      <p className="text-muted-foreground mb-8">Pick what your business needs.</p>

      <div className="flex flex-col gap-3 mb-10">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                selected
                  ? "border-gold bg-gold/10"
                  : "border-border hover:border-border-strong"
              }`}
            >
              {opt.badge && (
                <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-background bg-gold px-2 py-0.5 rounded-full">
                  {opt.badge}
                </span>
              )}
              <span className={`mt-0.5 ${selected ? "text-gold" : "text-muted-foreground"}`}>
                {opt.icon}
              </span>
              <div>
                <p className={`font-sans font-medium mb-1 ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                  {opt.title}
                </p>
                <p className="font-sans text-sm text-muted-foreground">{opt.desc}</p>
              </div>
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
          disabled={!value}
          className="inline-flex items-center gap-3 rounded-full bg-gold text-background px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-soft transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
