import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ContactPanelProps {
  open: boolean;
  onClose: () => void;
}

export function ContactPanel({ open, onClose }: ContactPanelProps) {
  const [render, setRender] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true);
      setClosing(false);
    } else if (render) {
      setClosing(true);
      const t = setTimeout(() => setRender(false), 400);
      return () => clearTimeout(t);
    }
  }, [open, render]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Close contact panel"
        onClick={onClose}
        className={`absolute inset-0 bg-background/70 backdrop-blur-sm ${
          closing ? "animate-fade-out" : "animate-fade-in"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-surface border-l border-border-strong shadow-elevated overflow-y-auto ${
          closing ? "animate-slide-out-right" : "animate-slide-in-right"
        }`}
      >
        <div className="flex items-center justify-between px-8 pt-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            ⟶ Begin a project
          </span>
          <button
            onClick={onClose}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-8 pt-12 pb-16">
          <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-foreground">
            Let's <em className="text-gradient-gold not-italic">forge</em>
            <br />
            something.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Tell us about your business. We reply within one working day with a clear path forward.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <Field label="Your name" id="name" />
            <Field label="Email" id="email" type="email" />
            <Field label="Company" id="company" />
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Interested in
              </label>
              <div className="flex flex-wrap gap-2">
                {["AI Voice Agents", "Web Design", "Brand", "Automation"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    className="px-4 py-2 rounded-full border border-border text-sm hover:border-gold hover:text-gold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
              >
                Project notes
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 resize-none text-foreground"
                placeholder="A few sentences about what you're building…"
              />
            </div>

            <button
              type="submit"
              className="group mt-4 w-full inline-flex items-center justify-between px-6 py-5 rounded-full bg-gradient-gold text-primary-foreground font-medium tracking-wide hover:shadow-gold transition-shadow"
            >
              <span>Send to Forge & Co.</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>

          <div className="mt-14 pt-8 border-t border-border grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Email
              </div>
              <a href="mailto:hello@forgeand.co" className="link-reveal text-foreground">
                hello@forgeand.co
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Studio
              </div>
              <p className="text-foreground">North Macedonia · Remote</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 text-foreground placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
