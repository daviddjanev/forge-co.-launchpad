import { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export interface ServiceCard {
  heading: string;
  body: string;
  tags?: string[];
}

export interface ServicePanelData {
  number: string;
  kicker: string;
  title: ReactNode;
  description: string;
  businessValue: ServiceCard;
  ourAdvantage: ServiceCard;
  executionTools: ServiceCard;
  useCases: ServiceCard;
}

interface ServicePanelProps {
  data: ServicePanelData;
  index: number;
  total: number;
}

export function ServicePanel({ data, index, total }: ServicePanelProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      className="service-panel sticky top-0 h-screen w-full bg-background border-t border-border overflow-hidden"
      style={{
        zIndex: 10 + index,
      }}
    >
      <div className="absolute inset-0 bg-radial-gold opacity-60 pointer-events-none" />

      <div className="container-x relative max-w-[1500px] mx-auto h-full flex flex-col pt-24 md:pt-28 pb-10 md:pb-14">
        {/* TOP ROW — kicker left, big numeral right */}
        <div className="flex items-start justify-between gap-6 border-b border-border pb-6">
          <div className="reveal-item" style={{ ["--d" as never]: "0ms" }}>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ⟶ {data.kicker}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-2 hidden md:block">
              Forge & Co. / Service {data.number} of {String(total).padStart(2, "0")}
            </div>
          </div>
          <span
            className="numeral text-gold leading-none text-7xl md:text-9xl xl:text-[12rem] reveal-item"
            style={{ ["--d" as never]: "60ms" }}
          >
            {data.number}
          </span>
        </div>

        {/* MAIN — title left, description right */}
        <div className="flex-1 grid lg:grid-cols-12 gap-8 md:gap-12 items-center py-8 md:py-12">
          <div className="lg:col-span-7 reveal-item" style={{ ["--d" as never]: "120ms" }}>
            <h2 className="font-display text-[2.5rem] sm:text-6xl md:text-7xl xl:text-[6rem] leading-[0.92]">
              {data.title}
            </h2>
          </div>
          <div className="lg:col-span-5 reveal-item" style={{ ["--d" as never]: "200ms" }}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
              {data.description}
            </p>
          </div>
        </div>

        {/* BOTTOM — 4 detail cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="reveal-item" style={{ ["--d" as never]: "280ms" }}>
            <DetailCard label="Business Value" data={data.businessValue} accent />
          </div>
          <div className="reveal-item" style={{ ["--d" as never]: "340ms" }}>
            <DetailCard label="Our Advantage" data={data.ourAdvantage} />
          </div>
          <div className="reveal-item" style={{ ["--d" as never]: "400ms" }}>
            <DetailCard label="Execution Tools" data={data.executionTools} />
          </div>
          <div className="reveal-item" style={{ ["--d" as never]: "460ms" }}>
            <DetailCard label="Use Cases" data={data.useCases} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  label,
  data,
  accent,
}: {
  label: string;
  data: ServiceCard;
  accent?: boolean;
}) {
  return (
    <div
      className={`group h-full rounded-2xl p-4 md:p-5 border transition-all duration-500 hover:-translate-y-1 ${
        accent
          ? "bg-gradient-to-br from-surface-elevated to-surface border-gold/30 hover:border-gold/60"
          : "bg-surface border-border hover:border-border-strong"
      }`}
    >
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            accent ? "bg-gold animate-glow-pulse" : "bg-border-strong"
          }`}
        />
      </div>
      <h3 className="font-display text-base md:text-lg xl:text-xl leading-snug text-foreground">
        {data.heading}
      </h3>
      {data.tags && data.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.tags.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                accent
                  ? "border-gold/40 text-gold/90"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
