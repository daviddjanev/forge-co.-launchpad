# Quote Calculator Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-step interactive price estimate wizard at `/quote` on the Forge & Co agency site.

**Architecture:** File-based TanStack Router route at `src/routes/quote.tsx` renders a stateful `QuoteWizard` orchestrator. Each step is a focused component receiving state + callbacks. All pricing is calculated client-side. Final step submits via mailto with pre-filled quote details.

**Tech Stack:** React 19, TanStack Router, Tailwind CSS v4, TypeScript, Lucide React, existing site design tokens (gold, dark theme, font-display, font-mono).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/QuoteWizard/types.ts` | Shared types + pricing logic |
| Create | `src/components/QuoteWizard/ProgressBar.tsx` | Step progress indicator |
| Create | `src/components/QuoteWizard/StepBusinessType.tsx` | Step 1 — business type selector |
| Create | `src/components/QuoteWizard/StepServices.tsx` | Step 2 — service selector |
| Create | `src/components/QuoteWizard/StepWebsite.tsx` | Step 3 — website tier + rush toggle |
| Create | `src/components/QuoteWizard/StepVoiceAgent.tsx` | Step 4 — voice agent tier + volume |
| Create | `src/components/QuoteWizard/StepEstimate.tsx` | Step 5 — summary + mailto CTA |
| Create | `src/components/QuoteWizard/index.tsx` | Orchestrator — state + step routing |
| Create | `src/routes/quote.tsx` | Page route shell |
| Modify | `src/components/SiteHeader.tsx` | Add "Get a Quote" nav link |

---

## Task 1: Shared Types and Pricing Logic

**Files:**
- Create: `src/components/QuoteWizard/types.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/components/QuoteWizard/types.ts

export type BusinessType =
  | "restaurant"
  | "taxi"
  | "retail"
  | "clinic"
  | "hotel"
  | "other";

export type ServiceChoice = "website" | "voice" | "both";

export type WebsiteTier = "basic" | "premium";

export type VoiceAgentTier = "basic" | "standard" | "full";

export type CallVolume = "small" | "medium" | "large";

export interface QuoteState {
  businessType: BusinessType | null;
  service: ServiceChoice | null;
  website: {
    tier: WebsiteTier;
    rush: boolean;
  } | null;
  voiceAgent: {
    tier: VoiceAgentTier;
    volume: CallVolume;
  } | null;
}

export interface PriceBreakdown {
  oneTime: number;
  monthly: number;
  items: string[];
}

export const BUSINESS_LABELS: Record<BusinessType, string> = {
  restaurant: "Restaurant / Café",
  taxi: "Taxi / Transport",
  retail: "Retail / Shop",
  clinic: "Clinic / Medical",
  hotel: "Hotel / Hospitality",
  other: "Other Business",
};

export function calculatePrice(state: QuoteState): PriceBreakdown {
  let oneTime = 0;
  let monthly = 0;
  const items: string[] = [];

  if (state.website) {
    const base = state.website.tier === "basic" ? 800 : 1200;
    oneTime += base;
    items.push(
      state.website.tier === "basic"
        ? "Basic landing page — scroll animations, mobile-ready"
        : "Premium site — 3D effects, CMS, full art direction"
    );
    if (state.website.rush) {
      oneTime += 300;
      items.push("Rush delivery (7 days)");
    }
  }

  if (state.voiceAgent) {
    const setupCost =
      state.voiceAgent.tier === "basic"
        ? 800
        : state.voiceAgent.tier === "standard"
          ? 1000
          : 1500;
    oneTime += setupCost;

    const monthlyCost =
      state.voiceAgent.volume === "small"
        ? 200
        : state.voiceAgent.volume === "medium"
          ? 250
          : 300;
    monthly += monthlyCost;

    items.push(
      state.voiceAgent.tier === "basic"
        ? "Voice agent — FAQ answers + message taking"
        : state.voiceAgent.tier === "standard"
          ? "Voice agent — bookings/orders, business hours"
          : "Voice agent — 24/7, multilingual, advanced flows"
    );
    items.push(`Monthly maintenance (~${monthlyCost}/mo, usage-based)`);
  }

  return { oneTime, monthly, items };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/types.ts
git commit -m "feat(quote): add shared types and pricing logic"
```

---

## Task 2: Progress Bar

**Files:**
- Create: `src/components/QuoteWizard/ProgressBar.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/ProgressBar.tsx

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Step {current} of {total}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {pct}%
        </span>
      </div>
      <div className="h-px w-full bg-border">
        <div
          className="h-px bg-gold transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/ProgressBar.tsx
git commit -m "feat(quote): add progress bar component"
```

---

## Task 3: Step 1 — Business Type

**Files:**
- Create: `src/components/QuoteWizard/StepBusinessType.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/StepBusinessType.tsx

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
      <p className="text-muted-foreground mb-8">
        This helps us tailor your estimate.
      </p>

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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/StepBusinessType.tsx
git commit -m "feat(quote): add business type step"
```

---

## Task 4: Step 2 — Service Selector

**Files:**
- Create: `src/components/QuoteWizard/StepServices.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/StepServices.tsx

import type { ServiceChoice } from "./types";
import { Globe, Mic, Sparkles } from "lucide-react";

const OPTIONS: { value: ServiceChoice; icon: React.ReactNode; title: string; desc: string; badge?: string }[] = [
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
      <p className="text-muted-foreground mb-8">
        Pick what your business needs.
      </p>

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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/StepServices.tsx
git commit -m "feat(quote): add service selector step"
```

---

## Task 5: Step 3 — Website Options

**Files:**
- Create: `src/components/QuoteWizard/StepWebsite.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/StepWebsite.tsx

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
    bullets: ["Multi-section layout", "3D visual effects", "CMS (edit content yourself)", "Art direction included"],
  },
];

export function StepWebsite({ tier, rush, onTierChange, onRushChange, onNext, onBack }: StepWebsiteProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold mb-3">
        Step 3
      </p>
      <h2 className="font-display text-3xl md:text-4xl mb-2">
        What kind of website?
      </h2>
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
        <span className={`font-display text-lg ${rush ? "text-gold" : "text-muted-foreground"}`}>+$300</span>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/StepWebsite.tsx
git commit -m "feat(quote): add website options step"
```

---

## Task 6: Step 4 — Voice Agent Options

**Files:**
- Create: `src/components/QuoteWizard/StepVoiceAgent.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/StepVoiceAgent.tsx

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

export function StepVoiceAgent({ tier, volume, onTierChange, onVolumeChange, onNext, onBack }: StepVoiceAgentProps) {
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/StepVoiceAgent.tsx
git commit -m "feat(quote): add voice agent step"
```

---

## Task 7: Step 5 — Estimate Summary

**Files:**
- Create: `src/components/QuoteWizard/StepEstimate.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/QuoteWizard/StepEstimate.tsx

import { useState } from "react";
import type { QuoteState } from "./types";
import { calculatePrice, BUSINESS_LABELS } from "./types";
import { CheckCircle } from "lucide-react";

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
      <h2 className="font-display text-3xl md:text-4xl mb-1">
        Built for {businessLabel}
      </h2>
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

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/StepEstimate.tsx
git commit -m "feat(quote): add estimate summary step"
```

---

## Task 8: Wizard Orchestrator

**Files:**
- Create: `src/components/QuoteWizard/index.tsx`

- [ ] **Step 1: Create the orchestrator**

```tsx
// src/components/QuoteWizard/index.tsx

import { useState } from "react";
import type { QuoteState, ServiceChoice, WebsiteTier, VoiceAgentTier, CallVolume, BusinessType } from "./types";
import { ProgressBar } from "./ProgressBar";
import { StepBusinessType } from "./StepBusinessType";
import { StepServices } from "./StepServices";
import { StepWebsite } from "./StepWebsite";
import { StepVoiceAgent } from "./StepVoiceAgent";
import { StepEstimate } from "./StepEstimate";

const INITIAL_STATE: QuoteState = {
  businessType: null,
  service: null,
  website: null,
  voiceAgent: null,
};

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuoteState>(INITIAL_STATE);

  const needsWebsite = state.service === "website" || state.service === "both";
  const needsVoice = state.service === "voice" || state.service === "both";

  // Determine total steps based on service selection
  const totalSteps = () => {
    if (!state.service) return 5;
    if (state.service === "both") return 5;
    if (state.service === "website") return 4;
    if (state.service === "voice") return 4;
    return 5;
  };

  const handleNext = () => {
    if (step === 2) {
      // After service selection, skip irrelevant steps
      if (state.service === "voice") {
        // Skip website step, go to voice step
        setStep(4);
        return;
      }
    }
    if (step === 3 && !needsVoice) {
      // Website only — skip voice step
      setStep(5);
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 4 && state.service === "voice") {
      setStep(2);
      return;
    }
    if (step === 5 && state.service === "website") {
      setStep(3);
      return;
    }
    setStep((s) => s - 1);
  };

  const reset = () => {
    setStep(1);
    setState(INITIAL_STATE);
  };

  // Calculate display step number for progress
  const displayStep = () => {
    if (state.service === "voice") {
      if (step === 4) return 3;
      if (step === 5) return 4;
    }
    if (state.service === "website") {
      if (step === 5) return 4;
    }
    return step;
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-x max-w-2xl mx-auto px-6">
        <ProgressBar current={displayStep()} total={totalSteps()} />

        <div className="animate-fade-in">
          {step === 1 && (
            <StepBusinessType
              value={state.businessType}
              onChange={(v: BusinessType) => setState((s) => ({ ...s, businessType: v }))}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <StepServices
              value={state.service}
              onChange={(v: ServiceChoice) => {
                setState((s) => ({
                  ...s,
                  service: v,
                  website: v === "voice" ? null : s.website ?? { tier: "basic", rush: false },
                  voiceAgent: v === "website" ? null : s.voiceAgent ?? { tier: "standard", volume: "small" },
                }));
              }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && needsWebsite && (
            <StepWebsite
              tier={state.website?.tier ?? "basic"}
              rush={state.website?.rush ?? false}
              onTierChange={(t: WebsiteTier) =>
                setState((s) => ({ ...s, website: { tier: t, rush: s.website?.rush ?? false } }))
              }
              onRushChange={(r: boolean) =>
                setState((s) => ({ ...s, website: { tier: s.website?.tier ?? "basic", rush: r } }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && needsVoice && (
            <StepVoiceAgent
              tier={state.voiceAgent?.tier ?? "standard"}
              volume={state.voiceAgent?.volume ?? "small"}
              onTierChange={(t: VoiceAgentTier) =>
                setState((s) => ({ ...s, voiceAgent: { tier: t, volume: s.voiceAgent?.volume ?? "small" } }))
              }
              onVolumeChange={(v: CallVolume) =>
                setState((s) => ({ ...s, voiceAgent: { tier: s.voiceAgent?.tier ?? "standard", volume: v } }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <StepEstimate state={state} onBack={handleBack} onReset={reset} />
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/QuoteWizard/index.tsx
git commit -m "feat(quote): add wizard orchestrator with step routing"
```

---

## Task 9: Quote Page Route

**Files:**
- Create: `src/routes/quote.tsx`

- [ ] **Step 1: Create the route**

```tsx
// src/routes/quote.tsx

import { createFileRoute } from "@tanstack/react-router";
import { QuoteWizard } from "@/components/QuoteWizard";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Forge & Co." },
      {
        name: "description",
        content: "Get an instant price estimate for your AI website or voice agent. Takes 2 minutes.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <QuoteWizard />
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/quote.tsx
git commit -m "feat(quote): add /quote page route"
```

---

## Task 10: Wire Up Header Link + Dev Test

**Files:**
- Modify: `src/components/SiteHeader.tsx`

- [ ] **Step 1: Add Get a Quote link to the header**

In `src/components/SiteHeader.tsx`, replace the nav section:

```tsx
// Add Link import at top
import { Link } from "@tanstack/react-router";

// Replace the nav element (lines 19-29) with:
<nav className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
  <a href="#services" className="link-reveal hover:text-foreground transition-colors">
    Services
  </a>
  <a href="#demo" className="link-reveal hover:text-foreground transition-colors">
    Demo
  </a>
  <a href="#work" className="link-reveal hover:text-foreground transition-colors">
    Work
  </a>
  <Link
    to="/quote"
    className="link-reveal hover:text-foreground transition-colors text-gold"
  >
    Get a Quote
  </Link>
</nav>
```

- [ ] **Step 2: Run dev server**

```bash
cd "C:/Users/david/Website Seller - Ai Automation/forge-co"
npm run dev
```

Open http://localhost:5173/quote and walk through all 5 steps:
- [ ] Step 1 loads, business types selectable, Continue disabled until selection
- [ ] Step 2 loads, "Limited Launch Offer" badge visible on "Both"
- [ ] Website step shows tier cards + rush toggle with price updates
- [ ] Voice agent step shows tiers + volume with approximate disclaimer
- [ ] Estimate shows price breakdown + contact form
- [ ] Sending quote opens mail client with pre-filled details

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteHeader.tsx
git commit -m "feat(quote): add Get a Quote link to site header"
```

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

Vercel auto-deploys. Check the deployment URL to verify the `/quote` route works in production.
