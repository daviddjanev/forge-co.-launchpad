import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ServicePanel, type ServicePanelData } from "@/components/ServicePanel";
import { ContactPanel } from "@/components/ContactPanel";
import { SiteFooter } from "@/components/SiteFooter";
import { VoiceDemo } from "@/components/VoiceDemo";
import { FilamentDivider } from "@/components/FilamentDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forge & Co. — AI Voice Agents & Web Design Studio" },
      {
        name: "description",
        content:
          "Forge & Co. is an independent studio crafting AI voice agents and high-design websites for ambitious brands. Quietly built. Loudly effective.",
      },
      { property: "og:title", content: "Forge & Co. — AI Voice Agents & Web Design" },
      {
        property: "og:description",
        content:
          "We craft AI voice agents and design websites that move with intent. A studio for businesses ready to sound and look the part.",
      },
    ],
  }),
  component: Index,
});

const services: ServicePanelData[] = [
  {
    number: "01",
    kicker: "AI Voice Agents",
    title: (
      <>
        Voices that <em className="text-gradient-gold not-italic">close</em>,
        not just answer.
      </>
    ),
    description:
      "Custom voice agents that book calls, qualify leads, and handle support 24/7 — sounding like the best person on your team, not a bot reading a script.",
    businessValue: {
      heading: "Capture every lead, day and night.",
      body: "Our agents pick up in under two seconds, qualify intent, and book directly into your calendar. No missed revenue. No voicemail black holes.",
    },
    ourAdvantage: {
      heading: "Brand-true voice & tone.",
      body: "We tune cadence, vocabulary and personality to match your brand. Customers feel they're speaking to your best rep — not a generic assistant.",
    },
    executionTools: {
      heading: "Vapi · ElevenLabs · Twilio · n8n.",
      body: "Best-in-class voice infrastructure stitched into your CRM, calendar and Slack. Observable, testable and version-controlled.",
    },
    useCases: {
      heading: "Real-estate · Clinics · Agencies.",
      body: "Inbound qualification, appointment setting, after-hours triage, recurring follow-ups, and outbound reactivation campaigns.",
    },
  },
  {
    number: "02",
    kicker: "Web Design & Build",
    title: (
      <>
        Sites that look <em className="text-gradient-gold not-italic">expensive</em>
        — and perform like it.
      </>
    ),
    description:
      "Editorial-grade websites engineered for speed and conversion. Custom motion, considered typography, and a CMS your team will actually enjoy using.",
    businessValue: {
      heading: "Premium positioning, instantly.",
      body: "Look like the category leader. Our clients consistently report higher close rates and bigger deal sizes after launch.",
    },
    ourAdvantage: {
      heading: "Designed in-house, end-to-end.",
      body: "No handoffs to template farms. Strategy, art direction, motion and engineering live under one roof — and one taste level.",
    },
    executionTools: {
      heading: "React · TanStack · Three.js · Sanity.",
      body: "Modern, performant stacks. SSR-ready, accessibility-aware, and tuned for Core Web Vitals scores in the high 90s.",
    },
    useCases: {
      heading: "Marketing sites · Portfolios · DTC.",
      body: "Funded startup launches, agency rebrands, product narrative pages, and high-AOV ecommerce experiences.",
    },
  },
  {
    number: "03",
    kicker: "Brand & Automation",
    title: (
      <>
        The <em className="text-gradient-gold not-italic">connective tissue</em>
        between brand and ops.
      </>
    ),
    description:
      "Identity systems, automation pipelines and lifecycle flows that make your business feel coherent — from a cold DM to a renewal email.",
    businessValue: {
      heading: "Less manual work, more margin.",
      body: "Automate the busywork around lead-gen, onboarding and reporting. Free your team to do the work clients actually pay for.",
    },
    ourAdvantage: {
      heading: "A studio that thinks in systems.",
      body: "We design brand and ops as one. Visual identity, voice, and workflows are built so they reinforce each other — not fight.",
    },
    executionTools: {
      heading: "Figma · n8n · Make · Notion · Linear.",
      body: "Lightweight, observable automations layered on top of the tools you already use. No bloated agency-only platforms.",
    },
    useCases: {
      heading: "Rebrands · Onboarding · Reporting.",
      body: "Identity refreshes, automated client onboarding, weekly KPI rollups, and AI-augmented internal knowledge bases.",
    },
  },
];

function Index() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  return (
    <main className="relative">
      <SiteHeader onContactClick={openContact} />
      <Hero onContactClick={openContact} />

      <Marquee
        items={[
          "AI Voice Agents",
          "Editorial Web Design",
          "Brand Systems",
          "Conversion Engineering",
          "Lifecycle Automation",
          "Three.js Motion",
        ]}
      />

      <section id="services" className="relative">
        <div className="container-x max-w-[1400px] mx-auto pt-24 pb-10">
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                ⟶ What we forge
              </div>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mt-4 max-w-3xl">
                Three disciplines.
                <br />
                <em className="text-gradient-gold not-italic">One studio.</em>
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Scroll through how we work — voice, web and the systems that hold them together.
            </p>
          </div>
        </div>

        {services.map((s, i) => (
          <ServicePanel key={s.number} data={s} index={i} />
        ))}
      </section>

      <FilamentDivider label="Try it" />

      <VoiceDemo />

      <FilamentDivider label="Selected work" />

      {/* Spacer so last sticky panel can release before footer */}
      <section id="work" className="relative bg-background border-t border-border">
        <div className="container-x max-w-[1400px] mx-auto py-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            ⟶ Selected work
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { client: "Atelier Noma", tag: "Voice agent · Hospitality", note: "+38% bookings in 60 days" },
              { client: "Helio Health", tag: "Web · Brand", note: "Series A launch site" },
              { client: "Verde Capital", tag: "Voice · Automation", note: "After-hours qualification" },
              { client: "Studio Marble", tag: "Web · Motion", note: "Portfolio rebuild" },
            ].map((w) => (
              <div
                key={w.client}
                className="group p-8 rounded-2xl border border-border bg-surface hover:border-gold/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl">{w.client}</h3>
                  <span className="numeral text-gold text-sm">→</span>
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {w.tag}
                </div>
                <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
                  {w.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Now booking · Q3 2026",
          "Lisbon · Remote worldwide",
          "Available for select partnerships",
          "hello@forgeand.co",
          "Voice · Web · Brand",
        ]}
      />

      <SiteFooter onContactClick={openContact} />
      <ContactPanel open={contactOpen} onClose={closeContact} />
    </main>
  );
}
