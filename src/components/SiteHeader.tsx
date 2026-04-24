import { ThemeToggle } from "./ThemeToggle";
import { BrandMark } from "./BrandMark";

interface SiteHeaderProps {
  onContactClick: () => void;
}

export function SiteHeader({ onContactClick }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container-x max-w-[1400px] mx-auto flex items-center justify-between py-5">
        <a href="#top" className="flex items-center gap-3 group" aria-label="Forge & Co. — home">
          <BrandMark size={38} title="Forge & Co." className="transition-transform duration-500 group-hover:rotate-[22.5deg]" />
          <span className="font-display text-lg tracking-tight">
            Forge <span className="text-gold italic">&</span> Co.
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#services" className="link-reveal hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#demo" className="link-reveal hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#work" className="link-reveal hover:text-foreground transition-colors">
            Work
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onContactClick}
            className="group inline-flex items-center gap-3 rounded-full border border-gold/50 bg-background/40 backdrop-blur px-5 py-2.5 hover:bg-gradient-gold hover:text-primary-foreground hover:border-transparent transition-all"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold group-hover:bg-primary-foreground animate-glow-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
              Start a project
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
