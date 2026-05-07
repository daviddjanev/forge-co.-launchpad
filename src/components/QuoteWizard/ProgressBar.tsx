interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Step {current} of {total}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-px w-full bg-border">
        <div
          className="h-px bg-gold transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
