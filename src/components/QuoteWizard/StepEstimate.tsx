import { useState } from "react";
import { CheckCircle } from "lucide-react";
import type { QuoteState } from "./types";
import { calculatePrice, BUSINESS_LABELS } from "./types";

interface StepEstimateProps {
  state: QuoteState;
  onBack: () => void;
  onReset: () => void;
}

export function StepEstimate({ state, onBack, onReset }: StepEstimateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const { oneTime, monthly, items } = calculatePrice(state);
  const businessLabel = state.businessType ? BUSINESS_LABELS[state.businessType] : "Your business";

  const handleSend = () => {
    const subject = encodeURIComponent(`Quote Request — Forge & Co. (${businessLabel})`);
    const breakdown = items.map((i) => `• ${i}`).join("\n");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nBusiness type: ${businessLabel}\n\nEstimate:\nOne-time: $${oneTime}\nMonthly: ${monthly > 0 ? `~$${monthly}/mo` : "N/A"}\n\nIncluded:\n${breakdown}\n\n---\nSent via Forge & Co. Quote Calculator`
    );
    window.location.href = `mailto:borisovanton0@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-12">
        <CheckCircle className="w-12 h-12 text-gold mb-4" />
        <h2 className="font-display text-3xl mb-3">Request sent.</h2>
        <p className="text-muted-foreground mb-8">
          We'll get back to you within 24 hours with a confirmed quote.
        </p>
        <button
          onClick={onReset}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Your estimate
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-1">Built for {businessLabel}</h2>
      <p className="text-muted-foreground mb-8">
        This is an estimate. We confirm the final price before any contract.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-6 rounded-xl border border-gold/40 bg-gold/5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
            One-time
          </p>
          <p className="font-display text-5xl text-gold">${oneTime.toLocaleString()}</p>
        </div>
        {monthly > 0 && (
          <div className="p-6 rounded-xl border border-border bg-surface">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Monthly *approx
            </p>
            <p className="font-display text-5xl">~${monthly}</p>
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-8">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
            <span className="text-gold mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="border border-border rounded-xl p-6 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Send me this offer
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!name || !email}
            className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gold text-background px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-soft transition-colors"
          >
            Send my quote request →
          </button>
        </div>
      </div>

      <button
        onClick={onBack}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}
