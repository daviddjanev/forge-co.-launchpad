import { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export interface ServiceCard {
  heading: string;
  body: string;
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
}

export function ServicePanel({ data, index }: ServicePanelProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  return (
    <section
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      className="service-panel sticky top-0 min-h-screen w-full bg-background border-t border-border"
      style={{
        paddingTop: `${4 + index * 0.5}rem`,
      }}
    >
      <div className="absolute inset-0 bg-radial-gold opacity-60 pointer-events-none" />
      <div className="container-x relative max-w-[1400px] mx-auto pb-24">
        <div className="flex items-baseline gap-6 border-b border-border pb-6">
          <span className="numeral text-5xl md:text-7xl text-gold">{data.number}</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {data.kicker}
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden md:block">
            Forge & Co. / Service
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mt-12">
          <div className="lg:col-span-5 reveal-item" style={{ ["--d" as any]: "0ms" }}>
            <h2 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[0.95]">
              {data.title}
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="reveal-item" style={{ ["--d" as any]: "120ms" }}>
              <Card label="Business value" data={data.businessValue} accent />
            </div>
            <div className="reveal-item" style={{ ["--d" as any]: "200ms" }}>
              <Card label="Our advantage" data={data.ourAdvantage} />
            </div>
            <div className="reveal-item" style={{ ["--d" as any]: "280ms" }}>
              <Card label="Execution tools" data={data.executionTools} />
            </div>
            <div className="reveal-item" style={{ ["--d" as any]: "360ms" }}>
              <Card label="Use cases" data={data.useCases} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
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
      className={`group relative rounded-2xl p-7 border transition-all duration-500 hover:-translate-y-1 ${
        accent
          ? "bg-gradient-to-br from-surface-elevated to-surface border-gold/30 hover:border-gold/60"
          : "bg-surface border-border hover:border-border-strong"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-gold animate-glow-pulse" : "bg-border-strong"}`}
        />
      </div>
      <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight text-foreground">
        {data.heading}
      </h3>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{data.body}</p>
    </div>
  );
}
