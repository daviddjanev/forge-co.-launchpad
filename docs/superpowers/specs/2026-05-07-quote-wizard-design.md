# Quote Calculator Wizard — Design Spec
Date: 2026-05-07

## What We're Building
An interactive 5-step price estimate wizard living at `/quote` on the Forge & Co agency site. Clients get a shareable link, fill it out themselves, and see a real number at the end. Replaces the "I'll figure out the price on the call" problem.

## Route
New page: `src/routes/quote.tsx`
Linked from the site header and hero CTA.

## Step Flow

### Step 1 — Business Type
Question: "What kind of business are you?"
Options (visual cards, icon + label):
- Restaurant / Café
- Taxi / Transport
- Retail / Shop
- Clinic / Medical
- Hotel / Hospitality
- Other

No price effect. Sets tone and personalizes the summary copy on step 5.

### Step 2 — What Do You Need?
Question: "What can we build for you?"
Options:
- Website only
- AI Voice Agent only
- Both — marked with a "Limited Launch Offer" badge (promo angle, no specific discount shown)

### Step 3 — Website (shown only if website selected)
Question: "What kind of website?"
- Basic landing page — clean, fast, scroll animations → **$800**
- Premium site — 3D effects, CMS, full art direction → **$1,200**

Toggle: Rush delivery (7 days instead of 14) → **+$300**

### Step 4 — Voice Agent (shown only if voice agent selected)
Question: "What should your voice agent do?"

Setup tier:
- Basic — answers FAQs, takes messages → **$800**
- Standard — handles bookings/orders, business hours → **$1,000**
- Full — 24/7, multilingual, advanced flows → **$1,500**

Monthly call volume (approximate, labeled as estimates):
- Small — ~100–200 calls/month → **~$200/month**
- Medium — ~300–500 calls/month → **~$250/month**
- Large — 500+ calls/month → **~$300/month**

Small disclaimer below: "Monthly costs are approximate and depend on actual usage. Final quote confirmed before contract."

### Step 5 — Your Estimate
Shows:
- One-time cost (bold, large)
- Monthly retainer (bold, large)
- Bullet list of what's included based on selections
- Business type mentioned: "Built for [Restaurant / Taxi / etc.]"
- CTA button: "Send Me This Offer" → opens inline contact form (name, phone, email, message pre-filled with their selections)

## Design
- Matches existing site aesthetic (dark, grain overlay, gold gradients)
- Progress bar at top (Step 1 of 5)
- Back/Next navigation
- Smooth transitions between steps (slide or fade)
- Mobile responsive

## Component Structure
```
src/routes/quote.tsx          — page shell, step state management
src/components/QuoteWizard/
  index.tsx                   — orchestrator
  StepBusinessType.tsx
  StepServices.tsx
  StepWebsite.tsx
  StepVoiceAgent.tsx
  StepEstimate.tsx
  ContactForm.tsx
  ProgressBar.tsx
```

## State
All wizard state lives in a single `quoteState` object in the parent. No server calls needed — fully client-side calculation.

```ts
type QuoteState = {
  businessType: string
  services: ('website' | 'voice' | 'both')[]
  website: { tier: 'basic' | 'premium'; rush: boolean } | null
  voiceAgent: { tier: 'basic' | 'standard' | 'full'; volume: 'small' | 'medium' | 'large' } | null
}
```

## Pricing Logic
```
oneTime = 0
monthly = 0

if website:
  oneTime += tier === 'basic' ? 800 : 1200
  if rush: oneTime += 300

if voiceAgent:
  oneTime += tier === 'basic' ? 800 : tier === 'standard' ? 1000 : 1500
  monthly += volume === 'small' ? 200 : volume === 'medium' ? 250 : 300
```

## Out of Scope
- No backend/email sending (contact form is a mailto or simple Formspree)
- No auth
- No saving/persisting quotes
