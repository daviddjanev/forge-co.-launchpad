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
        content:
          "Get an instant price estimate for your AI website or voice agent. Takes 2 minutes.",
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
