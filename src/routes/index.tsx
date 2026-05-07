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
    kicker: "3D Animated Websites",
    title: (
      <>
        Sites that make your{" "}
        <em className="text-gradient-gold not-italic">competitors look flat.</em>
      </>
    ),
    description:
      "High-impact, animated single-page websites built for local businesses. Custom motion, bold visuals, and a design that makes you the obvious choice in your city.",
    businessValue: {
      heading: "Stand out before they even read a word.",
      body: "",
      tags: ["First impression", "More calls", "More walk-ins"],
    },
    ourAdvantage: {
      heading: "3D motion nobody else in the region offers.",
      body: "",
      tags: ["Unique market", "Custom animation", "Premium feel"],
    },
    executionTools: {
      heading: "Modern web stack, fast delivery.",
      body: "",
      tags: ["React", "Three.js", "GSAP", "Vercel"],
    },
    useCases: {
      heading: "Restaurants · Gyms · Salons · Shops.",
      body: "",
      tags: ["Local biz", "Launch", "Rebrand", "Portfolio"],
    },
  },
  {
    number: "02",
    kicker: "AI Voice Agents",
    title: (
      <>
        Answers every call.{" "}
        <em className="text-gradient-gold not-italic">Books. Takes orders. Never sleeps.</em>
      </>
    ),
    description:
      "A fully automated AI that handles your inbound calls — takes orders, books tables, answers FAQs and qualifies leads 24/7, sounding like your best employee.",
    businessValue: {
      heading: "Zero missed calls. Zero extra staff.",
      body: "",
      tags: ["24/7", "<2s pickup", "Books direct"],
    },
    ourAdvantage: {
      heading: "Trained on your exact business.",
      body: "",
      tags: ["Custom script", "Your voice", "Your brand"],
    },
    executionTools: {
      heading: "Best-in-class voice stack.",
      body: "",
      tags: ["Vapi", "ElevenLabs", "Twilio", "n8n"],
    },
    useCases: {
      heading: "Restaurants · Gyms · Clinics · Agencies.",
      body: "",
      tags: ["Inbound", "Booking", "Orders", "Follow-ups"],
    },
  },
  {
    number: "03",
    kicker: "After-Hours AI Receptionist",
    title: (
      <>
        You close at 10.{" "}
        <em className="text-gradient-gold not-italic">We answer at 11.</em>
      </>
    ),
    description:
      "For businesses that need a human touch during the day — the AI steps in after hours. Takes names, numbers, and requests so you wake up to warm leads ready to call back.",
    businessValue: {
      heading: "Never lose a customer to a missed call again.",
      body: "",
      tags: ["After hours", "Warm leads", "Morning list"],
    },
    ourAdvantage: {
      heading: "Feels personal. Costs nothing extra.",
      body: "",
      tags: ["Human tone", "Low complexity", "Easy setup"],
    },
    executionTools: {
      heading: "Lightweight, reliable stack.",
      body: "",
      tags: ["Vapi", "Twilio", "WhatsApp notify", "Make"],
    },
    useCases: {
      heading: "Tattoo shops · Lawyers · Consultants · Salons.",
      body: "",
      tags: ["After hours", "Lead capture", "Callbacks", "Any biz"],
    },
  },
  {
    number: "04",
    kicker: "Lead Generation Bot",
    title: (
      <>
        Turns visitors into{" "}
        <em className="text-gradient-gold not-italic">leads while you sleep.</em>
      </>
    ),
    description:
      "A chat widget on your website or Facebook page that engages visitors, asks the right questions, and sends their contact info straight to your phone — automatically.",
    businessValue: {
      heading: "A salesperson that never clocks out.",
      body: "",
      tags: ["More leads", "Auto-qualify", "Instant notify"],
    },
    ourAdvantage: {
      heading: "Set up once. Runs forever.",
      body: "",
      tags: ["Zero maintenance", "Always on", "Scalable"],
    },
    executionTools: {
      heading: "Proven automation stack.",
      body: "",
      tags: ["ManyChat", "Voiceflow", "Make", "WhatsApp"],
    },
    useCases: {
      heading: "Any business with a website or Facebook.",
      body: "",
      tags: ["Restaurants", "Gyms", "Ecom", "Services"],
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
          "3D Animated Websites",
          "AI Voice Agents",
          "After-Hours AI Receptionist",
          "Lead Generation Bot",
          "Local Business Automation",
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
                Four services.
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
