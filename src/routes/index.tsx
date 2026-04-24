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
      body: "",
      tags: ["24/7", "<2s pickup", "Books direct"],
    },
    ourAdvantage: {
      heading: "Brand-true voice & tone.",
      body: "",
      tags: ["Custom cadence", "On-brand", "Human-like"],
    },
    executionTools: {
      heading: "Best-in-class voice stack.",
      body: "",
      tags: ["Vapi", "ElevenLabs", "Twilio", "n8n"],
    },
    useCases: {
      heading: "Real-estate · Clinics · Agencies.",
      body: "",
      tags: ["Inbound", "Booking", "Triage", "Follow-ups"],
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
      body: "",
      tags: ["Higher AOV", "Better close", "Category leader"],
    },
    ourAdvantage: {
      heading: "Designed in-house, end-to-end.",
      body: "",
      tags: ["Strategy", "Art direction", "Engineering"],
    },
    executionTools: {
      heading: "Modern, performant stack.",
      body: "",
      tags: ["React", "TanStack", "Three.js", "Sanity"],
    },
    useCases: {
      heading: "Marketing · Portfolio · DTC.",
      body: "",
      tags: ["Launches", "Rebrands", "Narrative", "Ecom"],
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
      body: "",
      tags: ["Lead-gen", "Onboarding", "Reporting"],
    },
    ourAdvantage: {
      heading: "A studio that thinks in systems.",
      body: "",
      tags: ["Brand + ops", "Coherent", "Reinforcing"],
    },
    executionTools: {
      heading: "Lightweight automation stack.",
      body: "",
      tags: ["Figma", "n8n", "Make", "Notion", "Linear"],
    },
    useCases: {
      heading: "Rebrands · Onboarding · Reporting.",
      body: "",
      tags: ["Identity", "Workflows", "KPIs", "Knowledge"],
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
        <div className="container-x max-w-[1400px] mx-auto pt-24 pb-16">
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
              Scroll — each discipline stacks into view.
            </p>
          </div>
        </div>

        {services.map((s, i) => (
          <ServicePanel key={s.number} data={s} index={i} total={services.length} />
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
              { client: "Under NDA", tag: "Voice agent · Hospitality", note: "Case study coming soon" },
              { client: "Coming Soon", tag: "Web · Brand", note: "Launch in progress" },
              { client: "Under NDA", tag: "Voice · Automation", note: "Case study coming soon" },
              { client: "Coming Soon", tag: "Web · Motion", note: "Launch in progress" },
            ].map((w, i) => (
              <div
                key={i}
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
          "North Macedonia · Remote worldwide",
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
