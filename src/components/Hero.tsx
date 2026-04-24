import { HumanoidScene } from "./HumanoidScene";
import { SplitText } from "./SplitText";
import { useMagnetic } from "@/hooks/use-magnetic";

interface HeroProps {
  onContactClick: () => void;
}

export function Hero({ onContactClick }: HeroProps) {
  const ctaRef = useMagnetic<HTMLSpanElement>(0.4);
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
      {/* Concentric ring decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="animate-spin-slow h-[680px] w-[680px] md:h-[860px] md:w-[860px] rounded-full border border-gold/15" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="animate-spin-slow h-[480px] w-[480px] md:h-[600px] md:w-[600px] rounded-full border border-gold/10"
          style={{ animationDirection: "reverse", animationDuration: "45s" }}
        />
      </div>

      <div className="relative container-x max-w-[1400px] mx-auto pt-32 md:pt-36 pb-12">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">
          <span className="h-px w-10 bg-gold" />
          <span>AI Voice Agents · Web Design · est. 2024</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mt-10 items-center">
          <div className="lg:col-span-7 relative z-10">
            <h1 className="font-display text-[15vw] md:text-[8.5rem] xl:text-[10rem] leading-[0.86] tracking-tight">
              <SplitText stagger={0.07}>
                <>Forge</>
              </SplitText>
              <br />
              <SplitText delay={0.25} stagger={0.07} className="split-gradient-gold not-italic">
                <>conversations</>
              </SplitText>
              <br />
              <SplitText delay={0.55} stagger={0.07}>
                <>that convert.</>
              </SplitText>
            </h1>
            <p
              className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              We craft AI voice agents and design websites that move with intent —
              quietly, intelligently, and on brand. A studio for businesses ready to sound
              and look the part.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <span ref={ctaRef} className="inline-block will-change-transform">
                <button
                  onClick={onContactClick}
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-gold text-primary-foreground px-7 py-4 hover:shadow-gold transition-shadow"
                >
                  <span className="font-medium">Start a project</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </span>
              <a
                href="#services"
                className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 hover:border-gold hover:text-gold transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
                  See services
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full max-w-[560px] mx-auto">
              <HumanoidScene />
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          {[
            ["120+", "Voice flows shipped"],
            ["38", "Brands rebuilt"],
            ["1.4s", "Avg. response time"],
            ["EU · US", "Time zones covered"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="numeral text-3xl text-gold">{k}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
