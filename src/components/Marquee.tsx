interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="relative border-y border-border bg-surface overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center px-8">
            <span className="font-display text-2xl md:text-3xl text-foreground/90 italic">
              {item}
            </span>
            <span className="ml-8 inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        ))}
      </div>
    </div>
  );
}
