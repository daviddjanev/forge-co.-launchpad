import type { BusinessType } from "./types";
import { BUSINESS_LABELS } from "./types";
import { Utensils, Car, ShoppingBag, Stethoscope, Hotel, Briefcase } from "lucide-react";

const ICONS: Record<BusinessType, React.ReactNode> = {
  restaurant: <Utensils className="w-5 h-5" />,
  taxi: <Car className="w-5 h-5" />,
  retail: <ShoppingBag className="w-5 h-5" />,
  clinic: <Stethoscope className="w-5 h-5" />,
  hotel: <Hotel className="w-5 h-5" />,
  other: <Briefcase className="w-5 h-5" />,
};

const TYPES = Object.keys(BUSINESS_LABELS) as BusinessType[];

interface StepBusinessTypeProps {
  value: BusinessType | null;
  onChange: (v: BusinessType) => void;
  onNext: () => void;
}

export function StepBusinessType({ value, onChange, onNext }: StepBusinessTypeProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Step 1
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-2">
        What kind of business are you?
      </h2>
      <p className="text-muted-foreground mb-8">This helps us tailor your estimate.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {TYPES.map((type) => {
          const selected = value === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                selected
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-border hover:border-border-strong text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={selected ? "text-gold" : ""}>{ICONS[type]}</span>
              <span className="font-sans text-sm">{BUSINESS_LABELS[type]}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="inline-flex items-center gap-3 rounded-full bg-gold text-background px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-soft transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}
