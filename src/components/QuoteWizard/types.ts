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
    items.push(`Monthly maintenance (~$${monthlyCost}/mo, usage-based)`);
  }

  return { oneTime, monthly, items };
}
